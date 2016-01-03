window.pixel = window.pixel || {};

window.pixel.hero = (function () {
    var init = function () {
	    $(window).bind("scroll", function() {
	        $("body").toggleClass("has-scrolled", $(document).scrollTop() > 0);
	    });
        window.setTimeout(function () {
	       $("body").toggleClass("intro-complete", true);
        }, 1000);
    }

    return {
        init: init
    }
}());