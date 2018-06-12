$(function(){
	$(".gjl_seeall").on("click",function(){
		var obj={
           type:"slideFromBottom",
           title:"2条回复",
           content:"<div>防城港v好毕竟你们，",
           btn:["","保存"]
       };
       method.msg_layer(obj);
	})
})