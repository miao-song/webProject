<template>
  <div
    class="seller"
    ref="sellerWrapper"
  >
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star
            :size="36"
            :score="seller.score"
          />
          <span class="text">（{{seller.ratingCount}}）</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>

          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>

          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <!-- 收藏 -->
        <div
          class="favorite"
          @click="toggleFavorite"
        >
          <span
            class="icon-favorite"
            :class="{'active': favorite}"
          ></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>

      <split />
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
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
      </div>

      <!-- 商家实景图片 区块-->
      <split />
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div
          class="pic-wrapper"
          ref="picWrapper"
        >
          <ul ref="picUl">
            <li
              class="pic-item"
              v-for="(pic, index) of seller.pics"
              :key="index"
            >
              <img
                :src="pic"
                width="120"
                height="90"
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- 商家信息 部分 -->
      <split />
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li
            class="info-item"
            v-for="(info, index) of seller.infos"
            :key="index"
          >{{info}}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { saveToLocal, loadFromToLocal } from "common/js/store";
import axios from "axios";

import BScroll from "better-scroll";
import Star from "./../star/Star.vue";
import Split from "./../split/Split";

export default {
  name: "Seller",
  data() {
    return {
      /*
      favorite: (() => {
        return loadFromToLocal(this.sellre.id, "favorite", false);
      })()
      */
      favorite: false
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    // this.getSeller();
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  mounted() {
    this._initScroll();
    this._initPics();
  },
  // 当监测到后端返回了数据时 就初始化better-scroll
  // 否则容器高度没有内容撑开 自然就无法实现滚动
  watch: {
    seller() {
      this._initScroll();
      this._initPics();
    }
  },
  methods: {
    // 实现图片和横向滚动
    _initPics() {
      if (this.seller.pics) {
        // 要实现滚动 必须让图片ul容器的宽度大于包裹ul的容器
        let picWidth = 120;
        let picMargin = 6;
        // ul的width = （图片右margin + 图片宽度） * 图片数量 - 最后一张图的 margin ，因为最后一张图没有右marin
        let ulWidth =
          (picWidth + picMargin) * this.seller.pics.length - picMargin;
        this.$refs.picUl.style.width = `${ulWidth}px`;
        // 初始化 better-scroll实现横向滚动
        if (!this.picScroll) {
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: "vertical",
              click: true
            });
          });
        } else {
          this.picScroll.refresh();
        }
      }
    },
    _initScroll() {
      // 先判断是否已经初始化了scroll
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellerWrapper, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
      // saveToLocal(this.seller.id, "favorite", this.favorite);
    }
    /*
    getSeller() {
      axios.get("/api/data.json?id=" + this.seller.id).then(response => {
        response = response.data;
        if (response.ret === RET_OK) {
          if (response.seller) {
            const seller = response.seller;
            this.seller = seller;
            this.seller = Object.assign({}, this.seller, seller);
          }
        }
      });
    },
  */
  },
  computed: {
    favoriteText() {
      return this.favorite ? "已收藏" : " 收藏";
    }
  },
  components: {
    Star,
    Split
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins';

.seller {
  position: fixed;
  top: 3.75rem; /* header 的高度 */
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .seller-content {
    .overview {
      position: relative;
      padding: 0.36rem;

      .title {
        margin-bottom: 0.16rem;
        line-height: 0.28rem;
        font-size: 0.28rem;
        color: rgb(7, 17, 27);
      }

      .desc {
        display: flex;
        align-items: center;
        padding-bottom: 0.36rem;
        border-bottom: 0.02rem solid rgba(7, 17, 27, 0.1);

        .star {
          margin-right: 0.16rem;
        }

        .text {
          margin-right: 0.24rem;
          line-height: 0.36rem;
          font-size: 0.2rem;
          font-weight: 700;
          color: rgb(77, 85, 93);
        }
      }

      .remark {
        display: flex;
        padding-top: 0.36rem;

        .block {
          flex: 1;
          text-align: center;
          border-right: 0.02rem solid rgba(7, 17, 27, 0.1);

          &:last-child {
            border-right: none;
          }

          h2 {
            margin-bottom: 0.2rem;
            line-height: 0.2rem;
            font-size: 0.2rem;
            color: rgb(147, 153, 159);
          }

          .content {
            line-height: 0.24rem;
            font-size: 0.24rem;
            color: rgb(7, 17, 27);

            .stress {
              font-size: 0.48rem;
            }
          }
        }
      }

      .favorite {
        position: absolute;
        width: 1rem;
        right: 0.22rem;
        top: 0.36rem;
        text-align: center;

        .icon-favorite {
          display: block;
          margin-bottom: 0.04rem;
          line-height: 0.48rem;
          font-size: 0.48rem;
          color: #d4d6d9;

          &.active {
            margin-bottom: 0.08rem;
            color: rgb(240, 20, 20);
          }
        }

        .text {
          line-height: 0.2rem;
          font-size: 0.2rem;
          color: rgba(7, 17, 27, 0.3);
        }
      }
    }

    .bulletin {
      padding: 0.36rem 0.36rem 0 0.36rem;
      white-space: normal;

      .title {
        margin-bottom: 0.16rem;
        line-height: 0.28rem;
        color: rgb(7, 17, 27);
        font-size: 0.28rem;
      }

      .content-wrapper {
        padding: 0 0.24rem 0.32rem 0.24rem;

        .content {
          line-height: 0.48rem;
          font-size: 0.24rem;
          color: rgb(240, 20, 20);
        }
      }

      /* 满减信息列表区块 */
      .supports {
        .support-item {
          display: flex;
          align-items: center;
          padding: 0.36rem 0.24rem;
          border-1px(rgba(7, 17, 27, 0.1));

          &:last-child {
            border-bottom: none;
          }

          .icon {
            margin-right: 0.12rem;
            vertical-align: top;
            width: 0.24rem;
            height: 0.24rem;
            display: inline-block;
            background-size: 0.24rem 0.24rem;
            background-repeat: no-repeat;

            &.decrease {
              bg-image('images/decrease_4');
            }

            &.discount {
              bg-image('images/discount_4');
            }

            &.guarantee {
              bg-image('images/guarantee_4');
            }

            &.invoice {
              bg-image('images/invoice_4');
            }

            &.special {
              bg-image('images/special_4');
            }
          }

          .text {
            line-height: 0.24rem;
            font-size: 0.24rem;
            color: rgb(7, 17, 27);
          }
        }
      }
    }

    .pics {
      padding: 0.36rem;

      .title {
        padding-bottom: 0.24rem;
        line-height: 0.28rem;
        color: rgb(7, 17, 27);
        font-size: 0.28rem;
      }

      .pic-wrapper {
        display: flex;
        width: 100%;
        overflow: hidden;
        align-items: center;
        white-space: nowrap;

        .pic-item {
          display: inline-block;
          margin-right: 0.12rem;
          width: 2.4rem;
          height: 0.9rem;

          &:last-child {
            margin: 0;
          }
        }
      }
    }

    .info {
      padding: 0.36rem 0.36rem 0 0.36rem;
      color: rgb(7, 17, 27);

      .title {
        padding-bottom: 0.24rem;
        line-height: 0.28rem;
        font-size: 0.28rem;
        border-1px(rgba(147, 153, 159, 0.1));
      }

      .info-item {
        padding: 0.32rem 0.24rem;
        line-height: 0.24rem;
        font-size: 0.24rem;
        border-1px(rgba(147, 153, 159, 0.1));

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
