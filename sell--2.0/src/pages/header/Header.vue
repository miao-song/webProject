<template>
  <div class="home-header">
    <!-- 内容区 -->
    <div
      class="content-wrapper"
      @click="showDetail"
    >
      <div class="avatar">
        <img
          width="64"
          height="64"
          :src="seller.avatar"
        >
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}
        </div>
        <div
          v-if="seller.supports"
          class="supports"
        >
          <span
            class="icon"
            :class="classMap"
          ></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>

      <!-- 右边促销活动的个数 "5个" 区域-->
      <div
        v-if="seller.supports"
        @click="showDetail"
        class="support-count"
      >
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <!-- 公告部分 -->
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span><i class="icon-keyboard_arrow_right"></i>
    </div>

    <!-- 整个header区域的背景图 -->
    <div class="background">
      <img
        :src="seller.avatar"
        width="100%"
        height="100%"
      >
    </div>

    <!-- 浮层 -->
    <transition name="fade">
      <div
        class="detail"
        v-show="detailShow"
      >
        <div class="detail-wrapper clearfix">
          <!-- 放文字等内容的区域 -->
          <div class="detail-main">
            <!-- 标题 -->
            <h1 class="name">{{ seller.name }}</h1>
            <!-- 星星评分的显示 -->
            <div class="star-wrapper">
              <star
                :size="48"
                :score="seller.score"
              ></star>
            </div>
            <!-- 横线 和 文字 区块 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <!-- 满减信息列表区块 -->
            <ul
              v-if="seller.supports"
              class="supports"
            >
              <li
                class="support-item"
                v-for="(item, index) of seller.supports"
                :key="index"
              >
                <span
                  class="icon"
                  :class="classMap[seller.supports[index].type]"
                ></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>

            <!-- 商家公告 区块 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告 </div>
              <div class="line"></div>
            </div>
            <!-- 大段的文字内容 -->
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <!--关闭按钮 -->
        <div
          class="detail-close"
          @click="hideDetail"
        >
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from "./../star/Star";

export default {
  name: "HomeHeader",
  data() {
    return {
      classMap: [],
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  props: {
    seller: Object
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  components: {
    Star
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.home-header {
  position: relative;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
  color: #fff;
  font-size: 0;

  /* 内容区 */
  .content-wrapper {
    position: relative;
    padding: 0.48rem 0.24rem 0.36rem 0.48rem;

    .avatar {
      vertical-align: top;
      display: inline-block;

      img {
        border-radius: 0.04rem;
      }
    }

    .content {
      display: inline-block;
      margin-left: 0.32rem;

      .title {
        margin: 0.04rem 0 0.16rem 0;

        .brand {
          width: 0.6rem;
          height: 0.36rem;
          vertical-align: top;
          display: inline-block;
          bg-image('images/brand');
          background-size: 0.6rem 0.36rem;
          background-repeat: no-repeat;
        }

        .name {
          line-height: 0.36rem;
          margin-left: 0.12rem;
          font-size: 0.32rem;
          font-weight: 900;
        }
      }

      .description {
        line-height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 200;
        margin-bottom: 0.2rem;
      }

      .supports {
        .icon {
          vertical-align: top;
          width: 0.24rem;
          height: 0.24rem;
          display: inline-block;
          margin: 0 0.08rem 0 0.04rem;
          background-size: 0.24rem 0.24rem;
          background-repeat: no-repeat;

          &.decrease {
            bg-image('images/decrease_1');
          }

          &.discount {
            bg-image('images/discount_1');
          }

          &.guarantee {
            bg-image('images/guarantee_1');
          }

          &.invoice {
            bg-image('images/invoice_1');
          }

          &.special {
            bg-image('images/special_1');
          }
        }

        .text {
          line-height: 0.24rem;
          font-size: 0.2rem;
          font-weight: 200;
        }
      }
    }

    .support-count {
      position: absolute;
      right: 0.24rem;
      bottom: 0.36rem;
      padding: 0.14rem 0.16rem;
      height: 0.24rem;
      line-height: 0.24rem;
      border-radius: 0.28rem;
      text-align: center;
      font-weight: 200;
      background-color: rgba(0, 0, 0, 0.2);

      .count {
        vertical-align: top;
        font-size: 0.2rem;
      }

      .icon-keyboard_arrow_right {
        line-height: 0.24rem;
        margin-left: 0.04rem;
        font-size: 0.2rem;
      }
    }
  }

  /* 公告区 */
  .bulletin-wrapper {
    position: relative;
    height: 0.56rem;
    line-height: 0.56rem;
    padding: 0 0.44rem 0 0.24rem;
    background-color: rgba(7, 17, 27, 0.2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 0.16rem;
      width: 0.44rem;
      height: 0.24rem;
      bg-image('images/bulletin');
      background-repeat: no-repeat;
      background-size: 0.44rem 0.24rem;
    }

    .bulletin-text {
      vertical-align: top;
      font-size: 0.2rem;
      margin: 0 0.08rem;
    }

    .icon-keyboard_arrow_right {
      position: absolute;
      right: 0.24rem;
      bottom: 0.16rem;
      font-size: 0.2rem;
    }
  }

  /* 整个header区的背景 */
  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(0.1rem);
  }

  /* 浮层区 */
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.8s ease;
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    padding-top: 0.6rem;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);

    .detail-wrapper {
      min-height: 100%;
      width: 100%;

      .detail-main {
        margin: 0.3rem;
        padding-bottom: 1.28rem;

        .name {
          line-height: 0.32rem;
          font-size: 0.32rem;
          font-weight: 700;
          text-align: center;
        }

        /* 浮层星星评分区 */
        .star-wrapper {
          height: 0.48rem;
          margin-top: 0.36rem;
          padding: 0.04rem 0;
          text-align: center;
        }
      }
    }

    /* 浮层 优惠信息区 */
    .title {
      display: flex;
      width: 80%;
      margin: 0.56rem auto 0.48rem auto;

      .line {
        flex: 1;
        position: relative;
        top: -0.1rem;
        border-bottom: 0.025rem solid rgba(255, 255, 255, 0.2);
      }

      .text {
        padding: 0 0.24rem;
        font-size: 0.28rem;
        font-weight: 700;
      }
    }

    /* 满减信息列表区块 */
    .supports {
      width: 80%;
      margin: 0 auto;

      .support-item {
        padding: 0 0.24rem;
        margin-bottom: 0.24rem;
        font-size: 0;

        &:last-child {
          margin-bottom: 0;
        }

        .icon {
          display: inline-block;
          width: 0.32rem;
          height: 0.32rem;
          vertical-align: top;
          margin-right: 0.12rem;
          background-size: 0.32rem 0.32rem;
          background-repeat: no-repeat;

          &.decrease {
            bg-image('images/decrease_2');
          }

          &.discount {
            bg-image('images/discount_2');
          }

          &.guarantee {
            bg-image('images/guarantee_2');
          }

          &.invoice {
            bg-image('images/invoice_2');
          }

          &.special {
            bg-image('images/special_2');
          }
        }

        .text {
          line-height: 0.32rem;
          font-size: 0.24rem;
        }
      }
    }

    .bulletin {
      width: 80%;
      margin: 0 auto;

      .content {
        line-height: 0.48rem;
        font-size: 0.24rem;
      }
    }

    /* 浮层 下方关闭区域 */
    .detail-close {
      position: relative;
      width: 0.64rem;
      height: 0.64rem;
      margin: -1.68rem auto;
      clear: both;
      font-size: 0.64rem;
    }
  }
}
</style>
