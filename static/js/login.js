	var _handle='';//储存电话是否填写正确

		$(function(){

			$(".signup-form input").on("focus",function(){
				$(this).parent().addClass("border");
			});

			$(".signup-form input").on("blur",function(){
				$(this).parent().removeClass("border");
			})

			//注册方式切换
			$(".signup-select").on("click",function(){

				var _text=$(this).text();
				var $_input=$(this).prev();
				$_input.val('');
				if(_text=="手机注册"){
					$(".signup-tel").fadeIn(200);
					$(".signup-email").fadeOut(180);
					$(this).text("邮箱注册");
					$_input.attr("placeholder","手机号码");
					$_input.attr("onblur","verify.verifyMobile(this)");
					$(this).parents(".form-group").find(".error-notic").text("手机号码格式不正确")
				}

				if(_text=="邮箱注册"){
					$(".signup-tel").fadeOut(180);
					$(".signup-email").fadeIn(200);
					$(this).text("手机注册");
					$_input.attr("placeholder","邮箱/手机");
					$_input.attr("onblur","verify.verifyEmail(this)");
					$(this).parents(".form-group").find(".error-notic").text("邮箱格式不正确")
				}

			});

			//步骤切换

			var _boxCon=$(".box-con");
			$(".move-login").on("click",function(){
				$(_boxCon).css({
					'marginLeft':0
				})

			});

			$(".move-signup").on("click",function(){
				$(_boxCon).css({
					'marginLeft':-320
				})
			});

			$(".move-other").on("click",function(){
				$(_boxCon).css({
					'marginLeft':-640
				})

			});

			$(".move-reset").on("click",function(){
				$(_boxCon).css({
					'marginLeft':-960
				})

			});

			$("body").on("click",".move-addinf",function(){
				$(_boxCon).css({
					'marginLeft':-1280
				})

			});

			//获取短信验证码
			var messageVerify=function (){
				$(".get-message").on("click",function(){
					if(_handle){
						$("#message-inf").fadeIn(100)
						$(this).html('<a href="javascript:;">下一步</a><img class="loading" src="images/loading.gif">').addClass("move-addinf");
					}
				});
			}();
		});

		//表单验证
		function showNotic(_this){
			$(_this).parents(".form-group").find(".error-notic").fadeIn(100);
            $(_this).focus();
		}//错误提示显示

		function hideNotic(_this){
			$(_this).parents(".form-group").find(".error-notic").fadeOut(100);
		}//错误提示隐藏

		var verify={
			verifyEmail:function(_this){
				var validateReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				var _value=$(_this).val();
            	if(!validateReg.test(_value)){
            		showNotic(_this)
            	}else{
            		hideNotic(_this)
            	}

			},//验证邮箱

			verifyMobile:function(_this){
				var validateReg = /^((\+?86)|(\(\+86\)))?1\d{10}$/;
				var _value=$(_this).val();
            	if(!validateReg.test(_value)){
            		showNotic(_this);
            		_handle=false;
            	}else{
            		hideNotic(_this);
            		_handle=true;
            	}
            	return _handle
			},//验证手机号码
			PasswordLenght:function(_this){
				var _length=$(_this).val().length;
				if(_length<6){
					showNotic(_this)
				}else{
            		hideNotic(_this)
            	}
			},//验证设置密码长度
			VerifyCount:function(_this){
				var _count="123456";
				var _value=$(_this).val();
				console.log(_value)
				if(_value!=_count){
					showNotic(_this)
				}else{
					hideNotic(_this)
				}
			}//验证验证码
		}
		
		//验证注册账号
		function varify(_this){
			var acc = _this.value.trim();
			if(acc.length!=11){
				checkMail(_this);
			}else{
				alert('验证手机');
				checkMobile(acc);
			}
		}
		
