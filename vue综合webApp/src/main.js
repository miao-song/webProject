// 入口文件
//导入vue
import Vue from 'vue';

//导入 vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
//设置项目获取数据的API接口的全局根路径
//注意：这一行的设置一定要放在 导入vue-resource 之后
// Vue.http.options.root = 'http://localhost:3000';
// 设置全局 post 请求时的表单数据格式的组织形式-- application/x-www-form-urlencoded
Vue.http.options.emulateHTTP = true;

//导入路由包
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import App from './App.vue';

//按需导入 mint-ui
// import {Header,Swipe, SwipeItem, Button, Lazyload} from 'mint-ui';
// //使用 mint-ui 中的组件
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
// 要使用懒加载 mint-ui必须使用全部导入
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

//导入 mui 应用底部 tab 样式  和 字体文件
import './lib/mui/css/mui.min.css';
import './lib/mui/fonts/mui-icons-extra.ttf';
//导入底部 tab 购物车图标样式
import './lib/mui/css/icons-extra.css';

//导入路由模块 router.js
import router from './router.js';

// 导入 vuex
import Vuex from "vuex";
Vue.use(Vuex);

// 每次网站刚打开的时候 先将本地存贮的商品购买信息(加入购物车的商品件数)放入 car 中
var car = JSON.parse(localStorage.getItem("car") || '[]');

// 创建 Vuex 的实例
let store = new Vuex.Store({
  state: {
    //调用 state中的数据 this.$store.state.***
    //将购物车中商品的数据 用一个数组存贮起来 在其中存贮一些商品的对象
    //比如 {id: 商品id， count: 商品的件数， price:商品的价格, selected: true}
    car: car,
  },
  mutations: {
    // 调用 mutations中的方法 this.$store.commit('方法名', 按需传递唯一的参数)
    // 点击加入购物车按钮 将商品信息保存到 store 中的 car 中
    addToShopCar: function (state, goodsInfo) {
      // 如果 购物车中之前已经有这个商品了 则更新商品信息
      // 如果 购物车中还没有这个商品 则将商品信息 直接 push 到 car 数组中
      // 定义一个标识符flag 假设当前是没有同样的商品存在购物车中的
      let flag = false;
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.count += parseInt(goodsInfo.count);
          flag = true;
          return true;
        }
      });
      // 如果当前没有同样的商品存在于购物车
      if (!flag) {
        state.car.push(goodsInfo);
      }
      // 当更 car 的数据之后 将其存贮到本地 localStorage中
      // 防止页面刷新之后 数据恢复到了最初的状态没有被保存
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    //  在结算页面修改商品数量的信息时更新商品的数量到localStorage
    updatedGoodsInfo: function (state, goodsInfo) {
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.count = parseInt(goodsInfo.count);
          return true;
        }
      });
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    // 根据id 从store中的购物车中删除对应的商品数据
    removeFromCar(state, id) {
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1);
          return true;
        }
      });
      // 立即更新本地存储
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id === info.id) {
          item.selected = info.selected;
        }
      });
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    getGoodsSelectedAndAmount(state) {
      var obj = {
        count: 0, //勾选的数量
        amount: 0 // 所有勾选的商品总价
      };
      state.car.forEach(item => {
        //如果当前商品被勾选了
        if (item.selected) {
          obj.count += item.count;
          obj.amount += item.price * item.count;
        }
      });
      return obj;
    }
  },
  getters: {
    // this.$store.getters.***
    // 实现点击添加到购物车 购物车中的徽章同步修改商品数量
    getCount(state) {
      // 定义一个变量 表示当前徽章的显示商品数量
      let c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state) {
      var obj = {};
      state.car.forEach(item => {
        obj[item.id] = item.count;
      });
      return obj;
    },
    // 商品是否选中的切换开关
    getGoodsSelected(state) {
      var obj = {};
      state.car.forEach(item => {
        obj[item.id] = item.selected;
      });
      return obj;
    }
  }
});

//导入 moment 包
import moment from 'moment';
//定义一个 格式化时间的 全局过滤器
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pattern);
});

// 引入 vue-preview 实现图片预览
import VuePreview from 'vue-preview';
// with parameters install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {
    top: 0,
    bottom: 0
  },
  captionEl: false,
  fullscreenEl: true,
  shareEl: true,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: true
});

//创建vue实例对象
let vm = new Vue({
  el: '#app',
  data: {},
  methods: {},
  //把App组件渲染到app容器中
  render: (c) => c(App),
  router, //挂载路由对象于 vm 实例上
  store //将vuex 实例对象 挂载到 vm 实例对象上
});