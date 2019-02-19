$(function () {
    //轮播图手势切换
    toggleImg();

    //m端tab滑动效果
    isMobileTab();

    //初始化提示工具
    $('[data-toggle="tooltip"]').tooltip();

});

//轮播图模块
//轮播图手势滑动功能
//根据手势事件来判断切换上一张/下一张图片
function toggleImg() {
    //定义变量 分别表示触摸屏幕时的起始位置 移动位置 移动的距离 是否有移动
    var statrX = 0;
    var distanceX = 0;
    var isMove = false;
    $(".wjs_banner").on("touchstart", function (e) {
        //获取当前触屏的位置
        //console.log(e);
        //jq中的事件参数对象是n.Event 其中的originalEvent 和js中的touchEvent 一样
        statrX = e.originalEvent.touches[0].clientX;

    }).on("touchmove", function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - statrX;
        isMove = true;

    }).on("touchend", function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX < 0) {
                $(".carousel").carousel('next')
            } else {
                $(".carousel").carousel('prev')
            }
        }
        //重置参数
        statrX = 0;
        distanceX = 0;
        isMove = false;
    });
}

//产品模块
/* 实现功能
 *  需求：在M端 页签可以在屏幕中滑动
 *  思路： -1- 给页签ul加一个父盒子 width:100% 随屏幕自适应 overflow: hidden
 *        -2- 动态设置ul的width = li的width * li的个数
 *            jquery方式获取元素的width
 *            width() -----------content 内容区宽度
 *            innerWidth()  -----content + padding
 *            outerWidth()  -----centent + padding + border
 *            outerWidth(true) --content + padding + border + margin
 *
 *        -3- 通过iscroll插件实现屏幕滑动效果
 * */
//封装功能
function isMobileTab() {
    //获取ul
    var $ul = $('.wjs_products .nav-tabs');
    //定义一个变量保存ul的width
    var ulWidth = 0;
    //获取所有的li
    var $lis = $ul.find("li");
    //遍历所有li计算出其宽度之和
    $lis.each(function (i, item) {
        var liWidth = $(this).outerWidth(true);
        ulWidth += liWidth;
    });
    //console.log(ulWidth);
    $ul.width(ulWidth + 10);

    //实现滑动tab功能 利用iscroll插件
    new IScroll($(".wjs_products .nav-tabs_wrapper")[0], {
        scrollX: true,
        scrollY: false,
        //iscroll插件默认会清除滑动时的click事件
        //将点击事件加上
        click: true
    });
}