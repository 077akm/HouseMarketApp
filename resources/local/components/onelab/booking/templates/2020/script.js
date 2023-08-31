var bookingReady = function (opt) {console.log('bookingReady');
    var datepiker_control;

    var startdate = new Date();
    startdate.setDate(startdate.getDate());
    var enddate = new Date();
    enddate.setDate(enddate.getDate() + 30);
    var cur = {};
       

    function checkHolyDay(date,holyDays){
    
     /* var holyDays = {
        '1': [1, 2],
        '3':[8, 21, 22, 23, 24, 25],
        '5':[1, 7, 9, 10],
        '7':[6, 8],
        '8':[30],
        '12':[2, 16, 17]
      };*/

    //   console.log('checkHolyDay');
    //   console.log(holyDays);
    
      if (holyDays[''+(date.getMonth() + 1)] && $.inArray(date.getDate(), holyDays[''+(date.getMonth() + 1)]) > -1) {
        return false;
      }
      return true;
    }
    
    function my_get_days(id_dep,id_parent){

        var my_return='';
        var holyDaysArr=[];
        var holyDays=[];
        console.log(id_dep);
        
        $('.booking_loading').addClass('vis');
        
        $.ajax({
            url: opt.url,
            //async: false,
            dataType: 'json',
            data: {'AJAX_PARAM': 'Y','ACTION':'get_days','id_dep':id_dep, 'id_parent':id_parent},
        }).done(function(data) {
            if (data){
                $('.booking_loading').removeClass('vis');

                my_return=data;

                console.log(my_return);

				if (data=="none"){

					$('#ops_danger').html('К сожалению по данной операции заполнен лимит. Просим выбрать другое отделение Банка или попробовать позже.');
					$('#ops_danger').show();
				}else $('#ops_danger').hide();

                holyDaysArr = my_return;
                holyDays=holyDaysArr.days;

                if(datepiker_control!=undefined){
                    console.log('removeDate');
                    //datepiker_control.clear;
                    //$('.datepiker-control').val('');
                }

                datepiker_control = $('.datepiker-control').datepicker({
                    minDate: startdate,
                    maxDate: enddate,
                    autoClose: true,
                    onSelect: function(s, date){
                        var times_arr=holyDaysArr.times[date.getMonth()+1][date.getDate()];
                        
                        opsbook = $('#BookingTime');
                        opsbook.text('');
                        $.each(times_arr, function(index, val) {
                            opsbook.append('<option value="'+val+'">'+val+'</option>');
                        });
                    },
                    onRenderCell: function(date, cellType) {
                      if(cellType == 'day' && (date.getDate()==20 || date.getDate()==19) && date.getMonth()==11 && date.getFullYear()==2020) {
                            return;
                      }
                      if (cellType == 'day' && date.getDay() == 0 || checkHolyDay(date,holyDays)) {
                        return {
                          disabled: true
                        }
                      }
                    }
                });

                $('#BookingDate').val('');
                clear_select($('#BookingTime'));

            }
        })
        .always(function () {
            $('.loader').hide();
        });  
        return my_return;
    }

    /*var holyDaysArr = my_get_days();
    holyDays=holyDaysArr.days;*/
    
    //console.log(holyDays);

    
    function refresh_captch(){
        $.get('/anketa/refresh_captcha.php', function(data) {
            $('#captcha_img').attr('src','/bitrix/tools/captcha.php?captcha_sid='+data);
            $('#captcha_sid').val(data);
        });
        $('#captcha_word').val('');
    }
    
    function clear_select(objkts) {
        console.log('отчиситил')
        objkts.text('')
        str = objkts.attr('str')
        objkts.append('<option>'+str+'</option>');
        $('[value="BD"]').remove();
    }

    //$(document).ready(function(){
        /*$(function () {
            datepiker_control = $('.datepiker-control').datepicker({
                minDate: startdate,
                maxDate: enddate,
                autoClose: true,
                onSelect: function(s, date){
                    var times_arr=holyDaysArr.times[date.getMonth()+1][date.getDate()];
                    
                    ops = $('#BookingTime');
                    ops.text('');
                    $.each(times_arr, function(index, val) {
                        ops.append('<option value="'+val+':00">'+val+':00</option>');
                    });
                },
                onRenderCell: function(date, cellType) {
                  if (cellType == 'day' && date.getDay() == 0 || checkHolyDay(date)) {
                    return {
                      disabled: true
                    }
                  }
                }
            });
        });*/

        refresh_captch();

        $('#s_phone').mask("+7(700) 000-00-00");
        $('#s_iin').mask('000000000000');
        $('[value="BD"]').remove();
    //});


    function ops_danger(goal_id) {

        var ops_danger_messages = {
            '6004': 'Внимание! Операции "Продажа / закрытие депозита, Прочие операции - депозит" проводятся в будние дни.',
            '6009': 'Внимание! Операции "Продажа / закрытие депозита, Прочие операции - депозит" проводятся в будние дни.',
            '6008': 'Внимание! Посткредитные операции проводятся только до 16.00 в будние дни.',
        };

        $('#ops_danger').html(ops_danger_messages[goal_id]);
        $('#ops_danger').show()
    }



    if(window.checkLoadBooking == null){
        window.checkLoadBooking = true;

        $(document).on('change','select[name=id_branch]',function(event){
            id_branch = $(this).val()
            cur.branch = id_branch;
            $('.booking_loading').addClass('vis');
            $.ajax({
                url: opt.url,
                dataType: 'json',
                data: {'AJAX_PARAM': 'Y','ACTION':'get_dep','id_branch':id_branch},
            }).done(function(data) {
                // console.log(data);
                objkts = $('select[name=id_dep]')
                clear_select(objkts)
                $.each(data, function(index, val) {
                    var address = ''
                    if (val.address){
                        address = val.address
                    }
                    objkts.append('<option value='+val.id+'>'/*+val.name+' ('*/+address+'</option>')
                });
                clear_select($('select[name=id_goal]'));
                $('.booking_loading').removeClass('vis');
            })
           .always(function () {
                $('.loader').hide();
            });
            event.preventDefault()
        })
        
       
        $(document).on('change','select[name=id_dep]',function(event){
            id_dep = $(this).val()
            goal = $('select[name=id_goal]')
            clear_select(goal)
            $('.booking_loading').addClass('vis');
            $.ajax({
                url: opt.url,
                dataType: 'json',
                data: {'AJAX_PARAM': 'Y','ACTION':'get_goal','id_dep':id_dep},
            }).done(function(data) {
                 console.log(data);
                if (data){
                    $.each(data, function(index, val) {
                        goal.append('<option data-avail="'+val.IsSaturdayWork+'" value='+val.ID+'>'+val.Name+'</option>')
                    });
                }        
                $('.booking_loading').removeClass('vis');
            })
            .always(function () {
                $('.loader').hide();
            });

            event.preventDefault()
        })
        
        
        
        $(document).on('change','select[name=id_goal]',function(event){
            id_dep = $('select[name=id_dep]').val()
            id_parent = $(this).val()
            var SaturdayWork=$('option:selected',this).data('avail');
            $('#ops_danger').hide()

            var date = new Date();
                 //console.log(date.getDay());
            if (SaturdayWork != true && date.getDay() == 6 && id_parent == '6009'){
                $('#select_ops').hide()
                ops_danger('6009');
            }
            else{

                if (id_parent == '6009' || id_parent == '6538190'){
                    $('#select_ops').hide()
    				var holyDaysArr = my_get_days(id_dep,id_parent);
                }
                else{
                    $('#select_ops').show()

    				ops = $('select[name=id_ops]')
    				clear_select(ops)
    				$('.booking_loading').addClass('vis');
    				$.ajax({
    					url: opt.url,
    					dataType: 'json',
    					data: {'AJAX_PARAM': 'Y','ACTION':'get_ops','id_dep':id_dep, 'id_parent':id_parent},
    				}).done(function(data) {
    					 console.log(data);
    					if (data){
    						if (data!='none'){
    							$.each(data, function(index, val) {
                                    ops.append('<option value='+val.ID+'>'+val.Name+'</option>');
    								//if(val.IsSaturdayWork!=true && date.getDay() == 6) ops_danger(id_parent);
                                   // else ops.append('<option value='+val.ID+'>'+val.Name+'</option>');
    							});
    						}else ops.html('<option value=""> -- </option>');
    					}
    			
    					$('.booking_loading').removeClass('vis');
    				})
    				.always(function () {
    					$('.loader').hide();
    				});

                }

            }

            event.preventDefault()

        })
        

        $(document).on('change','select[name=id_ops]',function(event){
            id_dep = $('select[name=id_dep]').val()
            id_parent = $(this).val();        

            var holyDaysArr = my_get_days(id_dep,id_parent);

            event.preventDefault()

        })


        
        
        
        $(document).on('click', '#enter_booking', function(event) {
            var DepId = $("select[name=id_dep] option:selected").val();
            var Dep_text = $("select[name=id_dep] option:selected").text();
            //console.log(DepId);
            var QueueID = $("select[name=id_ops] option:selected").val();
            //console.log(QueueID);
            var IIN = $("input[name=s_iin]").val();
            //console.log(IIN);
            var Phone = $("input[name=s_phone]").val();
            console.log(Phone);
            var New_date = $("input[name=BookingDate]").val();
            // console.log(New_date);
            var New_time = $("select[name=BookingTime] option:selected").val();
            // console.log(New_time);
        
        
            //сначала проверяем капчу
            var sid = $('#captcha_sid').val();
            var word = $('#captcha_word_booking').val();
        
            $("#error").html('');
    
            if(word.length>0){
                
                $.post("/anketa/check_captcha.php", {action: 'check_captcha', captcha_sid: sid, captcha_word: word}, function(data){
                    
                    if(data.length>0){
            
                        if(data=='OK'){//если капча верна отправляем форму                
            
                            $('.booking_loading').addClass('vis');
                            d = {'AJAX_PARAM': 'Y','ACTION':'create_ticket', branch: cur.branch, id_parent: $('select[name=id_goal]').val(), 'DepId':DepId, 'QueueID':QueueID, 'IIN':IIN, 'Phone':Phone, 'New_date':New_date, 'New_time':New_time}
                            // console.log(d)
                            $.ajax({
                                url: opt.url,
                                dataType: 'json',
                                data: d,
                            }).done(function(data) {
                                 console.log(data);
                                if (data){
                                    $.each(data, function(index, val) {
                                        $("#error").html('');
                                        console.log(val);
                                        if(val.ERROR == 1){
                                            $("#error").html(val.INFO);
            
                                                $.get('/anketa/refresh_captcha.php', function(data) {
            
                                                    $('#captcha_img').attr('src','/bitrix/tools/captcha.php?captcha_sid='+data);
                                                    $('#captcha_sid').val(data);
            
                                                });
            
                                            $('.booking_loading').removeClass('vis');
                                        }else{
                                            if(val.ERROR == 0){
                                                $("#date_info").html(New_date);
                                                $("#time_info").html(New_time);
                                                $("#dep_info").html(Dep_text);
                                                $("#code_info").html(val.INFO);
                                                $(".code").html(val.INFO);
                                                $('.booking_good').addClass('vis');
                                                $('.booking_form').removeClass('vis');
                                            }else{
                                                $("#error").html('Ошибка отправки данных! Обратитесь к администратору сайта.');
                                            }
                                            $('.booking_loading').removeClass('vis');
                                        }
                                    });
                                }
                            })
                            .always(function () {
                                $('.loader').hide();
                            });
            
                        }else /*if(data=='ERROR')*/{//если капча неверна выводим ошибку
                            $("#error").html('Неверный код с картинки');
                            refresh_captch();
                        }
             
                    }
                           
                });

            }else $("#error").html('Введите код с картинки');
        
            event.preventDefault();
        });
    }
}

var bookingUrl = '/booking.php';
if(BX.message('LANGUAGE_ID') != 'kz'){
    bookingUrl = '/' + BX.message('LANGUAGE_ID') + bookingUrl;
}

// $(document).ready(function(){
//     if($('.booking_form').length){
//         bookingReady();
//     }
// });

$(document).on('booking_ready', function(){
    bookingReady({
        url: bookingUrl
    });   
});