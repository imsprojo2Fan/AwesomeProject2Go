
function sub(){
	var name = $('#Name').val().trim();
	var phone = $('#Phone').val().trim();
	var email = $('#Email').val().trim();
	var message = $('#Message').val().trim();
	if(!name){
		$('#Name').css('border-color','red');
	}else{
		$('#Name').css("border-color", "#666");
	}
	if(!phone){
		$('#Phone').css('border-color','red');
	}else{
		$('#Phone').css("border-color", "#666");
	}
	if(!email|| email.indexOf('@') == '-1'){
		$('#Email').css('border-color','red');
	}else{
		$('#Email').css("border-color", "#666");
	}
	if(!message){
		$('#Message').css('border-color','red');
	}else{
		$('#Message').css("border-color", "#666");
	}
	if(!name||!phone||!email|| email.indexOf('@') == '-1'||!message){
		return false;
	}else{
		
		$.ajax({
			url:'user/infoAdd',
			type:'POST',
			dataType:'json',
			cache:false,
			data:$('#contact-form').serialize(),
			beforeSend:function(){
				$('#loading-mask').show();
			},
			complete:function(){
				$('#loading-mask').hide();
			},
			success:function(data){
				if(data.code==1){
					swal('信息提交成功','客服将尽快与您联系','success');
					$('#contact-form')[0].reset();
					
				}else{
					swal('服务器不小心被外星人带走了','稍后再试吧','error');
				}
			}
		})
		
		
	}
}