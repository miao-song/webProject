<template>
  <div class="rating-select">
    <!-- 评价的类型 包括: 全部 推荐 吐槽  -->
    <div class="rating-type">
      <span
        class="block all positive"
        :class="{'active': self_selectType===2}"
        @click="select(2)"
      >{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span
        class="block positive"
        :class="{'active': self_selectType===0}"
        @click="select(0)"
      >{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span
        class="block negative"
        :class="{'active': self_selectType===1}"
        @click="select(1)"
      >{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>

    <!-- 是否只看有内容的评价 -->
    <div
      class="switch"
      :class="{'on': self_onlyContent }"
      @click="toggleContent"
    >
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// 评价的分类 (推荐 吐槽 全部)
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;

export default {
  name: "RatingSelect",
  data() {
    return {
      self_onlyContent: this.onlyContent,
      self_selectType: this.selectType
    };
  },
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    // 是否显示有内容的评价 默认为false
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      defaule() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  methods: {
    select(type) {
      this.self_selectType = type;
      this.$emit("selectTypeChange", type);
    },
    toggleContent() {
      this.self_onlyContent = !this.self_onlyContent;
      this.$emit("onlyContentChange", this.self_onlyContent);
    }
  },
  computed: {
    // 推荐的数量
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    },
    // 吐槽的数量
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.rating-select {
  .rating-type {
    padding: 0.12rem 0;
    border-1px(rgba(7, 17, 27, 0.1));
    font-size: 0;

    .block {
      display: inline-block;
      line-height: 0.32rem;
      padding: 0.16rem 0.24rem;
      margin: 0.16rem;
      border-radius: 0.02rem;
      font-size: 0.24rem;

      &.active {
        color: #fff;
      }

      .count {
        font-size: 0.16rem;
        margin-left: 0.04rem;
      }

      &.positive {
        background-color: rgba(0, 160, 220, 0.2);
        color: rgb(77, 85, 93);

        &.active {
          background-color: rgb(0, 160, 220);
        }
      }

      &.negative {
        background-color: rgba(77, 85, 93, 0.2);

        &.active {
          background-color: rgb(77, 85, 93);
        }
      }
    }
  }

  .switch {
    padding: 0.12rem 0.18rem;
    line-height: 0.48rem;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;

    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }

    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      margin-right: 0.08rem;
      font-size: 0.48rem;
    }

    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 0.24rem;
    }
  }
}
</style>

