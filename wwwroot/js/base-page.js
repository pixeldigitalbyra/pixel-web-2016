window.pixel = window.pixel || {};

window.pixel.basePage = (function () {
    var init = function () {
        $(window).bind("scroll", function () {
            $("body").toggleClass("has-scrolled", $(document).scrollTop() > 0);
        });

        $(".scroll-link").click(function () {
            var target = $(this).data("target");
            var duration = $(this).data("duration");
            var headerHeight = $("header").outerHeight();
            $("html, body").animate({
                scrollTop: $(target).offset().top - headerHeight
            }, duration);
        });

        $("#btnSubmitContactForm").click(function () {
            $.post("/api/email?" + 
                "name=" + encodeURIComponent($("#txtName").val()) +
                "&contactInformation=" + encodeURIComponent($("#txtContactInformation").val()) +
                "&message=" + encodeURIComponent($("#txtMessage").val()))
            .done(function () {
                $("#contactForm").hide();
                $("#contactSuccessMessage").removeClass("hide");
            })
            .fail(function () {
                $("#contactFailMessage").removeClass("hide");
            });
            return false;
        });
    }

    return {
        init: init
    }
}());