
$(function(){
	getType();
	getProduct(0);
	getNews(1,4);
	
});

function getType(){
	$.ajax({
		url:'/user/listType',
		type:'post',
		dataType:'json',
		cache:false,
		data:{
			
		},
		success:function(data){
			console.log(data);
			$('#liType').html('');
			$('#liType').append('<li><a onclick="getByType(0)" href="javascript:void(0)" class="filter" data-filter="all">所有产品</a></li>');
			//<li><a href="javascript:void(0)" class="filter" data-filter=".t1">保温类</a></li>
			var len = data.length;
			if(len>0){
				for(var i=0;i<len;i++){
					$('#liType').append('<li ><a onclick="getByType('+data[i].id+')" href="javascript:void(0)" class="filter" data-filter="'+data[i].id+'">'+data[i].typeName+'</a></li>');
				}
			}
			
		}
	})
}

function getByType(id){
	getProduct(id);
}
function getProduct(typeId){
	$.ajax({
		url:'/user/productList',
		type:'post',
		dataType:'json',
		cache:false,
		data:{
			'page':1,
			'rows':12,
			'sidx':'create_time',
			'sord':'desc',
			'typeId':typeId
		},
		success:function(data){
			console.log(data.rows);
			//debugger;
			$('#productContainer').html('');
			var dataArr = data.rows
			var len = dataArr.length;
			if(len>0){
				for(var i=0;i<len;i++){
					var type = dataArr[i].id;
					var srcStr = dataArr[i].imgsrc;
					if(srcStr){
						var picArr = srcStr.split(',');
						var pic = picArr[0];
						var name = dataArr[i].name;
						var descript = dataArr[i].descript;
						var id = dataArr[i].id;
						$('#productContainer').append('<span class="picContainer" ><img class="product" onclick="Mask(1,this)" id="'+descript+'" onmouseover="changePic(this,1)" onmouseout="changePic(this,0)" title="'+name+'" alt="'+id+'" src="'+pic+'" ></span>');
					}
					
					
					
					//$('#productContainer').append('<li style="display: inline-block;" class="mix '+type+'"><a href="T1P1_singleproduct.html" data-largesrc="'+pic+'" data-title="'+name+'" data-description="'+descript+'"><img data-original="'+pic+'"  class="lazy"  alt="'+name+'"><div class="hover-mask"><h3>'+name+'</h3><span><i class="fa fa-search fa-2x"></i></span></div></a></li>')
					
				
				}
			}
		}
	});
}
	 function changePic(this_,flag){
     	if(flag==1){
     		$(this_).addClass('productHover');
     	}else{
     		$(this_).removeClass('productHover');
     	}
     }
     function Mask(flag,this_){
     	//debugger;
     	
     	if(flag==1){
     		
     		console.log(this_.id);
         	console.log('id:'+this_.alt);
         	console.log(this_.src);
         	var id = this_.alt;
         	updateViews(id);
         	var name = this_.title;
         	var src = this_.src;
         	var str = this_.id;
         	var descript;
         	if(str.length>95){
         		descript = str.substring(0,95)+'...';
         	}else{
         		descript = str;
         	}
         	
     		$('#product-mask').fadeIn(500);
     		$('#mask-container').html('');
         	$('#mask-container').append('<span class="og-close"></span><img class="product-detail" src="'+src+'" ><div style="width:75%;border:0px solid red;position:relative;z-index:1001;top:-1%;right:-5%;"><table><tr><td><h2>'+name+'</h2></td></tr><tr><td><p>'+descript+'</p></td></tr><tr><td><h4><span title="前往产品详情页" onmouseout="changeBorder(this,0)" onmouseover="changeBorder(this,1)" onclick="toDetail('+id+');" style="border:2px solid #fff;padding:2px 5px;cursor:pointer;">查看详情<span class="glyphicon glyphicon-chevron-right"></h4></span></span></td></tr></table></div>');
     	}else{
     		$('#product-mask').fadeOut(500);
     	}
     	
     	
     }
     function toDetail(id){
     	//alert(id);
    	 window.open('SingleProduct.html?id='+id,'_blank');
     }
     function changeBorder(this_,flag){
     	if(flag==1){
     		$(this_).css('border-color','#63b670');
     	}else{
     		$(this_).css('border-color','#fff');
     	}
     	
     }
     
     function updateViews(id){
    	 $.ajax({
    		 url:'/user/productUpdate',
    		 type:'post',
    		 dataType:'json',
    		 cache:false,
    		 data:{
    				'id':id,
    				'views':'1'
    			},
    		 success:function(data){
    				
    			}
    	 });
     }
     
     function updateNewsViews(id){
    	 $.ajax({
    		 url:'/user/newsUpdate',
    		 type:'post',
    		 dataType:'json',
    		 cache:false,
    		 data:{
    				'id':id,
    				'views':'1'
    			},
    		 success:function(data){
    				
    			}
    	 });
     }
     
     function getNews(pageNow,pageSize){
    	 
    	 $.ajax({
    			url:'/user/newsList',
    			type:'post',
    			dataType:'json',
    			cache:false,
    			data:{
    				'page':pageNow,
    				'rows':pageSize,
    				'sidx':'create_time',
    				'sord':'desc'
    			},
    			success:function(data){
    					$('#news').html('');
	    				console.log(data.rows+"---news");
	    				var objArr = data.rows;
	    				for(var i=0;i<objArr.length;i++){
	    					var id = objArr[i].id;
	    					var title= objArr[i].title;
	    					var about = objArr[i].about;
	    					var descript;
	    		         	if(about.length>125){
	    		         		descript = about.substring(0,125)+'...';
	    		         	}else{
	    		         		descript = about;
	    		         	}
	    					var srcArr = objArr[i].img.split(',');
	    					var pic = srcArr[0];
	    					console.log(pic+"---pic");
		    				$('#news').append('<article class="col-md-3 col-sm-6 col-xs-12 clearfix wow fadeInUp" data-wow-duration="100ms"><div class="note"><div class="media-wrapper"><img  class="img-responsive lazy" src="'+pic+'" alt="'+title+'" ></div><div class="excerpt"><h3>'+title+'</h3><p>'+descript+'</p><a class="btn btn-transparent" onclick="toNewsDetail('+id+')" href="javascript:void(0);">了解详情</a></div></div></article>');
	    				}
	    				
    				}
    	 });
    	 
     } 
     
     function toNewsDetail(id){
    	 //alert(id);
    	 window.open('SingleNews.html?id='+id,'_blank');
     }
     
     
     