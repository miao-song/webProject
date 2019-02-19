<template>
  <div class="swiper-container">
    <swiper
      :options="swiperOption"
      v-if="showSwiper"
    >
      <swiper-slide
        v-for="item of list"
        :key="item.id"
      >
        <img
          class="swiper-img"
          :src="item.imgUrl"
        >
      </swiper-slide>
      <!-- 小点 -->
      <div
        class="swiper-pagination"
        slot="pagination"
      ></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    // 轮播图所需数据
    list: {
      type: Array
    }
  },
  data() {
    return {
      // 轮播图需要的数据
      swiperOption: {
        // 配置轮播图的页码 ---> 小点
        pagination: ".swiper-pagination",
        // 循环播放轮播图
        loop: true
      }
    };
  },
  computed: {
    showSwiper() {
      return this.list.length;
    }
  }
};
</script>

<style lang="stylus" scoped>
.swiper-container >>> .swiper-pagination-bullet-active {
  background-color: #fff;
}

.swiper-container {
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 26.6666%;

  .swiper-img {
    width: 100%;
  }
}
</style>
