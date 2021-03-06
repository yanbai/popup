
if(window.HTMLElement){
	HTMLElement.prototype.__defineSetter__('outerHTML',function(sHTML){
		var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var df = r.createContextualFragment(sHTML);
		this.parentNode.replaceChild(df,this);
		return sHTML;
	});
	HTMLElement.prototype.__defineGetter__('outerHTML',function(sHTML){
		var attr;
		var attrs = this.attributes;
		var str = '<'+this.tagName.toLowerCase();
		for(var i=0;i<attrs.length;i++){
			var attr=attrs[i];
			if(attr.specified)str+=' '+attr.name+'="'+attr.value+'"';
		}
			if(!this.canHaveChildren)return str+'>';
			return str+'>'+this.innerHTML;
	});
	HTMLElement.prototype.__defineGetter__("canHaveChildren",function() {
		switch(this.tagName.toLowerCase()) {
			case "area":
			case "base":
			case "basefont":
			case "col":
			case "frame":
			case "hr":
			case "img":
			case "br":
			case "input":
			case "isindex":
			case "link":
			case "meta":
			case "param":
			return false;
		}
		return true;
	});
}
/*弹出层*/
var popUp={
	ids:[],
	//ele:function(id){return }
	getDialog:function(id){return this.hasDialog(id)?document.getElementById('tanchuan_'+id):''},
	hasDialog:function(id){return document.getElementById('tanchuan_'+id)?true:false},
	hideDialog:function(id){
		if(this.hasDialog(id)){
			this.getDialog(id).parentNode.removeChild(this.getDialog(id))
			$('.overlay2').remove();$('.overlay').remove();
			this.ids.splice(this.ids.indexOf(id),1);
		}
	},
	alert : function(options){
		this.id = options.id;
		this.options = options;
		this.txt = options.content || '';
		this.tit = options.title || '';
		this.ok = options.ok;
		this.cancel = options.cancel;
		this.btn = this.ok||this.cancel;
		this.okVal = options.okVal||'确认';
		this.cancelVal = options.cancelVal||'取消';
		this.padding = options.padding;
		this.init();
		options.time && this.time(options.time);
	}
};
popUp.alert.prototype = {
	init:function(){
		var t = this;
		if(document.getElementById('tanchuan_'+this.id)){return false;}
		if(popUp.ids.indexOf(this.id)==-1){
			$('body').append('<iframe class="overlay" frameborder="0" scrolling="no"></iframe>\
			<div class="overlay2"></div>\
			<div id="tanchuan_'+this.id+'" class="dragFrame" >\
				<table><tr><td>\
				<div class="tit draggable"><span></span></div>\
				<div class="txt" '+((t.options.padding === 0 || t.options.padding)?('style="padding:'+t.options.padding+'px"'):'')+'></div>\
				</td></tr></table>\
			</div>');
			this.$tanchuan=$('#tanchuan_'+this.id);
			this.html();
			
			
		}
		return this;
	},
	
	OkEle:function(){
		var el,
			t = this;
		if(this.ok){
			el = document.createElement('a');
			el.className = 'wei_btn_1';
			el.href = 'javascript:void(0)';
			el.innerHTML = this.okVal;
		}else{
			el = null;
		}
		if(this.ok instanceof Function){
			el.addEventListener('click',t.ok,false)
		}
		return el;
	},
	
	cancelEle:function(){
		var el,
			t = this;
		if(this.cancel){
			el = document.createElement('a');
			el.className = 'wei_btn_2';
			el.href = 'javascript:void(0)';
			el.innerHTML = this.cancelVal;
			//todo 兼容性
			if(this.cancel instanceof Function){
				el.addEventListener('click',t.cancel,false)
			}else{
				el.addEventListener('click',function(){t.hide('tanchuan_big')},false)
			}
		}else{
			el = null;
		}
		return el;
	},
	
	html:function(options){
		var t = this;
		var o={close:1};
		if(options!=undefined&&options.close!=undefined){$.extend(o,options);}
		this.$tanchuan.find('.tit').find('span').html(this.tit+'<div class="close"><span>x</span></div>');
		this.$tanchuan.find('.close').click(function(){t.hide()});
		
		this.content = document.createElement('div');
		var txt = document.createElement('p');
		txt.innerHTML = this.txt;
		this.content.appendChild(txt);
		if(this.btn){
			var btn = document.createElement('p');
			btn.className = 'btn_area';
			btn.appendChild(this.OkEle());
			btn.appendChild(this.cancelEle());
			this.content.appendChild(btn);
		}

		this.$tanchuan.find('.txt').html(this.content);
		o.close==1 ? this.$tanchuan.find('.close').show() : this.$tanchuan.find('.close').hide();
	},
	
	show:function(options){
		var t = this;
		$('.overlay').css({opacity:0});
		$('.overlay2').css({opacity:0.5});
		this.dark((function(){t.position(t.id);t.$tanchuan.show().addClass('fadeinUp'); popUp.ids.push(this.id);})());
		if(options!=undefined&&options.callback!=undefined&&typeof(options.callback)=='function')options.callback.apply(this,options.params||[]);
	},
	
	//定位
	position:function(id){
		var windowHeight=document.documentElement.clientHeight>document.documentElement.scrollHeight?document.documentElement.clientHeight:document.documentElement.scrollHeight;
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		//switch(size){
			//case 'big' : 
				var _w = $('#tanchuan_'+id).width()/2;
				var _h = $('#tanchuan_'+id).height()/2;
				$('#tanchuan_'+id).css({left:'50%',top:'38.2%',marginLeft:-_w,marginTop:-_h+scrollTop});
				//break;
			//case 'small' : 
				//$('#tanchuan_'+size).css({left:'50%',top:'50%',marginLeft:-196,marginTop:-121+scrollTop}).show().addClass('fadeinUp');
				//break;
			//case 'middle' : 
				//$('#tanchuan_'+size).css({left:'50%',top:'50%',marginLeft:-232,marginTop:-121}).show().addClass('fadeinUp');
				//break;
		//}
	},
	
	loading:function(){
		if(document.getElementById('wei_loader')){return false;}
		$('body').append('<div id="wei_loader" >数据加载中...\
		</div>')
		$('#overlay').css({opacity:0});
		$('#overlay2').css({opacity:0.5});
		this.dark($('wei_loader').css({left:'50%',top:'50%',marginLeft:-196,marginTop:-121}).show());
	},
	
	removeLoading:function(){
		$('#overlay').remove();
		$('#overlay2').remove();
		$('#wei_loader').remove();
	},
	
	hide : function(id){
		this.$tanchuan.remove();$('.overlay2').remove();$('.overlay').remove();
		popUp.ids.splice(popUp.ids.indexOf(this.id),1);
	},
	
	dark:function(callback){
		$('.overlay').fadeIn(50,function(){});
		$('.overlay2').fadeIn(50,function(){callback});
	},
	time:function(time){
		var t = this;
		time ? setTimeout(function(){t.hide()},time) : setInterval(function(){t.hide()},2000)
	},
	
	hideWithDark:function(id){
		$('#'+id).remove();
	},
	
	alert_type1:function(){
		popup.alert_small('<div id="alert_type1"><p>确定删除该条件吗？</p><p class="btn_area">\
<a class="wei_btn_1 e0-Warning-ajAddMonitor" href="javascript:void(0)">确定</a>\
<a class="wei_btn_2" onclick="popup.hide("tanchuan_big")" href="javascript:void(0)">取消</a>\
</p></div>','修改条件');
	},
	alert_type2:function(content){
		var _this = this;
		$('body').append('<div id="successfullAlert" >\
		<p>'+content+'</p>\
		</div>')
		$('#successfullAlert')[0].className = 'fadeinUp';
		//var w = $('successfullAlert').css('width');
		var w = $('#successfullAlert')[0].clientWidth;
		$('successfullAlert').css({marginLeft:-w/2+'px',visibility:'visible'})
/*
		G('successfullAlert').style.marginLeft = -w/2+'px';
		G('successfullAlert').style.visibility = 'visible';
*/
		setTimeout(popup.hideAlertAndTanchuan,1000)
	},
	alert_type3:function(content){
		var _this = this;
		$('body').append('<div id="failAlert" style="visibility:hidden" >\
		<p>'+content+'</p>\
		</div>')
		G('failAlert').className = 'fadeinUp';
		var w = G('failAlert').clientWidth;
		G('failAlert').style.marginLeft = -w/2+'px';
		G('failAlert').style.visibility = 'visible';
		setTimeout(popup.hideFailAlert,1000)
	},
	alert_type4:function(content){
		var _this = this;
		$('body').append('<div id="successfullAlert" >\
		<p>'+content+'</p>\
		</div>')
		G('successfullAlert').className = 'fadeinUp';
		var w = G('successfullAlert').clientWidth;
		G('successfullAlert').style.marginLeft = -w/2+'px';
		G('successfullAlert').style.visibility = 'visible';
		setTimeout(function(){window.location.reload()},1000)
	},
	hideFailAlert:function(){
		popup.hideWithDark('failAlert');
	},
	hideAlertAndTanchuan:function(){
		popup.hideWithDark('failAlert');
		popup.hideWithDark('successfullAlert');
		popup.hide('tanchuan_big');
	}
}