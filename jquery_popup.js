/*弹出层*/
var popUp=function(){};
popUp.hide = function(id){
		$('#'+id).remove();$('.overlay2').remove();$('.overlay').remove();
	}
popUp.prototype={
	init:function(size){
		if(document.getElementById('tanchuan_'+size)){return false;}
		$('body').append('<iframe class="overlay" frameborder="0" scrolling="no"></iframe>\
		<div class="overlay2"></div><div id="tanchuan_'+size+'" class="dragFrame" >\
		<table><tr><td>\
		<div class="tit draggable"><span></span></div>\
		<div class="txt"></div>\
		</td></tr></table>\
		</div>')
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
	//大弹出层（自适应）
	alert_big:function(content,title,options){
		this.init('big');
		var o={close:1};
		if(options!=undefined&&options.close!=undefined){$.extend(o,options);}
		this.title=title;this.content=content;
		var $tanchuan=$('#tanchuan_big');
		$tanchuan.find('.tit').find('span').html(title+'<div class="close" onclick="popUp.hide(\'tanchuan_big\')"><span>x</span></div>');
		$tanchuan.find('.txt').html(content);
		o.close==1 ? $tanchuan.find('.close').show() : $tanchuan.find('.close').hide();
		$('.overlay').css({opacity:0});
		$('.overlay2').css({opacity:0.5});
		this.dark(this.show('big'));
		if(options!=undefined&&options.callback!=undefined&&typeof(options.callback)=='function')options.callback.apply(this,options.params||[]);
	},
	//小弹出层
	alert_small : function(content,title,options){
		this.init('small');
		var o={close:1};
		if(options!=undefined&&options.close!=undefined){$.extend(o,options);}
		this.title=title;this.content=content;
		var $tanchuan=$('#tanchuan_small');
		$tanchuan.find('.tit').find('span').html(title+'<div class="close" onclick="popUp.hide(\'tanchuan_small\')"><span>x</span></div>');
		$tanchuan.find('.txt').html(content);
		o.close==1 ? $tanchuan.find('.close').show() : $tanchuan.find('.close').hide();
		$('.overlay').css({opacity:0});
		$('.overlay2').css({opacity:0.5});
		this.dark(this.show('small'));
		if(options!=undefined&&options.callback!=undefined&&typeof(options.callback)=='function')options.callback.apply(this,options.params||[]);
	},
	//第二级弹出层
	pop_small : function(content,title,divId){
		var o={close:1};
		(arguments[3]!=undefined)&&$.extend(o,arguments[2]);
		this.title=title;this.content=content;
		if(document.getElementById(divId)){
			$('#'+divId).append('<div id="wei_pop"><div class="tit"><span></span></div><div class="txt"></div></div>');
			var $tanchuan=$('#wei_pop');
			$tanchuan.find('.tit').find('span').html(title+'<div class="close e1-popup-hide-'+divId+'"><span>x</span></div>');
			$tanchuan.find('.txt').html(content);
			o.close==1 ? $tanchuan.find('.close').show() : $tanchuan.find('.close').hide();
			$tanchuan.fadeIn('fast')
		}else return false;
	},
	show:function(size){
		var windowHeight=document.documentElement.clientHeight>document.documentElement.scrollHeight?document.documentElement.clientHeight:document.documentElement.scrollHeight;
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		switch(size){
			case 'big' : 
				var _w = $('#tanchuan_'+size).width()/2;
				var _h = $('#tanchuan_'+size).height()/2;
				$('#tanchuan_'+size).css({left:'50%',top:'50%',marginLeft:-_w,marginTop:-_h+scrollTop}).show().addClass('fadeinUp');
				break;
			case 'small' : 
				$('#tanchuan_'+size).css({left:'50%',top:'50%',marginLeft:-196,marginTop:-121+scrollTop}).show().addClass('fadeinUp');
				break;
			case 'middle' : 
				$('#tanchuan_'+size).css({left:'50%',top:'50%',marginLeft:-232,marginTop:-121}).show().addClass('fadeinUp');
				break;
		}
	},
	hideWithDark:function(id){
		$('#'+id).remove();
	},
	dark:function(callback){
		$('#iebug_iframe').show();
		$('.overlay').fadeIn(50,function(){});
		$('.overlay2').fadeIn(50,function(){callback});
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
};