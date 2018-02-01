$(function() {
    /*Кнопки расшаривания*/
    $('.js-link-share-mail').on('click', function(){
        $('.pluso-moimir').click();
    });

    $('.js-link-share-google').on('click', function(){
        $('.pluso-google').click();
    });
    $('.js-link-share-odnoklassniki').on('click', function(){
        $('.pluso-odnoklassniki').click();
    });

    $('.js-link-share-vk').on('click', function(){
        $('.pluso-vkontakte').click();
    });

    $('.js-link-share-facebook').on('click', function(){
        $('.pluso-facebook').click();
    });
});

$(document).ready(function(){
    var send = false;
    if($(".feedback-form").length) {
        $(".feedback-form").validate({
            showErrors: function (errorMap, errorList) {
                if (errorList.length) {
                    var s = errorList.shift();
                    var n = [];
                    n.push(s);
                    this.errorList = n;
                }
                this.defaultShowErrors();
            },
            submitHandler: function(form){
                console.log(send);
                if(!send) {
                    $.ajax({
                        url: "/ajax_captcha.php",
                        data: {
                            sessid: $('.feedback-form input[name="captcha_sid"]').val(),
                            word: $('.feedback-form input[name="captcha_word"]').val(),
                        },
                        dataType: 'json',
                        type: "POST",
                        success: function (result) {   //роль играет только этот блок
                            if (result == true) {
                                send = true;
                                form.submit();
                            } else {
                                $('#captcha-error-wrong').removeClass('hidden');
                            }
                        }
                    });
                } else {
                    form.submit();
                }
            },
            errorElement: 'div'
        });

        $('#captcha').on('focus', function(){
            $('#captcha-error-wrong').addClass('hidden');
        });

        $('#captcha').rules("add", {
            required: true,
            messages: {
                required: 'Не заполнены символы с картинки',
            }
        });

        $("#surname").rules("add", {
            required: true,
            minlength: 3,
            maxlength: 200,
            messages: {
                required: 'Поле "Фамилия" обязательно для заполнения',
                minlength: 'Фамилия должна быть не короче 3 символов',
                maxlength: 'Максимальное число символов - 200',
            }
        });

        $("#name").rules("add", {
            required: true,
            minlength: 3,
            maxlength: 200,
            messages: {
                required: 'Поле "Имя" обязательно для заполнения',
                minlength: 'Имя должно быть не короче 3 символов',
                maxlength: 'Максимальное число символов - 200',
            }
        });

        $("#lastname").rules("add", {
            minlength: 3,
            maxlength: 200,
            messages: {
                minlength: 'Имя должно быть не короче 3 символов',
                maxlength: 'Максимальное число символов - 200',
            }
        });

        $.validator.methods.email = function (value, element) {
            return this.optional(element) || /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value);
        }

        $("#email").rules("add", {
            required: {
                depends: function (element) {
                    return $("#checkbox-email").is(":checked");
                }
            },
            email: true,
            messages: {
                required: 'При данном способе получения ответа поле "email" обязательно',
                email: 'Введите корректный email'
            }
        });

        $("#checkbox-dp").rules("add", {
            required: true,
            messages: {
                required: 'Поставте галочку в поле "Я согласен с правилами обработки персональных данных"',
            }
        });

        function get_action(form) {
            var v = grecaptcha.getResponse();
            if (v.length == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }
});

$(document).ready(function(){
    if($(".feedback-form").length) {
        $(".feedback-form").validate({
            showErrors: function (errorMap, errorList) {
                if (errorList.length) {
                    var s = errorList.shift();
                    var n = [];
                    n.push(s);
                    this.errorList = n;
                }
                this.defaultShowErrors();
            },
            errorElement: 'div'
        });

        var isvalidate = $(".feedback-form").valid();
        if (isvalidate) {
            $(".feedback-form").submit(function (e) {
                if (get_action($(".feedback-form"))) {
                    return true;
                } else {
                    e.preventDefault();
                    $('.captcha-error').show();
                }
            });
        }

        $('#recaptcha-head').on('mouseenter', function () {
            $('.captcha-error').hide();
        });

        $("#surname").rules("add", {
            required: true,
            minlength: 3,
            maxlength: 200,
            messages: {
                required: 'Поле "Фамилия" обязательно для заполнения',
                minlength: 'Фамилия должна быть не короче 3 символов',
                maxlength: 'Максимальное число символов - 200',
            }
        });

        $("#name").rules("add", {
            required: true,
            minlength: 3,
            maxlength: 200,
            messages: {
                required: 'Поле "Имя" обязательно для заполнения',
                minlength: 'Имя должно быть не короче 3 символов',
                maxlength: 'Максимальное число символов - 200',
            }
        });

        $("#lastname").rules("add", {
            minlength: 3,
            maxlength: 200,
            messages: {
                minlength: 'Имя должно быть не короче 3 символов',
                maxlength: 'Максимальное число символов - 200',
            }
        });

        $.validator.methods.email = function (value, element) {
            return this.optional(element) || /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value);
        }

        $("#email").rules("add", {
            required: {
                depends: function (element) {
                    return $("#checkbox-email").is(":checked");
                }
            },
            email: true,
            messages: {
                required: 'При данном способе получения ответа поле "email" обязательно',
                email: 'Введите корректный email'
            }
        });

        $("#checkbox-dp").rules("add", {
            required: true,
            messages: {
                required: 'Поставте галочку в поле "Я согласен с правилами обработки персональных данных"',
            }
        });

        function get_action(form) {
            var v = grecaptcha.getResponse();
            if (v.length == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }
});