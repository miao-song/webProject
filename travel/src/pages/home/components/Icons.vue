<template>
  <div class="icons-container">
    <swiper :options="swiperOption">
      <swiper-slide
        v-for="(page, index) of pages"
        :key="index"
      >
        <div
          class="icon"
          v-for="item of page"
          :key="item.id"
        >
          <div class="icon-img">
            <img
              class="icon-img-content"
              :src="item.imgUrl"
            >
          </div>
          <p class="icon-desc">{{ item.desc }}</p>
        </div>
      </swiper-slide>
    </swiper>

  </div>
</template>

<script>
export default {
  name: "HomeIcons",
  props: {
    list: Array
  },
  data() {
    return {
      swiperOption: {
        autoplay: false
      }
    };
  },
  // 通过计算属性来渲染小图标 这样即使图标个数发生变化 计算属性也会实时渲染新的图标
  computed: {
    pages() {
      // pages 是一个二维数组 item 为图标所在页
      // 每一页中存放 8 个小图标 超过 8 个就显示在第二页
      const pages = [];
      this.list.forEach((item, index) => {
        // 定义一个变量 page 表示当前 图标显示在第几页的页码 页码从 0 开始
        const page = Math.floor(index / 8);
        // 判断如果当前页中没有图标 则为一个空数组
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/variable.styl';
@import '~styles/mixins.styl';

.icons-container {
  margin-top: 0.1rem;
}

.icons-container >>> .swiper-container {
  height: 0;
  overflow: hidden;
  padding-bottom: 50%;

  .icon {
    overflow: hidden;
    width: 25%;
    height: 0;
    float: left;
    padding-bottom: 25%;
    position: relative;

    .icon-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0.77rem;
      box-sizing: border-box;
      padding: 0.1rem;

      .icon-img-content {
        width: 65%;
        display: block;
        margin: 0 auto;
      }
    }

    .icon-desc {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0.77rem;
      line-height: 0.77rem;
      color: $darkTextColor;
      text-align: center;
      ellipsis();
    }
  }
}
</style>
