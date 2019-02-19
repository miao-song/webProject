window.onload = function () {
    //页面加载完成后
    //------1-------顶部搜索框功能实现
    //------2-------轮播图实现
    //------3-------秒杀倒计时功能实现
    search();
    bannerMove();
    countDown();
};

//------1-------顶部搜索框功能实现
/**头部搜索栏在页面向下滑动的过程中背景颜色发生过渡 从0-0.85
 * 当页面滚动距离 >= 轮播图高度 搜索栏部分的背景色固定在 0.85不变
 * -- 获取头部元素.search_box
 * -- 获取轮播图 得到它的高度
 * -- 监听页面触摸滚动事件 touchmove
 */
//获取元素
var searchBox = document.querySelector(".search_box");
//获取装所有图片的ul
var imgsUl = document.querySelector(".imgs");
//获取图片高度
var ulHeight = imgsUl.offsetHeight;

//实现顶部搜索栏背景色渐变功能
var search = function () {
    //监听页面滚动事件
    window.addEventListener("touchmove", function () {
        //页面滚动出去的距离
        /* 在pc端的获取方式
         console.log(document.body.scrollTop);
         console.log(document.documentElement.scrollTop);
         console.log(window.pageYOffset);
        */
        var scrollTop = document.documentElement.scrollTop;
        //console.log(scrollTop);
        //默认透明度为0
        var opacity = 0;
        //判断页面滚动出去的距离
        if (scrollTop <= ulHeight) {
            opacity = 0.85 * scrollTop / ulHeight;
        } else {
            opacity = 0.85;
        }
        searchBox.style.backgroundColor = 'rgba(201, 21, 35, ' + opacity + ')';
    });
};

//------2-------轮播图实现
/**思路
 *    -1- 实现自动轮播
 *        利用定时器 和 css3过渡动画
 *        -1- 获取装有所有图片的ul 开启定时器 让ul做过渡和位移
 *        -2- 监听图片移动的过渡事件
 *            --当图片移动到第10张时,即第9张动画做完立马切换到第2张
 *              清除第10张的过渡，重置位移
 *              if(index >= 9) (index = 1)
 *            --当图片移动到第1张时,即第2张动画做完立马切换到第9张
 *              清除第1张的过渡，重置位移
 *              if(index <= 0) (index = 8)
 *    -2- 实现点随图片切换
 *        在图片移动的过渡事件中，实现点随图片切换
 *        点的索引为[0,7]  经过判断后的图片的索引取值范围index[1,8]
 *        因此点的索引 == 图片索引-1
 *        遍历点的集合 移除所有的点的类名now, 点[图片索引-1]添加类名now
 *        dot[i].classList.remove("now")
 *        dot[index-1].classList.add("now")
 *    -3- 手指滑动切换图片功能
 *        监听手指触摸屏幕touchstart 在屏幕上移动touchmove 手指离开屏幕事件touchend
 */
//-----2-1------实现自动轮播
//先获取所需元素和屏幕宽度
//轮播图容器
var banner = document.querySelector(".banner");
//屏幕宽度
var screenWidth = banner.offsetWidth;
//轮播图中的装所有的点的ul
var dotUl = document.querySelector(".dot");
//所有的点的集合
var dotList = dotUl.querySelectorAll("li");
//console.log(dotList);

