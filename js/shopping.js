window.onload=function(){

	function getDom(id){
		return typeof id==="string"? document.getElementById(id):id;
	}

//图片放大展示
	var contents=getDom("content");
	var smallBox=getDom("smallBox");
	var mark=getDom("mark");
	var enlarge=getDom("enlarge");
	var bigBox=getDom("bigBox");
	var bigPic=bigBox.getElementsByTagName("img")[0];

	mark.onmouseover=function(){
		enlarge.style.display="block";
		bigBox.style.display="block";
	}

	mark.onmouseout=function(){
		enlarge.style.display="none";
		bigBox.style.display="none";
	}

	mark.onmousemove=function(e){

		var el=e || window.event;

		var left=el.clientX-contents.offsetLeft-smallBox.offsetLeft-enlarge.offsetWidth/2;
		var top=el.clientY-contents.offsetTop-smallBox.offsetTop-enlarge.offsetHeight/2;

		enlarge.style.left=left+"px";
		enlarge.style.top=top+"px";
		if(left<0){
			left=0;
		}
		if(left>smallBox.offsetWidth-enlarge.offsetWidth){
			left=smallBox.offsetWidth-enlarge.offsetWidth;
		}

		if(top<0){
			top=0;
		}
		if(top>smallBox.offsetHeight-enlarge.offsetHeight){
			top=smallBox.offsetHeight-enlarge.offsetHeight;
		}

		var prLeft=left/(mark.offsetWidth-enlarge.offsetWidth);
		var prTop=top/(mark.offsetHeight-enlarge.offsetHeight);


		bigPic.style.left=-prLeft*(bigPic.offsetWidth-bigBox.offsetWidth)+"px";
		bigPic.style.top=-prTop*(bigPic.offsetHeight-bigBox.offsetHeight)+"px";
	}

//商品价格的改变

	var type=getDom("type"); //包含三个内存的容器
	var typeLis=type.getElementsByTagName("li");//每个内存
	var price=getDom("price");//要显示的价格
	var conNum=getDom("conNum");//包含文本框，加减的容器
	var num=getDom("num");//文本输入框
	var count=num.getAttribute("value");//文本输入框里面的数字

	//鼠标点击内存变化
	for(var i=0;i<typeLis.length;i++){
		typeLis[i].onclick=function(){
			for(var j=0;j<typeLis.length;j++){
				typeLis[j].className="";
			}
				this.className="on";
				var val=parseInt(this.getAttribute("value"));
				getTotal(val);
		}
	}	

	//计算总价(参数为对应内存的单价)
	function getTotal(val){
		if(val==undefined){
			return;
		}
		var count=num.getAttribute("value");
		price.innerHTML=(val*count).toFixed(2);
	}

	//改变数量
	var add=getDom("add");
	var reduce=getDom("reduce");

	add.onclick=function(){
		if(count>=3){
			count=3;
		}else{
			count ++;
		}		
		num.setAttribute("value",count);
		num.value=count;
		subToa();
	}

	reduce.onclick=function(){
		if(count<=1){
			count=1;
		}else{
			count --;
		}		
		num.setAttribute("value",count);
		num.value=count;
		subToa();		
	}

	//通过加减改变价格
	function subToa(){
		for(var j=0;j<typeLis.length;j++){
			if(typeLis[j].className ==="on")
				var vals=typeLis[j].getAttribute("value");
				getTotal(vals)
			}
	}
	
	//键盘输入事件
	num.onkeyup=function(){
		count=parseInt(this.value);
        if(count>3){
        	count=3;
        	this.value=3;
        }
        if(count<1){
        	count=1;
        	this.value=1;
        }
        if(isNaN(count)){
			return;      	
        }

		num.setAttribute("value",count);
		subToa();
	}
	//无法购买函数
	var conBuy=getDom("conBuy");
	conBuy.onclick=function(){
		alert("不好意思,该产品目前在调试中，无法购买！")
	}

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

//下面列表的切换
	var infoNav1=getDom("infoNav1");
	var infoNav2=getDom("infoNav2");
	var infoNav3=getDom("infoNav3");
	var infoDet=getDom("infoDet");
	var infoCom=getDom("infoCom");
	var que=getDom("que");

	infoNav1.onclick=function(){
		infoDet.style.display="block";
		infoCom.style.display="none";
		que.style.display="none";
	}

	infoNav2.onclick=function(){
		infoCom.style.display="block";
		infoDet.style.display="none";	
		que.style.display="none";	
	}	

	infoNav3.onclick=function(){
		infoCom.style.display="none";
		infoDet.style.display="none";		
		que.style.display="block";
		console.log(que);
	}

//喜欢赞的点击与取消

	var pa=getDom("pa");
	var paSpan=pa.getElementsByTagName("span")[0];

	paSpan.onclick=function(){
		love(paSpan);
	}

	function love(span){
		if(span.className=="love"){
			span.className="";
		}else if(span.className==""){
			span.className="love";
		}		
	}
	var pa2=getDom("pa2").getElementsByTagName("span")[0];

	pa2.onclick=function(){
		love(pa2);
	}
	var pa3=getDom("pa3").getElementsByTagName("span")[0];
	
	pa3.onclick=function(){
		love(pa3);
	}
	var pa4=getDom("pa4").getElementsByTagName("span")[0];
	
	pa4.onclick=function(){
		love(pa4);
	}
	var pa5=getDom("pa5").getElementsByTagName("span")[0];
	
	pa5.onclick=function(){
		love(pa5);
	}


//回复评论功能

	var que=getDom("que");
	var queLis=que.getElementsByTagName("li");

	for(var i=0;i<queLis.length;i++){

		queLis[i].onclick=function(e){
			var e=e || window.event;
			var el=e.srcElement || e.target ;
			switch(el.className){
				case "btn btn-off":
					clearTimeout(timer);
				break;
				case "btn":
					replay(el.parentNode);
				break;
				case "reply-operate":
					operate(el);
				break;				
				default:
				break;
			}

		}



//评论框样式变化
	var textarea=queLis[i].getElementsByTagName("textarea")[0];
	var timer=null;
	//输入框聚焦函数
	textarea.onfocus=function(){
		this.parentNode.className="reply-box-on";
		this.value=(this.value=="提问…")? "":this.value;
	}
	//输入框失焦函数
	textarea.onblur=function(){
		var that=this;
		timer=setTimeout(function(){
			if(that.value==""){
				that.parentNode.className="reply-box";
				that.value="提问…";
			}	
		},500);
	}
	//评论框随键盘的变化而变化
	textarea.onkeyup=function(){
		var textLen=this.value.length;
		var btn=this.parentNode.children[2];
		var word=this.parentNode.children[1];
		if(textLen==0 || textLen>110){
			btn.className="btn-off";
			word.innerHTML=textLen+"/110";
		}else{
			btn.className="btn";
			word.innerHTML=textLen+"/110";
		}

	}
}
	//发表评论
	function replay(box){
		var textAr=box.children[0];
		var div=document.createElement("div");
		div.className="reply-content my";
		var html='<p class="reply-text">'+
				'<span class="my">我:</span>'+
				' '+textAr.value+'</p>'+					
				'<a href="javascript:" class="reply-operate">删除</a>'
		div.innerHTML=html;
		box.parentNode.insertBefore(div,box);
		textAr.value="";
	}

	//回复或删除
	
	function operate(e){
		var queList=getDom("queList");
		var user=e.parentNode.getElementsByTagName("span")[0].innerHTML;
		var textarea=queList.getElementsByTagName("textarea")[0];
		var txt=e.innerHTML;
		if(txt=="回复"){
			textarea.onfocus();
			textarea.value="回复"+user;
			textarea.onkeyup();
		}else{
			removeNode(e.parentNode);
		}

	}

	//删除节点
	function removeNode(node){
		node.parentNode.removeChild(node);


	}


}