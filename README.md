### 可交互购物网站，也许简单粗陋，但是我从写代码中收获很多。如果你同样是新手，我相信如果你看了，也会收获良多！

* **为什么做这个网站？**
* 1.坚持初心，当时决定写Github就是希望能把我自己所想所得分享出去，也许不见得很好，但是我都会尽力做。
* 2.对自己最近学习的内容做一下综合测试。
* 3.我想证明一下，其实JS并不难，尤其在学习道路上，有的小伙伴会焦虑，放弃，我希望我能够帮到他们。（可能我想多了），好了不废话了！

* **两个网页，8种类型的JS交互动画分析，以及知识点、坑的总结（后续有问题我会补充）**
* 先看第一页（index.js，index.html）文件

动画1：导航栏的显示（知识点：遍历、onmouseover、onmouseout事件）
--
* 布局中我把导航栏作为一部分，下面要显示的菜单作为一部分，我没有把菜单项插入到导航栏中。
思路是：遍历导航栏，为每个导航项目加下标值，然后遍历菜单项，根据相应的导航栏下标值改变
菜单项的显示方式（block；none）
* 有坑吗？当然有！如果鼠标移开需要隐藏菜单项，所以我在鼠标移入导航栏的时候，遍历菜单项，
并且把所有的菜单项先隐藏掉。但是后果是鼠标想从导航栏移入到菜单项的，根本无法实现，因为我
有鼠标移出事件，当鼠标移出时候，菜单项自然消失，所以我把导航栏的鼠标移出事件去掉了。换成
了导航栏的鼠标移入和菜单栏的鼠标移入、移出事件。

动画2：轮播图（onclick、递归，图片按钮的同步变化、定时器）
--
* 思路分解：首先点击左右箭头，图片移动位置，通过点击事件改变图片的style.left值；其次实现
无限滚动，做if判断如果图片的style.left到达最后或者第一张图片的位置，改变它们的值；继续图片
滚动的时候，底部按钮（颜色）改变，通过点击左右箭头，声明一个新下标变量，通过改变变量的值，来
改变对应底部按钮的颜色（记得要清除别的按钮颜色）；继续通过点击底部按钮改变图片位置，并改变声明
的下标值，再改变按钮颜色；继续图片的移动采用递归，根据设定每次移动距离，为该距离分解次数，再通过
定时器不断改变位置，最后做判断。最后让图片自动播放（也就是自动点击箭头）

* 坑：滚动闪屏：无限滚动的时候，当到达两端的时候执行页面滚动函数（递归），会出现一段时间留白，因为
图片未到达两端位置，后面滚动条件无法判断。为了去掉该BUG，所以在图片的两端都分别加了一张图片，首端
加最后一张，最后一端加第一张图片；
* 坑2：定时器不停加载，因为多次点击鼠标，会出现定时器在队列中排队，所以在图片移动的时候就要让下一次的
鼠标点击事件失效即可。

动画3：倒计时（时间获取，摩尔（%）得到天、小时、分钟、秒，定时器）
--
* 思路：取得当前时间，设定截至时间，得到剩余时间；在摩尔到剩余的天、小时、分钟、秒，通过定时器让他们
实时刷新
* 坑：分、秒小于10想让他们前缀有0，我就做了判断，这里用了三元运算符，为他们赋值

动画4：回到顶部按钮（定时器，缓冲运动，获取滚动高度scrollTop、页面可视高度clientHeight）
--
* 思路：通过获得屏幕滚动高度显示隐藏按钮，用到了clientHeight；当点击按钮时候，也main缓冲滚到顶部，就采用
了scrollTop，并且让这个页面缓冲滚动，采用定时器，并且让每次加的值递减。

* **第二页（index2.html；shopping.js）**
动画5：图片放大（offsetLeft,offsetTop,clientX,clientY,offsetWidth,offsetHeight）
--
* 思路：我认为难点就在第一步思路上，就是让小图片里的类似放大框移动位置，怎么移动位置呢？就需要获取鼠标的X、Y轴
坐标，减去这个放大框所有父元素的距离页面的offsetLeft,offsetTop值，得到了鼠标距离相对于放大框的父元素内的坐标，
非其它祖先元素，然后想让鼠标在放大框中心，就需要在减去一个放大框自身宽度的一半。剩下的就好办了，有了相对于一级父
元素内偏移距离，就能实时改变放大框的位置，根据图片比例，在计算出那个大图片应该偏移的距离。

动画6：价格变化（内容读写，innerhtml、value，实时改变value值，键盘事件，特殊值的处理如;NaN）
--
* 个人觉得这是最麻烦的，真是为了做这个效果，用了不少时间
* 思路：改变内存容量，页面价格变化；鼠标点击事件，加减数量，并实时计算价格；这些都好办，难点来了。键盘事件，大坑啊，
键盘弹出，不仅要实时改变输入框的值，也要改变这个输入框的属性value值，让点击加减能够根据输入框的值继续，这里要用局部
变量动态获取值，并立即改变。然后数量限制，加减点击通过if判断；键盘的值通过实时获取value做出判断，不能为NaN,用到了
isNaN()判断。
* 坑：个人来说是不满意的，因为这里还有一个bug，虽然我解决输入框不能输入大于3小于1，删除数字后价格也不会NaN，但是
却可以输入小数，字符串，这个坑实在太大了，我去搜了一下几乎都是正则的解决办法，也希望看官有好的办法能够告诉我，多谢了！

动画7：下面三个选项卡的切换和商品评价的点赞（雪碧图，其中还发现了一个有意思的小玩意，就把这两个动画合在一起说了）
--
* 思路：选项卡的实现就不赘述了，点赞用的雪碧图，这个也简单，说说新发现吧。
* 新发现:position:absolute;元素仅设置这个定位后，它相对于它父容器定位（在任何一个容器都不设置position的时候），如果
在它前面有块级元素，它会紧跟着块级元素，而且还可以设置margin值。对！我就想用这个功能加到选项卡下底部栏中，让底部随着选
项卡菜单下的内容自动跟随位置，是不是酷爆了。但是，如果它有left、top值，不好意思，它就回到正常了，找到祖先元素中定位非静
态的那个元素进行定位。虽然很想用，但是容易出错，想想还是算了，以后想想能加到什么有意思的功能里。

动画8：回复、提问、删除（事件代理、增删查DOM节点树，获取焦点、失去焦点、键盘事件）
--
* 思路：获取每个DOM节点，增加用createElment、insertBefore，删除用了node.parentNode.removeChild(自己)方法；查是用了
innerHTML、value值的获取；以及onfocus、onblur、onkeyup事件。知识点就是这样，但是用起来真的需要多动手多思考，思路有了，
就好办了。

--
**总结：**  这个作品覆盖了不少的知识点，有鼠标的事件、键盘事件、焦点事件、遍历元素、缓冲运动、递归函数、定时器使用、缓冲运动、
获取元素宽高、页面滚动高度、鼠标坐标值、事件代理、DOM树的增删改查等等；其实细细想一下JS是一门有意思的学科，也希望这个作品能帮
到有需要的人（如果有人看得话），一定要多动手敲代码，毕竟熟能生巧嘛！


https://dongdaze.github.io/shopping/index.html
