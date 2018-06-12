


;(function($){
	
	$.fn.tab=function(options){
		
		var defaults={
			
			//各种属性
			navClass:'cuttor',
			tabNav:'.tabnav>li',
			tabCon:'.tabcontent>div',
			type:'click'
			//定义事件类型//
		}
	
		//通过覆盖来传参数
		var options=$.extend(defaults,options);
		
		this.each(function(){
			
			var _this=$(this); // 
			
			//显示功能的代码
			_this.find(options.tabNav).bind(options.type,function(){
				
				$(this).addClass(options.navClass).siblings().removeClass(options.navClass);
					
				var index=$(this).index();  //当前第几个
				
				_this.find(options.tabCon).eq(index).show().siblings().hide();
			})
			
		});
		
		return this;
		
	}
	
})(jQuery);

/*
tab 结构
<div class="tab">
	<ul class="tabnav">
		<li class="cuttor">tab1</li>
		<li>tab2</li>
		<li>tab3</li>
	</ul>
	<div class="tabcontent">
		<div style=" display:block;">tab1</div>
		<div>tab2</div>
		<div>tab3</div>
	</div>
</div>
tab 调用
$(".tab").tab({
	type:'hover'	
});

*/
