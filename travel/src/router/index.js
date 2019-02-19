import Vue from 'vue'
import Router from 'vue-router'
// 引入组件 @表示 src根路径
import Home from '@/pages/home/Home'
// 引入 City 组价
import City from '@/pages/city/City'
// 引入 Detail 组价
import Detail from "@/pages/detail/Detail"
Vue.use(Router)

// 路由规则配置 并将其暴露出去
export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
