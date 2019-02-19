<template>
  <transition name="move">
    <div class="shop-cart-list-wrapper">
      <div
        class="shop-cart-list"
        ref="shopCartList"
      >
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span
            class="empty"
            @click="empty"
          >清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li
              class="food"
              v-for="(food, index) of selectFoods"
              :key="index"
            >
              <div class="desc">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
              </div>
              <!-- 购物车加减控件 -->
              <div class="cart-control-wrapper cart-control-wrapper">
                <cart-control :food="food" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import cartControl from "./../cartControl/cartControl";

export default {
  name: "shopCartList",
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 点击 “清空” 的 click 响应函数
    empty() {
      this.selectFoods.forEach(item => {
        item.count = 0;
      });
    }
  },
  components: {
    cartControl
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins';

.shop-cart-list-wrapper {
  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.4s ease-in-out;
  }

  .shop-cart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
    transition: all 0.4s ease-in-out;

    .list-header {
      height: 0.8rem;
      line-height: 0.8rem;
      padding: 0 0.36rem;
      background: #f3f5f7;
      border-1px(rgba(7, 17, 27, 0.1));

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 0.24rem;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 0.36rem;
      max-height: 4.34rem;
      background-color: #fff;
      overflow: hidden;

      .food {
        width: 100%;
        padding: 0.24rem 0;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        border-1px(rgba(7, 17, 27, 0.1));

        .desc {
          width: 50%;

          .name {
            line-height: 0.48rem;
            margin-top: 0.4rem;
            font-size: 0.28rem;
            color: rgb(7, 17, 27);
          }

          .price {
            position: absolute;
            right: 2rem;
            bottom: 0.36rem;
            line-height: 0.48rem;
            font-weight: 700;
            font-size: 0.28rem;
            color: rgb(240, 20, 20);
          }
        }

        .cart-control-warpper {
          position: absolute;
          right: 0;
          bottom: 0.12rem;
          width: 50%;
        }
      }
    }
  }
}
</style>
