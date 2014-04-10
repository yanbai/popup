这是一个简单弹窗插件

var a = new popUp.alert({
    id:'001',
    content:'你好吗',
    title:'标题',
    ok:function(){popUp.hideDialog(333)},
    cancel:true,
})
