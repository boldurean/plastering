$(document).ready(function(){

    const headerButton = $(".header__contacts-button");


    //медиа изменения

    if($(window).width() < 576) {
        headerButton.text("Консультация");
    } else {
        headerButton.text("Получить консультацию");
    }

    $(window).resize(function() {
        if ($(window).width() < 576) {
            headerButton.text("Консультация");
        } else {
            headerButton.text("Получить консультацию");
        }
    })

});