//封装ul移动功能 添加ul移动过渡效果 清除ul过渡效果
var bannerMove = function () {
    //设置移动时的过渡效果
    function setTransition() {
        imgsUl.style.transition = "all 0.2s";
        imgsUl.style.webkitTransition = "all 0.2s";
    }
    //清除移动时的过渡效果
    function clearTransition() {
        imgsUl.style.transition = "none";
        imgsUl.style.webkitTransition = "none";
    }
    //ul位移发生变化的功能
    function setTranslateX(translateX) {
        imgsUl.style.transform = "translateX(" + translateX + "px)";
        imgsUl.style.webkiTtransform = "translateX(" + translateX + "px)";
    }
    //封装轮播图中点的显示的功能
    function dotDisplay() {
        //点的自动切换
        //遍历所有的点
        for (var i = 0; i < dotList.length; i++) {
            //移除所有点的类样式
            //dotList[i].className = "";
            dotList[i].classList.remove('now');
        }
        //经过判断后图片索引范围为[1,8],当前点的索引比图片索引小1
        //dotList[index-1].className = "now";
        dotList[index - 1].classList.add("now");
    }

    //定义一个变量保存图片索引,默认为1
    var index = 1;
    //开启定时器
    var timeId = setInterval(function () {
        index++;
        setTransition();
        setTranslateX(-index * screenWidth);
    }, 1000);

    //监听过渡效果是否执行完毕，判断下一张显示哪一张
    imgsUl.addEventListener("transitionend", function () {
        if (index === 9) {
            //瞬间定位
            index = 1;
            //清除过渡，重设位移
            clearTransition();
            setTranslateX(-index * screenWidth);
        } else if (index === 0) {
            //瞬间定位
            index = 8;
            //清除过渡，重设位移
            clearTransition();
            setTranslateX(-index * screenWidth);
        }
        //图片过渡完成时，显示点
        dotDisplay();
    });

    //手指触屏的一系列事件
    //定义一个变量，保存在ul上触屏时的起始坐标,默认为0
    var startX = 0;
    //当手指放在屏幕上时触发touchstart事件,此时清除定时器
    imgsUl.addEventListener("touchstart", function (e) {
        //清除定时器
        clearInterval(timeId);
        //获取在ul上触屏时的起始坐标
        startX = e.touches[0].clientX;
    });

    //当手指在屏幕上移动时时触发touchmove事件
    //定义一个变量，保存是否触摸屏幕时有滑动,默认没有
    var isMove = false;
    //定义一个变量，保存手指滑动时产生的位移,默认为0
    var distanceX = 0;
    imgsUl.addEventListener("touchmove", function (e) {
        //获取手指移动时的坐标
        var moveX = e.touches[0].clientX;
        //计算手指滑动时移动的距离
        distanceX = moveX - startX;
        //手指移动时清除过渡 同时ul跟随手指一起移动
        //ul位移 = 手指在屏幕移动的距离 + 图片原本的偏移量
        clearTransition();
        setTranslateX(distanceX + (-index) * screenWidth);
        isMove = true;
    });

    //手指离开屏幕，触屏事件结束，根据图片的位移判断是否切换图片
    /** 思路
     *     -1- 当位移 < 屏幕宽度的1/3，不切换图片
     *         设置过渡，位移回到变化之前即-index*screenWidth
     *     -2- 当位移 > 屏幕宽度的1/3，切换图片
     *         根据手指在屏幕滑动距离的正负判断切换的是上一张还是下一张图片
     */
    //监听触屏结束事件
    imgsUl.addEventListener("touchend", function () {
        //如果手指有在屏幕上滑动则ul才移动
        if (isMove) {
            //判断如果手指移动距离 < 屏幕宽度1/3, 则不切换图片
            if (Math.abs(distanceX) < screenWidth / 3) {
                setTransition();
                setTranslateX(-index * screenWidth);
                //如果手指移动距离 > 屏幕宽度1/3, 切换图片
            } else {
                //当向右滑动，说明切换下一张图片
                if (distanceX > 0) {
                    index--;
                    //当向左滑动，说明切换下一张图片
                } else {
                    index++;
                }
                setTransition();
                setTranslateX(-index * screenWidth);
            }
        }
        //手指离开屏幕触屏结束，重置数据，开启定时器，图片自动轮播
        //重置数据
        isMove = false;
        startX = 0;
        distanceX = 0;
        //开启定时器
        clearInterval(timeId);
        timeId = setInterval(function () {
            index++;
            setTransition();
            setTranslateX(-index * screenWidth);
        }, 1000);
    });
};

//------3-------秒杀倒计时功能实现
//获取所有显示时间的span
var spans = document.querySelectorAll(".time span");
console.log(spans);
var countDown = function () {
    //假设倒计时 4 个小时
    //计算出总时长秒数，用于格式化时间
    var time = 4 * 60 * 60;
    //设置定时器
    clearInterval(timeId);
    var timeId = setInterval(function () {
        time--;
        //格式化时间
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);

        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;

        //判断当抵达倒计时的时候 清除定时器
        if (time <= 0) {
            clearInterval(timeId);
        }
    }, 1000);
};