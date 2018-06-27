//判断是否为移动设备
/*function isMobile() {
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
}*/
//音乐播放器改变透明度
function changeOpacity(this_,flag){
	if(flag==1){
		$(this_).css('opacity','0.85');
		$(this_).attr('filter: alpha(opacity=85)');
	}else{
		$(this_).css('opacity','0.35');
		$(this_).attr('filter: alpha(opacity=35)');
	}
}

function changeColor(this_,flag){
	if(flag==1){
		$(this_).css('opacity','1');
		$(this_).attr('filter: alpha(opacity=100)');
	}else{
		$(this_).css('opacity','0.65');
		$(this_).attr('filter: alpha(opacity=65)');
	}
}
