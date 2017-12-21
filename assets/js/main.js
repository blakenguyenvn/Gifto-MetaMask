/**
 * @Package: Caliber - Multi Purpose HTML Template
 * @Since: Caliber 1.0
 * This file is part of Caliber - Multi Purpose HTML package.
 */

jQuery(function($) {

    'use strict';

    var CALIBER_SETTINGS = window.CALIBER_SETTINGS || {};

    /*--------------------------------
        Back to Top button
     --------------------------------*/
    CALIBER_SETTINGS.backToTopButton = function() {


            // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

        //hide or show the "back to top" link
        $(window).scroll(function(){
            ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
            if( $(this).scrollTop() > offset_opacity ) { 
                $back_to_top.addClass('cd-fade-out');
            }
        });

        //smooth scroll to top
        $back_to_top.on('click', function(event){
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0 ,
                }, scroll_top_duration
            );
        });   
    }

    /*--------------------------------
        Slider Header Carousel
     --------------------------------*/

    CALIBER_SETTINGS.inViewPortAnimation = function() {

        if ($.isFunction($.fn.viewportChecker)) {
            $('.inviewport').addClass("hiddenthis").viewportChecker({
                classToAdd: 'visiblethis',
                offset: 0,
                callbackFunction: function(elem) {
                    console.log(elem);
                    var effect = $(elem).attr("data-effect");
                    $(elem).addClass(effect);
                }
            });

        }

    }

    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function() {
        CALIBER_SETTINGS.inViewPortAnimation();
        CALIBER_SETTINGS.backToTopButton();
   });

});