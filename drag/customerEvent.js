// JavaScript Document
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
