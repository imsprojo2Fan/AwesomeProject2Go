

var isToSurvey = false;
var isPhone = false;

$(document).ready(function() {
	
	isToSurvey = getCookieValue('isToSurvey');
	watch();
	// Header Scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 50) {
			$('#header').addClass('fixed');
			$('#login').show();
			if (scroll>= 2048) {
				if(!isToSurvey){
					toInvestigate(isPhone);
				}
			}
		} else {
			$('#header').removeClass('fixed');
			$('#login').hide();
		}
	});

	// Fancybox
	$('.work-box').fancybox();

	// Flexslider
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
	});

	// Page Scroll
	var sections = $('section')
		nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});	
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
	
});

//提醒是否前往调研计划
function toInvestigate(isPhone){
	
	addCookie('isToSurvey', true, 1, '/');
	isToSurvey = true;
	swal({
		  title: "我们有个不成熟的调查",
		  text: "是否前往？",
		  type: "info",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "是",
		  cancelButtonText: "否",
		  closeOnConfirm: false
		},

		function(){
		  /*if(isPhone){
			  window.open("investigate.html","_blank");
		  }else{*/
			  //window.open("investigate.html","_blank");
                window.open("/index/operate?type=survey","_blank");
		  /*}*/
		  
		  swal("感谢您的配合", "「		您的参与将会是我们伟大计划中至关重要的一步	」", "success");

		});
};

function watch(){
	  var flag_ = 0;
	  //alert("test");
	  if(isMobile()){
		  isPhone = true;
	  }else{
		  isPhone = false;
	  }
}
		
function isMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    return bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM ;
}

		function addCookie(name,value,days,path){   /**添加设置cookie**/  
			var name = escape(name);  
			var value = escape(value);  
			var expires = new Date();  
			expires.setTime(expires.getTime() + days * 3600000 * 24);  
			//path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
			path = path == "" ? "" : ";path=" + path;  
			//GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
			//参数days只能是数字型  
			var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
			document.cookie = name + "=" + value + _expires + path;  
		}  
		function getCookieValue(name){  /**获取cookie的值，根据cookie的键获取值**/  
			//用处理字符串的方式查找到key对应value  
			var name = escape(name);  
			//读cookie属性，这将返回文档的所有cookie  
			var allcookies = document.cookie;         
			//查找名为name的cookie的开始位置  
			name += "=";  
			var pos = allcookies.indexOf(name);      
			//如果找到了具有该名字的cookie，那么提取并使用它的值  
			if (pos != -1){                                      //如果pos值为-1则说明搜索"version="失败  
				var start = pos + name.length;                  //cookie值开始的位置  
				var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
				if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie  
				var value = allcookies.substring(start,end); //提取cookie的值  
				return (value);                           //对它解码        
			}else{  //搜索失败，返回空字符串  
				return "";  
			}  
		}  
		function deleteCookie(name,path){   /**根据cookie的键，删除cookie，其实就是设置其失效**/  
			var name = escape(name);  
			var expires = new Date(0);  
			path = path == "" ? "" : ";path=" + path;  
			document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;  
		}


