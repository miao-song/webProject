<template>
  <div
    class="star"
    :class="starType"
  >
    <span
      class="star-item"
      v-for="(item, index) of itemClasses"
      :key="index"
      :class="item"
    ></span>
  </div>
</template>

<script>
// 定义一个常量  表示星星的总个数 默认为 5
const LENGTH = 5;
// 将星星总个数length 和星星的类 保存在外部的常量中 这样即使以后星星的样式或者长度发生变化 也只需要改变常量的值即可 不用做大幅度的修改
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  name: "Star",
  props: {
    // 星星图的不同尺寸 也就是几倍图
    size: {
      type: Number
    },
    // 评分
    score: {
      type: Number
    }
  },
  computed: {
    // 根据size的值 计算星星显示时是几倍图尺寸的样式的类
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      // 用于保存 显示星星的类
      let result = [];
      // 评分取整 向下取 0.5 倍数的一个值
      let score = Math.floor(this.score * 2) / 2;
      // 判断是否有半星 不等于0 则有半星
      let hasDecimal = score % 1 !== 0;
      // 全星的个数
      let integer = Math.floor(score);
      // 将全星push到result中
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      // 将半星push到result中
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      // 如果星星长度不足5 则填充灰色的星星
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.star {
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.44rem;
      background-size: 0.4rem 0.4rem;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('images/star48_on');
      }

      &.half {
        bg-image('images/star48_half');
      }

      &.off {
        bg-image('images/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.06rem;
      background-size: 0.3rem 0.3rem;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('images/star36_on');
      }

      &.half {
        bg-image('images/star36_half');
      }

      &.off {
        bg-image('images/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 0.2rem;
      height: 0.2rem;
      margin-right: 0.03rem;
      background-size: 0.2rem 0.2rem;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('images/star24_on');
      }

      &.half {
        bg-image('images/star24_half');
      }

      &.off {
        bg-image('images/star24_off');
      }
    }
  }
}
</style>

