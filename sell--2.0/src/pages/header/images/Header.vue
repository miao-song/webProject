<template>
  <div class="home-header">
    <!-- 内容区 -->
    <div class="content-wrapper">
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
        class="support-count"
      >
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <!-- 公告部分 -->
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bullet-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  data() {
    return {
      classMap: []
    };
  },
  props: {
    seller: Object
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.home-header {
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
    height: 0.56rem;
    line-height: 0.56rem;
    padding: 0 0.44rem 0 0.12rem;
    background-color: rgba(7, 17, 27, 0.2);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .bulletin-title {
    }

    .bullet-text {
      font-size: 0.12rem;
    }

    .icon-keyboard_arrow_right {
    }
  }
}
</style>