//表单验证========================================================
		
		function validate(val,id,tipid){
			var acc = val;
			var flag = false;
			if(!acc){
				val = val.trim();
				if(!val){
					$('#tip01').html('<span class="tip_warning">请输入登录邮箱</span>').fadeIn(100);
					return flag;
				}
			}else{
				if(!checkMail(acc)){
					return;
				}
				$.ajax({
					type : 'POST',
					url : 'user/validate',
					dataType : 'json',
					data : {
						account:acc
					},
					cache : false,
					success : function(data) {
						if (data.code == 1) {
							$(tipid).html('<span class="tip_succ">邮箱地址可用</span>').fadeIn(100);
						} else {
							$(tipid).html('<span class="tip_warning">邮箱地址不可用</span>').fadeIn(100);
							setTimeout(function(){
								$(id).val('');
							},1000);
						}
					}
				});
				return true;
			}
		}
		
		function varifyPass(val){
			val = val.trim();
			if(!val){
				$('#tip02').html('<span class="tip_warning">请输入密码</span>').fadeIn(100);
				return false;
			}
			if(val.length<6){
				$('#tip02').html('<span class="tip_warning">密码长度过短</span>').fadeIn(100);
				return false;
			}
				return true;
		}
		
		function checkMail(val,id){
			val = val.trim();
			if(!val){
				$(id).html('<span class="tip_warning">请输入邮箱地址</span>').fadeIn(100);
				return false;
			}
			var validateReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var t = val.indexOf('.com');
        	if(!validateReg.test(val)||t<=0){
        		$(id).html('<span class="tip_warning">邮箱格式不正确</span>').fadeIn(100);
        		return false;
        	}
        		return true;
		}
		
		function checkMobile(val){
			val = val.trim();
			if(!val){
				$('#tip03').html('<span class="tip_warning">请输入手机号</span>').fadeIn(100);
				return false;
			}
			var validateReg = /^((\+?86)|(\(\+86\)))?1\d{10}$/;
        	if(!validateReg.test(val)){
        		$('#tip03').html('<span class="tip_warning">手机号格式不正确</span>').fadeIn(100);
        		return false;
        	}
        		return true;
		}
		function showTag(id,val){
			val = val.trim();
			if(!val){
				$(id).hide(100);
				return;
			}
			$(id).show(100);
		}
		
		function clearTip(id){
			$(id).fadeOut(100);
		}
		var url;
		function sign(flag) {
            url = '/login/operate';
            formId = '#signForm';
            var mail = $('#register_mail').val().trim();
            var password = $('#register_password').val().trim();

            if(!mail){
                $("#tip04").html('<span class="tip_warning">请输入邮箱地址</span>').fadeIn(100);
                return false;
            }
            var validateReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var t = mail.indexOf('.com');
            if(!validateReg.test(mail)||t<=0){
                $("#tip04").html('<span class="tip_warning">邮箱格式不正确</span>').fadeIn(100);
                return false;
            }
            if(!password){
            	$('#tip05').html("密码不能为空!");
            	return ;
			}
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                data: {
                    mail: mail,
                    password: password,
					type:"sign",
                    _xsrf:$('#token').val()
                },
                cache: false,
                success: function (data) {
                    if (data.code == 1) {
                        /*$('#tip01').html('<span class="tip_succ">注册成功</span>').fadeIn(100);*/
                        $('#signForm')[0].reset();
                        $('.tip_warning').fadeOut(100);
                        $('.tip_succ').fadeOut(100);
                        $('.endTip').fadeOut(100);
                        signSucc();
                    } else {
                        swal(data.msg, "Oops,出错了", "error");
                        $('#signForm')[0].reset();
                        $('.tip_warning').fadeOut(100);
                        $('.tip_succ').fadeOut(100);
                        $('.endTip').fadeOut(100);
                        setTimeout(toLogin(), 3000);
                    }
                },
				error:function () {
                    swal("服务器不小心被外星人带走了", "稍后再试吧", "error");
                }
            });
        }
		
		//触发点击事件返回登录界面
		function toLogin(){
			// IE
			if(document.all) {
				document.getElementById("toLogin").click();
			}
			// 其它浏览器
			else {
				var e = document.createEvent("MouseEvents");
				e.initEvent("click", true, true);
				//document.getElementById("toLogin").dispatchEvent(e);
			}
		}
		function login(){
			
			url = '/login/operate';
			formId = '#loginForm';
			var account = $('#account').val().trim();
			var password = $('#password').val().trim();
			if(!account){
				$('#account_result').html('<span class="tip_warning01">请输入账号</span>').fadeIn(100);
				return
			}
			if(!password){
				$('#login_result').html('<span class="tip_warning01">密码不能为空</span>').fadeIn(100);
				return;
			}
			$.ajax({
				type : 'POST',
				url : url,
				dataType : 'json',
				data :{
					account:account,
					password:password,
                    _xsrf:$('#token').val(),
                    type:'login',
					ipObj : ipObj
				} ,
				cache : false,
				beforeSend:function(){
					$('#loading').fadeIn(150);
				},
				success : function(data) {
					if (data.code == 1) {
						//判断是否选中cookie
						 var cookie_ = $('#cookie').val();
						 var isCheck = $('#cookie').is(':checked');
						 //alert(isCheck);
						 if(isCheck){
							 //添加cookie 
							 addCookie("account",account,7,"/");  
							 addCookie("password",password,7,"/");
						   }else{
							 //alert('未选中');
							 //移除cookie  
							 deleteCookie("account",'/');  
							 deleteCookie("password",'/'); 
						   }
						    //debugger
							window.location.href="/user";
					} else {
							swal(data.msg, "Oops,出错了", "error");
							//$('#login_result').html('<span class="tip_warning01">账号或密码不正确</span>').fadeIn(100);
					}
				},
				complete:function(){
					$('#loading').fadeOut(150);
				}
			});
		}
		
		function changeBg(_this,c){
			$(_this).css('background',c);
		}
		function ajaxCall(url){
			
			$.ajax({
				type : 'POST',
				url : url,
				dataType : 'json',
				
				data :data ,
				cache : false,
				success : function(data) {
					
				}
			});
		}
		
		
//动画旋转===========================================================================================
		function rotate(percent, scale){
            var radian = Math.PI * percent;
            var angle  = 180 * percent;
            var scale  = 1;
            var style  = document.getElementById("Z").style;
            var transform = "rotate("+ angle +"deg) scale("+ scale +")";

            style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand',M11="+Math.cos(radian)*scale+",M12="+(Math.sin(radian) * -1)*scale+",M21="+Math.sin(radian)*scale+",M22="+Math.cos(radian)*scale+");";
            style.MozTransform    = transform;
            style.WebkitTransform = transform;
            style.OTransform      = transform;
            style.Transform       = transform;
        }
        i=0;
        setInterval("rotate(i);i+=0.01", 10);
		
      //动画旋转
		function rotate2(percent, scale){
            var radian = Math.PI * percent;
            var angle  = 180 * percent;
            var scale  = 1;
            var style  = document.getElementById("I").style;
            var transform = "rotate("+ angle +"deg) scale("+ scale +")";

            style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand',M11="+Math.cos(radian)*scale+",M12="+(Math.sin(radian) * -1)*scale+",M21="+Math.sin(radian)*scale+",M22="+Math.cos(radian)*scale+");";
            style.MozTransform    = transform;
            style.WebkitTransform = transform;
            style.OTransform      = transform;
            style.Transform       = transform;
        }
		setInterval("rotate2(i);i+=0.02", 10);

		//注册成功提示===========================================
		function signSucc(){
			swal("账号注册成功", "「需前往邮箱激活账号」", "success");
			return true;
		};


		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		