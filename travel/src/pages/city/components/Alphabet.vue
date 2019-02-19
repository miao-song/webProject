<template>
  <div>
    <ul class="list">
      <li
        class="item"
        v-for="item of letters"
        :key="item"
        :ref="item"
        @touchstart.prevent="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @click="handleLetterClick"
      >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CityAlphabet",
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    };
  },
  props: {
    cities: Object
  },
  updated() {
    // 获取字母 A 距离顶部的距离
    this.startY = this.$refs["A"][0].offsetTop;
  },
  computed: {
    letters() {
      const letters = [];
      for (let key in this.cities) {
        letters.push(key);
      }
      return letters; //返回一个数组 形如 ['A','B','C'......]
    }
  },
  methods: {
    handleLetterClick(e) {
      this.$emit("change", e.target.innerText);
    },
    handleTouchStart() {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        // 如果当前开启了定时器 就关闭
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          // 获取手指点击的地方距离Header底部的距离 = 手指点击的地方距离顶部的距离 - header区域高度
          const touchY = e.touches[0].clientY - 79;
          // 获取 当前点击字母的索引 = touchY - startY / 每个字母的高度
          const index = Math.floor((touchY - this.startY) / 20);
          if (index >= 0 && index < this.letters.length) {
            this.$emit("change", this.letters[index]);
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/variable.styl';

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 1.58rem;
  right: 0;
  bottom: 0;
  width: 0.4rem;

  .item {
    text-align: center;
    line-height: 0.4rem;
    color: $bgColor;
  }
}
</style>

