<template>
  <div>
    <home-header :seller="seller" />

    <home-tab
      :showRatings="showRatings"
      :showGoods="showGoods"
      :showSeller="showSeller"
      @goodsChange="goodsChange"
      @ratingsChange="ratingsChange"
      @sellerChange="sellerChange"
    />

    <home-goods
      :goods="goods"
      :seller="seller"
      v-show="showGoods"
    />

    <home-ratings
      :seller="seller"
      :ratings="ratings"
      v-show="showRatings"
    />

    <home-seller
      :seller="seller"
      v-show="showSeller"
    />

  </div>
</template>

<script>
import axios from "axios";
import { urlParse } from "common/js/util";

import HomeHeader from "./../header/Header";
import HomeTab from "./../tab/Tab";
import HomeGoods from "./../goods/Goods";
import HomeRatings from "./../ratings/Ratings";
import HomeSeller from "./../seller/Seller";

// 定义一个常量用于保存请求返回的状态 这样即使以后后台数据的状态码发生改变也也只需要改动这个常量即可
const RET_OK = 0;
export default {
  name: "Home",
  data() {
    return {
      seller: {
        // 拿到地址中的参数 id
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      },
      goods: [],
      ratings: [],
      showGoods: true,
      showRatings: false,
      showSeller: false
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios.get("/api/data.json").then(response => {
        response = response.data;
        if (response.ret === RET_OK) {
          if (response.seller) {
            const seller = response.seller;
            this.seller = seller;
          }
          if (response.goods) {
            const goods = response.goods;
            this.goods = goods;
          }
          if (response.ratings) {
            const ratings = response.ratings;
            this.ratings = ratings;
          }
        }
      });
    },
    goodsChange(show) {
      this.showGoods = show;
      this.showRatings = !show;
      this.showSeller = !show;
    },
    ratingsChange(show) {
      this.showRatings = show;
      this.showGoods = !show;
      this.showSeller = !show;
    },
    sellerChange(show) {
      this.showSeller = show;
      this.showGoods = !show;
      this.showRatings = !show;
    }
  },
  components: {
    HomeHeader,
    HomeTab,
    HomeGoods,
    HomeRatings,
    HomeSeller
  }
};
</script>

<style lang="stylus" scoped>
</style>
