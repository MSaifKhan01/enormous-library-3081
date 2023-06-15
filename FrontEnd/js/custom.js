(function($) {
    "use strict";
	
	var tpj = jQuery;
    var revapi24;


    // Preloader 
    jQuery(window).on('load', function() {
    jQuery("#status").fadeOut();
    jQuery("#preloader").delay(450).fadeOut("slow");
    });
    // light box js
    		
		$('.portfolio_img_text').magnificPopup({
			delegate: '.img-link',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small></small>';
				}
			}
		});
    
        // ===== Scroll to Top ==== //
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 100) {
                $('#return-to-top').fadeIn(200);
            } else {
                $('#return-to-top').fadeOut(200);
            }
        });
        $('#return-to-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        });	

   // ---------------Counter js index01 and index 02 page
      var isAlreadyRun = false;

      $(window).scroll( function(){
      
          $('.counter-main-wrapper, .about-main-wrapper').each( function(i){
      
              var bottom_of_object = $(this).position().top + $(this).outerHeight() / 2;
              var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      
                  if( bottom_of_window > ( bottom_of_object + 20 )  ){
              if (!isAlreadyRun) {
                $('.counter-count').each(function () {
                      
                        $(this).prop('con counter-right-border', 0).animate({
                            Counter: $(this).text()
                        }, {
                                duration: 3500,
                                easing: 'swing',
                                step: function (now) {
                                    $(this).text(Math.ceil(now));
                                }
                            });
                      });
              }
                      isAlreadyRun = true;
                  }
          }); 
      
      });      
		// responsive sab menu
		(function ($) {
            $(document).ready(function () {

                $('#cssmenu li.active').addClass('open').children('ul').show();
                $('#cssmenu li.has-sub>a').on('click', function () {
                    $(this).removeAttr('href');
                    var element = $(this).parent('li');
                    if (element.hasClass('open')) {
                        element.removeClass('open');
                        element.find('li').removeClass('open');
                        element.find('ul').slideUp(200);
                    }
                    else {
                        element.addClass('open');
                        element.children('ul').slideDown(200);
                        element.siblings('li').children('ul').slideUp(200);
                        element.siblings('li').removeClass('open');
                        element.siblings('li').find('li').removeClass('open');
                        element.siblings('li').find('ul').slideUp(200);
                    }
                });
            });
        })(jQuery);
    // menu fixed
    $(window).scroll(function () {
        var window_top = $(window).scrollTop() + 1;
        if (window_top > 100) {
        $('.menu-items-wrapper').addClass('menu-fixed animated fadeInDown');
        } else {
        $('.menu-items-wrapper').removeClass('menu-fixed animated fadeInDown');
        }
    });
    
    // toggle cross btn js
    $(".toggle-main-wrapper , #toggle_close").on("click", function () {
        $("#sidebar").toggleClass("open")
    });

  	// ---------------Counter js index01 and index 02 page
      var isAlreadyRun = false;

      $(window).scroll( function(){
      
          $('.counter-main-wrapper, .about-main-wrapper').each( function(i){
      
              var bottom_of_object = $(this).position().top + $(this).outerHeight() / 2;
              var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      
                  if( bottom_of_window > ( bottom_of_object + 20 )  ){
              if (!isAlreadyRun) {
                $('.counter-count').each(function () {
                      
                        $(this).prop('con counter-right-border', 0).animate({
                            Counter: $(this).text()
                        }, {
                                duration: 3500,
                                easing: 'swing',
                                step: function (now) {
                                    $(this).text(Math.ceil(now));
                                }
                            });
                      });
              }
                      isAlreadyRun = true;
                  }
          }); 
      
      });


// blog single page slider
$('.blog-page-main-container .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
// index page 03 testimonial slider section

$('.testimonial-main3 .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
//  index page 03 slider-section
$('.service-slider-wrappe3 .owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    dots:false,
    nav:true,
    navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        800:{
            items:2
        },
        1000:{
            items:2.5
        },
        1300:{
            items:4
        }
    }
})
// index page slider page 02
$('.client2-main-wrapper .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
// service section slider js
$('.services-main-wrapper .owl-carousel').owlCarousel({
    loop:true,
    margin:20,
    nav:true,
    dots:false,
    navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:1,
            nav:true
        },
        800:{
            items:2,
            nav:true
        },
        1000:{
            items:3,
            nav:true
        },
        1300:{
            items:3
        }
    }
})
// testimonial slider
$('.testimonial-main-wrapper .owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    dots:false,
    navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        800:{
            items:1,
            nav:true
        },
        1000:{
            items:2
        }
    }
})

$('.partner-main-wrapper .owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:false,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        400:{
            items:2
        },
        800:{
            items:3
        },
        1000:{
            items:5
        }
    }
})
// share fixed button js

function actionToggleOne() {
    let action = document.querySelector('.contact-action');
    action.classList.toggle('open1');
}
function actionToggleTwo() {
    let action = document.querySelector('.action-1');
    action.classList.toggle('open2');
}
function actionToggleThree() {
    let action = document.querySelector('.action-2');
    action.classList.toggle('open3');
}
function actionToggleFour() {
    let action = document.querySelector('.action-3');
    action.classList.toggle('open4');
}

})(jQuery);

// counter js