function changeOpacity(this_,flag){
    if(flag==1){
        $(this_).css('opacity','0.85');
        $(this_).attr('filter: alpha(opacity=85)');
    }else{
        $(this_).css('opacity','0.35');
        $(this_).attr('filter: alpha(opacity=35)');
    }
}
//回到顶部
function goTop(){
    $('html,body').animate({'scrollTop':0},100);
}
//获取点赞数、点赞状态
function getFabulous(type){
    $.ajax({
        url : "/index",
        type : "POST",
        cache : false,
        dataType : "json",
        data:{
            _xsrf:$('#_xsrf').val(),
            "type":type
        },
        success : function(data) {
            if(data.data){
                if(type=='getAdmin'){
                    for(var i=0;i<4;i++){
                        var ELE = '#admin'+i;
                        $(ELE).html(data.data[i]);
                    }
                }else{
                    //console.log("正序:"+data);
                    //console.log("反序:"+data.reverse());
                    data.data.reverse()
                    for(var i=3;i>-1;i--){
                        var ELE_ = '#admin_'+i;

                        if(data.data[i].Isvalid==1){
                            $(ELE_).addClass('fa fa-thumbs-up');
                        }
                    }
                }
            }
        },
        complete : function() {

        }
    });
}
//点赞行为
function updateFabulou(e1,e2,id){
    var isValid = $(e1).attr('class');
    if(isValid=='fa fa-thumbs-o-up'){//未点赞状态
        isValid = 1;
    }else{
        isValid = 0;
        canFabulous(e1,e2,id,isValid);
        return false;
    }
    $.ajax({
        url : '/index',
        type : "POST",
        cache : false,
        data:	{
            type:"updateFabulou",
            'id':id,
            'isValid':isValid,
            "_xsrf":$('#_xsrf').val()
        },
        dataType : "json",
        success : function(data) {
            if(data.code==1){
                fabulous();
                //点赞数+1
                $(e1).attr('class','fa fa-thumbs-up');
                var count = parseInt($(e2).text())+1;
                $(e2).html(count);
            }
        },
        complete : function() {

        }
    });
}
//点赞成功
function fabulous(){
    swal("感谢您的赞", "「	每一次的鼓励总能带来新的动力	」", "success");

};

//取消点赞确认
function canFabulous(e1,e2,id,isValid){

    swal({

            title: "您确定要取消点赞吗?",

            text: "「	或许因为我做的不够好	」",

            type: "warning",

            showCancelButton: true,

            confirmButtonColor: '#DD6B55',

            confirmButtonText: '确定',

            cancelButtonText: "取消",

            closeOnConfirm: false,

            closeOnCancel: false

        },
        function(isConfirm){

            if (isConfirm){
                $.ajax({
                    url : '/index',
                    type : "POST",
                    cache : false,
                    data:	{"type":"updateFabulou",'id':id,'isValid':isValid,"_xsrf":$('#_xsrf').val()},
                    dataType : "json",
                    success : function(data) {
                        if(data.code==1){
                            swal("操作成功!", "「	我一定会更努力的	」", "success");
                            //点赞数-1
                            $(e1).attr('class','fa fa-thumbs-o-up');
                            var count = parseInt($(e2).text())-1;
                            $(e2).html(count);
                        }
                    },
                });
            } else {
                swal("感谢您的激励", "「		点赞并不是为了做的足够好，而是更好	」", "error");
            }
        });
};


function subDemand(){

    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test($('#phone').val().trim())) {
        swal("手机号位数或格式不正确", "没准外星人可以接收到吧", "error");
        return false;
    }

    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(!re.test($('#mail').val().trim())){
        swal("请填写正确的邮箱地址", "外星人也不一定能收到", "error");
        return ;
    }

    if(!$('#comments').val().trim()){
        swal("您还没填写需求呢", "虽然已迫不及待", "error");
        return;
    }
    $.ajax({
        type:'POST',
        url:'/index',
        cache:false,
        dataType:'json',
        data:{
            "type":"addDemand",
            "_xsrf":$('#_xsrf').val(),
            //$('#cform').serialize()
            name:$('#name').val().trim(),
            phone:$('#phone').val().trim(),
            mail:$('#mail').val().trim(),
            demand:$('#comments').val().trim()
        },
        success:function(data){
            if(data.code==1){
                swal("您的需求我们已收到", "客服将尽快与您联系", "success");
                $('#cform')[0].reset();
                goTop();
            }else{
                swal("服务器不小心被外星人带走了", "稍后再试吧", "error");
            }
        }
    });
}

function toSurvey(){
    window.open("/index/operate?type=survey","_blank");
}

function toRemote(){
    window.open("/index/operate?type=remote","_blank");
}


function toLogin(){
    window.open("/login","_blank");
}


