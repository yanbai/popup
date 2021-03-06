(function (root, factory) {
    "use strict";

    /*global define*/
    if (typeof define === 'function' && define.amd) {
        define(['Popup'], factory);                 // AMD
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('Popup')); // Node
    } else {
        root.Popup = factory();                        // Browser
    }
}(this, function (Popup) {
    /*弹出层*/
    var Popup = function(options){
        this.id = options.id || parseInt(Math.random() * 0xFFFFFF, 10);
        var _defaultConfirmVal = "确认",
            _cancelVal = "取消";

        $.extend(this, options);
        this.options = options;
        this.txt = options.content || '';
        this.tit = options.title || '';
        this.btn = this.confirm||this.cancel;
        this.confirmVal = options.confirmVal||_defaultConfirmVal;
        this.cancelVal = options.cancelVal||_cancelVal;
        this.init();
    };

    Popup.ids = [];
    Popup.getDialog = function(id){return this.hasDialog(id)?document.getElementById('tanchuan_'+id):''};
    Popup.hasDialog = function(id){return document.getElementById('tanchuan_'+id)?true:false};
    Popup.removeDialog = function(id){
        if(this.hasDialog(id)){
            this.getDialog(id).parentNode.removeChild(this.getDialog(id))
            $('.overlay2').remove();$('.overlay').remove();
            Popup.ids.splice(Popup.ids.indexOf(id),1);
        }
    };

    Popup.prototype = {
        init:function(){
            var t = this;
            if(document.getElementById('tanchuan_'+this.id)){return false;}
            if(Popup.ids.indexOf(this.id)==-1){
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
                Popup.ids.push(this.id);
            }
            return this;
        },
        
        confirmEle:function(){
            var el,
                t = this;
            if(this.confirm){
                el = document.createElement('a');
                el.className = 'wei_btn_1';
                el.href = 'javascript:void(0)';
                el.innerHTML = this.confirmVal;
            }else{
                el = null;
            }
            if(this.confirm instanceof Function){
                el.addEventListener('click',t.confirm.bind(t),false)
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
                    el.addEventListener('click',t.cancel.bind(t),false)
                }else{
                    el.addEventListener('click',function(){t.hide()},false)
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

                this.confirmEle() && btn.appendChild(this.confirmEle());
                this.cancelEle() && btn.appendChild(this.cancelEle());
                this.content.appendChild(btn);
            }

            this.$tanchuan.find('.txt').html(this.content);
            o.close==1 ? this.$tanchuan.find('.close').show() : this.$tanchuan.find('.close').hide();
        },
        
        show:function(options){
            var t = this;
            $('.overlay').css({opacity:0});
            $('.overlay2').css({opacity:0.5});
            this.dark((function(){t.position(t.id);t.$tanchuan.show().addClass('fadeinUp')})());
            if(options!=undefined&&options.callback!=undefined&&typeof(options.callback)=='function')options.callback.apply(this,options.params||[]);
            this.time && this.automagicallyDisappear(t.time);
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

        remove: function(){
            this.$tanchuan.remove();$('.overlay2').remove();$('.overlay').remove();
            Popup.ids.splice(Popup.ids.indexOf(this.id),1);
        },
        
        hide : function(){
            this.$tanchuan.hide();$('.overlay2').hide();$('.overlay').hide();
        },
        
        dark:function(callback){
            $('.overlay').fadeIn(50,function(){});
            $('.overlay2').fadeIn(50,function(){callback});
        },

        automagicallyDisappear:function(time){
            var t = this;
            time ? setTimeout(function(){t.hide()},time) : setTimeout(function(){t.hide()},2000)
        },
        
        removeWithDark:function(id){
            $('#'+id).remove();
        }
    }
    return Popup;
}))
