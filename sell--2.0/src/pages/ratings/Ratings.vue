<template>
  <div
    class="ratings"
    ref="ratingsWrapper"
  >
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>

        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star
              :size="36"
              :score="seller.serviceScore"
            />
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star
              :size="36"
              :score="seller.foodScore"
            />
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <!-- 评论列表头部 -->
      <split />
      <ratings-select
        :selectType="selectType"
        :onlyContent="onlyContent"
        :desc="desc"
        :ratings="ratings"
        @selectTypeChange="selectTypeChange"
        @onlyContentChange="onlyContentChange"
      />
      <div class="rating-wrapper">
        <ul v-show="onlyContent">
          <li
            v-for="(rating,index) of ratings"
            :key="index"
            v-show="needShow(rating.rateType, rating.text)"
            class="rating-item"
          >
            <div class="avatar">
              <img
                :src="rating.avatar"
                width="28"
                height="28"
              >
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star
                  :size="24"
                  :score="rating.score"
                />
                <span
                  class="delivery"
                  v-show="rating.deliveryTime"
                >
                  {{rating.deliveryTime}}
                </span>
              </div>
              <p class="text">{{rating.text}}</p>
              <!-- 是否推荐 -->
              <div
                class="recommend"
                v-show="rating.recommend && rating.recommend.length"
              >
                <span class="icon-thumb_up"></span>
                <span
                  class="item"
                  v-for="(item, index) of rating.recommend"
                  :key="index"
                >
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{formatDate(rating.rateTime)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import BScroll from "better-scroll";
import Star from "./../star/Star";
import Split from "./../split/Split";
import RatingsSelect from "./../ratingSelect/ratingSelect";

const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;

export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  name: "Ratings",
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    seller: {
      type: Object
    }
  },
  // 当监测到后端返回了数据时 就初始化better-scroll
  // 否则容器高度没有内容撑开 自然就无法实现滚动
  watch: {
    ratings() {
      this._initScroll();
    }
  },
  mounted() {
    this.selectType = ALL;
    this.onlyContent = true;
    this._initScroll();
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.ratingsWrapper, {
          click: true
        });
      } else {
        this.scroll.refresh();
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
    formatDate(time) {
      return moment(time).format("YYYY-MM-DD hh:mm");
    }
  },
  components: {
    Star,
    Split,
    RatingsSelect
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins';

.ratings {
  position: fixed;
  top: 3.5rem; /* header 的高度 */
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .ratings-content {
    .overview {
      display: flex;
      padding: 0.36rem 0;

      .overview-left {
        // 适配 Iphpoe5及以下的屏幕尺寸
        @media only screen and (max-width: 320px) {
          flex: 0 0 2.4rem;
          width: 0.24rem;
        }

        flex: 0 0 2.74rem;
        padding: 0.12rem 0;
        width: 2.74rem;
        border-right: 0.02rem solid rgba(7, 17, 27, 0.1);
        text-align: center;

        .score {
          margin-bottom: 0.12rem;
          line-height: 0.56rem;
          font-size: 0.48rem;
          color: rgb(255, 153, 0);
        }

        .title {
          margin-bottom: 0.16rem;
          line-height: 0.24rem;
          font-size: 0.24rem;
          color: rgb(7, 17, 27);
        }

        .rank {
          line-height: 0.2rem;
          font-size: 0.2rem;
          color: rgb(147, 153, 159);
        }
      }

      .overview-right {
        // 适配 Iphpoe5及以下的屏幕尺寸
        @media only screen and (max-width: 320px) {
          flex: 1;
          padding: 0.12rem 0 0.12rem 0.24rem;
        }

        flex: 1;
        padding: 0.12rem 0 0.12rem 0.48rem;

        .score-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 0.16rem;

          .title {
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: rgb(7, 17, 27);
          }

          .star {
            margin: 0 0.24rem;
          }

          .score {
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: rgb(255, 153, 0);
          }
        }

        .delivery-wrapper {
          display: flex;
          align-items: center;

          .title {
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: rgb(7, 17, 27);
          }

          .delivery {
            margin-left: 0.24rem;
            font-size: 0.24rem;
            color: rgb(147, 153, 159);
          }
        }
      }
    }

    .rating-wrapper {
      padding: 0 0.36rem;

      .rating-item {
        display: flex;
        padding: 0.36rem 0;
        border-1px(rgba(7, 17, 27, 0.1));

        &:last-child {
          border-none();
        }

        .avatar {
          flex: 0 0 0.56rem;
          width: 0.56rem;
          margin-right: 0.24rem;

          img {
            height: auto;
            border-radius: 50%;
          }
        }

        .content {
          position: relative;
          flex: 1;

          .name {
            margin-bottom: 0.04rem;
            line-height: 0.24rem;
            font-size: 0.24rem;
            color: rgb(7, 17, 27);
          }

          .star-wrapper {
            margin-bottom: 0.12rem;
            display: flex;
            align-items: center;

            .star {
              margin-right: 0.12rem;
            }

            .delivery {
              font-size: 0.24rem;
              color: rgb(147, 153, 159);
            }
          }

          .text {
            margin-bottom: 0.32rem;
            line-height: 0.32rem;
            color: rgb(7, 17, 27);
            font-size: 0.24rem;
          }

          .recommend {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            line-height: 0.32rem;

            .icon-thumb_up, .item {
              margin: 0 0.16rem 0.08rem 0;
              color: rgb(0, 160, 220);
              font-size: 0.24rem;
            }

            .item {
              padding: 0 0.12rem;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 0.2rem;
              color: rgb(147, 153, 159);
              background-color: #fff;
            }
          }

          .time {
            position: absolute;
            top: 0;
            right: 0;
            right: 0;
            line-height: 0.24rem;
            font-size: 0.24rem;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
</style>
