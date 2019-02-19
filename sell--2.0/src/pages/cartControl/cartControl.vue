<template>
  <div class="cart-control">
    <!-- 减 按钮 -->
    <transition name="move">
      <div
        class="cart-decrease"
        v-show="food.count > 0"
        @click.stop.prevent="decreaseCart"
      >
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <!-- 单件商品的数量 -->
    <div
      class="cart-count "
      v-show="food.count"
    >{{food.count}}</div>
    <!-- 加 按钮 -->
    <div
      class="cart-add icon-add_circle"
      @click.stop.prevent="addCart"
    ></div>
  </div>
</template>

<script>
const EVENT_ADD = "add";

export default {
  name: "CartControl",
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      // count 是我们自己添加到 food中的属性字段
      // 在vue中 如果某个观测对象的某个字段不存在 那么直接给这个字段赋值是无法生效的 因为defineProperty检测不到新增属性的变化
      // 因此需要引入 vue的 API 利用 vue 的 set() API 去添加一个属性 这样这个属性的变化就可以被观测到 这样DOM就会自动发生变化
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      // 点击 加控件 时将当前击时的 加控件DOM对象 event.target 传递到父组件 goods 中
      this.$emit(EVENT_ADD, event.target);
    },
    decreaseCart() {
      this.food.count--;
    }
  }
};
</script>

<style lang="stylus" scoped>
.cart-control {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 0.12rem;

    .inner {
      display: inline-block;
      line-height: 0.48rem;
      font-size: 0.48rem;
      color: rgb(0, 160, 220);
      transition: all 0.4s linear;
      transform: rotate(0);
    }

    /* 减控件的动画 '减控件' 出现时从右向左旋转平移 同时有一个渐隐渐现效果 */
    &.move-enter, &.move-leave-active {
      opacity: 0;
      transform: translate3d(0.48rem, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }

    &.move-enter-active, &.move-leave-active {
      transition: all 0.4s linear;
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 0.24rem;
    padding-top: 0.12rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.2rem;
    color: rgb(147, 153, 159);
  }

  .cart-add {
    display: inline-block;
    padding: 0.12rem;
    line-height: 0.48rem;
    font-size: 0.48rem;
    color: rgb(0, 160, 220);
  }
}
</style>
