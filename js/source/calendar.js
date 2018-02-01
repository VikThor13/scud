$(document).ready(function () {
    if ($('#calendar').length > 0) {
        var
        /*получаем текущую дату*/
            date = new Date(),
            month,
            year,
            day,
            defaultDate;
        /*прибавляем к месяцу 1, т.к. месяца начинаются с 0(январь = 0, февраль = 1, а должно быть январь = 1 и т.д.)*/
        month = date.getMonth() + 1;
        year = date.getFullYear();
        day = date.getDate();

        defaultDate = year
            + '-'
            + (month < 10 ? '0' + month : month) //требуется месяц в формате: 01 - январь, 02 - февраль и т.д.
            + '-'
            + (day < 10 ? '0' + day : day);
        /*инициализация календаря*/
        $('#calendar').fullCalendar({
            header: {
                left: 'prev, next today',
                center: 'title',
                right: 'month, basicWeek, basicDay'
            },
            defaultDate: defaultDate,
            lang: omsu_msg.site_lang,
            editable: false,
            eventLimit: false,
            events: function (start, end, timezone, callback) {
                $.ajax({
                    url: window.location['pathname'] + 'index.php',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        START: start.unix(),
                        END: end.unix()
                    },
                    success: function (doc) {
                        var events = [];
                        $(doc).each(function () {
                            events.push({
                                id: $(this).attr('id'),
                                title: $(this).attr('title'),
                                start: $(this).attr('start'),
                                end: $(this).attr('end'),
                                description: $(this).attr('description'),
                                active_from: $(this).attr('active_from'),
                                active_to: $(this).attr('active_to')
                            });
                        });
                        callback(events);
                    }
                });
            },
            eventRender: function(event, element) {
                element.qtip({
                    content: {
                        title: event.title,
                        text: omsu_msg.event_starts
                        + event.active_from
                        + '<br>'
                        + omsu_msg.event_finish
                        + event.active_to
                        + '<br>'
                        + '<br>'
                        + omsu_msg.about_event
                        + event.description
                    },
                    position: {
                        my: 'top center',
                        at: 'bottom center',
                        target: $(element)
                    },
                    style: { classes: 'myQtip' }
                });
            }
        });
    }

    setTimeout(function(){
        $('.fc-title').each(function(){
            if($(this).height()>45) {
                var text = $(this).text().split(' ');
                var newText = '';
                for(var i=0; i<text.length; i++){
                    var str = '';
                    if(!newText){
                        str = text[i];
                    } else {
                        str = newText + ' ' + text[i];
                    }
                    $(this).text(str+'...');
                    if($(this).height() > 45){
                        var char = newText.substr(newText.length -1, newText.length );
                        if(char == ','){
                            newText = newText.slice(0,-1);
                        }
                        $(this).text(newText +'...');
                        break;
                    } else {
                        newText = str;
                    }
                }
            }
        });
    }, 500);
});