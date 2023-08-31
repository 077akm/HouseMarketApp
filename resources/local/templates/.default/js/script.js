$(function(){
	//гамбургер вверху справа

	$('#open-dep-mob-app').click(function(){
		$('#modal-open-dep').modal('hide');
	});

	$('.navbar-toggle').click(function(event) {
		var dd_menu = $(this).attr("data-target");
		$(this).toggleClass('opn');
		$(dd_menu).slideToggle();


		var my_id=$(this).attr('id');

		// if(my_id=='mobile_top_open') $('#mobile_top_open').css('opacity', 0);
		// if(my_id=='mobile_top_close') $('#mobile_top_open').css('opacity', 1);

	});



	//гамбургер на мобилке

	$('.mobile-btn-menu-toggle').click(function(event) {
		$('.mobile-menu').toggleClass('opn');
		$('body').toggleClass('ofh');
	});

	$(document).mouseup(function(e){
		var mobMenu = $('.mobile-menu'),
			mobMenuCnt = $('.mobile-menu-content'),
			mobMenuBtn = $('.mobile-btn-menu-toggle'),
			mobHdr = $('.left-header');
			body = $('body');
			modalReg = $('#modal-region');
		if (
			!mobMenuCnt.is(e.target) && !mobHdr.is(e.target) && !modalReg.is(e.target) &&
			mobMenuCnt.has(e.target).length === 0 && mobHdr.has(e.target).length === 0 && modalReg.has(e.target).length === 0
		){
			mobMenu.removeClass('opn').slideUp();
			mobMenuBtn.removeClass('opn');
			body.removeClass('ofh');
		}
	});



	var page_w = $(window).width();

	if (page_w > 750) {
		var cont_fl = parseInt($(".container-fluid").css("padding-right"));
		var toolbar = parseInt($("#toolbar").outerHeight());
		$(".dd_menu").css({
			"right": Math.floor(cont_fl),
			"top": toolbar-1
		});
	}

	if (page_w <= 750) {
		var cont_fl = parseInt($(".container-fluid").css("padding-left"));
		var toolbar_left = parseInt($(".toolbar-left").outerHeight());

		$(".toolbar-left").attr('alt', toolbar_left);

		$(".dd_menu").css({
			"left": Math.floor(cont_fl),
			"right": "auto",
			"top": toolbar_left
		});
	}


	//движение меню при прокрутке
	var scrollPos = 0;
	$(window).scroll(function(){
	   var st = $(this).scrollTop();
	   var direction='';
	   if (st > scrollPos){
	     //direction='down';

	      if($('#mobile_top_open').css('bottom')=='50px'){
		     $('#mobile_top_open').animate({top: '55px'}, 15);
		     $('#mobile_top_open').css('bottom', 'auto');
		  }

	     //console.log($('#mobile_top_open').css('top'));

	   } else {
	     //direction='up';

	      if($('#mobile_top_open').css('top')=='55px'){
		     $('#mobile_top_open').animate({bottom: '50px'}, 15);
		     $('#mobile_top_open').css('top', 'auto');
		  }
		}
	   scrollPos = st;
	});


	//выпадашка с сервисами в шапке
	$('header .dd_contacts .anim_icons').click(function(event) {
		$(this).closest(".dd_contacts").toggleClass( 'opn' );
		$("body").toggleClass( 'over' );
	});





    //на мобиле открываем первый пункт в меню
    $(document).on('click', '.mobile-btn-menu-toggle', function(){
        $('.mobile-main-menu [data-parent-key="1"]').trigger('click');
    });

	$('.fancybox-ajax-booking').on('click', function(e){
		e.preventDefault();

		$.fancybox({
			width: 400,
			height: 400,
			autoSize: false,
			href: $(this).data('fancybox_ajax_url'),
			type: 'ajax',
			afterShow: function(){
                $(document).trigger('booking_ready');
            }
		});
	});




	/*if($('#main_page_slider_desk').is(":visible")){

        $('#main_page_slider_desk').slick({
            dots: true,
			infinite: true,
			lazyLoad: 'ondemand',
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						arrows: false
					}
				}
			]
        });

        $('#main_page_slider_mobile').slick({
            dots: false,
            lazyLoad: 'ondemand',
            infinite: true,
            arrows: false,
        });
    }
    else{

        $('#main_page_slider_desk').slick({
            dots: true,
            lazyLoad: 'ondemand',
            infinite: true,
            arrows: true,
        });

        $('#main_page_slider_mobile').slick({
            dots: true,
			infinite: true,
			lazyLoad: 'ondemand',
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						arrows: false
					}
				}
			]
        });
    }*/

    $('#main_page_slider_desk').slick({
        dots: true,
		infinite: true,
		lazyLoad: 'ondemand',
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					arrows: false
				}
			}
		]
    });

    $('#main_page_slider_mobile').slick({
        dots: true,
		infinite: true,
		lazyLoad: 'ondemand',
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					arrows: false
				}
			}
		]
    });





    var _isPlay = true,
		$slider = $('.slideshow-main'),
		intervalAutoPlay = 10 * 1000,
		timer;

	function Timer(callback, delay) {
		var timerId, start, remaining = delay;

		this.pause = function() {
			window.clearTimeout(timerId);
			remaining -= new Date() - start;
		};

		this.resume = function() {
			start = new Date();
			window.clearTimeout(timerId);
			timerId = window.setTimeout(callback, remaining);
		};

		this.stop = function() {
			remaining = delay;
			window.clearTimeout(timerId);
		}

		this.resume();
	}

	timer = new Timer(function() {
		$('.slideshow-main').slick('slickNext');

		//if($('#main_page_slider_desk').is(":visible")) $('#main_page_slider_desk').slick('slickNext');
		//else $('#main_page_slider_mobile').slick('slickNext');

	}, intervalAutoPlay);

	$('.slideshow-main').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		timer.stop();
		timer.resume();
	});
	$('.slideshow-main').on('afterChange', function(event, slick, currentSlide, nextSlide){
		var suf_index = $(this).find('.slick-active').data('slick-index')!=0?$(this).find('.slick-active').data('slick-index'):'';
		$(this).find('button.slick-prev').attr('onclick',"ym(40042210, 'reachGoal', 'SL_left"+suf_index+"')");
		$(this).find('button.slick-next').attr('onclick',"ym(40042210, 'reachGoal', 'SL_right"+suf_index+"')");
		console.log();
	});
	var switch_lazy=1;
	$('.slideshow-main').on('lazyLoaded', function(event, slick){
		if(switch_lazy){
			$(this).find('button.slick-prev').attr('onclick','ym(40042210, \'reachGoal\', SL_left)');
			$(this).find('button.slick-next').attr('onclick','ym(40042210, \'reachGoal\', SL_right)');
			switch_lazy=0;
		}
	});
	$slider.hover(function(){
		_isPlay = false;
		timer.pause();
		$('.slideshow-main .slick-dots').addClass('pause');
	}, function(){
		_isPlay = true;
		timer.resume();
		$('.slideshow-main .slick-dots').removeClass('pause');
	});

	let selectCountry = document.querySelector('#select_position');

	if (selectCountry !== null) {
		selectCountry.addEventListener('change', ()=>{
			url = selectCountry.value;
			document.location.href = url;
		})
	}

	//	Маски для форм
	//
	// let feedbackIIN = $([name="form_text_17"])
	// console.log(feedbackIIN)


	console.log($('input[name="form_text_66"]'))

});

