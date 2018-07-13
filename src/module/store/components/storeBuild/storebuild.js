
var store_currentItem=null;
var store_background_color="#E6E6E6";
var store_component_number=0;

//装修面板的宽度
var box_width=420;
//装修面板各组件的边距
var box_margin=4;
//需要加载图片的数量。
var box_loadNum=0;

/**
 * 获取url参数
 */
function getParam(url,name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var index=url.lastIndexOf("?");
	if(index<=0)
		return null;
		
	var r = url.substr(index+1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}
/**
 * 页面初始化时调用。
 */
$(document).ready(function(){
	store_compTabChange($("#initializedTab"),"storeTab_1");
 
	//
	store_loadComponent();
	
	var v=$(".view_title").html();
	
	if(v!=null){
		var n=0;
		var charNum = 0;
		for(var i=0;i<v.length;i++){
			if(v.charCodeAt(i)>255){
				n+=2;
			}else{
				n+=1;
			}
			if(Math.ceil(n/2)<=15){
				charNum++;
			}
		}
		
//		if(Math.ceil(n/2)>15){
//			$(".view_title").html(v.substring(0,charNum)+"...");
//		}
	}

	if(storeState=="000003"){
		$(".btn_line").html("<span style='color:#ff0000'>您的店铺已经被关闭，若有疑问请联系码上花平台对接人员！</span>");
	}
	
	//$(window).bind("beforeunload",function(){
        //alert("test");
    //});
});
/**
 * 组件tab的切换效果
 * @obj 被切换的对象，这里是li元素
 * @tabId tab对应的面板的id。
 */
function store_compTabChange(obj,tabId){
	if(obj==store_currentItem){
		return;
	}
	if(store_currentItem!=null){
		$(store_currentItem).attr("class","");
	}
	
	$(obj).attr("class","on");
	store_currentItem=obj;
	
	//获取所有的tab li元素，然后逐个设置面板的显示状态。
	var tabList=$(".bbox").children();
	if(tabList!=null){
		for(var i=0;i<tabList.length;i++){
			if($(tabList[i]).attr("id")==tabId){
				$(tabList[i]).css("display","block");
			}else{
				$(tabList[i]).css("display","none");
			}
		}
	}
}
/**
 * 修改背景颜色。
 */
function store_backGroundChange(color){
	if(store_component_number<=0){
		alert("请先添加组件！");
		return;
	}
	if(store_background_color==color){
		return;
	}
	var param={
		"storeId":storeId,
		"attributeName":"gridBackground",
		"attributeValue":color
	};
	
	$.post(path+"/store/store!doUpdateParam.action",param,function(data){
		if(data.success){
			store_loadComponent();
		}
	},"json");
}
function store_imgLoad(img,dataId){
	var isIE=$.browser.msie?true:false;
	var rect=null;
	var width=0;
	var height=0;
	var index1=img.src.indexOf("?");
	var imgURL=index1!=-1?img.src.substring(0,index1):img.src;
	
	//如果是IE可以从runtimeStyle取得。
	if(isIE){
		var run = img.runtimeStyle;
		//保存原来的尺寸
		var mem = {w: run.width, h: run.height };
		//重写 
		run.width  = run.height = "auto";
		//取得现在的尺寸
		var w = img.width;
		var h = img.height;
		//还原
		run.width  = mem.w;
		run.height = mem.h;
		
		width=w;
		height=h;
		
		imgURL=imgURL+"?w="+w+"&h="+h;
	}else{
		//如果是safari,firefox,chrome,与opera10+中。
		//可以从naturalWidth或者naturalHeight中取得。
		width=img.naturalWidth;
		height=img.naturalHeight;
		imgURL=imgURL+"?w="+img.naturalWidth+"&h="+img.naturalHeight;
	}

	var obj={
		imgWidth:width,
		imgHeight:height,
		imageURL:imgURL,
		dataId:dataId
	};
	$.post(path+"/store/store!doUpdateGridDataParam.action",obj,function(data){
		if(data.success){
			box_loadNum--;
			if(box_loadNum<=0){
				store_loadComponent();
			}
		}
	},"json");
}
/**
 * 将预定义模板中的通配符替换成图片地址。
 * 将形如${1}的替换为<img src=""/>
 */
function store_buildComponentHtml(defineHtml,dataList){
	if(defineHtml==null || defineHtml.length<=0)
		return;
		
	for(var i=0;i<dataList.length;i++){
		var json=eval("("+dataList[i].param+")");
		var gridName=json.gridName;
		var index=defineHtml.indexOf("${"+gridName+"}");
		var isOnLoad=(json.imgWidth==null || json.imgHeight==null ||
					  json.imgWidth=="0" || json.imgHeight=="0" ||
					  json.imgWidth==0 || json.imgHeight==0)?true:false;
		if(isOnLoad){
			box_loadNum++;
		}
		if(index!=-1){
			var index2=defineHtml.indexOf("}",index);
			if(index2!=-1){
				if(store_checkUpComponent(dataList[i].id)){
					defineHtml=defineHtml.substring(0,index)+"<img id='grid_"+gridName+"' src='"+path+"/resource/image/store/warning.png?w=80&h=80'/>"+defineHtml.substring(index2+1);
				}else{
					defineHtml=defineHtml.substring(0,index)+"<img id='grid_"+gridName+"' src='"+json.imageURL+"' "+(isOnLoad?"onload=\"store_imgLoad(this,'"+dataList[i].id+"')\"":"")+"/>"+defineHtml.substring(index2+1);
				}
			}
		}
	}
	while(true){
		var index=defineHtml.indexOf("${");
		if(index!=-1){
			var index2=defineHtml.indexOf("}",index);
			if(index2!=-1){
			
				var gridNum=defineHtml.substring(index+2,index2);
				defineHtml=defineHtml.substring(0,index)+"<img id='grid_"+gridNum+"' src='"+path+"/resource/image/store/imgimg.png?w=217&h=182'/>"+defineHtml.substring(index2+1);
			}
		}else{
			break;
		}
	}
	return defineHtml;
}
function store_checkUpComponent(id){
	if(store_publishWarningItem!=null){
		for(var i=0;i<store_publishWarningItem.length;i++){
			if(store_publishWarningItem[i]==id){
				return true;
			}
		}
	}
	
	return false;
}
function store_removeUpComponent(id){
	if(store_publishWarningItem!=null){
		for(var i=0;i<store_publishWarningItem.length;i++){
			if(store_publishWarningItem[i]==id){
				store_publishWarningItem.splice(i,1);
			}
		}
	}
}
/**
 * 绑定一个组件到当前店铺
 */
function store_addBindComponent(compId){
	var param={
		"storeComponentRel.flagshipID":storeId,
		"storeComponentRel.componentID":compId,
		"storeComponentRel.param":"{\"gridBackground\":\""+store_background_color+"\"}"
	};
	$.post(path+"/store/store!doBindComponent.action",param,function(data){
		if(data.success){
			store_loadComponent();
			window.location.hash="#footer_copyright";
		}
	},"json");
}

/**
 * 改变两个组件的排序
 */
function store_changeSequence(layerId,isUp){
	if(layerId==null)return;
	
	var obj=$("#"+layerId);
	var objId=null;
	
	if(isUp){
		var upobj=obj.prev("div[class='div_component']");
		if(upobj!=null){objId=upobj.attr("id");}
	}else{
		var downobj=obj.next("div[class='div_component']");
		if(downobj!=null){objId=downobj.attr("id");}
	}
	
	var inputParams = {
		"componentId1":layerId.substr(4),
		"componentId2":objId.substr(4)
	};
 	$.post(path+"/store/store!doChangeSequence.action",inputParams,function(data){
		if(data.success){
			store_loadComponent();
		}
	}, "json");
}

/**
 * 删除组件
 */
function store_delete(id){
	if(window.confirm('确定删除该组件吗？')){
		var inputParams = {
			"id":id
		};
			
	 	$.post(path+"/store/store!doDelete.action",inputParams,function(data){
			if(data.success){
				store_loadComponent();
		    }		
		}, "json");
	}
}

var store_publishWarningItem=null;

/**
 * 检验店铺是否已经装修完成。
 */
function store_publishCheck(){
	$.post(path+"/store/store!checkBuildCompleted.action?storeId="+storeId,null,function(data){
		if(!data.isCompleted){
			$.messager.show({
				title:'提示',
				msg:'您的店铺尚未装修完成，不能发布！',
				showType:'fade',
				style:{
					right:'',
					bottom:''
				}
			});				
			return;
	    }else{
	    	if(data.isUp){
	    		store_publishStore(1);
	    	}else{
	    		store_publishWarningItem=data.upList;
			$.messager.show({
				title:'提示',
				msg:'店铺部分装修组件中关联的商品已全部下架,无法发布店铺！',
				showType:'fade',
				style:{
					right:'',
					bottom:''
				}
			});		    		
	    		store_loadComponent();
	    	}
	    }		
	}, "json");

}
/**
 * 预览或发布店铺
 */
function store_publishStore(isPublish){
	$.post(path+"/store/store!doPublish.action?storeId="+storeId+"&isPublish="+isPublish,null,function(data){
		if(data.success){
			if(isPublish!=1){
				var height=650;
				var width=450;
				var iTop = (window.screen.availHeight-30-height)/2; 
				var iLeft = (window.screen.availWidth-10-width)/2;
				var d = new Date(); 
				if(window.showModalDialog)
					window.showModalDialog(path+data.previewURL+"?t="+d.getTime(),data.store.name,'dialogHeight='+height+',dialogWidth='+width+',dialogTop='+iTop+',dialogLeft='+iLeft+',scroll=yes,resizable=no');
				else
					window.open(path+data.previewURL+"?t="+d.getTime(),data.store.name,'height='+height+',width='+width+',top='+iTop+',left='+iLeft+',scroll=yes,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
			}else{
			$.messager.show({
				title:'提示',
				msg:'发布成功',
				showType:'fade',
				style:{
					right:'',
					bottom:''
				}
			});	
			setTimeout(function(){
				window.location.href=path+'/store/store!toBuild.action';
			},2000)
				
			}
	    }
	}, "json");
}

/**
 * 加载绑定的组件
 */
function store_loadComponent(){
	//var progressBar=getProgressBar();
	//	progressBar.show();
		
	$.post(path+"/store/store!loadComponent.action?store.id="+storeId,null,function(data){
		var html="";
		var img="<img src='"+path+"/resource/image/store/imgimg.png'/>";
		
		if(data!=null){
			store_component_number=data.componList.length;
			
			for(var i=0;i<data.componList.length;i++){
				var item=data.componList[i];
				var s="<div class=\"div_component\" id=\"com_"+item.id+"\"><div id=\"layer"+item.id+"\" onmouseout=\"store_hiddenLayer('layer"+item.id+"','layer2"+item.id+"')\"></div>"; 
  					s+="<div id=\"layer2"+item.id+"\" class=\"layer_btn_div\">";
  					s+="<ul><li onclick=\"store_delete('"+item.id+"')\"><img src=\""+path+"/resource/image/store/remove.png\"/></li>";
  					s+="<li onclick=\"store_changeSequence('com_"+item.id+"',false)\" id=\"down_"+item.id+"\"><img src=\""+path+"/resource/image/store/down.png\"/></li>";
  					s+="<li onclick=\"store_changeSequence('com_"+item.id+"',true)\" id=\"up_"+item.id+"\"><img src=\""+path+"/resource/image/store/up.png\"/></li>";
  					s+="</ul></div>";
  					s+="<div class=\"layoutComponent\" onmouseover=\"store_showLayer(this,'layer"+item.id+"','layer2"+item.id+"','up_"+item.id+"','down_"+item.id+"','com_"+item.id+"','"+item.componentID+"')\" >"+store_buildComponentHtml(data.componList[i].componentDefineHtml,data.componList[i].dataList)+"</div></div>";	
				html+=s;
				
				if(item.param!=null && item.param.length>0){
					var p=eval("("+item.param+")");
					if(p.gridBackground!=null && p.gridBackground.length>0){
						store_background_color=p.gridBackground;
					}
				}
			}
			
			if(data.componList.length>0){
				$(".btn_line").css("display","block");
			}else{
				$(".btn_line").css("display","none");
			}
		}
		$(".vbox").html(html);
		
		var box=$(".vbox");
			box.css("background-color",store_background_color);
		//重新布局各个组件
		if(box_loadNum<=0){
			store_layout();
		}
		
		//progressBar.hide();
	},"json");
}
//***********************************************************************************************************
//***********************************下面是遮罩层处理**********************************************************
var _current_layerId1=null;
var _current_layerId2=null;
var _current_component=null;
var _current_grid=null;

/**
 *显示一个遮罩层。
 */		
function store_showLayer(component,layerId,layerId2,upId,downId,comId,componentId){
	if(component==null || layerId==null)
		return;
	//先隐藏上次显示的遮罩层。
	if(_current_layerId1!=null && _current_layerId2!=null){
		store_hiddenLayer(_current_layerId1,_current_layerId2);
	}
	
	//获取当前组件
	var com=$(component);
		_current_component=com;
		
	var obj=$("#"+layerId);
	var inner=obj.html();
	if(inner==null || inner.length<=0){
		//获取当前组件下的容器，只能为1个。
		var container=$(component).children("div[class='container']");
		if(container.length!=1){
			return;
		}	
		
		var containerHeight=0;
		//获取容器高度。
		$(container[0]).children("div[class*='width']").each(function(i,o){
			if(i==0){
				containerHeight=parseInt($(o).height())+(4*2);
			}
		});//获取当前组件下的容器，只能为1个。
		var container=$(component).children("div[class='container']");
		if(container.length!=1){
			return;
		}	
		
		var containerHeight=0;
		//var store_background_color="#555";
		//获取容器高度。
		$(container[0]).children("div[class*='width']").each(function(i,o){
			if(i==0){
				containerHeight=parseInt($(o).height())+(4*2);
			}
		});
		
		obj.attr("style","display:none;position:absolute;background-color:#fff;filter:alpha(opacity=90);-moz-opacity:0.9;opacity:0.9;z-index:99;margin-left:4px; width:"+box_width+"px;height:"+(containerHeight-4)+"px");
		inner=$(com.html());
		inner.attr("style","position:relative;z-index:101;width:"+(box_width-4)+"px;margin:0px;height:"+(containerHeight)+"px;background-color:"+store_background_color+";filter:alpha(opacity=80);-moz-opacity:0.8;opacity:0.8;");
			
		var childs=inner.children("div[class*='width']");
			for(var i=0;i<childs.length;i++){
				var w=$(childs[i]).width();
				var h=$(childs[i]).height();
				
				$(childs[i]).attr("title","点击即可编辑");
				//$(childs[i]).attr("id","grid_"+(i+1));
				$(childs[i]).css("position","relative");
				$(childs[i]).css("z-index","102");
				$(childs[i]).css("background-color",store_background_color);
				$(childs[i]).css("filter","alpha(opacity=0)");
				$(childs[i]).css("-moz-opacity","0");
				$(childs[i]).css("opacity","0");
				$(childs[i]).css("cursor","pointer");
				
				$(childs[i]).mouseenter(function(){
					if(_current_grid!=null){
						$(_current_grid).css("background-color",store_background_color);
						$(_current_grid).css("filter","alpha(opacity=0)");
						$(_current_grid).css("-moz-opacity","0");
						$(_current_grid).css("opacity","0");
					}
					$(this).css("background-color","#ffffff");
					$(this).css("filter","alpha(opacity=100)");
					$(this).css("-moz-opacity","1");
					$(this).css("opacity","1");
					_current_grid=this;
				});
				$(childs[i]).click(function(){
					var id=layerId.substr(5);
					var imgGrid=$($(this).children("img")[0]).attr("id");
					if(imgGrid==null){
						alert("获取网格名称为空！");
						return;
					}
					var gridName=imgGrid.substring(5);
					showModelDialog(720,505,"自定义组件设置-网格"+gridName,path+"/store/store!toConfig.action?relId="+id+"&gridName="+gridName+"&componentId="+componentId,false);
				});
			}	
			
			obj.empty();
			obj.append(inner);
		}
	obj.css("display","block");	
	
	$("#"+layerId2).css("display","block");	
	$("#"+layerId2).css("width",box_width+"px");
	
	if($("div[class='div_component']").first().attr("id")==comId){
//		$("#"+upId).css("background-color","#ccc");
		$("#"+upId).css("cursor","not-allowed");
	}else{
//		$("#"+upId).css("background-color","#888");
		$("#"+upId).css("cursor","pointer");
	}
	if($("div[class='div_component']").last().attr("id")==comId){
//		$("#"+downId).css("background-color","#ccc");
		$("#"+downId).css("cursor","not-allowed");
	}else{
//		$("#"+downId).css("background-color","#888");
		$("#"+downId).css("cursor","pointer");
	}
	
	_current_layerId1=layerId;
	_current_layerId2=layerId2;
}
/**
 * 隐藏遮罩层。
 */
function store_hiddenLayer(layerId,layerId2){
	$("#"+layerId).css("display","none");
	$("#"+layerId2).css("display","none");
}

/**
 * 获取图片的原始大小
 */
function getActualSize(img) {
	var url=img.src;
	var imgW=getParam(url,"w");
	var imgH=getParam(url,"h");
	//如果是已装修的图片，加载的时候可以直接获取大小。
	if(imgW!=null && imgH!=null){
		return {width:imgW, height:imgH};
	}else{
		return null;
	}
}

/**
 * 调整各组件的布局。宽度与高度
 */
function store_layout(){ 
$(".container").each(function(i,o){
 	var child=$(o).children();
 	if(child!=null){
 		var imgs=new Array();
 		var num=child.length;
 		
 		//针对各种类型的网格进行处理
 		switch(num){
 		case 1://1个网格的情况
 		case 2://2个网格的情况
 		case 3://3个网格的情况
	 		var width=Math.ceil((box_width-(num+1)*box_margin)/num);
	 		var height=0;
	 		
	 		for(var j=0;j<child.length;j++){
	 			var imgList=$(child[j]).children("img");
	 			
	 			//这里只能有一个图片，如果多个图片就会有问题。
	 			if(imgList.length!=1)
	 				continue;
	 			//获取图片的原始大小。
				var rect=getActualSize(imgList[0]);
					if(rect==null)
						return;
						
				//计算出缩放的宽度。
				var w=rect.width<width?rect.width:width;
				//计算出缩放的高度。
				var h=((rect.width<width)?rect.height:(rect.height*width/rect.width));
					//获取最大的图片的缩放高度
					height=(h>height)?h:height;
				
				var obj=new Object();
	 				obj.img=imgList[0];
	 				obj.nWidth=Math.ceil(rect.width);
	 				obj.nHeight=Math.ceil(rect.height);
	 				obj.width=Math.ceil(w);
	 				obj.height=Math.ceil(h);
	 					
				imgs[imgs.length]=obj;
	 		}
	 		
	 		//必须保证一个div下面放一张图片，否则会出问题。
	 		for(var j=0;j<child.length;j++){
	 			if(j==child.length-1){
	 				width=(box_width-(num+1)*box_margin)-((child.length-1)*width);
	 			}
	 			//设置div背景的样式
	 			$(child[j]).css("width",width+"px");
	 			$(child[j]).css("height",height+"px");
	 			$(child[j]).css("background-color","#fff");
	 			$(child[j]).css("overflow","hidden");
	 			//设置图片的样式
	 			$(imgs[j].img).css("margin-top",((height-imgs[j].height)<0?0:(height-imgs[j].height))/2);
	 			$(imgs[j].img).css("margin-left",((width-imgs[j].width)<0?0:(width-imgs[j].width))/2);
	 			$(imgs[j].img).css("width",imgs[j].width<width?imgs[j].width:width);
	 			$(imgs[j].img).css("height",imgs[j].height);
	 		}
	 		break;
 		case 5://5个网格的情况
 		
 			var width=Math.ceil((box_width-(2+1)*box_margin)/2);
 			var width2=Math.ceil((width-box_margin)/2);
 				
 			for(var j=0;j<child.length;j++){
	 			var imgList=$(child[j]).children("img");
	 			
	 			//这里只能有一个图片，如果多个图片就会有问题。
	 			if(imgList.length!=1)
	 				continue;
	 			//获取图片的原始大小。
				var rect=getActualSize(imgList[0]);
					if(rect==null)
						return;
						
				var w=0,h=0;
			
				if(j==0){
					//计算出左边大图的缩放宽度。
					w=rect.width<width?rect.width:width;
					//计算出左边大图的缩放高度。
					h=((rect.width<width)?rect.height:(rect.height*width/rect.width));
					//设置最大高度
					height=h;
				}else{
					//计算出缩放的宽度。
					w=rect.width<width2?rect.width:width2;
					//计算出缩放的高度。
					h=((rect.width<width2)?rect.height:(rect.height*width2/rect.width));
					//获取最大的图片的缩放高度
					height=((h*2+box_margin)>height)?(h*2+box_margin):height;
				}
				var obj=new Object();
	 				obj.img=imgList[0];
	 				obj.nWidth=Math.ceil(rect.width);
	 				obj.nHeight=Math.ceil(rect.height);
	 				obj.width=Math.ceil(w);
	 				obj.height=Math.ceil(h);
	 					
				imgs[imgs.length]=obj;
	 		}
 			//必须保证一个div下面放一张图片，否则会出问题。
	 		for(var j=0;j<child.length;j++){
	 			var w=(j==0?width :width2);
	 			var h=(j==0?height:((height-box_margin)/2));
	 			
	 			//设置div背景的样式
	 			$(child[j]).css("width", w+"px");
	 			$(child[j]).css("height",h+"px");
	 			$(child[j]).css("background-color","#fff");
	 			$(child[j]).css("overflow","hidden");
	 			//设置图片的样式
	 			$(imgs[j].img).css("margin-top",((h-imgs[j].height)<0?0:(h-imgs[j].height))/2);
	 			$(imgs[j].img).css("margin-left",((w-imgs[j].width)<0?0:(w-imgs[j].width))/2);
	 			$(imgs[j].img).css("width",imgs[j].width<w?imgs[j].width:w);
	 			$(imgs[j].img).css("height",imgs[j].height);
	 		}
	 		break;
 		default:
 			break;
 		}
 	}
});

}