jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

});

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