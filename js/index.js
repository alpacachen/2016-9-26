/*
陈湘  9.24 

*/

(function(){
	//标志位

	//测试函数
	var test = function(){
		console.log("test")
	}
	//老鼠出现
	var show = function(){
		var showtimer = setInterval(function(){
			var $index = $("tbody img:eq("+Math.floor(Math.random()*9)+")");
			//如果现在洞里没有小人
			if(!$index.attr("alive")){
				var $role = Math.floor(Math.random()*6);
				if($role>2){
					$index.attr({src:"../images/guizi1.png",alive:"true"}).animate({width:"90%",left:"7%"},250)
				}else{
					$index.attr({src:"../images/hongjun1.png",alive:"true"}).animate({width:"90%",left:"0%"},250)
				}
			}
			//存在时间
			setTimeout(function(){
				$index.animate({width:"0%",left:"50%"},250).removeAttr("alive")
			},900)
		},250)
		showcall = function(){
			return showtimer;
		}
	}

	//分数规则
	var point = function(type){
		var  $scor = $("#scor")
		//当前分数
		var curr = Number($scor.html());
		//1为+10分  2为-5分
		if(type ==  1){
			$scor.html(curr+10)
		}else{
			curr == 0?$scor.html(0):$scor.html(curr-5)
		}
	}

	//老鼠被打
	var hit = function(){
		$("tbody").on("click","img",function(){
			if($(this).attr("src") == "../images/guizi1.png"){
				//打鬼子
				$(this).attr("src","../images/guizi2.png")
				point(1);
			}else if($(this).attr("src") == "../images/hongjun1.png"){
				//打红军
				$(this).attr("src","../images/hongjun2.png")
				point(2)
			}
		})
	}
	//结束30秒倒计时
	var thirtycountdown = function(){
		var n = 29;
		var thirtycountdowntimer = setInterval(function(){
			$("#time").html(n--)
			if(n == -2){
				clearInterval(thirtycountdowntimer)
				clearInterval(showcall());
				alert("game over 你的得分为:"+$("#scor").html())
				$("#playing").removeAttr("hidden")
				$("#tips").attr("hidden","hidden");
			}
		},1000)
	}

	//开始按钮
	$(".wrap").on("click","#start",function(){
		//测试
		/*$("#playing").attr("hidden","hidden")
		$("#tips").removeAttr("hidden");
		show();
		hit();*/
        //正式按钮
		var $countdownbg = $(".countdownbg")
		$countdownbg.removeAttr("hidden")
		var n = 2;
		//开始3秒倒计时
		var counttimer = setInterval(function(){
			var $countdownimg = $(".countdown-img");
			$countdownimg.attr("src","../images/countdown"+n+".png")
			n--;
			if(n == -1){
				clearInterval(counttimer);
				$countdownbg.attr("hidden","hidden");
				$countdownimg.attr("src","../images/countdown3.png")
				$("#playing").attr("hidden","hidden")
				$("#tips").removeAttr("hidden");
				test();
				show();
				hit(); 
				thirtycountdown();
			}
		},1000)
	})
})();