

var survey01,survey02,survey03,survey04,survey05,survey06,survey07,survey08,survey09,survey10,survey11,
survey11,survey12,survey13,survey14,survey15,survey16,survey17,survey18,survey19;
var surveyType = 0;
$(function(){
			
			$('tr').css('cursor','pointer');
			$(".tableradio tr").slice(1).each(function(){  
		        var p = this;
		        
		        ++surveyType;
		        console.log("surveyType---------"+surveyType);
		        
		        if(surveyType!=9&&surveyType!=10&&surveyType!=11){
		        	 $(this).children().slice(1).click(function(){  
				            $($(p).children()[0]).children().each(function(){
				            	
				                if(this.type=="radio"){  
				                    if(!this.checked){  
				                        this.checked = true;
				                        shownewts_next();
				                    }else{  
				                        this.checked = false;  
				                    }  
				                }  
				            });  
				        });  
		        	
		        }
		        
		    });
	
			
			$('#pre_').css("display","none");
    		$('#next_').css("display","none");
			//清空radio选中
			$(":radio").attr('checked',false);
			$('textarea').val('');
			
			 /*var trBgcolor;
			 var ArrTR = $("tr");
			 ArrTR.each(function(index,element){
				 $(element).mouseout(function(){
					 $(this).css('background-color','#ffffff4d');
				});
			    
			  $(element).mouseenter(function(){
				  	$(this).css('background-color','#fff');
				  });
			  });*/
			 $(":radio").click(function(this_){
				   shownewts_next();
			 });
});

		
       function toSend(val){
    	   console.log(val);
    	   if(!val.trim()){
    		   return false;
    	   }
    	   swal({
    			  title: "您的需求或建议是否填写完毕？",
    			  text: "「		每一个字符的填写都饱含着我们满满的感恩	」",
    			  type: "info",
    			  showCancelButton: true,
    			  confirmButtonColor: "#DD6B55",
    			  confirmButtonText: "是",
    			  cancelButtonText: "否",
    			  closeOnConfirm: false
    			  },
	    		  function(isConfirm){
	    			if (isConfirm) {
	    				$("#next").removeAttr("onclick");
	    				$("#next").attr("onclick","shownewts_next();");
	    				$('#next').click();
	    				swal({
	    					title: "",
	    					text: "",
	    					timer: 1
	    					});
		    			}
	    		 });
       }
       
       function subSurvey(){

       	var myArr = new Array();
           $("input[type='radio']:checked").each(function (index,item) {
               myArr.push($(this).val());
			   console.log($(this).val());
               //$("input[type='radio']:checked").val();
           });

    	   var mail = $('#mail').val().trim();
           var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    	   if(!mail){
    		   swal("还没填写邮箱喔", "「	每一次联系总能让彼此走的更近」", "error");
    		   return;
    	   }else if(!re.test(mail)){
    	   		swal("邮箱地址格式不正确", "Oops", "error");
    	   		return ;
		   }else{
				  $.ajax({
						url:'/index/survey',
						type:'post',
						cache:false,
						dataType:'json',
						data:{
                            "_xsrf":$('#_xsrf').val(),
							survey01:myArr[0],
							survey02:myArr[1],
							survey03:myArr[2],
							survey04:myArr[3],
							survey05:myArr[4],
							survey06:myArr[5],
							survey06:myArr[6],
							survey07:myArr[7],
							survey08:myArr[8],
							survey09:myArr[9],
							survey10:myArr[10],
							survey11:myArr[11],
							survey12:myArr[12],
							survey13:myArr[13],
							survey14:myArr[14],
							survey15:myArr[15],
							survey16:myArr[16],
							survey17:myArr[17],
							survey18:myArr[18],
							survey19:myArr[19],
							demand:$('#demand').val(),
							mail:$('#mail').val()
						},
						success:function(data){
							if(data.code==1){
								swal("您是第"+data.data+"位参与调研的用户", "我们会继续努力的^_^o", "success");
								$('#submit').hide();
								$('#foot02').hide();
								$('#succ').show();
								$('#foot04').show();
								var num = 15;
								setInterval(function(){
									num--
									if(num<10){
										num = '0'+num;
									}
									$('#timer').html(num);
									if(num==0){
										window.open('/login','_self');
									}
								},800);
							}else{
								swal("服务器不小心被汪星人带走了", "稍后再试吧", "error");
							}
						}
					});
    	   }
	}
       
       function toSign(){
    	    window.open('quickSign.html','_self');
       }
       
       
       