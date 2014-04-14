这是一个简单弹窗插件<br> 
&lt;a href=&quot;javascript:void(0)&quot; onclick=&quot;_alert()&quot;&gt;nihao&lt;/a&gt;<br>
function _alert(){<br>
&nbsp;&nbsp;&nbsp;&nbsp;var a = new popUp.alert({  <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:'333',  <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content:'你好吗',  <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:'qued',  <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ok:function(){popUp.hideDialog(333)},  <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cancel:true,  <br>
&nbsp;&nbsp;&nbsp;&nbsp;})  <br>
};  <br>
<table class="table">
        <thead>
            <tr>
            <th class="parameter">名称</th>
            <th class="type">类型</th>
            <th class="default">默认值</th>
            <th class="note">描述</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <a href="#title">title</a>
                </td>
                <td>String</td>
                <td>null</td>
                <td>弹窗标题</td>
            </tr>
            <tr>
            	<td>
                    <a href="#title">content</a>
                </td>
                <td>String</td>
                <td>null</td>
                <td>弹窗内容</td>
            </tr>
            <tr>
            	<td>
                    <a href="#title">ok</a>
                </td>
                <td>Function/Boolean</td>
                <td>null</td>
                <td>Boolean值：是否显示确定按钮<br>Function值:绑定确定按钮的回调函数</td>
            </tr>
            <tr>
            	<td>
                    <a href="#title">cancel</a>
                </td>
                <td>Function/Boolean</td>
                <td>null</td>
                <td>Boolean值：是否显示取消按钮<br>Function值:绑定取消按钮的回调函数,默认绑定关闭弹窗事件</td>
            </tr>
            <tr>
            	<td>
                    <a href="#title">okVal</a>
                </td>
                <td>String</td>
                <td>'确定'</td>
                <td>确定按钮内容</td>
            </tr>
            <tr>
            	<td>
                    <a href="#title">cancelVal</a>
                </td>
                <td>String</td>
                <td>'取消'</td>
                <td>取消按钮内容</td>
            </tr>
            <tr>
            	<td>
                    <a href="#title">time</a>
                </td>
                <td>Number</td>
                <td>null</td>
                <td>设置对话框显示时间。以毫秒为单位</td>
            </tr>
        </tbody>
    </table>
