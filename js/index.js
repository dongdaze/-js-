window.onload=function(){

	function getDom(id){
		return typeof id==="string"? document.getElementById(id):id;
	}

	
//导航栏的显示
	var conLi=getDom("conItem").getElementsByTagName('li');
	for(var i=0;i<conLi.length;i++){
		var conLis=getDom("conItemCon").getElementsByTagName('div');
		conLi[i].index=i;
		conLi[i].onmouseover=function(){
			for(var j=0;j<conLis.length;j++){
			conLis[j].style.display="none";
			conLis[j].onmouseover=function(){
					this.style.display="block";
				}
				conLis[j].onmouseout=function(){
					this.style.display="none";
				}
			}
			conLis[this.index].style.display="block";
		}
	}

//轮播图	
	var prev=getDom("prev");
	var next=getDom("next");
	var adPic=getDom("adPic");
	var adButtons=getDom("adButtons").getElementsByTagName('span');
	var index=1;
	var picMoved=false;

	//点击下一个函数
	next.onclick=function(){
		if(picMoved){
			return;
		}

		if(index==4){
			index=1;
		}else{
			index +=1;
		}
		
		showButton();
		picMove(-1000);

	}
	//点击上一个函数
	prev.onclick=function(){
		if(picMoved){
			return;
		}
		
		if(index==1){
			index=4;
		}else{
			index -=1;
		}
		
		showButton();
		picMove(1000);
	}

	//图片平滑滚动滚动函数
	function picMove(distance){		
		var newDistance=parseInt(adPic.style.left)+distance;
		var speed=Math.ceil(distance/100);
		function move(){
			if(speed<0&&parseInt(adPic.style.left)>=newDistance
				||speed>0&&parseInt(adPic.style.left)<=newDistance ){
				picMoved=true;
				adPic.style.left=parseInt(adPic.style.left)+speed+"px";
				setTimeout(move,5)
			}else{
				picMoved=false;
				adPic.style.left=newDistance+"px";
					if(newDistance<-4000){
						adPic.style.left=-1000 +"px";
					}
					if(newDistance>-1000){
						adPic.style.left=-4000 +"px";
					}
			}
		}
		move();
}


	//实现底部按钮颜色改变

    function showButton() {
        for (var i = 0; i < adButtons.length ; i++) {
            if( adButtons[i].className == 'on'){
                adButtons[i].className = '';
                break;
            }
        }
        adButtons[index - 1].className = 'on';
    }


	//点击底部按钮改变图片	
	for(var i=0;i<adButtons.length;i++){
		adButtons[i].onclick=function(){
			if(picMoved){
				return;
			}
			if(this.className=="on"){
				return;
			}
			var oIndex=parseInt(this.getAttribute('index'));
			var distance= -1000*(oIndex-index);

			picMove(distance);
			index=oIndex;
			showButton();
		}
	}

	//页面自动滚动
	var timer=null;
	function autoPlay(){
		timer=setInterval(function(){
			next.onclick();
		},4000)
	}

	function autoStop(){
		clearInterval(timer);
	}
	var ad=getDom("ad");
	autoPlay();
	ad.onmouseover=autoStop;
	ad.onmouseout=autoPlay;

	//获取时间
	function showTime(){
		var endTime=new Date("2016/12/31,00:00:00");
		var nowTime=new Date();
		var lastTime=parseInt(endTime-nowTime)/1000;
		var d=parseInt(lastTime/(24*60*60));
		var h=parseInt(lastTime/(60*60)%24);
		var m=parseInt(lastTime/60%60);
		var s=parseInt(lastTime%60);

		var m=m>=10?m:"0"+m;
		var s=s>=10?s:"0"+s;
		getDom("lastTime").innerHTML=d+"天 "+h+":"+m+":"+s;
		setTimeout(showTime,1000);
	}
	showTime();

	//回到顶部
	var upTop=getDom("upTop");
	var otimer=null;
	upTop.onclick=function(){
		otimer=setInterval(function(){
			var upH=document.documentElement.scrollTop || document.body.scrollTop;
			upSpeed=upH/5;
			document.documentElement.scrollTop=document.body.scrollTop=parseInt(upH-upSpeed);
			if(upH == 0){
				clearInterval(otimer);
			}
		},30)
	}
	//回到顶部按钮隐藏
	window.onscroll=function(){
		var upH=document.documentElement.scrollTop || document.body.scrollTop;
		var upClient=document.documentElement.clientHeight;		
		if(upH >upClient){
			upTop.style.display="block";
		}else{
			upTop.style.display="none";
		}
	}

}