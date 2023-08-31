var calcData = {}

calcData.topCalcType = 'market'
calcData.globalCalcType = 'main'
calcData.creditType = 'prom'
let isActive = false
function calcDataRestart(){
	calcData.maxPrice = 100000000
	calcData.years = 0
	calcData.mrp = 2405
	calcData.maxPrem = 200 * calcData.mrp
	calcData.gosPrem = 0.2
	calcData.gosPremSum = 0
	calcData.bankPercent = 0.02
	calcData.creditPercent = 5
	calcData.creditOverhead = 0
	calcData.pmt = 0
	calcData.fullSum = 0
	calcData.yearSum = 0
	calcData.ostDolgZenil = 0
	calcData.ostDolgZenil2 = 0
	calcData.minFirstPercent = 0
	calcData.maxFirstPercent = 0
}

calcDataRestart()

function delSpaces(str){
	str = str.replace(/\s/g, '');
	return str;
}
// function PMTZenil2 (ir, np, pv, fv ) {
//
// 	pmt = ( ir * ( pv * Math.pow ( (ir+1), np ) + fv ) ) / ( ( ir + 1 ) * ( Math.pow ( (ir+1), np) -1 ) );
// 	return pmt;
// }
function numSplit(str, rep = '&nbsp;'){
	str += '';
	return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' + rep);
}

function getRandom(min, max){
	return Math.random() * (max - min) + min;
}

function PMTZenil2(i, n, p) {
	console.log(i + ' i')
	console.log(n + ' n')
	console.log(p + ' p')
	return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
}


function PMT(ratePerPeriod, numberOfPayments, presentValue, futureValue = 0, type = 0){
	if(ratePerPeriod != 0.0){
		var q = Math.pow(1 + ratePerPeriod, numberOfPayments);
		return -(ratePerPeriod * (futureValue + (q * presentValue))) / ((-1 + q) * (1 + ratePerPeriod * (type)));
	}else if(numberOfPayments != 0.0){
		return -(futureValue + presentValue) / numberOfPayments;
	}

	return 0;
}

function calcTable(sum, percent, period = null, selector = '', fv = 0, isProm = true, realPeriod = 0, isAnnuity = false){
	var result = [];
	if(realPeriod == 0){
		realPeriod = period
	}

	if(selector == '.table_graph_zenil' && isProm){
		var pmt = -(sum * percent/12);
	}else{
		var pmt = PMT(percent/12, period, sum, fv, 0);
	}

	var balance = sum;
	var ost = sum;

	if(isAnnuity){
		var mainCredit = sum / period

		for(var i=0; i < realPeriod; i++){
			result[i] = {};

			ost -= mainCredit;
			var percents = (ost*percent/12);
			var pmt = mainCredit+percents;

			result[i].num = i+1;
			result[i].pmt = pmt;
			result[i].percents = percents;
			result[i].mainCredit = mainCredit;
			result[i].ost = calcData.ostDolg = ost;
			result[i].op = mainCredit/(sum/1000)

			if(selector.length){
				$(selector).append('<tr><td data-th="' + $('#tb-txt-period').val() + '">' + result[i].num + '</td><td data-th="' + $('#tb-txt-mpay').val() + '">' + numSplit(result[i].pmt.toFixed(2)) + '</td><td data-th="' + $('#tb-txt-percent').val() + '">' + numSplit(result[i].percents.toFixed(2)) + '</td><td data-th="' + $('#tb-txt-principaldebt').val() + '">' + numSplit(result[i].mainCredit.toFixed(2)) + '</td><td data-th="' + $('#tb-txt-debtbalance').val() + '">' + numSplit(result[i].ost.toFixed(2)) + '<!-- ' + result[i].op + ' --></td></tr>');
			}
		}
	}else{
		for(var i=0; i < realPeriod; i++){
			result[i] = {};

			var percents = (ost*percent/12);
			var mainCredit = -pmt-percents;
			ost -= mainCredit;

			result[i].num = i+1;
			result[i].pmt = -pmt;
			result[i].percents = percents;
			result[i].mainCredit = mainCredit;
			result[i].ost = calcData.ostDolg = ost;
			result[i].op = mainCredit/(sum/1000)

			if(selector.length){
				$(selector).append('<tr><td data-th="' + $('#tb-txt-period').val() + '">' + result[i].num + '</td><td data-th="' + $('#tb-txt-mpay').val() + '">' + numSplit(result[i].pmt.toFixed(2)) + '</td><td data-th="' + $('#tb-txt-percent').val() + '">' + numSplit(result[i].percents.toFixed(2)) + '</td><td data-th="' + $('#tb-txt-principaldebt').val() + '">' + numSplit(result[i].mainCredit.toFixed(2)) + '</td><td data-th="' + $('#tb-txt-debtbalance').val() + '">' + numSplit(result[i].ost.toFixed(2)) + '<!-- ' + result[i].op + ' --></td></tr>');
			}
		}
	}

	return result;
}

function maxCreditPeriod(pi){
	if(pi >= 0 && pi < 16){
		return 0;
	}else if(pi >= 16 && pi < 20){
		return 72;
	}else if(pi >= 20 && pi < 25){
		return 84;
	}else if(pi >= 25 && pi < 29){
		return 96;
	}else if(pi >= 29 && pi < 35){
		return 108;
	}else if(pi >= 35 && pi < 41){
		return 120;
	}else if(pi >= 41 && pi < 45){
		return 132;
	}else if(pi >= 45 && pi < 48){
		return 144;
	}else if(pi >= 48 && pi < 53){
		return 168;
	}else if(pi >= 53 && pi < 57){
		return 192;
	}else if(pi >= 57 && pi < 61){
		return 216;
	}else if(pi >= 61 && pi < 66){
		return 252;
	}else if(pi >= 66 && pi < 74){
		return 276;
	}else if(pi >= 74){
		return 300;
	}
}

function mainCreditPercent(creditPeriod){
	if(creditPeriod >= 0 && creditPeriod <= 72){
		return 5
	}else if(creditPeriod > 72 && creditPeriod <= 84){
		return 4.8
	}else if(creditPeriod > 84 && creditPeriod <= 96){
		return 4.5
	}else if(creditPeriod > 96 && creditPeriod <= 108){
		return 4.2
	}else if(creditPeriod > 108 && creditPeriod <= 120){
		return 4
	}else if(creditPeriod > 120 && creditPeriod <= 132){
		return 3.8
	}else if(creditPeriod > 132 && creditPeriod <= 144){
		return 3.7
	}else{
		return 3.5
	}
}	let percentOpStandart = 0.105
	let percentOpZenil2 = 0.011
	let percentOpZenil = 0.0115

