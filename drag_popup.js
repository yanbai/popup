function EventTarget(){
	this.object_handlers = {};
}

EventTarget.prototype = {
	constructor:EventTarget,
	addHandler:function(type,handlerFun){
		if(typeof this.object_handlers[type]=="undefined"){
			this.object_handlers[type] = [];
		}
		this.object_handlers[type].push(handlerFun)
	},
	fire:function(event){
		if(!event.target){event.target=this};
		if(this.object_handlers[event.type] instanceof Array){
			var handlerArray = this.object_handlers[event.type]
			for(var i = 0 , l = handlerArray.length;i<l;i++){
				handlerArray[i](event)
			}
		}
	},
	removeHandler:function(type,handlerFun){
		if(this.object_handlers[type] instanceof Array){
			var handlerArray = this.object_handlers[type];
			for(var i=0,l=handlerArray.length;i<l;i++){
				if(handlerArray[i]===handler){
					break;
				}
			}
			handlers.spice(i,1);
		}
	}
}

var EventUtil={
	addHandler:function(ele,type,handler){
		if(ele.addEventListener){
			ele.addEventListener(type,handler,false);
		}else if (ele.attachEvent){
			ele.attachEvent('on'+type,handler);
		}else{
			ele['on'+type]=handler;
		}
	},
	getEvent:function(event){
		return event ? event : window.event;
	},
	getTarget:function(event){
		return event.target || event.srcElement;
	},
	removeHandler:function(ele,type,handler){
		if(ele.removeEventListener){
			ele.removeEventListener(type,handler,false);
		}else if(ele.detachEvent){
			ele.detachEvent('on'+type,handler);
		}else{
			ele['on'+type]=null;
		}
	}
};

var DragDrop = function(){
	var dragdrop = new EventTarget();
	var dragging = null;
	var diffX = 0;
	var diffY = 0;
	var screenW = 0;
	var screenH = 0;
	var wScrollY = (document.compatMode == 'CSS1Compat') ? document.documentElement.scrollTop : document.body.scrollTop;
	function handleEvent(event){
		event=event||window.event;
		var target=event.target||event.srcElement;
		switch(event.type){
			case "mousedown":
				if(target.className.indexOf("draggable")>-1){
					var parent=target.parentNode;
					while(parent.className.indexOf('dragFrame')==-1){
						parent = parent.parentNode;
					}
					if(parent!=window){dragging=parent}else{dragging=target;}
					diffX = event.clientX-dragging.offsetLeft;
					diffY = event.clientY-dragging.offsetTop;
					screenW = $(window).width();
					screenH = $(window).height();
					dragdrop.fire({type:"dragstart",target:dragging,x:event.clientX,y:event.clientY})
					//alert(event.clientY+','+screenH)
				}
				break;
			case "mousemove":
				//console.log(screenH);
				if(dragging!==null){
					event=event||window.event;
					//指定位置
					dragging.style.marginLeft=event.clientX-screenW/2-diffX+'px';
					dragging.style.marginTop=event.clientY-screenH*0.382-diffY+wScrollY+'px';
					//
					dragdrop.fire({type:"drag",target:dragging,x:event.clientX,y:event.clientY,difx:diffX,dify:diffY})
				}break;
			case "mouseup":
				dragdrop.fire({type:"dragend",target:dragging,x:event.clientX,y:event.clientY})
				dragging=null;
				
				break;
		}
	};
	//common interface
	dragdrop.enable = function(){
		/*
window.onresize=function(){
			if(!G('tanchuan_big') && !G('tanchuan_small')){}
			else{
				var popup = G('tanchuan_big')||G('tanchuan_small');
				popup.style.marginTop = -$('#tanchuan_'+size).height()/2;
				popup.style.marginLeft = -$('#tanchuan_'+size).width()/2;
			}
		}
*/
		EventUtil.addHandler(document,"mousedown",handleEvent);
		EventUtil.addHandler(document,"mousemove",handleEvent);
		EventUtil.addHandler(document,"mouseup",handleEvent);
	};
	dragdrop.disable = function(){
		EventUtil.removeHandler(document,"mousedown",handleEvent);
		EventUtil.removeHandler(document,"mousemove",handleEvent);
		EventUtil.removeHandler(document,"mouseup",handleEvent);
	};
	return dragdrop;
}();
DragDrop.enable();