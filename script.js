
$(document).ready(function() {
	if ($("#Type").val() == "в письменной форме" )
	{
		$(".post_input").prop('checked', true);
		$(".post_label").removeClass("btn-default");
		$(".post_label").removeClass("btn-warning");
		$(".post_label").addClass("btn-default");
		$(".email_label").addClass("btn-warning");
		$(".email_label").removeClass("btn-default");
		
		$(".Email").prop("required", false);
		$(".Zip-code").prop("required", true);
		$(".Region").prop("required", true);
		$(".City").prop("required", true);
		$(".Street").prop("required", true);
		$(".House").prop("required", true);
		
		$(".label-email").css("display","none");
		$(".label-index").css("display","inline-block");
		$(".label-region").css("display","inline-block");
		$(".label-city").css("display","inline-block");
		$(".label-street").css("display","inline-block");
		$(".label-house").css("display","inline-block");
	}else{
		$(".email_input").prop('checked', true);
		$(".email_label").removeClass("btn-default");
		$(".email_label").removeClass("btn-warning");
		$(".email_label").addClass("btn-default");
		$(".post_label").addClass("btn-warning");
		$(".post_label").removeClass("btn-default");
		
		$(".Email").prop("required", true);
		$(".Zip-code").prop("required", false);
		$(".Region").prop("required", false);
		$(".City").prop("required", false);
		$(".Street").prop("required", false);
		$(".House").prop("required", false);
		
		$(".label-email").css("display","inline-block");
		$(".label-index").css("display","none");
		$(".label-region").css("display","none");
		$(".label-city").css("display","none");
		$(".label-street").css("display","none");
		$(".label-house").css("display","none");
	}
});
$(document).ready(function() {
	$(".email_input").change(function(){
		$(".email_label").removeClass("btn-default");
		$(".email_label").removeClass("btn-warning");
		$(".email_label").addClass("btn-default");
		$(".post_label").addClass("btn-warning");
		$(".post_label").removeClass("btn-default");
		
		$(".Email").prop("required", true);
		$(".Zip-code").prop("required", false);
		$(".Region").prop("required", false);
		$(".City").prop("required", false);
		$(".Street").prop("required", false);
		$(".House").prop("required", false);
		
		$(".label-email").css("display","inline-block");
		$(".label-index").css("display","none");
		$(".label-region").css("display","none");
		$(".label-city").css("display","none");
		$(".label-street").css("display","none");
		$(".label-house").css("display","none");
	});
	$(".post_input").change(function(){
		$(".post_label").removeClass("btn-default");
		$(".post_label").removeClass("btn-warning");
		$(".post_label").addClass("btn-default");
		$(".email_label").addClass("btn-warning");
		$(".email_label").removeClass("btn-default");
		
		$(".Email").prop("required", false);
		$(".Zip-code").prop("required", true);
		$(".Region").prop("required", true);
		$(".City").prop("required", true);
		$(".Street").prop("required", true);
		$(".House").prop("required", true);
		
		$(".label-email").css("display","none");
		$(".label-index").css("display","inline-block");
		$(".label-region").css("display","inline-block");
		$(".label-city").css("display","inline-block");
		$(".label-street").css("display","inline-block");
		$(".label-house").css("display","inline-block");
	});
	$('#ereception_form').submit(function (e) {
	    e.preventDefault();
	    var formData = new FormData(this);
	    $.ajax({
	        url: "ajax.php",
	        type: 'POST',
	        data: formData,
	        async: false,
	        success: function (data) {
	        	if (data.indexOf("<!DOCTYPE HTML>") != -1){
    				document.location.href =window.location.protocol+ "//"+ window.location.hostname +  "/result";
    			} else{
    				$("#error").html(data);
    			}
	        },
	        cache: false,
	        contentType: false,
	        processData: false
	    });
	    return false;
	});
});

function getName (input){
	if(input.value)
		$('#delete_'+input.name).show();
    if (input.value.lastIndexOf('\\')){
        var i = input.value.lastIndexOf('\\')+1;
    }
    else{
        var i = input.value.lastIndexOf('/')+1;
    }						
    var filename = input.value.slice(i);			
    $("#"+input.name+"label").html(filename);
}

function delete_file (button){
	var name = button.id.substr(button.id.length - 5);
	$("#"+name+"label").html("");
	$("[name="+name+"]").val("");
	$('#delete_'+name).hide();
}
