<template>
  <div class='photolist_container'>
    <!-- 顶部  tab 滑动导航区域  start-->
    <div
      id="slider"
      class="mui-slider"
    >
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <!-- 默认页面打开时 '全部' 这一个选项显示高亮效果 -->
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for='item in cates'
            :key='item.id'
            @tap='getPhotoListByCateId(item.id)'
          >
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>
    <!-- 顶部  tab 滑动导航区域  end-->
    <!-- 图片 列表 区域  start-->
    <ul class='photo_list'>
      <router-link
        tag="li"
        v-for="item in imglist"
        :key='item.id'
        :to="'/home/photoinfo/' + item.id"
      >
        <img v-lazy="item.img_url">
        <div class='info'>
          <h3>{{item.title }}</h3>
          <p>{{ item.zhaiyao }}</p>
        </div>
      </router-link>
    </ul>
    <!-- 图片列表 区域  end-->
  </div>
</template>

<script>
// 导入 mui的 js包 实现 顶部 tab 栏切换
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      // 所有分类列表的数组
      cates: [],
      // 所有的图片列表
      imglist: []
    };
  },
  // 当 DOM 结构被渲染好并放入页面中后 会执行该钩子函数
  mounted() {
    // DOM 结构加载完成 才能初始化 scroll 控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  // 页面刚初始化 在 created 中调用getAllcategories()
  created() {
    this.getALLcategories();
    // 页面刚进入的时候 显示 图片列表分类中的 “全部”  这一选项下的所有图片
    this.getPhotoListByCateId(0);
  },
  methods: {
    // 发送 GET 请求 获取图片分类
    getALLcategories() {
      // this.$http.get("api/getimgcategory").then(result => {
      this.$http.get("/static/data/getimgcategory.json").then(result => {
        if (result.body.status === 0) {
          // 在获取到的数据中手动添加第一个选项 '全部' 然后拼接出一个完整的分类列表
          result.body.message.unshift({
            title: "全部",
            id: 0
          });
          this.cates = result.body.message;
        }
      });
    },
    // 发送 get 请求  根据图片分类id 获取对应分类的图片列表
    getPhotoListByCateId(cateId) {
      // this.$http.get("/static/data/getimages.json/" + cateId)
      this.$http.get("/static/data/getimages.json").then(result => {
        if (result.body.status === 0) {
          this.imglist = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-slider {
  touch-action: pan-x;
}

// 图片列表 区域
.photo_list {
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  list-style: none;
  text-align: center;

  li {
    position: relative;
    margin-bottom: 10px;
    background-color: #ccc;
    box-shadow: 0 0 9px #999;
    // 自己的图片
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
      border: 0;
    }
    // 懒加载时显示的小图标
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
  .info {
    position: absolute;
    bottom: 2px;
    left: 2px;
    text-align: left;
    color: #fff;
    background-color: #000;
    opacity: 0.4;
    max-height: 355px;

    h3 {
      font-size: 14px;
    }
    p {
      color: #fff;
      margin: 0;
      font-size: 12px;
    }
  }
}
</style>


