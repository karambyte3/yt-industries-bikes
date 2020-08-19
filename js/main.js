$(function(){

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

    function showMenu(show) {
        if (show) { //  SHOW
            $('.main').addClass('menu-shown');
            $('body').addClass('menu-shown');
            $('.expanded-menu').addClass('show');

            setTimeout(function () {
                $('.overlay').addClass('show');
            }, 500);
            
            var offset = 0;
            setTimeout(function () {
                $('.menu-item').each(function () {
                    var $menuItem = $(this)
                    setTimeout(function () {
                        $menuItem.addClass('slided-in').removeClass('slided-out');
                    }, 0 + offset);
    
                    offset = randomIntFromInterval(50, 250);
                })
            }, 200);
        } else { //  HIDE
            $('.nav-toggle').removeClass('expanded');
            $('.main').removeClass('menu-shown');
            $('.expanded-menu').removeClass('show');
            $('.overlay').removeClass('show');
            $('.nav-toggle').removeClass('show');
            setTimeout(function () {
                $('body').removeClass('menu-shown');
            }, 400);
            

            var offset = 0;
            $('.menu-item').each(function () {
                var $menuItem = $(this)
                setTimeout(function () {
                    $menuItem.removeClass('slided-in').addClass('slided-out');
                }, 0 + offset);

                offset += 50;
            })
        }
    }

    $('.nav-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('expanded');
        var $toggleBtn = $(this);

        if ($toggleBtn.hasClass('expanded')) { // Do this if menu is CLOSED
            showMenu(true);
        } else { // Do this if menu is OPENED
            showMenu(false);
        }
    });

    $('.play-video').on('click', function (e) {
        e.preventDefault();
        var $videoOverlay = $(this).closest('.video-overlay');
        var $iframe = $(this).closest('.video').find('iframe');
        var videoUrl = $iframe.attr('src');
        $videoOverlay.addClass('fade-out'); 
        
        $iframe.attr('src', videoUrl + '&autoplay=1');

        setTimeout(function () {
            $videoOverlay.addClass('d-none');
        }, 380);
    })

    $('.main').on('click', function () {
        showMenu(false);
    })

    $('.slick-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        swipeToSlide: true,
        autoplay: true,
        // nextArrow: '<i class="fa fa-chevron-right"></i>',
        // prevArrow: '<i class="fa fa-chevron-left"></i>',      
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: true
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    arrows: true
                }
            }
        ]
    });


    window.headerParallaxInit = function() {
        var container = document.querySelector(".hero-background");
        container.style.backgroundPosition = "center " + (-100 + (($('.main')[0].scrollTop) * 0.7)) + "px";
    
        $('.main').scroll(function() {
          var scrolled = this.scrollTop;
          var parallaxEnd = container.clientHeight;
            if (!!container) {
                if (scrolled < parallaxEnd) {
                    container.style.backgroundPosition = "center " + (-100 + (scrolled * 0.7)) + "px";
                }
            }
        });
    };

    var rellax = new Rellax('.rellax', {
        wrapper:'.main',
        center: false
    }); 

    // $(window).on('load', function () {
    //     headerParallaxInit();
    // })
})
