// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入 App.vue组件
import App from './App'
// 引入 router文件下的 index.js文件 这是一个路由匹配规则文件
import router from './router'
// 引入 reset.css
import 'styles/reset.css'
// 引入 border.css
import 'styles/border.css'
// 引入 iconfont.css
import 'styles/iconfont.css'
// 引入 fastclick包
import fastClick from "fastclick"
// 使用 fastclick
fastClick.attach(document.body)
// 引入 轮播插件 vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 使用  轮播插件 vue-awesome-swiper
Vue.use(VueAwesomeSwiper)
// 引入 store 中的 index.js
import store from './store'
import 'babel-polyfill'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
