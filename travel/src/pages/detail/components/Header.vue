<template>
  <div>
    <!-- 返回的箭头按钮 -->
    <router-link
      tag="div"
      to="/"
      class="header-abs"
      v-show="showAbs"
    >
      <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>

    <!-- 页面向上滚动时 渐渐显示的header区域 -->
    <div
      class="header-fixed"
      v-show="!showAbs"
      :style='opacityStyle'
    >
      景点详情
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailHeadr",
  data() {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: "0"
      }
    };
  },
  activated() {
    window.addEventListener("scroll", this.handleScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const top = document.documentElement.scrollTop;
      if (top > 60) {
        let opacity = top / 140;
        opacity = opacity > 1 ? 1 : opacity;
        this.opacityStyle = {
          // opacity: opacity 使用es6简写
          opacity
        };
        this.showAbs = false;
      } else {
        this.showAbs = true;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/variable.styl';

.header-abs {
  position: absolute;
  left: 0.2rem;
  top: 0.2rem;
  width: 0.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-radius: 0.4rem;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;

  .header-abs-back {
    color: #fff;
    font-size: 0.4rem;
  }
}

.header-fixed {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $HeaderHeight;
  line-height: $HeaderHeight;
  text-align: center;
  font-size: 0.32rem;
  color: #fff;
  background-color: $bgColor;

  .header-fixed-back {
    width: 0.64rem;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

