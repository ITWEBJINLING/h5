var calUtil = {  
            //当前日历显示的年份  
           showYear:new Date().getFullYear(),  
           //当前日历显示的月份  因为js的月份是从0开始的所以要获取当前的月份要加一
           showMonth:new Date().getMonth()+1,  
          //当前日历显示的天数  
           showDays:new Date().getDate(), 
           WearValue:"",
           eventName:"load",  
           signtoday:"",
           //初始化日历  从这里开始执行
           entrance:function(){
           	calUtil.presentsign(calUtil.showMonth)
           },
           init:function(signList){ 
//         	获取当前日期的月份，和上下月的月份
           calUtil.setMonthAndDay();  
           calUtil.draw(signList);
           calUtil.bindEnvent();
           calUtil.showsignday();
           },  
           draw:function(signList){  
           //绑定日历  把当前年份，月份，日期传过去
           var str = calUtil.drawCal(calUtil.showYear,calUtil.showMonth,signList);  
           $("#calendar").html(str);  
           //绑定日历表头  
           var calendarName=calUtil.showYear+"年"+calUtil.showMonth+"月";  
           $(".calendar_month_span").html(calendarName);    
           },  
          //绑定事件  
           bindEnvent:function(){  
          //绑定上个月事件  
          $(".calendar_month_prev").click(function(){  
             calUtil.presentsign(calUtil.showMonth-1)
             calUtil.eventName="prev";  
          });  
          //绑定下个月事件  
         $(".calendar_month_next").click(function(){  
         	calUtil.presentsign(calUtil.showMonth+1)
            calUtil.eventName="next";  
        });  
       },  
           
  //获取当前选择的年月  
  setMonthAndDay:function(){  
    switch(calUtil.eventName)  
    {  
      case "load":  
        var current = new Date();  
        calUtil.showYear=current.getFullYear();  
        calUtil.showMonth=current.getMonth() + 1; 
        break;  
      case "prev":  
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];  
        calUtil.showMonth=parseInt(nowMonth)-1; 
        if(calUtil.showMonth==0)  
        {  
            calUtil.showMonth=12;  
            calUtil.showYear-=1;  
        }
        break;  
      case "next":  
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];  
        calUtil.showMonth=parseInt(nowMonth)+1;  
        if(calUtil.showMonth==13)  
        {  
            calUtil.showMonth=1;  
            calUtil.showYear+=1;  
        } 
        break;  
    }  
  },  
  
  
  
  
  getDaysInmonth : function(iMonth, iYear){  
//	表示上个月的最后一天，计算上个月的天数
   var dPrevDate = new Date(iYear, iMonth, 0);  
   return dPrevDate.getDate();  
  },   
  qiandao:function(){ 
  	$.ajax({
		dataType: "json",
        type: "post",
        url: "http://39.104.84.26:8080/api/v1/my/signs/",
        headers: {'Auth-token':"452"},
        success: function(result) {
        	calUtil.WearValue=result.data;
        	console.log(calUtil.WearValue)
        	if(result.result=="success"){
        		 var obj={
                    type:"layerFadeIn",
                    title:"签到成功",
                    close:"false",
                    content:"<div>恭喜你获得"+calUtil.WearValue+"穿戴值",
                    btn:["","确认"]
                };
              method.msg_layer(obj);
        	}
        	else if(result.result=="failed"){
        		alert("你已经签到");
        	}
        }
   });
      calUtil.presentsign(new Date().getMonth()+1)
  },  
    
  bulidCal : function(iYear, iMonth) {  
//	new Array自动扩展,括号里写多长这个数组就有多长
   var aMonth = new Array();  
   aMonth[0] = new Array(7);  
   aMonth[1] = new Array(7);  
   aMonth[2] = new Array(7);  
   aMonth[3] = new Array(7);  
   aMonth[4] = new Array(7);  
   aMonth[5] = new Array(7);  
   aMonth[6] = new Array(7);  
// new Data中的三个参数第一个表示当前年份,第二个表示这个参数的下一个月,现在是当前月减一就刚好表示当前月,最后一位表示几号,1就是1号,0特殊:表示上个月的最后一天
   var dCalDate = new Date(iYear, iMonth - 1, 1);  
// 通常用new Date(2020,2,0).getDate()计算某月的天数
//getday返回某个星期的某一天，看一号是周几
   var iDayOfFirst = dCalDate.getDay();  
// 返回上个月的天数
   var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);  
   var iVarDate = 1;  
   var d, w;  
   aMonth[0][0] = "日";  
   aMonth[0][1] = "一";  
   aMonth[0][2] = "二";  
   aMonth[0][3] = "三";  
   aMonth[0][4] = "四";  
   aMonth[0][5] = "五";  
   aMonth[0][6] = "六";  
   for (d = iDayOfFirst; d < 7; d++){  
    aMonth[1][d] = iVarDate; 
    iVarDate++;  
   }  
   for (w = 2; w < 7; w++) {  
    for (d = 0; d < 7; d++) {  
     if (iVarDate <= iDaysInMonth) {  
      aMonth[w][d] = iVarDate;  
      iVarDate++;  
     }  
    }  
   }  
   return aMonth;  
  },  
  ifHasSigned : function(signList,day){  
   var signed = false;  
   $.each(signList,function(index,item){  
    if(item.signDay == day) {  
     signed = true;  
     return false;  
    }  
   });  
   return signed ;  
  },  
  
 
  drawCal : function(iYear, iMonth ,signList) {  
// 循环写出动态的日历数据
   var myMonth = calUtil.bulidCal(iYear, iMonth);   
   var htmls = new Array();  
   htmls.push("<div class='sign_main' id='sign_layer'>");  
   htmls.push("<div class='sign_succ_calendar_title'>");  
   htmls.push("<img src='../../img/icon/btn_back_qiandao2.png' class='calendar_month_prev' alt='' />"); 
   htmls.push("<div class='calendar_month_span'></div>");  
   htmls.push("<img src='../../img/icon/btn_back_qiandao.png' class='calendar_month_next' alt='' />");  
   htmls.push("</div>");  
   htmls.push("<div class='sign' id='sign_cal'>");  
   htmls.push("<table>");  
   htmls.push("<tr class='gjl_tableth'>");  
   htmls.push("<th>" + myMonth[0][0] + "</th>");  
   htmls.push("<th>" + myMonth[0][1] + "</th>");  
   htmls.push("<th>" + myMonth[0][2] + "</th>");  
   htmls.push("<th>" + myMonth[0][3] + "</th>");  
   htmls.push("<th>" + myMonth[0][4] + "</th>");  
   htmls.push("<th>" + myMonth[0][5] + "</th>");  
   htmls.push("<th>" + myMonth[0][6] + "</th>");  
   htmls.push("</tr>");  
   var d, w;  
   for (w = 1; w < 7; w++) {  
    htmls.push("<tr>");  
    for (d = 0; d < 7; d++) {  
//  	通过循环选中当前月的签到天
     var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);  
     if(myMonth[w][d]==new Date().getDate()&&new Date().getMonth()+1==calUtil.showMonth&&!ifHasSigned){  
         //当前月当前天，允许签到  
         htmls.push("<td class='today'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
     }else{  
         if(ifHasSigned){  
             htmls.push("<td class='on'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");  
         } else {  
             htmls.push("<td>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");  
         }  
     }   
    }  
    htmls.push("</tr>");  
   }  
   htmls.push("</table>");  
   htmls.push("</div>");  
   htmls.push("</div>");  
   return htmls.join('');  
  },
  
//当月签到的天数和
showsignday:function(){
	var signdaynum=$(".gjl_qdtady").find("span").html(calUtil.signtoday);
},
  
//ajax获取当前上月还有下月的签到信息
   presentsign:function(presentsignmess){
	   var signList=[];
       $.ajax({
			dataType: "json",
            type: "get",
            url: "http://39.104.84.26:8080/api/v1/my/signs/"+presentsignmess,
            headers: {'Auth-token':"452"},
            data:{
                month:presentsignmess
            },
            success: function(result) {
            	calUtil.signtoday=result.data.length;
                for(let i=0;i<result.data.length;i++){
                    var signday=(result.data[i].day).split("-");
                    signList.push({"signDay":signday[2]})
                }
                calUtil.init(signList);  
            }
       });
}
}; 