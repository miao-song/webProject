<template>
  <!-- 轮播图  start-->
  <mt-swipe :auto="4000">
    <!-- 这里的 lunbotuList 应该由调用该组件的父组件向此子组件传值
     因此 需要在子组件中定义 props 属性来接收
    -->
    <mt-swipe-item
      v-for='item in lunbotuList'
      :key='item.url'
    >
      <img
        :src="item.imgurl"
        :class="{'full': isfull}"
      >
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    lunbotuList: {
      type: Array,
      default: []
    },
    isfull: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
// 轮播图 start -----------------------------
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;

    img {
      width: 200px;
      height: 100%;
    }
    // 定义一个类 设置 图片宽度是否为 100%
    img.full {
      width: 100%;
    }
  }
}
// 轮播图 end  ----------------------------------------
</style>

