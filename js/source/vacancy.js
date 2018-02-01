$(document).ready(function(){
    $('body').on('click','.send-to-site', function(){
        $.ajax({
            url:"/ajax_send_resume.php",
            data: {
                resume_id: $(this).data('id'),
            },
            dataType: 'json',
            type:"POST",
            success:function(result){   //роль играет только этот блок
                if(result.success == true){
                    $.redirect('/personal/profile/?resume=Y', {'send': true});

                } else {
                    $.redirect('/personal/profile/?resume=Y', {'error': true});
                }
            }
        });
    });
});