var MyEvaluate={
	zpinputvalue:"",
	init:function(){
		console.log("123456")
	},
	addReview:function(){
		$("aside").removeClass("gjlactivekey");
	},
	delReview:function(){
		alert("d")
	},
	zpbtnshow:function(){
		var that=this;
		let zpinputs=document.querySelector(".zpinput");
		that.zpinputvalue=zpinputs.value;
		$(".gjl_insertzp").html('<div class="gjl_zpmess"><span>我的追评:</span>'+that.zpinputvalue+'</div>');
		$("aside").addClass("gjlactivekey");
	}
}