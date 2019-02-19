<template>
  <div
    class="container"
    @click="handleGallaryClick"
  >
    <div class="wrapper">
      <swiper :options="swiperOptions">
        <swiper-slide
          v-for="(item, index) of imgs"
          :key="index"
        >
          <img
            class="gallary-img"
            :src="item"
          >
        </swiper-slide>

        <div
          class="swiper-pagination"
          slot="pagination"
        ></div>
      </swiper>
    </div>
  </div>
</template>>

<script>
export default {
  name: "CommonGallary",
  data() {
    return {
      swiperOptions: {
        loop: true,
        pagination: ".swiper-pagination",
        paginationType: "fraction",
        observer: true,
        observeParents: true
      }
    };
  },
  props: {
    imgs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 当点击画廊页面的任何区域时 关闭画廊
    handleGallaryClick() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="stylus" scoped>
// 让分页器的内容(当前是第几张图片 比如 1/29)显示出来
.container >>> .swiper-container {
  overflow: inherit;
}

.container {
  // 设置垂直居中
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;

  .wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 100%;

    .gallary-img {
      width: 100%;
    }

    .swiper-pagination {
      color: #fff;
      bottom: -1rem;
    }
  }
}
</style>
