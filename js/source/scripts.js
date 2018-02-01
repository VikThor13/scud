$(document).ready(function () {
    $('.navbar-nav').omsu_dropdown();

    $(window).stick_bottom_footer();
    $('.header-search-panel').omsu_header_search();

    $('.feedback-control').click(function () {
        $('.container.feedback').slideToggle();
        $(this).toggleClass('opened');
    });

    $('.container.feedback').find('.feedback-close').click(function () {
        $(this).closest('.container.feedback').slideToggle();
        $('.feedback-control').toggleClass('opened');
    });

    $('#index-carousel').carousel({
        interval: 5000
    });

    $('.omsu_combobox')
        .omsu_combobox()
        .find('ul').mCustomScrollbar();

    $('.find-other-omsu').click(function() {
        $('.omsu_combobox').fadeToggle();
    });

    $('.omsu-tree').omsu_tree();

    $('.sidebar-search').omsu_sidebar_search();

    if (typeof(datepicker) != 'undefined') {
        $('.input-daterange').datepicker({
            multidate: 1
        });
    }

    $('.omsu_qestion').omsu_faq();

    $('input[type=file]').bootstrapFileInput();

    $('.selectpicker').selectpicker();

    var galleryMaster = $('.gallery-preview'),
        slideCount = galleryMaster.find('.slide').length;

    if (galleryMaster.length) {
        galleryMaster.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            adaptiveHeight: true,
            asNavFor: '.gallery-nav'
        });
        $('.gallery-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.gallery-preview',
            dots: false,
            centerMode: true,
            centerPadding: '0px',
            infinite: true,
            focusOnSelect: true
        });
    }

    if ($('.adverts').length) {
        $('.adverts').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: true,
            adaptiveHeight: true
        });
    }

    $('.social-sharing > img').hover(function () {
        $(this).toggleClass('grayscale-off');
    });

    $('.table-overflow-wrapper').mCustomScrollbar({
        axis:"x",
        mouseWheel:{ axis: "x" },
        documentTouchScroll: true,
        theme: 'rounded-dark'
    });
});

