import $ from 'jquery';

$(document).ready(function() {
    var lastScrollTop = 0;
    function setActiveLink() {
        var currentSection = null;
        $('section').each(function() {
            var section = $(this);
            var rect = section[0].getBoundingClientRect();
            if (rect.top <= $(window).height() / 2 && rect.bottom >= $(window).height() / 2) {
                currentSection = section.attr('id');
            }
        });
        $('.nav-link').removeClass('active');
        if (currentSection) {
            $('a[href="#' + currentSection + '"]').not('footer a[href="#' + currentSection + '"]').addClass('active');
        }
    }

    function handleScroll() {
        var currentScrollTop = $(window).scrollTop();
        if (currentScrollTop > lastScrollTop) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        setActiveLink();
    }
    $(window).on('scroll', handleScroll);
    setActiveLink();
});
