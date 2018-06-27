/* 
 * signdrag 1.0
 * create by tony@jentian.com
 * date 2015-08-18
 * 拖动滑块
 */
(function($){
    $.fn.signdrag = function(options){
        var x, signdrag = this, isMove = false, defaults = {
        };
        var options = $.extend(defaults, options);
        //添加背景，文字，滑块
        var html = '<div class="signdrag_bg"></div>'+
                    '<div class="signdrag_text" onselectstart="return false;" unselectable="on">拖动滑块验证</div>'+
                    '<div class="handler handler_bg"></div>';
        this.append(html);
        
        var handler = signdrag.find('.handler');
        var signdrag_bg = signdrag.find('.signdrag_bg');
        var text = signdrag.find('.signdrag_text');
        var maxWidth = signdrag.width() - handler.width();  //能滑动的最大间距
        
        //鼠标按下时候的x轴的位置
        handler.mousedown(function(e){
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
        });
        
        //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(document).mousemove(function(e){
            var _x = e.pageX - x;
            if(isMove){
                if(_x > 0 && _x <= maxWidth){
                    handler.css({'left': _x});
                    signdrag_bg.css({'width': _x});
                }else if(_x > maxWidth){  //鼠标指针移动距离达到最大时清空事件
                    signdragOk();
                }
            }
        }).mouseup(function(e){
            isMove = false;
            var _x = e.pageX - x;
            if(_x < maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                handler.css({'left': 0});
                signdrag_bg.css({'width': 0});
            }
        });
        
        //清空事件
        function signdragOk(){
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            text.text('验证通过');
            signdrag.css({'color': '#fff'});
            handler.unbind('mousedown');
            //$(document).unbind('mousemove');
            //$(document).unbind('mouseup');
            $('#sign_gray').hide();
            $('#sign_blue').show();
        }
    };
})(jQuery);

