$(document).ready(function () {

    const headerButton = $(".header__contacts-button");


    //медиа изменения

    if ($(window).width() < 576) {
        headerButton.text("Консультация");
    } else {
        headerButton.text("Получить консультацию");
    }

    $(window).resize(function () {
        if ($(window).width() < 576) {
            headerButton.text("Консультация");
        } else {
            headerButton.text("Получить консультацию");
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

    //fotorama


    $('.ul-button').on('click', function () {
        $(this).hide();
        $(this).next().addClass('show-list');
    })


});