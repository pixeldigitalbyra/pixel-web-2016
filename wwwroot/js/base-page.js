window.pixel = window.pixel || {};

window.pixel.basePage = (function () {
    var init = function () {
	    $(window).bind("scroll", function() {
	        $("body").toggleClass("has-scrolled", $(document).scrollTop() > 0);
	    });
    }

    return {
        init: init
    }
}());