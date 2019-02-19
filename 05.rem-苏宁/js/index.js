/*使用zepto*/
$(function () {
    //实现轮播图
    var $imgBox = $(".sn_banner .imgBox");
    var $li = $imgBox.find("li:first");
    var liWidth = $li.width();
    //console.log(liWidth);
    //图片索引 默认显示第二张
    var index = 1;

    //将ul的动画封装
    //使用zepto中的animate-----fx.js
    var banner = function () {
        $imgBox.animate({
            transform: "translateX(" + (-liWidth * index) + "px)"
        }, 200, function () {
            if (index === 9) {
                index = 1;
                //瞬间位移
                $imgBox.css({
                    transform: "translateX(" + (-liWidth * index) + "px)"
                });
            } else if (index === 0) {
                index = 8;
                $imgBox.css({
                    transform: "translateX(" + (-liWidth * index) + "px)"
                });
            }
            //图片移动的同时点的变化
            var $dotLis = $(".dot").find("li");
            $dotLis.removeClass("now").eq(index - 1).addClass("now");
        });
    };

    //使用zepto中的animate-----fx.js
    clearInterval(timeId);
    var timeId = setInterval(function () {
        index++;
        banner();
    }, 1000);

    //轮播图的滑动事件 --- 需要引入zepto中的touch.js
    $(".sn_banner").on("swipeLeft", function () {
        index++;
        banner();
    });
    $(".sn_banner").on("swipeRight", function () {
        index--;
        banner();
    });
});