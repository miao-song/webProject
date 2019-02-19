<template>
  <div>
    <div class="shopcart">
      <div
        class="content"
        @click.prevent="toggleList"
      >
        <div class="content-left">
          <div class="logo-wrapper">
            <div
              class="logo"
              :class="{'highlight': totalCount > 0}"
            >
              <i
                class="icon-shopping_cart"
                :class="{'highlight': totalCount > 0}"
              ></i>
            </div>
            <!-- 购物车上的数字小红圈 -->
            <div
              class="num"
              v-show="totalCount > 0"
            >{{totalCount}}</div>
          </div>

          <div
            class="price"
            :class="{'highlight': totalPrice > 0}"
          >
            <span>￥{{totalPrice}}</span>
          </div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>

        </div>
        <div
          class="content-right"
          @click.stop.prevent="pay"
        >
          <div
            class="pay"
            :class="payClass"
          >
            {{payDesc}}
          </div>
        </div>
      </div>

      <!-- 小球部分 -->
      <div class="ball-container">
        <div
          v-for="(ball,index) in balls"
          :key="index"
        >
          <transition
            @before-enter="beforeDrop"
            @enter="dropping"
            @after-enter="afterDrop"
          >
            <!-- 外层 -->
            <div
              class="ball"
              v-show="ball.show"
            >
              <!-- 内层 -->
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 购物车弹层 -->
      <div
        class="shop-cart-list-wrapper"
        v-show="listShow"
        ref="shopCartListWrapper"
      >
        <shop-cart-list :selectFoods="selectFoods" />
      </div>

    </div>

    <!-- 点击购物车时和商品详情列表同时出现的蒙层 -->
    <transition class="fade">
      <div
        class="list-mask"
        v-show="listShow"
        @click="hideList"
      ></div>
    </transition>

  </div>
</template>

<script>
import shopCartList from "./../shopCartList/shopCartList";
import BScroll from "better-scroll";

// 定义一个常量保存小球的个数
const BALL_LEN = 10;
// 定义一个常量 保存小球的类
const innerClsHook = "inner-hook";

// 定义一个函数 用来创建所有的小球
function createBalls() {
  let balls = [];
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({ show: false });
  }
  return balls;
}

export default {
  name: "shopCart",
  data() {
    return {
      // 所有做动画的小球
      balls: createBalls(),
      fold: true
    };
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    // 下落的小球
    this.dropBalls = [];
  },
  methods: {
    drop(el) {
      // 从所有的小球中找到一个隐藏的小球 让其显示 同时添加到 dropBalls
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      // 找到最后一个隐藏的小球
      const ball = this.dropBalls[this.dropBalls.length - 1];
      // 获取小球元素在视口的位置
      const rect = ball.el.getBoundingClientRect();

      // 计算小球最终的偏移位置
      // x 偏移
      const x = rect.left - 32;
      // 窗口高度window.innerHeight
      // y 偏移
      const y = -(window.innerHeight - rect.top - 22);
      // 让小球显示
      el.style.display = "";
      // 为小球设置偏移位置
      // 外层做纵向偏移
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      // 内层做横线偏移
      const inner = el.getElementsByClassName(innerClsHook)[0];
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
    },
    dropping(el, done) {
      // 首先要触发浏览器重绘
      this._reflow = document.body.offsetHeight;
      // 将小球的位置重置到初始位置
      el.style.transform = el.style.webkitTransform = "translate3d(0,0,0)";
      //获取内层小球
      const inner = el.getElementsByClassName(innerClsHook)[0];
      inner.style.transform = inner.style.webkitTransform =
        "translate3d(0,0,0)";
      el.addEventListener("transitionend", done);
    },
    afterDrop(el) {
      // 将当前做过动画的小球的状态重置
      const ball = this.dropBalls.shift();
      // 让小球隐藏
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    },
    // 点击购物车区域时 弹出加入购物车商品的详情
    toggleList() {
      if (!this.totalCount) {
        return false;
      }
      this.fold = !this.fold;
    },
    // 点击蒙层 购物车商品详情列表和蒙层一起隐藏
    hideList() {
      this.fold = true;
    },
    // 点击去结算按钮 进行商品的结算
    pay() {
      // 判断是否达到了配送金额
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`您需支付${this.totalPrice}元`);
    }
  },
  computed: {
    // 购物车中所有商品的总价
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(item => {
        total += item.price * item.count;
      });
      return total;
    },
    // 购物车商品的总件数
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(item => {
        count += item.count;
      });
      return count;
    },
    // 结算区块根据总价格 显示不同的内容
    payDesc() {
      if (this.totalPrice === 0) {
        return `${this.minPrice}元起送`;
        // 未达到起送金额
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    // 购物车区域右边的结算区块按照不同的条件所应用的样式
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    // 购物车中商品详情弹层的显示或隐藏
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        // 获取加入购物车中的商品列表
        let listContent = this.$refs.shopCartListWrapper.getElementsByClassName(
          "list-content"
        )[0];
        this.$nextTick(() => {
          // 判断当前是否已经初始化了 better-scroll 没有就初始化
          // 加入判断可以避免每次购物车商品列表有变化时都重新初始化 better-scroll
          if (!this.scroll) {
            this.scroll = new BScroll(listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  components: {
    shopCartList
  }
};
</script>

<style lang="stylus" scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 0.96rem;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: - 0.2rem;
        z-index: 22;
        margin-left: 0.24rem;
        padding: 0.12rem;
        width: 1.12rem;
        height: 1.12rem;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color: #141d27;

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.48rem;
          height: 0.32rem;
          line-height: 0.32rem;
          text-align: center;
          border-radius: 0.32rem;
          font-size: 0.18rem;
          font-weight: 700;
          color: #fff;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 0.8rem 0.16rem 0 rgba(0, 0, 0, 0.4);
        }

        .logo {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background-color: #2b343c;

          &.highlight {
            background-color: rgb(0, 160, 220);
          }

          .icon-shopping_cart {
            line-height: 0.88rem;
            font-size: 0.48rem;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        padding-right: 0.24rem;
        margin-top: 0.24rem;
        line-height: 0.48rem;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.32rem;
        font-weight: 700;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 0.24rem 0 0 0.24rem;
        line-height: 0.48rem;
        font-size: 0.2rem;
        font-weight: 700;
        color: #80858a;
      }
    }

    .content-right {
      flex: 0 0 2.1rem;
      width: 2.1rem;

      .pay {
        height: 0.96rem;
        line-height: 0.96rem;
        text-align: center;
        font-size: 0.24rem;
        font-weight: 700;
        background-color: #2b333b;

        &.not-enough {
          background-color: #2b333b;
        }

        &.enough {
          color: #fff;
          background-color: #00b43c;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 0.64rem;
      bottom: 0.44rem;
      z-index: 200;
      /* 外层做纵向偏移 因此使用贝塞尔 */
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  filter: blur(0.2rem);
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.4s;
  }
}
</style>

