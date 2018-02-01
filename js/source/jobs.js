/*раздел Кадры*/
$(document).ready(function () {
        /*проверяем, находимся ли мы на странице "Кадры"*/
        if($('div').is('.page-vacancy'))
        {
            /**
             *  Функция, получает дату начала/окончания показа вакансий и отправляет ее, чтобы обновить вывод
             *  name_evens - название события, вызвавшего ф-ую
             *  date - дата
            */
            var dateActiveFrom, dateActiveTo;

            function sendDate(name_events, date){

                var arFilter = {};

                if(name_events == 'DATE_ACTIVE_FROM'){
                    dateActiveFrom = date;
                }
                else{
                    dateActiveTo = date;
                }

                $('.search-form').find('option:selected').each(function(index){
                    if($( this ).attr('value') != 'null'){
                        arFilter[$( this ).parent().attr('name')] = $( this ).attr('value');
                    }
                });

                $.get(window.location['pathname'] + 'index.php', {
                    MODE: 'ajax',
                    DATE_ACTIVE_FROM: dateActiveFrom,
                    DATE_ACTIVE_TO: dateActiveTo,
                    FILTER : arFilter
                },
                function(data)
                {
                    $('body').find('.js-vacancy').replaceWith($(data));

                    $('body').find('.items-count span').html($(data).find('.table-hover tbody tr').length);

                    $('body').find('input[name="date_fld"]').val(dateActiveFrom);
                    $('body').find('input[name="date_fld_finish"]').val(dateActiveTo);

                });
            }

            /*получаем начальную дату показа вакансий*/
            $('body').on('change','input[name="date_fld"]',function() {
                sendDate('DATE_ACTIVE_FROM', this.value);
            });
            /*получаем конечную дату показа вакансий*/
            $('body').on('change','input[name="date_fld_finish"]',function() {
                sendDate('DATE_ACTIVE_TO', this.value);
            });
            $('body').on('click','.js-print', function()
            {
                text = $('.print_vacancy').html();
                printwin = open('', 'printwin', 'width=1200,height=600');
                printwin.document.open();
                printwin.document.writeln('<html><head><title></title></head><body onload=print();close()>');
                printwin.document.writeln(text);
                printwin.document.writeln('</body></html>');
                printwin.document.close();
            });
        }
});