window.onload = function () {
    //初始化iscroll插件
    //对父容器监听touchmove事件
    document.querySelector(".cate_main_left").addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
    document.querySelector(".cate_main_right").addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
    /**区域滚动效果
     * 条件
     *     -1- 一个容器内嵌套一个容器的html结构
     *     -2- 子容器大于父容器
     * 用法：在父容器上进行操作
     */
    //左侧上下滑动
    new IScroll(document.querySelector(".cate_main_left"), {
        scrollX: false,
        scrollY: true
    });
    //右侧左右滑动
    new IScroll(document.querySelector(".cate_main_right"), {
        scrollX: true,
        scrollY: true
    });
};