(function($) {
	
	"use strict";
		
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	
	//Update header style + Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			if (windowpos >= 250) {
				$('.main-header').addClass('fixed-header');
				$('.scroll-to-top').fadeIn(300);
			} else {
				$('.main-header').removeClass('fixed-header');
				$('.scroll-to-top').fadeOut(300);
			}
		}
	}
	
	headerStyle();
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		
		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
	}

	//Main BX-Slider
	if($('.events-slide').length){
		$('.events-slide').bxSlider({
			auto:true,
			mode:'vertical',
			nextSelector: '.events-section #slider-next',
	        prevSelector: '.events-section #slider-prev',
	        nextText: '<i class="fa fa-angle-right"></i>',
	        prevText: '<i class="fa fa-angle-left"></i>',
			maxSlides: 3,
			minSlides: 3,
			moveSlides: 1,
			pause: 5000,
			speed: 700,
			pagerCustom: '.events-section .slider-pager .thumb-box'
		});
	}
	
	//Contact Form Validation
	if($('#contact_form').length){
		$("#contact_form").validate({
		    submitHandler: function(form) {
		      var form_btn = $(form).find('button[type="submit"]');
		      var form_result_div = '#form-result';
		      $(form_result_div).remove();
		      form_btn.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
		      var form_btn_old_msg = form_btn.html();
		      form_btn.html(form_btn.prop('disabled', true).data("loading-text"));
		      $(form).ajaxSubmit({
		        dataType:  'json',
		        success: function(data) {
		          if( data.status == 'true' ) {
		            $(form).find('.form-control').val('');
		          }
		          form_btn.prop('disabled', false).html(form_btn_old_msg);
		          $(form_result_div).html(data.message).fadeIn('slow');
		          setTimeout(function(){ $(form_result_div).fadeOut('slow') }, 6000);
		        }
		      });
		    }
		});
	}

/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loaded, do
   ========================================================================== */
	$(window).on('load', function() {
		handlePreloader();
		expertizeRoundCircle();
		galleryMasonaryLayout();
	});

})(window.jQuery);