function calcAll(initter = null){
	// Общие параметры для всех типов кредитов
	calcData.priceMin = 1000000
	calcData.priceMax = 100000000
	calcData.price = parseInt(delSpaces($('#slider_price_val').val()))

	calcData.firstMin = calcData.price / 2

	calcData.isAnnuity = $('.isAnnuity').prop('checked')

	if(calcData.globalCalcType == 'main'){
		// Получение всех параметров
		calcData.first = calcData.firstMin
		calcData.firstMax = calcData.firstMin

		//calcData.depositPayMin = Math.round(calcData.price / 1300) + 1
		//calcData.depositPayMax = Math.round(calcData.price / 72)

		calcData.depositPay = parseInt(delSpaces($('#slider_month_val').val()))

		calcData.depositPeriodMin = 36
		calcData.depositPeriodMax = 360
		calcData.depositPeriod = parseInt($('#slider_period_val').val())

		calcData.creditSumMin = calcData.price - calcData.first

		if(calcData.creditSumMin < 0){
			calcData.creditSumMin = 0
		}

		calcData.creditSumMax = calcData.creditSumMin
		calcData.creditSum = calcData.creditSumMin

		calcData.creditPeriodMin = 36
		calcData.creditPeriodMax = 360
		calcData.creditPeriod = parseInt($('#slider_credit_period_val').val())

		// Обработка
		calcData.premiedSum = 0;
		calcData.gosPremSum = 0;
		calcData.bnkPremSum = 0;

		calcData.capitalSum = 0;
		calcData.years = 0;

		calcData.performanceIndicator = 0;

		if($(initter).hasClass('month_pay')){
			$('.sum').css('color', 'black');
			calcData.depositPeriod = Math.round(((calcData.price / 2) - (calcData.price * 0.1)) / calcData.depositPay)
			if(calcData.depositPeriod > 360){
				calcData.depositPeriod = 360
			}else if(calcData.depositPeriod < 36){
				calcData.depositPeriod = 36
			}

			$('.month_count').val(calcData.depositPeriod)
		}

		if($(initter).hasClass('month_count')){
			$('.sum').css('color', 'black');
			calcData.depositPay = Math.round(((calcData.price / 2) - (calcData.price * 0.1)) / calcData.depositPeriod)
			if(calcData.depositPeriod > (calcData.price / 2)){
				calcData.depositPay = (calcData.price / 2)
			}else if(calcData.depositPeriod < 0){
				calcData.depositPay = 0
			}

			$('.month_pay').val(calcData.depositPay)
		}

		//calcData.iMonth = 12
		calcData.iMonth = 0
		calcData.curGosPrem = 0
		calcData.personalSum = 0
		if(calcData.depositPay > 0){
			//while((calcData.iMonth < calcData.depositPeriod && calcData.capitalSum < (calcData.price / 2)) || calcData.capitalSum < (calcData.price / 2)){
			while((calcData.iMonth < calcData.depositPeriod && calcData.capitalSum < (calcData.price / 2)) || calcData.capitalSum < (calcData.price / 2)){
				var curGosPrem = 0;
				var curBnkPrem = 0;

				// Прибавляем пополнение депозита за месяц
				calcData.capitalSum += calcData.depositPay;
				calcData.personalSum += calcData.depositPay

				// Вычисляем годовое вознаграждение банка
				calcData.curBnkPrem = calcData.capitalSum * (calcData.bankPercent / 12);
				calcData.yearSum += calcData.curBnkPrem;

				if((calcData.iMonth + 1) % 12 == 0){
					calcData.bnkPremSum += calcData.yearSum;
					calcData.capitalSum += calcData.yearSum;

					// Вычисляем возможную годовую премию государства и добавляем к сумме
					if(!calcData.curGosPrem){
						calcData.curGosPrem = (calcData.capitalSum + calcData.yearSum) * calcData.gosPrem
					}else{
						calcData.curGosPrem = (calcData.yearSum + calcData.depositPay * 12) * calcData.gosPrem
					}

					if(calcData.curGosPrem > calcData.maxPrem * calcData.gosPrem){
						calcData.curGosPrem = calcData.maxPrem * calcData.gosPrem
					}

					calcData.capitalSum += calcData.curGosPrem;
					calcData.gosPremSum += calcData.curGosPrem;

					calcData.yearSum = 0;
				}

				if((calcData.iMonth + 1) % 12 == 11){
					calcData.bnkPremSum += calcData.yearSum;
					calcData.capitalSum += calcData.yearSum;

					calcData.yearSum = 0;
				}

				calcData.iMonth++;
			}

			if(calcData.depositPeriod != calcData.iMonth){
				calcData.depositPeriod = calcData.iMonth
				$('.month_count').val(calcData.depositPeriod)
			}
		}

		// Оценочный показатель
		calcData.performanceIndicator = (calcData.bnkPremSum)/(calcData.price/1000);

		// Максимальный срок кредитования
		if(!$(initter).hasClass('credit_period')){
			calcData.creditPeriodMax = maxCreditPeriod(calcData.performanceIndicator)
			calcData.creditPeriod = calcData.creditPeriodMax

			if(calcData.creditPeriod > calcData.creditPeriodMax){
				calcData.creditPeriod = calcData.creditPeriodMax
			}

			if(calcData.creditPeriod < calcData.creditPeriodMin){
				calcData.creditPeriod = calcData.creditPeriodMin
			}

			$('.credit_period').val(calcData.creditPeriod || 0);
		}

		// Процент по кредиту
		calcData.creditPercent = mainCreditPercent(calcData.creditPeriod) / 100

		// Сумма жилищного займа
		calcData.creditSum = calcData.price - calcData.capitalSum

		if(calcData.creditSum < 0){
			calcData.creditSum = 0
		}

		if(calcData.creditPercent && calcData.creditPeriod && calcData.creditSum > 0){
			// Расчет ежемесячного платежа
			calcData.pmt = -PMT(calcData.creditPercent / 12, calcData.creditPeriod, calcData.creditSum)

			$('.table_graph').html('');

			// Расчет платежей
			calcTable(calcData.creditSum, calcData.creditPercent, calcData.creditPeriod, '.table_graph');

			// Переплата
			calcData.creditOverhead = calcData.pmt * calcData.creditPeriod - calcData.creditSum
		}
	}else if(calcData.globalCalcType == 'all'){
		if(calcData.creditType == 'pred'){
			// Получение всех параметров
			if(calcData.minFirstPercent){
				calcData.firstMin = Math.round(calcData.price * calcData.minFirstPercent)
			}else{
				calcData.firstMin = Math.round(calcData.price * 0.2)
			}

			if(calcData.maxFirstPercent){
				calcData.firstMax = calcData.price * calcData.maxFirstPercent
			}else{
				calcData.firstMax = calcData.price / 2
			}

			calcData.first = parseInt(delSpaces($('#slider_first_val').val()))

			if(calcData.first < calcData.firstMin){
				calcData.first = calcData.firstMin
				$('#slider_first').val(calcData.first)
				$('#slider_first_val').val(calcData.first)
			}

			if(calcData.first > calcData.firstMax){
				calcData.first = calcData.firstMax
				$('#slider_first').val(calcData.first)
				$('#slider_first_val').val(calcData.first)
			}

			calcData.depositPeriodMin = 36

			if(calcData.topCalcType == 'almati'){
				calcData.depositPeriodMax = 96
			}else{
				calcData.depositPeriodMax = 180
			}


			calcData.depositPeriod = parseInt($('#slider_period_val').val())

			if(!$(initter).hasClass('month_count')){
				if(calcData.depositPeriod < calcData.depositPeriodMin){
					calcData.depositPeriod = calcData.depositPeriodMin
					$('#slider_period').val(calcData.depositPeriod)
					$('#slider_period_val').val(calcData.depositPeriod)
				}

				if(calcData.depositPeriod > calcData.depositPeriodMax){
					calcData.depositPeriod = calcData.depositPeriodMax
					$('#slider_period').val(calcData.depositPeriod)
					$('#slider_period_val').val(calcData.depositPeriod)
				}
			}

			calcData.creditSumMin = calcData.price
			calcData.creditSumMax = calcData.price
			calcData.creditSum = calcData.price

			calcData.depositPayMin = 1000
			calcData.depositPayMax = 1000000

			calcData.creditPeriod = parseInt($('#slider_credit_period_val').val())

			calcData.yearSum = 0;

			// Обработка
			calcData.capitalSum = calcData.first;
			calcData.premiedSum = 0;
			calcData.gosPremSum = 0;
			calcData.bnkPremSum = 0;
			calcData.iMonth = 0;
			var creditPercent = parseInt($('#pred_main_percent').html()) / 100;

			$('.credit_pred_table_graph').html('');

			var percentPredCredit = (calcData.price * creditPercent) / 360 * 30;

			if(calcData.topCalcType == 'pays' && calcData.creditType == 'pred'){
				calcData.monthPayFullMin = percentPredCredit
				$('.month_pay_full').attr('min', Math.round(calcData.monthPayFullMin))

				if(!$(initter).hasClass('month_pay_full')){
					if($('#slider_month_full_val').attr('min') > parseInt(delSpaces($('#slider_month_full_val').val()))){
						$('.month_pay_full').val($('#slider_month_full_val').attr('min'))
					}
				}

				calcData.depositPay = parseInt(delSpaces($('#slider_month_full_val').val())) - Math.round(percentPredCredit)
				$('.month_pay').val(calcData.depositPay)
			}else{
				if($(initter).hasClass('month_pay')){
					calcData.depositPay = parseInt(delSpaces($(initter).val()))
					calcData.depositPeriod = Math.round(((calcData.price / 2) - (calcData.price * 0.1)) / calcData.depositPay)

					if(calcData.depositPeriod > calcData.depositPeriodMax){
						calcData.depositPeriod = calcData.depositPeriodMax
					}else if(calcData.depositPeriod < calcData.depositPeriodMin){
						calcData.depositPeriod = calcData.depositPeriodMin
					}

					$('.month_count').val(calcData.depositPeriod)
				}

				if($(initter).hasClass('month_count')){
					calcData.depositPay = Math.round(((calcData.price / 2) - calcData.first) / calcData.depositPeriod)
					if(calcData.depositPay < 0){
						calcData.depositPay = 0
					}

					$('.month_pay').val(calcData.depositPay)
				}
			}

			/*if(calcData.depositPeriod < 36){
				calcData.depositPeriod = 36
			}*/

			// Процесс накопления (на тесте)
			calcData.iMonth = 0
			if(calcData.depositPay > 0){
				while((calcData.iMonth < calcData.depositPeriod && calcData.capitalSum < (calcData.price / 2)) || calcData.capitalSum < (calcData.price / 2)){
					//while((calcData.iMonth < calcData.depositPeriod || calcData.capitalSum < ((calcData.price / 2) - calcData.first))){
					var curGosPrem = 0;
					var curBnkPrem = 0;

					// Прибавляем пополнение депозита за месяц
					calcData.capitalSum += calcData.depositPay;

					// Вычисляем годовое вознаграждение банка
					calcData.curBnkPrem = calcData.capitalSum * (calcData.bankPercent / 12);
					calcData.yearSum += calcData.curBnkPrem;

					if(calcData.iMonth % 12 == 0){
						calcData.bnkPremSum += calcData.yearSum;
						calcData.capitalSum += calcData.yearSum;

						calcData.yearSum = 0;

						// Вычисляем возможную годовую премию государства и добавляем к сумме
						if(calcData.capitalSum > calcData.premiedSum){
							if(calcData.capitalSum - calcData.premiedSum > calcData.maxPrem){
								calcData.curGosPrem = calcData.maxPrem * calcData.gosPrem;
								calcData.premiedSum += calcData.maxPrem;
							}else{
								calcData.curGosPrem = (calcData.capitalSum - calcData.premiedSum) * calcData.gosPrem;
								calcData.premiedSum += (calcData.capitalSum - calcData.premiedSum);
							}

							calcData.capitalSum += calcData.curGosPrem;
							calcData.gosPremSum += calcData.curGosPrem;
						}
					}

					calcData.iMonth++;
				}

				if(calcData.iMonth < calcData.depositPeriodMin){
					calcData.iMonth = calcData.depositPeriodMin
				}

				if(calcData.depositPeriod != calcData.iMonth && !$(initter).hasClass('month_count')){
					calcData.depositPeriod = calcData.iMonth
					$('.month_count').val(calcData.depositPeriod)
				}
			}

			var pmtNoPercent = calcData.price / calcData.iMonth;
			var pmtPercent = percentPredCredit + pmtNoPercent
			$('#pred_credit_month').html(numSplit(percentPredCredit.toFixed(2)))

			if($('.zhil_type').val() != 'zhil_type_ref'){
				//calcData.depositPayMin = Math.round(percentPredCredit)

				if(!$(initter).hasClass('month_pay') && calcData.depositPay < calcData.depositPayMin){
					calcData.depositPay = calcData.depositPayMin
					$('.month_pay').val(calcData.depositPay)
				}
			}

			for(var i = 0; i < calcData.iMonth; i++){
				$('.credit_pred_table_graph').append('<tr><td data-th="' + $('#tb-txt-period').val() + '">' + (i+1) + ' (месяц накопления)</td><td data-th="' + $('#tb-txt-mpay').val() + '">' + numSplit(Math.floor(percentPredCredit)) + ' + ' + numSplit(Math.floor(calcData.depositPay)) + ' = ' + numSplit(Math.floor(percentPredCredit+calcData.depositPay)) + '</td><td data-th="' + $('#tb-txt-percent').val() + '">' + numSplit(percentPredCredit.toFixed(2)) + '</td><td data-th="' + $('#tb-txt-principaldebt').val() + '"><!-- ' + calcData.iMonth + ' --></td><td data-th="' + $('#tb-txt-debtbalance').val() + '"><!-- ' + pmtPercent + ' --></td></tr>');
			}

			var creditSum = calcData.price - (calcData.capitalSum);

			// Оценочный показатель
			calcData.performanceIndicator = (calcData.bnkPremSum + calcData.gosPremSum)/(calcData.price/1000);

			// Максимальный срок кредитования
			calcData.creditPeriodMax = maxCreditPeriod(calcData.performanceIndicator)

			calcData.creditPeriod = Math.round(creditSum/Math.floor(percentPredCredit+calcData.depositPay))
			calcData.creditPeriod = calcData.creditPeriod + Math.round(calcData.creditPeriod * 0.1)

			if(calcData.creditPeriod > calcData.creditPeriodMax){
				calcData.creditPeriod = calcData.creditPeriodMax
			}

			if(calcData.creditPeriod < calcData.creditPeriodMin){
				calcData.creditPeriod = calcData.creditPeriodMin
			}

			// Процент по кредиту
			calcData.creditPercent = mainCreditPercent(calcData.creditPeriod) / 100

			// Переход на обычный жилищный кредит
			if(calcData.creditPercent && calcData.creditPeriod && creditSum > 0){
				// Расчет ежемесячного платежа
				calcData.pmt = -PMT(calcData.creditPercent / 12, calcData.creditPeriod + 1, creditSum)

				// Расчет платежей
				calcTable(creditSum, calcData.creditPercent, calcData.creditPeriod, '.credit_pred_table_graph');

				// Переплата
				calcData.creditOverhead = calcData.pmt * calcData.creditPeriod - creditSum
			}


			$('.debet_pred_sum').html(numSplit(calcData.capitalSum.toFixed(2)));

			if(!$(initter).hasClass('credit_period')){
				$('.credit_period').val(calcData.creditPeriod)
			}

			calcData.creditPeriod = parseInt($('.credit_period').val());

			calcData.creditPercent = mainCreditPercent(calcData.creditPeriod)/100;


			calcData.pmt = -PMT(calcData.creditPercent / 12, calcData.creditPeriod, creditSum)

			$('.credit_pred_period').html(calcData.creditPeriod);
			$('.credit_pred_sum').html(numSplit(creditSum.toFixed(2)));
			$('#credit_pay').html(numSplit(calcData.pmt.toFixed(2)))


		}else if(calcData.creditType == 'prom'){
			// $('#popup_op_input').show()
			$('#open_popup_mess').show()
			$('#open_popup_mess').click(()=>{
				$('#popup_op_input').show()
			})



			// Тут нужный расчет

			// Получение всех параметров
			calcData.firstMin = calcData.price / 2
			calcData.firstMax = calcData.price

			if(calcData.first < calcData.firstMin){
				calcData.first = calcData.firstMin

				$('#slider_first').val(calcData.first.toFixed(0))
				$('#slider_first_val').val(calcData.first.toFixed(0))
			}else if(calcData.first > calcData.firstMax){
				calcData.first = calcData.firstMax
			}else{
				calcData.first = parseInt($('#slider_first').val())
			}

			calcData.creditSumMin = calcData.price
			calcData.creditSumMax = calcData.creditSumMin
			calcData.creditSum = calcData.creditSumMin

			calcData.creditPeriodMin = 36
			calcData.creditPeriodMax = 300
			calcData.creditPeriod = parseInt($('#slider_credit_period_val').val())
			let OP = 0

			$('#op').on('input', (event)=>{
				OP =  new Number(event.target.value);
				//1
				if(OP <= 0 && OP < 0.83){
					console.log('1')
					$('#standart_percent').html('10.5')
					percentOpStandart = 0.0105
					$('#zenil2_percent').html('11')
					percentOpZenil2 = 0.011
					$('#zenil_percent').html('11.5')
					percentOpZenil = 0.0115
					// calcAll()
				}else if(OP >= 0.83 && OP < 1.67){ //2
					console.log('2')
					$('#standart_percent').html('10')
					percentOpStandart = 0.010
					$('#zenil2_percent').html('10.5')
					percentOpZenil2 = 0.0105
					$('#zenil_percent').html('11')
					percentOpZenil = 0.011
					// calcAll()
				}else if(OP >= 1.67 && OP < 2.50){ //3
					console.log('3')
					$('#standart_percent').html('9.5')
					percentOpStandart = 0.095
					$('#zenil2_percent').html('10')
					percentOpZenil2 = 0.010
					$('#zenil_percent').html('10.5')
					percentOpZenil = 0.0105
					// calcAll()
				}else if(OP >= 2.50 && OP < 3.33){ //4
					console.log('4')
					$('#standart_percent').html('9')
					percentOpStandart = 0.09
					$('#zenil2_percent').html('9.5')
					percentOpZenil2 = 0.095
					$('#zenil_percent').html('10')
					percentOpZenil = 0.010
					// calcAll()
				}else if(OP >= 3.33 && OP < 4.17){ // 5
					console.log('5')
					$('#standart_percent').html('8.5')
					percentOpStandart = 0.085
					$('#zenil2_percent').html('9')
					percentOpZenil2 = 0.09
					$('#zenil_percent').html('9.5')
					percentOpZenil = 0.095
					// calcAll()
				}else if(OP >= 4.17 && OP < 5){ // 6
					console.log('6')
					$('#standart_percent').html('8')
					percentOpStandart = 0.08
					$('#zenil2_percent').html('8.5')
					percentOpZenil2 = 0.085
					$('#zenil_percent').html('9')
					percentOpZenil = 0.09
					// calcAll()
				}else if(OP >= 5){ // 7
					console.log('7')
					$('#standart_percent').html('7.5')
					percentOpStandart = 0.075
					$('#zenil2_percent').html('8')
					percentOpZenil2 = 0.08
					$('#zenil_percent').html('8.5')
					percentOpZenil = 0.085
					// calcAll()
				}





			})



			calcData.standartPercent = ($('#standart_percent').html()/100)
			calcData.zenilPercent = ($('#zenil_percent').html()/100)
			calcData.zenil2Percent = ($('#zenil2_percent').html()/100)

			calcData.standartPmt = -PMT(calcData.standartPercent/12, calcData.creditPeriod, calcData.creditSum)
			calcData.zenilPmt = calcData.creditSum*calcData.zenilPercent/12
			calcData.zenil2Pmt = -PMT(percentOpZenil2/12, calcData.creditPeriod, calcData.creditSum, -calcData.creditSum/2)



			$('.table_graph_standart').html('');
			$('.table_graph_zenil').html('');
			$('.table_graph_zenil2').html('');

			// Процесс накопления
			calcData.capitalSum = calcData.first
			calcData.depositPay = 0
			calcData.iMonth = 0
			calcData.yearSum = 0
			calcData.premiedSum = 0;
			calcData.gosPremSum = 0;
			calcData.bnkPremSum = 0;

			while(calcData.iMonth < 36){
				var curGosPrem = 0
				var curBnkPrem = 0

				// Прибавляем пополнение депозита за месяц
				calcData.capitalSum += calcData.depositPay

				// Вычисляем годовое вознаграждение банка
				curBnkPrem = calcData.capitalSum * (calcData.bankPercent / 12)
				calcData.yearSum += curBnkPrem

				if(calcData.iMonth % 12 == 0){
					calcData.bnkPremSum += calcData.yearSum
					calcData.capitalSum += calcData.yearSum

					calcData.yearSum = 0

					// Вычисляем возможную годовую премию государства и добавляем к сумме
					if(calcData.capitalSum > calcData.premiedSum){
						if(calcData.capitalSum - calcData.premiedSum > calcData.maxPrem){
							curGosPrem = calcData.maxPrem * calcData.gosPrem
							calcData.premiedSum += calcData.maxPrem
						}else{
							curGosPrem = (calcData.capitalSum - calcData.premiedSum) * calcData.gosPrem
							calcData.premiedSum += (calcData.capitalSum - calcData.premiedSum)
						}

						calcData.capitalSum += curGosPrem
						calcData.gosPremSum += curGosPrem
					}
				}

				calcData.iMonth++
			}

			// Оценочный показатель
			var performanceIndicator = (calcData.bnkPremSum + calcData.gosPremSum)/(calcData.price/1000);

			// Максимальный срок кредитования
			calcData.creditPeriodMax = 300

			// Процент по кредиту
			var creditPercent = mainCreditPercent(calcData.creditPeriod) / 100

			let standartFullSum = 0
			function calcStandart(){
				standartFullSum = calcData.standartPmt * 36
				calcTable(calcData.creditSum, calcData.standartPercent, calcData.creditPeriod+36, '.table_graph_standart', 0, true, 36);
				if(calcData.ostDolg - calcData.capitalSum > 0){
					var postStandartPmt = -PMT(creditPercent/12, calcData.creditPeriod, calcData.ostDolg - calcData.capitalSum)
					calcTable(calcData.ostDolg - calcData.capitalSum, creditPercent, calcData.creditPeriod, '.table_graph_standart', 0, false, 0, calcData.isAnnuity)
					standartFullSum += (postStandartPmt * (calcData.creditPeriod))
				}
				standartFullSum += calcData.capitalSum
			}
			calcStandart()
			let creditPercentZenil = 0.04
			let zenil2FullSum = 0
			function calczenil2(){
				zenil2FullSum = calcData.zenil2Pmt * 36
				calcTable(calcData.creditSum, calcData.zenil2Percent, calcData.creditPeriod+36, '.table_graph_zenil2', -calcData.creditSum/2, true, 36)
				if(calcData.ostDolg - calcData.capitalSum > 0){
					var postZenil2Pmt = -PMT(creditPercent/12, calcData.creditPeriod, calcData.ostDolg - calcData.capitalSum)
					calcTable(calcData.ostDolg - calcData.capitalSum, creditPercent, calcData.creditPeriod, '.table_graph_zenil2', 0, false, 0, calcData.isAnnuity)
					zenil2FullSum += (postZenil2Pmt * (calcData.creditPeriod))

				}
				zenil2FullSum += calcData.capitalSum
			}
			calczenil2()

			let zenilFullSum = 0
			function calccalczenil(){
				zenilFullSum = calcData.zenilPmt * 36
				calcTable(calcData.creditSum, calcData.zenilPercent, calcData.creditPeriod+36, '.table_graph_zenil', -calcData.creditSum, true, 36)
				var postZenilPmt = -PMT(creditPercent/12, calcData.creditPeriod, calcData.ostDolg - calcData.capitalSum)
				calcTable(calcData.ostDolg - calcData.capitalSum, creditPercent, calcData.creditPeriod, '.table_graph_zenil', 0, false, 0, calcData.isAnnuity)
				zenilFullSum += (postZenilPmt * (calcData.creditPeriod))
				zenilFullSum += calcData.capitalSum
			}
			calccalczenil()

			function OutData(standartFullSum, zenil2FullSum, zenilFullSum, calcData){

				function stepsCredit(creditPmt){
					let credit = calcData.creditSum - (calcData.gosPremSum + calcData.bnkPremSum + calcData.capitalSum)
					return credit / creditPmt
				}

				//Вывод инфы
				// Расчет переплаты
				$('#overhead_standart').html(numSplit(
					// (standartFullSum - calcData.creditSum).toFixed(2)
					// ( (calcData.zenilPmt * stepsCredit(calcData.standartPmt)) - (calcData.capitalSum + calcData.bnkPremSum + calcData.gosPremSum + calcData.priceMin)).toFixed(2)
					(calcData.standartPmt * (84 + calcData.creditPeriodMin) - (calcData.capitalSum + calcData.bnkPremSum + calcData.gosPremSum + calcData.yearSum) ).toFixed(2)
					)
				)
				// (zenil2FullSum - calcData.creditSum).toFixed(2)
				$('#overhead_zenil2').html(numSplit(
					// (zenil2FullSum - calcData.creditSum).toFixed(2)
					// ( (calcData.zenilPmt * stepsCredit(calcData.zenil2Pmt)) - (calcData.capitalSum + calcData.bnkPremSum + calcData.gosPremSum + calcData.priceMin)).toFixed(2)
					(calcData.zenil2Pmt * (84 + calcData.creditPeriodMin) - (calcData.capitalSum + calcData.bnkPremSum + calcData.gosPremSum + calcData.yearSum) ).toFixed(2)
					)
				)

				$('#overhead_zenil').html(
					numSplit(
						// (zenilFullSum - calcData.creditSum).toFixed(2)
						// ( (calcData.zenilPmt * stepsCredit(calcData.zenilPmt)) - (calcData.capitalSum + calcData.bnkPremSum + calcData.gosPremSum + calcData.priceMin)).toFixed(2)
						(calcData.zenilPmt * (84 + calcData.creditPeriodMin) - (calcData.capitalSum + calcData.bnkPremSum + calcData.gosPremSum + calcData.yearSum) ).toFixed(2)
					)
				)
				//Еж платеж
				$('#month_standart').html(numSplit(calcData.standartPmt.toFixed(2)))
				$('#month_zenil').html(numSplit(calcData.zenilPmt.toFixed(2)))
				$('#month_zenil2').html(numSplit(calcData.zenil2Pmt.toFixed(2)))
			}
			OutData(standartFullSum, zenil2FullSum, zenilFullSum, calcData)


			$('#startCalc').off('click').on('click' , ()=>{
				$('#popup_op_input').hide()
				calcAll()

			})
		}


	}

	/*if(initter && !$(initter).hasClass('credit_period')){
		if(typeof(calcData.creditPeriodMax) != 'undefined'){
			$('.credit_period').val(calcData.creditPeriodMax)
		}else{
			$('.credit_period').val(0)
		}
	}*/

	if(parseInt($('#slider_first').val()) < calcData.firstMin){
		calcData.first = calcData.firstMin
		$('#slider_first').val(calcData.first)
		$('#slider_first_val').val(calcData.first)
	}

	if(calcData.maxPrice < calcData.price){
		calcData.price = calcData.maxPrice
		$('#slider_price').val(calcData.maxPrice.toFixed(0))
		$('#slider_price_val').val(calcData.maxPrice.toFixed(0))
	}

	$('#slider_price').attr('max', calcData.maxPrice.toFixed(0))
	$('#slider_price_val').attr('max', calcData.maxPrice.toFixed(0))

	// Отрисовка параметров
	$('#slider_month').attr('min', calcData.depositPayMin)
	$('#slider_month_val').attr('min', calcData.depositPayMin)

	$('#slider_month').attr('max', calcData.depositPayMax)
	$('#slider_month_val').attr('max', calcData.depositPayMax)

	//===

	$('#slider_first').attr('min', calcData.firstMin.toFixed(0))
	$('#slider_first_val').attr('min', calcData.firstMin.toFixed(0))

	$('#slider_first').attr('max', calcData.firstMax.toFixed(0))
	$('#slider_first_val').attr('max', calcData.firstMax.toFixed(0))

	//===

	$('#slider_period').attr('min', calcData.depositPeriodMin)
	$('#slider_period_val').attr('min', calcData.depositPeriodMin)

	$('#slider_period').attr('max', calcData.depositPeriodMax)
	$('#slider_period_val').attr('max', calcData.depositPeriodMax)

	//===

	$('#slider_credit_sum').attr('min', calcData.creditSumMin)
	$('#slider_credit_sum_val').attr('min', calcData.creditSumMin)

	$('#slider_credit_sum').attr('max', calcData.creditSumMax)
	$('#slider_credit_sum_val').attr('max', calcData.creditSumMax)

	$('#slider_credit_sum').val(calcData.creditSum.toFixed(0))
	$('#slider_credit_sum_val').val(calcData.creditSum.toFixed(0))

	$('.credit_sum').html(numSplit(calcData.creditSum.toFixed(2)))

	//===

	$('#slider_credit_period').attr('min', calcData.creditPeriodMin)
	$('#slider_credit_period_val').attr('min', calcData.creditPeriodMin)

	$('#slider_credit_period').attr('max', calcData.creditPeriodMax)
	$('#slider_credit_period_val').attr('max', calcData.creditPeriodMax)

	//$('.credit_period').html(calcData.creditPeriod)
	$('#credit_period2').html(calcData.creditPeriod)


	//===

	$('#main_percent').html((calcData.creditPercent*100).toFixed(1))


	$('.sum').html(numSplit(calcData.capitalSum.toFixed(2)))

	$('#credit_month').html(numSplit(calcData.pmt.toFixed(2)))

	$('#credit_overhead').html(numSplit(calcData.creditOverhead.toFixed(2)))

	$('#pred_credit_period2').html(calcData.depositPeriod)

	$('#credit_pay').html(numSplit(calcData.pmt.toFixed(2)))
	$('#pred_credit_overhead').html(numSplit(calcData.creditOverhead.toFixed(2)))

	//===

	$('#slider_price_val').val(numSplit(delSpaces($('#slider_price_val').val()), ' '))
	$('#slider_first_val').val(numSplit(delSpaces($('#slider_first_val').val()), ' '))
	$('#slider_month_val').val(numSplit(delSpaces($('#slider_month_val').val()), ' '))
	$('#slider_month_full_val').val(numSplit(delSpaces($('#slider_month_full_val').val()), ' '))
	$('#slider_credit_sum_val').val(numSplit(delSpaces($('#slider_credit_sum_val').val()), ' '))
	if( !(navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ||
		window.navigator.userAgent.indexOf("Edge") > -1) ){
		$('.slider').each(function(){

			var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

			$(this).css('background-image',
				'-webkit-gradient(linear, left top, right top, '
				+ 'color-stop(' + val + ', #008b8a), '
				+ 'color-stop(' + val + ', rgba(0,0,0,0))'
				+ ')'
			);

		});
	}


	 console.log(calcData)
		//console.log(document.activeElement);
}

