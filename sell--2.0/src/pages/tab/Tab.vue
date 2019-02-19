<template>
  <div class='home-tab'>
    <div
      class="tab-item"
      @click="goodsShow"
      :class="{'show': self_showGoods}"
    >
      商品
    </div>
    <div
      class="tab-item"
      @click="ratingsShow"
      :class="{'show': self_showRatings}"
    >
      评价
    </div>
    <div
      class="tab-item"
      @click="sellerShow"
      :class="{'show': self_showSeller}"
    >
      商家
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTab",
  data() {
    return {
      self_showGoods: this.showGoods,
      self_showRatings: this.showRatings,
      self_showSeller: this.showSeller
    };
  },
  props: {
    showGoods: {
      type: Boolean,
      default: false
    },
    showRatings: {
      type: Boolean,
      default: true
    },
    showSeller: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goodsShow() {
      if (!this.self_showGoods) {
        this.self_showGoods = true;
        this.self_showRatings = false;
        this.self_showSeller = false;
        this.$emit("goodsChange", this.self_showGoods);
      }
    },
    ratingsShow() {
      if (!this.self_showRatings) {
        this.self_showRatings = true;
        this.self_showGoods = false;
        this.self_showSeller = false;
        this.$emit("ratingsChange", this.self_showRatings);
      }
    },
    sellerShow() {
      if (!this.self_showSeller) {
        this.self_showSeller = true;
        this.self_showRatings = false;
        this.self_showGoods = false;
        this.$emit("sellerChange", this.self_showSeller);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.home-tab {
  display: flex;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 0.02rem solid rgba(7, 17, 27, 0.1);

  .tab-item {
    flex: 1;
    text-align: center;
    color: rgb(77, 85, 93);

    &.show {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
