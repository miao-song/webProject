<template>
  <div>
    <!-- 轮播图  start-->
    <swiper
      :lunbotuList='lunbotuList'
      :isfull='true'
    ></swiper>
    <!-- 轮播图 end -->

    <!-- 六宫格 部分 start -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 ">
        <router-link to='/home/newslist'>
          <img src="../../images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 ">
        <router-link to='/home/photoList'>
          <img
            src="../../images/menu2.png"
            alt=""
          >
          <!-- <span class="mui-badge">5</span></span> -->
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 ">
        <router-link to='/home/goodslist'>
          <img
            src="../../images/menu3.png"
            alt=""
          >
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
          <img
            src="../../images/menu4.png"
            alt=""
          >
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
          <img
            src="../../images/menu5.png"
            alt=""
          >
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
          <img
            src="../../images/menu6.png"
            alt=""
          >
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>
    <!-- 六宫格 部分 end -->
  </div>
</template>

<script>
//导入Mint-ui 中的 Toast
import { Toast } from "mint-ui";

// 导入轮播图 子组件
import swiper from "./../subcomponents/swiper.vue";

export default {
  data() {
    return {
      // 接收轮播图的数据
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    // 获取轮播图的数据的方法
    getLunbotu() {
      this.$http.get("/static/data/lunbo.json").then(result => {
        if (result.body.status === 0) {
          this.lunbotuList = result.body.message;
        } else {
          Toast("加载轮播图失败…………");
        }
      });
    }
  },
  // 注册 轮播图 子组件
  components: {
    swiper
  }
};
</script>

<style lang="scss">
// 轮播图 start -----------------------------
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
// 轮播图 end  ----------------------------------------

//六宫格  start  -----------------------------------------
//六宫格  end  -----------------------------------------
// ul
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border-bottom: none;
  // li
  .mui-table-view-cell {
    border-right: none;
    border-bottom: none;
    // img
    img {
      width: 60px;
      height: auto;
    }
  }
  //文字
  mui-media-body {
    font-size: 13px;
  }
}
</style>


