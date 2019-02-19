<template>
  <transition name="move">
    <div
      v-show="showFlag"
      class="food"
      ref="foodWrapper"
    >
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <!-- 返回按钮 -->
          <div
            class="back"
            @click="hide"
          >
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span
              class="old"
              v-show="food.oldPrice"
            >￥{{food.oldPrice}}</span>
          </div>
          <!-- 右侧 "加入购物车" 区域- 包含购物车控件和"加入购物车"按钮-->
          <!-- 购物车控件部分 -->
          <div class="cart-control-wrapper">
            <cart-control :food="food" />
          </div>
          <!-- "加入购物车" 按钮 部分-->
          <transition name="fade">
            <div
              @click.stop.prevent="addFirst($event)"
              class="buy"
              v-show="!food.count"
            >
              加入购物车
            </div>
          </transition>
        </div>

        <!-- 商品介绍的大段文字 -->
        <!-- split分割线组件 -->
        <split v-show="food.info" />
        <!-- 商品介绍 -->
        <div
          class="info"
          v-show="food.info"
        >
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>

        <!-- 商品评价 -->
        <split v-show="food.ratings" />
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select
            :selectType="selectType"
            :onlyContent="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @selectTypeChange="selectTypeChange"
            @onlyContentChange="onlyContentChange"
          />
        </div>

        <!-- 商品评价内容列表 -->
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length && onlyContent">
            <li
              v-for="(rating, index) of food.ratings"
              :key=index
              v-show="needShow(rating.rateType, rating.text)"
              class="rating-item"
            >
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img
                  :src="rating.avatar"
                  class="avatar"
                  width="12"
                  height="12"
                >
              </div>
              <div class="time">{{formatDate(rating.rateTime)}}</div>
              <p
                class="text"
                :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down':rating.rateType===1 }"
              >
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div
            class="no-rating"
            v-show="!food.ratings || !food.ratings.length"
          >暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import Vue from "vue";
import moment from "moment";
import cartControl from "./../cartControl/cartControl";
import Split from "./../split/Split";
import RatingSelect from "./../ratingSelect/ratingSelect";

// 父组件Goods中传递得的方法 onAdd
const EVENT_ADD = "add";

const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;

export default {
  name: "Food",
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      // 保证每次打开商品详情时 看到的都是初始化的值 评价类型为 ALL 只显示有内容的评价onlyContent
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        // 判断组件是否已经被初始化了
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodWrapper, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      // 防止多次点击
      if (!event._constructed) {
        return;
      } else {
        Vue.set(this.food, "count", 1);
        this.$emit(EVENT_ADD, event.target);
      }
    },
    selectTypeChange(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    onlyContentChange(flag) {
      this.onlyContent = flag;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      // 勾选了 "只显示有内容的评价" 但是并没有评价内容 此时就什么都不显示
      if (this.onlyContent && !text) {
        return false;
      }
      // 点击 "全部" 按钮 查看所有的评价的评价 默认就是显示所有
      if (this.selectType === ALL) {
        return true;
      } else {
        // 点击其他的两个按钮时（推荐 吐槽） 需要判断点击的评价类型是否和当前需要显示的评价类型一致
        // 一致时才能 return true 对应评价内容被显示
        return type === this.selectType;
      }
    },
    // 利用 moment 提供的 API 格式化时间
    formatDate(time) {
      return moment(time).format("YYYY-MM-DD hh-mm");
    }
  },
  components: {
    cartControl,
    Split,
    RatingSelect
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins';

.food {
  &.move-enter, &.move-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  &.move-enter-active, &.move-leave-active {
    transition: all 0.3s linear;
  }

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0.96rem;
  z-index: 30; /* 这个值应该小于购物车 和 蒙层的z-index */
  width: 100%;
  background-color: #fff;

  .food-content {
    .img-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%; /* 页面防抖 padding-top的值是相对于 width为基准的 */

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .back {
        position: absolute;
        top: 0.2rem;
        left: 0;

        .icon-arrow_lift {
          display: block;
          padding: 0.2rem;
          font-size: 0.4rem;
          color: #00a0dc;
        }
      }
    }

    .content {
      position: relative;
      padding: 0.36rem;

      .title {
        line-height: 0.28rem;
        margin-bottom: 0.16rem;
        font-size: 0.28rem;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }

      .detail {
        margin-bottom: 0.36rem;
        line-height: 0.2rem;
        height: 0.2rem;
        font-size: 0;

        .sell-count, .rating {
          font-size: 0.2rem;
          color: rgb(147, 153, 159);
        }

        .sell-count {
          margin-right: 0.24rem;
        }
      }

      .price {
        font-weight: 700;
        line-height: 0.48rem;

        .now {
          margin-right: 0.36rem;
          font-size: 0.2rem;
          color: rgb(240, 20, 20);
        }

        .old {
          text-decoration: line-through;
          font-size: 0.2rem;
          color: rgb(147, 153, 159);
        }
      }

      .cart-control-wrapper {
        position: absolute;
        right: 0.24rem;
        bottom: 0.24rem;
      }

      .buy {
        position: absolute;
        right: 0.36rem;
        bottom: 0.36rem;
        z-index: 10;
        height: 0.48rem;
        line-height: 0.48rem;
        padding: 0 0.24rem;
        box-sizing: border-box;
        border-radius: 0.24rem;
        font-size: 0.24rem;
        color: #fff;
        background: rgb(0, 160, 220);

        &.fade-enter, &.fade-leave-to {
          opacity: 0;
          z-index: -1;
        }

        &.fade-enter-active, &.fade-leave-active {
          transition: opacity 0.2s;
        }
      }
    }

    .info {
      padding: 0.36rem;

      .title {
        line-height: 0.28rem;
        margin-bottom: 0.12rem;
        font-size: 0.28rem;
        color: rgb(7, 17, 27);
      }

      .text {
        line-height: 0.48rem;
        padding: 0 0.16rem;
        font-size: 0.24rem;
        color: rgb(77, 85, 92);
      }
    }

    .rating {
      padding: 0.36rem;

      .title {
        line-height: 0.28rem;
        font-size: 0.28rem;
        color: rgb(7, 17, 27);
      }
    }

    .rating-wrapper {
      padding: 0 0.36rem;

      .rating-item {
        position: relative;
        padding: 0.32rem 0;
        border-1px(rgba(7, 17, 27, 0.1));

        .user {
          position: absolute;
          right: 0;
          top: 0.32rem;
          line-height: 0.24rem;
          font-size: 0;

          .name {
            display: inline-block;
            margin-right: 0.12rem;
            vertical-align: top;
            font-size: 0.2rem;
            color: rgb(147, 153, 159);
          }

          .avatar {
            border-radius: 50%;
          }
        }

        .time {
          margin-bottom: 0.12rem;
          line-height: 0.24rem;
          font-size: 0.2rem;
          color: rgb(147, 153, 159);
        }

        .text {
          line-height: 0.32rem;
          font-size: 0.24rem;
          color: rgb(7, 17, 27);

          &.icon-thumb_down, &.icon-thumb_up {
            line-height: 0.32rem;
            margin-right: 0.08rem;
            font-size: 0.24rem;
          }

          &.icon-thumb_up {
            color: rgb(0, 160, 220);
          }

          &.icon-thumb_down {
            color: rgb(147, 153, 159);
          }
        }
      }

      .no-rating {
        padding: 0.32rem 0;
        font-size: 0.24rem;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>