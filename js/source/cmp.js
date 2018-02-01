(function($){
    jQuery.fn.omsu_dropdown = function () {
        var toggleCls = function (event, el) {
            switch (event.type) {
                case 'mouseenter':
                    $(el).addClass('open');
                    break;
                case 'mouseleave':
                    $(el).removeClass('open');
                    break;
            }
        };

        $(this).find('li').hover(function (e) {
            if (!!$(this).find('ul').length) {
                toggleCls(e, this);
            }
        })
    };
    jQuery.fn.omsu_header_search = function () {
        var btn = $('.search-bar-toggle', this),
            formPanel = $('.form', this);

        formPanel.hide();
        btn.click(function() {
            formPanel.toggle('fast');
            event.preventDefault();
        });

        $('form', formPanel).submit(function(event) {
            return !!$('input', this).val()
        });
    };
    jQuery.fn.stick_bottom_footer = function () {
        var fixWrapperHeight = function () {
            $('.wrapper').css({
                'minHeight': 'calc(100vh - ' + $('footer').height() + 'px)'
            });
        };
        fixWrapperHeight();
        $(this).resize(function() {
            fixWrapperHeight();
        });
    };
    jQuery.fn.omsu_faq = function () {
        var control = this.find('.control');

        $(this).find('.answer').hide(); // hide all answers
        $(control).text(omsu_msg.show_answer);
        control.click(function (e) {
            answer = $(this).parent().find('.answer');
            if (answer.is(':visible')) {
                $(this).text(omsu_msg.show_answer)
            } else {
                $(this).text(omsu_msg.hide_answer)
            }
            answer.slideToggle('fast');
            e.preventDefault();
        })
    };

    jQuery.fn.omsu_sidebar_search = function() {
        var control = $('.control > a', this),
            form = $('.search-form', this);
        
        control.text(omsu_msg.hide_search);
        control.click(function () {
            if (form.is(':visible')) {
                control.text(omsu_msg.show_search);
            } else {
                control.text(omsu_msg.hide_search);
            }
            form.toggle();
            return false;
        })
    };

    jQuery.fn.omsu_tree = function() {
        $(this).find('li:has(ul)').addClass('parent');

        var parent = $(this).find('li.parent');

        $('li.parent', this).find('.control').on('click', function (e) {
            var children = $(this).closest('li').find(' > ul > li');

            if (children.is(":visible")) {
                children.hide('fast');
            } else {
                children.show('fast');
            }
            return false;
        });
    };

    jQuery.fn.omsu_combobox = function(){
        var el = this,
            queryString,
            mask = this.find('.omsu_combobox_mask'),
            listItems = this.find('li'),
            searchfield = this.find('input');

        searchfield.keyup(function () {
            queryString = this.value;
            doFilter();
        });

        doFilter = function () {
            listItems.each(function (index, el) {
                var expr = new RegExp(queryString, 'gi'),
                    str = $(el).find('a').text();
                (str.match(expr)) ? $(el).show() : $(el).hide()
            })
        };

        mask.click(function () {
            $(this.parentNode).fadeOut();
        });

        return this;
    };
})(jQuery);