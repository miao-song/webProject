import VueRouter from 'vue-router';

// 导入tabBar部分对应的中间区域的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import ShopcartContainer from './components/tabbar/ShopcartContainer.vue';
// 引入新闻页面组件
import newsList from './components/news/newsList.vue';
// 引入新闻详情页面组件
import newsInfo from './components/news/newsInfo.vue';
// 引入图片列表页面组件
import photoList from './components/photos/photoList.vue';
// 引入图片详情页组件
import photoInfo from './components/photos/photoInfo.vue';
// 引入商品列表组件
import goodsList from './components/goods/goodslist.vue';
// 引入商品详情页面组件
import goodsinfo from './components/goods/goodsinfo.vue';
// 引入商品描述
import goodsdesc from './components/goods/goodsdesc.vue';
// 引入商品评论
import goodscomment from './components/goods/goodscomment.vue';

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    // 页面打开默认显示 home 页面
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeContainer,
    },
    {
      path: '/member',
      component: MemberContainer
    },
    {
      path: '/search',
      component: SearchContainer
    },
    {
      path: '/shopcart',
      component: ShopcartContainer
    },
    {
      path: '/home/newsList',
      component: newsList
    },
    {
      path: '/home/newsInfo/:id',
      component: newsInfo
    },
    {
      path: '/home/photoList',
      component: photoList
    },
    {
      path: '/home/photoinfo/:id',
      component: photoInfo
    },
    {
      path: '/home/goodslist',
      component: goodsList
    },
    {
      path: '/home/goodsinfo/:id',
      component: goodsinfo,
      // 为路由命名
      name: 'goodsinfo'
    },
    {
      path: '/home/goodsdesc/:id',
      component: goodsdesc,
      name: 'goodsdesc'
    },
    {
      path: '/home/goodscomment/:id',
      component: goodscomment,
      name: 'goodscomment'
    }
  ],
  linkActiveClass: 'mui-active'
});

// 把路由对象暴露出去
export default router;