document.addEventListener('DOMContentLoaded', ()=>{

	let fancy_callback = document.querySelector('#fancy_callback')
	// создаем новый экземпляр наблюдателя
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			console.log(mutation.type);
			$('[name=form_text_66]').mask('999999999999');
			if(mutation.type == 'childList'){

			}
		});
	});

	// let send_callback_form = document.querySelectorAll('.send_callback_form')
	// send_callback_form.forEach(item=>{
	// 	item.addEventListener('click', ()=>{
	// 		observer.observe(fancy_callback,  config);
	// 		setTimeout(()=>{
	// 			$('[name=form_text_66]').mask('999999999999');
	// 		}, 1000)
	// 	})
	// })


	var config = { attributes: true, childList: true, characterData: true };
	try {
		observer.observe(fancy_callback,  config);
	}catch (e) {

	}
	try {
		$('[name=form_text_363]').mask('999999999999');
	}catch (e) {

	}
	try {
		$('[name=form_text_373]').mask('999999999999');
	}catch (e) {

	}

	try{
		$('[name=form_text_484]').mask('+79999999999');
		$('[name=form_text_487]').mask('999999999999');

	}catch (e) {

	}
	try{
		$('[name=form_text_538]').mask('+79999999999');

	}catch (e) {

	}
	try{
		$('[name=form_text_542]').mask('+79999999999');

	}catch (e) {

	}
	try{
		$('[name=form_text_546]').mask('+79999999999');

	}catch (e) {

	}
	try{
		$('[name=form_text_552]').mask('+79999999999');

	}catch (e) {

	}
	try{
		$('[name=form_text_729]').mask('+79999999999');

	}catch (e) {

	}

})







