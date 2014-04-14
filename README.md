这是一个简单弹窗插件
<a href="javascript:void(0)" onclick="_alert()">nihao</a>
function _alert(){
	var a = new popUp.alert({
		id:'333',
		content:'你好吗',
		title:'qued',
		ok:function(){popUp.hideDialog(333)},
		cancel:true,
	})
};
名称 	类型 	默认值 	描述
title 	String 	null 	弹窗标题
content 	String 	null 	弹窗内容
ok 	Function/Boolean 	null 	Boolean值：是否显示确定按钮
Function值:绑定确定按钮的回调函数
cancel 	Function/Boolean 	null 	Boolean值：是否显示取消按钮
Function值:绑定取消按钮的回调函数,默认绑定关闭弹窗事件
okVal 	String 	'确定' 	确定按钮内容
cancelVal 	String 	'取消' 	取消按钮内容
time 	Number 	null 	设置对话框显示时间。以毫秒为单位
