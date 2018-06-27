
var storageFlag = false;
$(function(){

    if(window.localStorage){
        //alert("浏览支持localStorage")
        storageFlag = true;
    }else{
        //alert("浏览暂不支持localStorage")
    }

    //获取当前存储菜单选中项
    if(storageFlag){
        var URL = localStorage.getItem("curNav");
        console.log(URL);
        if(URL){
            $(".J_menuItem").each(function () {
                var url = $(this).attr('href');
                if(url===URL){
                    $(this).parent().addClass("active");
                    $("#J_iframe").attr('src',url);
                    return
                }
            });
        }else{
            $('#main').parent().addClass("active");
            $("#J_iframe").attr('src',"/user/main");
        }

    }

    //菜单点击
    $(".J_menuItem").on('click',function(){

        $('.tab').each(function () {//移除选中
           $(this).removeClass("active");
        });

        var url = $(this).attr('href');
        $(this).parent().addClass("active");
        $("#J_iframe").attr('src',url);
        if(storageFlag){
            localStorage.setItem("curNav",url);
        }
        return false;
    });

    $(".logTime").each(function () {//更改时间格式
        var time = $(this).html();
        var i = time.indexOf("+");
        time = time.substring(0,i);
        $(this).html(time);
    });
});

function changeColor(this_,flag){
    if(flag==1){
        $(this_).css('opacity','1');
        $(this_).attr('filter: alpha(opacity=100)');
    }else{
        $(this_).css('opacity','0.65');
        $(this_).attr('filter: alpha(opacity=65)');
    }
}

function logout() {
    $.post("/login/operate",{type:"logout",_xsrf:$('#_xsrf').val()},function (data) {
        if (data.code==1){
            window.open("/login","_self");
        }
    });
}

function hideLog() {
    $('#more').click();
}


