<template>
  <div>
    <!-- banner 区域  start-->
    <div
      class="banner"
      @click="handleBannerClick"
    >
      <img
        class="banner-img"
        :src="bannerImg"
      >
      <div class="banner-info">
        <div class="banner-title">{{this.sightName}}</div>
        <div class="banner-number">
          <span class="iconfont banner-icon">&#xe692;</span>
          {{ this.gallaryImgs.length }}
        </div>
      </div>
    </div>
    <!-- banner 区域  end-->
    <!-- gallary画廊 区域  start-->
    <fade-animation>
      <common-gallary
        :imgs="gallaryImgs"
        v-show="showGallary"
        @close="handleGallaryClose"
      ></common-gallary>
    </fade-animation>
    <!-- gallary画廊 区域  end-->
  </div>
</template>

<script>
import CommonGallary from "common/gallary/Gallary";
import FadeAnimation from "common/fade/FadeAnimation";

export default {
  name: "DetailBanner",
  data() {
    return {
      showGallary: false
    };
  },
  props: {
    sightName: String,
    bannerImg: String,
    gallaryImgs: Array
  },
  methods: {
    // 当点击 banner的时候 画廊图片显示出来
    handleBannerClick() {
      this.showGallary = true;
    },
    // 当点击画廊页面的任何区域时 关闭画廊
    handleGallaryClose() {
      this.showGallary = false;
    }
  },
  components: {
    CommonGallary,
    FadeAnimation
  }
};
</script>

<style lang="stylus" scoped>
.banner {
  // 防止页面抖动
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 55%;
  position: relative;

  .banner-img {
    width: 100%;
  }

  .banner-info {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 0.6rem;
    color: #fff;
    // 设置渐变色背景
    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));

    .banner-title {
      flex: 1;
      font-size: 0.32rem;
      padding: 0 0.2rem;
    }

    .banner-number {
      padding: 0 0.4rem;
      margin-top: 0.14rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border-radius: 0.2rem;
      background-color: rgba(0, 0, 0, 0.8);
      font-size: 0.24rem;

      .banner-icon {
        font-size: 0.24rem;
      }
    }
  }
}
</style>