$.fn.dropdownSelected = function(val){
	$(this).find('button').text($(this).find('.dropdown-menu a[data-val="' + val + '"]').text());
}

$(document).ready(function(){
	console.info('Credit calculator v2.0');

	$(".slider").on('input', function(){
		$('#' + $(this).attr('data-val')).val($(this).val());
		calcAll(this);
	});

	$(".slider_val").on('input', function(){
		$('#' + $(this).attr('data-slider')).val($(this).val());
		calcAll(this);
	});

	calcAll();

	$('.home_type_dropdown a').on('click', function(e){
		e.preventDefault();

		$('.home_type').val($(this).data('val'));
		$('.home_type').trigger('change');

		$('.home_type_dropdown .dropdown-toggle').html($(this).text());
	});

	$('.select_region_vitrual a').on('click', function(e){
		e.preventDefault();

		$('.select_region').val($(this).data('val'));
		$('.select_region').trigger('change');

		$('.select_region_vitrual .dropdown-toggle').html($(this).text());
	});

	$('.select_main-tabs_vitrual .dropdown-menu a').on('click', function( e ){
		e.preventDefault();

		$('#' + $(this).data('val')).click();
	});

	$('.select-view-custom-tabs .dropdown-menu a').on('click', function( e ){
		e.preventDefault();

		$(this).closest('.select-view-custom-tabs').find('.dropdown-toggle').html($(this).text());

		$('.custom-table').find('.view-row').removeClass('open');
		$($(this).data('val')).addClass('open');
	})

	//За
	//месяцев вы накопите
	//из них
	//Премия государства
	//Вознаграждение банка
	//Ваши накопления

	//tooltip-txt-for
	//tooltip-txt-months_accumulate
	//tooltip-txt-from_them
	//tooltip-txt-state_prize
	//tooltip-txt-reward_bank
	//tooltip-txt-your_savings

	$('#capital_card').tooltip({
		html: true,
		title: function(elem){
			// Генерация тултипа
			return '<div style="text-align: left;"><p>' +
				$('#tooltip-txt-for').val() + ' <span id="month_count">' + calcData.depositPeriod +
				'</span> ' + $('#tooltip-txt-months_accumulate').val() + '<br>' +
				'<b class="large_text"><span id="personal_capital">' + numSplit(calcData.capitalSum.toFixed(2)) + '</span>&nbsp;₸</b>' +
				'<br>' + $('#tooltip-txt-from_them').val() + ':' +
				'</p>' +
				'<p>' +
				$('#tooltip-txt-state_prize').val() + '<br>' +
				'<b class="large_text"><span id="gov_reward">' + numSplit(calcData.gosPremSum.toFixed(2)) + '</span>&nbsp;₸</b>' +
				'</p>' +
				'<p>' +
				$('#tooltip-txt-reward_bank').val() + '<br>' +
				'<b class="large_text"><span id="bank_bonus">' + numSplit(calcData.bnkPremSum.toFixed(2)) + '</span>&nbsp;₸</b>' +
				'</p>' +
				'<p>' +
				$('#tooltip-txt-your_savings').val() + '<br>' +
				'<b class="large_text"><span id="full_capital">' + numSplit((calcData.capitalSum - (calcData.bnkPremSum + calcData.gosPremSum)).toFixed(2)) + '</span>&nbsp;₸</b>' +
				'</p></div>';
		}
	});

	$('[data-toggle="tooltip"]').tooltip();

	$('.credit_more').hide();

	$('.credit_more_open').click(function(){
		$('.credit_more').hide();
		$('#' + $(this).attr('data-block-id')).toggle();
	});

	$('.show_more').click(function(){
		$(this).hide();
		$('.more_buttons').fadeIn();
	});
	$('.show_more_standart').click(function(){
		$(this).hide();
		$('.more_buttons_standart').fadeIn();
	});
	$('.show_more_zenil').click(function(){
		$(this).hide();
		$('.more_buttons_zenil').fadeIn();
	});
	$('.show_more_zenil2').click(function(){
		$(this).hide();
		$('.more_buttons_zenil2').fadeIn();
	});
	$('.show_more_credit_pred').on('click', function(){
		$(this).hide();
		$('.credit_pred_more_buttons').show();
	});

	// Переключение на накопительный вариант
	$('#main-tab').click(function(){

		console.log('save and buy');
		$('#link_buy_fast').hide();
		$('#link_buy_save').show();


		$('.description').hide();

		$('#slider_first_val').hide();
		$('#slider_first').hide();
		$('#slider_first_label').hide();
		$('#slider_first_label').parent().hide();

		$('#slider_month_val').show();
		$('#slider_month').show();
		$('#slider_period').show();
		$('#deposit_text').show();

		$('#slider_period_val').show();
		$('#slider_period').show();
		$('#deposit_period_text').show();

		$('.month_pay_full_container').hide();

		calcData.globalCalcType = 'main';

		calcAll();
	});

	// Переключение на быстрый вариант
	$('#all-tab').click(function(){


		console.log('buy fast');
		$('#popup_op_input').show()
		$('#link_buy_fast').show();
		$('#link_buy_save').hide();


		$('.description').hide();

		$('#slider_first_val').show();
		$('#slider_first').show();
		$('#slider_first_label').show();
		$('#slider_first_label').parent().show();

		$('#credit_prom_tab').click()

		calcData.globalCalcType = 'all';

		calcAll();
	});

	$('.btn-save-buy').on('click', function(){
		$('#main-tab').trigger('click');

		$('.pseudo-tab,.all-select').removeClass('active');
		$(this).addClass('active');
	});

	$('.select-bringin-loan').on('click', function( e ){
		e.preventDefault();

		if(!$('#all').hasClass('active')){
			$('#all-tab').trigger('click');
		}
		$('#credit_prom_tab').trigger('click');

		$('.pseudo-tab,.all-select').removeClass('active');
		$(this).addClass('active');
		$('.all-select').addClass('active');
	});

	$('.select-preliminary-loan').on('click', function( e ){
		e.preventDefault();

		if(!$('#all').hasClass('active')){
			$('#all-tab').trigger('click');
		}
		$('#credit_pred_tab').trigger('click');

		$('.pseudo-tab,.all-select').removeClass('active');
		$(this).addClass('active');
		$('.all-select').addClass('active');
	});
	// Переключение на предварительный заем
	$('#credit_pred_tab').click(function(){
		calcData.creditType = 'pred';

		$('.description').hide();
		//$('.first_description_pred').show();
		$('.deposit_description_pred').show();

		$('#slider_month_val').show();
		$('#slider_month').show();
		$('#slider_period').show();
		$('#deposit_text').show();

		$('#slider_period_val').show();
		$('#slider_period').show();
		$('#deposit_period_text').show();

		if(calcData.topCalcType == 'pays'){
			$('.month_pay_full_container').show();
			$('#slider_month').hide();
			$('#slider_period').hide();
		}

		calcAll();
	});

	// Переключение на промежуточный заем
	$('#credit_prom_tab').click(function(){
		calcData.creditType = 'prom';

		$('.description').hide();
		//$('.first_description_prom').show();
		$('.deposit_description_prom').show();

		$('#slider_month_val').hide();
		$('#slider_month').hide();
		$('#deposit_text').hide();

		$('#slider_period_val').hide();
		$('#slider_period').hide();
		$('#deposit_period_text').hide();

		$('.month_pay_full_container').hide();

		calcAll();
	});

	//стартовая вкладка Рынок
	(function(){
		$('.main-row-1').addClass('hidden-mobile');
		$('.capital_card_down').addClass('hidden-mobile');
	})();

	// Смена верхнего типа займа
	$('.top_calc_type').click(function(){
		calcDataRestart()

		calcData.topCalcType = $(this).attr('aria-controls');

		if(calcData.topCalcType == 'market'){
			$('#credit_pred_tab').hide();
			$('.select-preliminary-loan').hide();
			//$('#credit_prom_tab').click()
		}else{
			$('#credit_pred_tab').show();
			$('.select-preliminary-loan').show();
		}

		$('.credit_description_almati').hide();
		$('.buy_norm').show();
		$('.btn-save-buy').show();

		//смена выбранного пункта в мобильном меню
		$('.select_main-tabs_vitrual').dropdownSelected($(this).attr('id'));

		calcData.maxPrice = 100000000
		calcData.depositPayMin = 0

		$('#pred_main_percent').html('7')

		//$('.zhil_type').hide();
		$('.zhil_type').closest('.row').hide();
		$('.month_pay_full_container').hide();
		$('.credit_select').hide();

		$('.estate_calc').attr('data-current_open', calcData.topCalcType);

		switch(calcData.topCalcType){
			case 'market':
				$('#main_percent').html('5');
				$('.standart_percent').html('7.50');
				$('.zenil_percent').html('8.50');
				$('.zenil2_percent').html('8.00');

				$('#tr_standart').show();
				$('#tr_zenil').show();
				$('#tr_zenil2').show();
				$('.select-view-custom-tabs .dropdown-menu li').show();

				$('.credit_select').show();
				//fix $('#slider_month').show();
				//fix $('#slider_period').show();

				$('.home_type_dropdown').show();

				$('.btn-save-buy').click();

				$('.main-row-1').addClass('hidden-mobile');
				$('.capital_card_down').addClass('hidden-mobile');

				break;
			case 'nur':
				$('#main_percent').html('5');
				$('.standart_percent').html('5');
				$('.zenil_percent').html('5');
				$('.zenil2_percent').html('5');
				$('#pred_main_percent').html('5')

				$('#tr_standart').show();
				$('#tr_zenil').show();
				$('#tr_zenil2').show();
				$('.select-view-custom-tabs .dropdown-menu li').show();

				$('.home_type_dropdown').hide();

				$('.main-row-1').addClass('hidden-mobile');
				$('.capital_card_down').addClass('hidden-mobile');

				calcData.maxPrice = 15000000
				break;
			case 'house':
				$('#main_percent').html('5');
				$('.standart_percent').html('7');
				$('.zenil_percent').html('7');
				$('.zenil2_percent').html('7');

				$('#tr_standart').show();
				$('#tr_zenil').show();
				$('#tr_zenil2').show();
				$('.select-view-custom-tabs .dropdown-menu li').show();

				$('.home_type_dropdown').hide();

				$('.main-row-1').addClass('hidden-mobile');
				$('.capital_card_down').addClass('hidden-mobile');
				break;
			case 'pays':
				$('#main_percent').html('7');
				$('.standart_percent').html('6');
				$('.zenil_percent').html('6');
				$('.zenil2_percent').html('6');

				$('#tr_standart').show();
				$('#tr_zenil').show();
				$('#tr_zenil2').show();
				$('.select-view-custom-tabs .dropdown-menu li').show();

				//$('.zhil_type').show();
				$('.zhil_type').closest('.row').show();

				$('.home_type_dropdown').hide();

				if(calcData.creditType == 'pred'){
					$('.month_pay_full_container').show();
					$('#slider_month').hide();
				}

				$('#pred_main_percent').html('7');

				$('.main-row-1').addClass('hidden-mobile');
				$('.capital_card_down').addClass('hidden-mobile');

				calcData.minFirstPercent = 0.05
				calcData.maxFirstPercent = 0.19
				break;
			case 'almati':
				$('#main_percent').html('5');
				$('.zenil_percent').html('5');
				$('#pred_main_percent').html('5')

				$('#tr_standart').hide();
				$('.select-view-custom-tabs .dropdown-menu a[data-val="#tr_standart"]').parent().hide();
				$('#tr_zenil').show();
				$('.select-view-custom-tabs .dropdown-menu a[data-val="#tr_zenil"]').parent().show();
				$('#tr_zenil2').hide();
				$('.select-view-custom-tabs .dropdown-menu a[data-val="#tr_zenil2"]').parent().hide();

				$('.credit_description_almati').show();

				$('.buy_immed').click();
				$('.buy_norm').hide();
				$('.btn-save-buy').hide();

				$('.home_type_dropdown').hide();

				$('.select-bringin-loan').click();

				$('.select-view-custom-tabs .dropdown-menu a[data-val="#tr_zenil"]').click();

				//$('.main-row-1').addClass('hidden-mobile');
				$('.capital_card_down').addClass('hidden-mobile');

				calcData.maxPrice = 10000000
				calcData.minFirstPercent = 0.0001
				calcData.maxFirstPercent = 0.50
				break;
		}

		/*if(calcData.topCalcType == 'pays'){
			$('#deposit_text').html('Размер жилищной выплаты');
		}else{
			$('#deposit_text').html('Буду пополнять депозит');
		}*/

		$('.slider').val('0');
		$('.slider_val').val('0');

		$('#credit_period2').html('0');
		$('#credit_month').html('0');
		$('#credit_overhead').html('0');

		calcAll();
	});

	// Смена типа жилья
	$('.home_type').on('change', function(){
		var type = $(this).val()

		if(type == 'first'){
			$('.standart_percent').html('7');
			$('.zenil_percent').html('7');
			$('.zenil2_percent').html('7')
		}else{
			$('.standart_percent').html('7.5');
			$('.zenil_percent').html('8.5');
			$('.zenil2_percent').html('8')

		}

		calcAll();
	})

	// Смена типа жилищного займа
	$('.zhil_type').on('change', function(){
		var type = $(this).val()

		switch(type){
			case 'zhil_type_perv_one':
				$('#pred_main_percent').html('7');

				calcData.minFirstPercent = 0.05
				calcData.maxFirstPercent = 0.19
				break;
			case 'zhil_type_perv_two':
				$('#pred_main_percent').html('6');

				calcData.minFirstPercent = 0.20
				calcData.maxFirstPercent = 0.50
				break;
			case 'zhil_type_vtor':
				$('#pred_main_percent').html('8');

				calcData.minFirstPercent = 0.20
				calcData.maxFirstPercent = 0.50
				break;
			case 'zhil_type_ref':
				$('#pred_main_percent').html('7');

				calcData.minFirstPercent = 0
				calcData.maxFirstPercent = 0.50
				break;
		}

		calcAll();
	})

	// Смена региона
	$('.select_region').on('change', function(){
		switch($(this).val()){
			case '0':
				calcData.maxPrice = 15000000;
				break;
			case '1':
				calcData.maxPrice = 20000000;
				break;
			case '2':
				calcData.maxPrice = 20000000;
				break;
		}

		calcAll();
	});

	$('.your_home_link').click(function(){
		$('.your_home_block').hide();
		$('#' + $(this).attr('data-block')).fadeIn();
	});

	$('[data-toggle="tooltip"]').tooltip()

	$('#slider_first_val').hide();
	$('#slider_first').hide();
	$('#slider_first_label').hide();
	$('#slider_first_label').parent().hide();

	$('.isAnnuity').on('change', function(){
		calcAll();
	})

	$('#credit_pred_tab').hide();
	$('.select-preliminary-loan').hide();

	$('.description').hide();
	$('.credit_description_almati').hide();

	//$('.zhil_type').hide();
	$('.zhil_type').closest('.row').hide();
	$('.month_pay_full_container').hide();

	$('.slider_val_credit_period').click(function(){
		$('.slider_val_credit_period').focus();
	});

	if(location.hash === '#calc'){
		$('a[href="#calc"]').trigger('click');
	}
});
