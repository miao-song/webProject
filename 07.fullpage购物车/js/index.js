/**
 * 等待页面基本标签加载完毕后执行一些操作
 */
$(function () {
    //初始化插件函数
    //将设置属性的参数以对象的方式传递
    $(".container").fullpage({
        //设置每一屏的背景色
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],

        //设置文字垂直顶对齐
        verticalCentered: false,

        //设置屏幕右侧的导航小点
        navigation: true,

        //改变每一屏之间切换的时间为从上一屏离开掉落到下一屏的动画时间
        //目的--让上一屏的元素移动到下一屏时可以跟随页面切换同时进行动画效果
        scrollingSpeed: 1000,

        //当某一屏完全加载之后,就给当前屏幕加一个calss为now,
        // index从1开始，所以屏幕索引为 index-1
        afterLoad: function (link, index) {
            $(".section").eq(index - 1).addClass("now");
        },

        //当页面开始从当前屏离开移动到下一屏时
        //给当前的屏幕加上一个类为leaved
        onLeave: function (index, nextIndex, direction) {
            var sectionCurrent = $(".section").eq(index - 1);
            if (index == 2 && nextIndex == 3) {
                sectionCurrent.addClass("leaved");
            } else if (index == 3 && nextIndex == 4) {
                sectionCurrent.addClass("leaved");
            } else if (index == 5 && nextIndex == 6) {
                sectionCurrent.addClass("leaved");
                $(".section06 .box").addClass("show");
            } else if (index == 6 && nextIndex == 7) {
                //第七屏动画
                //让星星逐个显示
                //方法一 css3方法
                //页面从第6屏到第7屏时，给装星星的容器加上show类名，让它显示
                //然后通过js遍历每一个星星，依次延迟每个星星显示的时间
                $(".section07 .star").addClass("show");
                //遍历每一个星星，依次延迟每个星星显示的时间
                $(".section07 .star>img").each(function (i, item) {
                    $(this).css("transitionDelay", i * .5 + "s");
                });

                /*
                //方法二 js-jQuery方法
                 //遍历每一个星星，依次延迟不同的时间淡入显示
                 $(".section07 .star>img").each(function (i, item) {
                     $(this).delay(i * .5 * 1000).fadeIn(1000);
                 });
                 */

                //页面从第6屏到第7屏时,给好评文字添加一个类，让其执行动画
                $(".section07 .text").addClass("show")

            }
        },

        //插件渲染页面完成之后
        //设置点击每一屏的more,切换到下一屏
        afterRender: function () {
            $("#more").on("click", function () {
                //插件封装在$.fn中，插件中又封装了函数
                $.fn.fullpage.moveSectionDown();
            });

            /*当第四屏的购物车移动到右边之后，收货地址出现
             此时需要监听第四屏的购物车动画是否执行完毕，
             否则每次都要人工掐时间来计算下一个动画该何时执行
            */
            $(".section04 .cart").on("animationend", function () {
                $(".section04 .address").show().find("img:last").fadeIn(1000);
            });

            //第八屏功能实现
            //功能一：鼠标经过开始购物按钮，按钮有动画效果,也可以在css在设置
            /*$(".section08 .btn").on("mouseenter", function () {
                $(this).find("img:last").css("opacity", 1);
            }).on("mouseleave", function () {
                $(this).find("img:last").css("opacity", 0);
            });*/

            //功能二：小手图片跟随鼠标移动
            $(".section08").on("mousemove", function (event) {
                event = event || window.event;
                $(this).find(".hand").css({
                    "left": event.clientX - 200,
                    "top": event.clientY - 60
                });
            });
            /*
              功能三：小手点击再来一次，页面回到第一屏且所有的动画效果被初始化
              前几屏实现动画效果的方式一共有以下几种
              --1-- 给元素加类名 now leaved show
              --2-- 设置元素淡入效果 比如第四屏淡入显示收货地址
                    产生动画的结果是--> 元素的style属性中 disply: inline;
              --3-- 设置元素css属性 比如第七屏星星延迟显示 transitionDelay
                    产生动画的结果是--> 元素的style属性中 disply: 延迟的时间;
              综上--在点击再来一次时将以上产生东动画的结果移除即可
            */
            $(".section08 .again").on("click", function () {
                //--1-- 移除类名和style属性
                $(".now, .leaved, .show").removeClass("now").removeClass("leaved").removeClass("show");
                $(".content [style]").removeAttr("style");
                //--2-- 回到第一屏
                $.fn.fullpage.moveTo(1);
            });
        },
    });
});