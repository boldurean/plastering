$(document).ready(function () {

    const headerButton = $(".header__contacts-button");
    const modalButton = document.querySelectorAll('[data-toggle="button"]');
    const modal = document.getElementsByClassName('modal');


    if ($(window).width() < 576) {
        headerButton.text("Consultation");
    } else {
        headerButton.text("Request a call");
    }

    $(window).resize(function () {
        if ($(window).width() < 576) {
            headerButton.text("Consultation");
        } else {
            headerButton.text("Request a call");
        }
    });

    //slick

    $('.advantage__row').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.feedback-slider').slick({
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    appendArrows: false,
                    dots: true
                }
            }
        ]
    });

    $('.materials__row').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    //fotorama


    $('.ul-button').on('click', function () {
        $(this).hide();
        $(this).next().addClass('show-list');
    })


    $(modalButton).click(function () {
        $(modal).toggleClass("active");
    });
    $('.modal__close').click(function () {
        $(modal).removeClass('active');
    })

    $(document).keydown(function (event) {
        if (event.keyCode === 27) {
            $(modal).removeClass('active');
        }
    });
    $(document).click(function (event) {
        if ($(event.target).is(modal)) {
            $(modal).removeClass('active');
        }
    });

    function initMap() {
        // The location of Uluru
        var uluru = {lat: -25.344, lng: 131.036};
        // The map, centered at
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 4, center: uluru});
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({position: uluru, map: map});
    }

    $('[type=tel]').mask('+7(000) 000-00-00');


    //validate
    $("form").each( function() {
        $(this).validate({
            errorElement: "div",
            errorClass: "invalid",
            rules: {
                userName: {
                    required: true,
                    minlength: 2,
                    maxlength: 15
                },
                userPhone: {
                    required: true,
                    minlength: 17
                },
                userEmail: {
                    required: true,
                    email: true
                },
                userMessage: {
                    required: true,
                    minlength: 15
                },
            },

            messages: {
                userName: {
                    required: "Required",
                    minlength: "At least 2 symbols",
                    maxlength: "Not more than 20 symbols"
                },
                userPhone: {
                    required: "Required",
                    minlength: "Number has to be valid"
                },
                userEmail: {
                    required: "Required",
                    email: "Email has to be valid"
                },
                userMessage: {
                    required: "Ask you question",
                    minlength: "At least 15 symbols"
                },
            },
            submitHandler: function (form) {
                $.ajax({
                    type: 'post',
                    url: 'send.php',
                    data: $(form).serialize(),
                    success: function (response) {
                        $(form)[0].reset();
                    }
                });
            }
        })
    })
});
