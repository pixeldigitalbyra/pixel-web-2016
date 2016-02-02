window.pixel = window.pixel || {};

window.pixel.startPage = (function () {
    var init = function () {
        $("#heroScrollDownLink").click(function () {
            $('html, body').animate({
                scrollTop: (($(".why-pixel").offset().top) - $("header").outerHeight())
            }, 700);
        });
    }

    return {
        init: init
    }
}());


