$(function() {
    $('#change_avatar').click(function(){
        $('input[name="PERSONAL_PHOTO"]').click();
    });
    $('input[name="PERSONAL_PHOTO"]').change(function(){
        $('form[name="change_avatar"]').submit();
    });

    $('.feedback-buttom').click(function(){
        $('html, body').scrollTop(0);
        $('.container.feedback').slideDown();
        $('.feedback-control').addClass('opened');
    });
});
