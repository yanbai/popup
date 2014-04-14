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
	function handleEvent(event){
		event=event||window.event;
		var target=event.target||event.srcElement;
		switch(event.type){
			case "mousedown":
				if(target.className.indexOf("draggable")>-1){
					if(document.getElementById('dragFrame')){dragging=document.getElementById('dragFrame')}else{dragging=target;}
					diffX = event.clientX-dragging.offsetLeft;
					diffY = event.clientY-dragging.offsetTop;
					dragdrop.fire({type:"dragstart",target:dragging,x:event.clientX,y:event.clientY})
				}
				break;
			case "mousemove":
				if(dragging!==null){
					event=event||window.event;
					//指定位置
					dragging.style.left=event.clientX-diffX+'px';
					dragging.style.top=event.clientY-diffY+'px';
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
DragDrop.addHandler("dragstart",function(event){
	if(document.getElementById("status")){
		var status = document.getElementById("status");
		status.innerHTML = "Started dragging";
	}
})
DragDrop.addHandler("drag",function(event){
	if(document.getElementById("status")){
		var status = document.getElementById("status");
		status.innerHTML = "<br/>dragged"+event.target.id + "to ("+event.x+","+event.y+")" +event.difx+';;'+event.dify;
	}
})
DragDrop.addHandler("dragend",function(event){
	if(document.getElementById("status")){
		var status = document.getElementById("status");
		status.innerHTML = "<br/>dragged"+event.target.id + "at ("+event.x+","+event.y+")";
	}
})
DragDrop.enable();
//var _drag=new dragdrop();
//var drag=document.getElementById("drag");
//EventUtil.addHandler(drag,_drag.handleEvent(event),)