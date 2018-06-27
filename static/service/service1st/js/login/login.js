


$(function(){
	
	var account = getCookieValue('account');
	var password = getCookieValue('password');
	var check = getCookieValue('check');
	$('#account').val(account);
	$('#password').val(password);
	if(check){
		$('#cookie').attr('checked','checked');
	}
	
});

function sub(){
	var acc = $('#account').val().trim();
	var pass = $('#password').val().trim();
	var objChk = document.getElementById("cookie");
	if(!acc){
		$('#tip01').fadeIn(100);
	}
	if(!pass){
		$('#tip02').fadeIn(100);
	}
	if(!acc||!pass){
		return false;
	}else{
		
		if(objChk.checked){
			//添加cookie
			addCookie('account',acc,7,'/');
			addCookie('password',pass,7,'/');
			addCookie('check','checked',7,'/');
			validate(acc,pass);
		}else{
			deleteCookie('account','/')
			deleteCookie('password','/');
			deleteCookie('check','/');
			validate(acc,pass);
		}
		
	}
}

function validate(acc,pass){
	$.ajax({
		url:'user/login',
		type:'post',
		dataType:'json',
		cache:false,
		data:{
			'account':acc,
			'password':pass
		},
		beforeSend:function(){
			$('#zhezhao').fadeIn(150);
		},
		success:function(data){
			if(data.code==1){
				//swal("验证成功", "", "success");
				location.href="user/toIndex";
			}else{
				swal("账号或密码不正确", "换个姿势吧", "error");
			}
		},
		complete:function(){
			$('#zhezhao').fadeOut(150);
		},
		error:function(){
			swal("服务器不小心被外星人带走了", "稍后再试吧", "error");
		}
	});
}

function clearTip(){
	$('#tip01').fadeOut(100);
	$('#tip02').fadeOut(100);
}