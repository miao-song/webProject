<template>
  <div>
    <!-- header区域 -->
    <home-header></home-header>
    <!-- 轮播图 -->
    <home-swiper :list="swiperList"></home-swiper>
    <!-- 图标区域 -->
    <home-icons :list="iconList"></home-icons>
    <!-- 推荐区域 -->
    <home-recommend :list="recommendList"></home-recommend>
    <!-- 周末游区域 -->
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>

<script>
// 引入 Header子组件 并注册到父组件 Home 的 components 中
import HomeHeader from "./components/Header";
// 引入 Swiper子组件 并注册
import HomeSwiper from "./components/Swiper";
// 引入  Icons子组件 并注册
import HomeIcons from "./components/Icons";
// 引入  Recommend子组件 并注册
import HomeRecommend from "./components/Recommend";
// 引入  Weekend子组件 并注册
import HomeWeekend from "./components/Weekend";
// 引入 axios
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      lastCity: "",
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    };
  },
  mounted() {
    // 这里的 this.city 是 state中的共享数据
    this.lastCity = this.city;
    this.getHomeInfo();
  },
  activated() {
    if (this.lastCity !== this.city) {
      this.lastCity = this.city;
      this.getHomeInfo();
    }
  },
  methods: {
    getHomeInfo() {
      axios
        .get("/static/mock/index.json?city=" + this.city)
        .then(this.getHomeInfoSucc);
    },
    getHomeInfoSucc(res) {
      res = res.data;
      // 判断如果请求成功且有返回的数据有内容
      if (res.ret && res.data) {
        const data = res.data;
        this.swiperList = data.swiperList;
        this.iconList = data.iconList;
        this.recommendList = data.recommendList;
        this.weekendList = data.weekendList;
      }
    }
  },
  computed: {
    ...mapState(["city"])
  },
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
