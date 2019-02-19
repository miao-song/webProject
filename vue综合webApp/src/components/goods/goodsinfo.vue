<template>
  <div class="goodsinfo_container">
    <!-- 点击添加商品的数量 小球飞入购物车 徽章 -->
    <!-- 小球的半场动画 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div
        class="ball"
        v-show="ballFlag"
        ref="ball"
      ></div>
    </transition>

    <!--商品图 轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper
            :lunbotuList="lunbotu"
            :isfull="false"
          ></swiper>
        </div>
      </div>
    </div>
    <!--商品图 轮播区域 -->

    <!-- 商品购买区域 -->
    <div class="mui-card buy">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;
            销售价：<span class="sell">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量：<numberbox
              class="number"
              @getCount="getSelectedCount"
              :max="goodsinfo.stock_quantity"
            ></numberbox>
          </p>
          <p>
            <mt-button
              type="primary"
              size="small"
            >立即购买</mt-button>&nbsp;&nbsp;&nbsp;
            <mt-button
              type="danger"
              size="small"
              @click="addToCart"
            >加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->

    <!-- 商品参数区域 -->
    <div class="mui-card args">
      <div class="mui-card-header">
        <h4>商品参数</h4>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{ goodsinfo.ad_time | dateformat }}</p>
        </div>
        <div class="mui-card-footer">
          <mt-button
            type="primary"
            size="large"
            plain
            @click='goDesc(id)'
          >图文介绍</mt-button>
          <mt-button
            type="danger"
            size="large"
            plain
            @click='goComments(id)'
          >商品评论</mt-button>
        </div>
      </div>
    </div>
    <!--商品参数区域-->

  </div>
</template>

<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
// 导入 数字选择色框组件
import numberbox from "../subcomponents/goodsinfo_numberbox.vue";

export default {
  data() {
    return {
      // 路由参数对象中的 id 挂载 到 data 方便调用
      id: this.$route.params.id,
      // 轮播图的数据
      lunbotu: [],
      // 请求成功后返回的商品参数 的数据
      goodsinfo: {},
      // 小球显示或者隐藏的标识
      ballFlag: false,
      // 商品购买的数量 默认为 1
      selectedCount: 1
    };
  },
  created() {
    this.getLunbo();
    this.getGoodsInfo();
  },
  methods: {
    getLunbo() {
      // this.$http.get("api/getgoodsimages/" + this.id)
      this.$http.get("/static/data/getgoodsimages.json").then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            // 循环返回的数据 为每一项添加属性 imgurl 因为轮播图组件中 渲染数据使用的是 imgurl
            item.imgurl = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },

    // 获取商品参数
    getGoodsInfo() {
      // this.$http.get("api/getgoodsinfo/" + this.id)
      this.$http.get("/static/data/getgoodsinfo.json").then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },

    // 使用编程式导航 点击 图文介绍  根据商品当前id 去往 商品信息介绍页面
    // 注意 path 和 params 同时使用的话 params 会实效
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    // 点击 商品评论  根据商品当前id 去往 商品评论页面
    goComments(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToCart() {
      this.ballFlag = !this.ballFlag;
      // 先创建一个商品对象  {id: 商品id， count: 商品的件数， price:商品的价格, selected: true}
      // 其中 selected 属性表示是否要选中该商品进行购买
      // 拼接出一个要保存到 store 中的 car 数组里的 商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      //调用store 中的 mutations 中的方法 将商品加入购物车
      this.$store.commit("addToShopCar", goodsinfo);
    },
    // 小球动画
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },

    enter(el, done) {
      el.offsetWidth;
      // 获取小球 和 购物车徽章的 x y 坐标
      const ballPosition = this.$refs.ball.getBoundingClientRect();

      const badgePositon = document
        .getElementById("badge")
        .getBoundingClientRect();
      // 求出小球位移的距离
      const xDis = badgePositon.left - ballPosition.left;
      const yDis = badgePositon.top - ballPosition.top;

      el.style.transform = `translate(${xDis}px, ${yDis}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    // count 获取 数字选择框中的 商品选择数量
    getSelectedCount(count) {
      // 当子组件调用该方法时 将选中的商品的数量 作为参数传递给父组件 将该值保存在data中
      this.selectedCount = count;
      // console.log("父组件拿到的值为：" + this.selectedCount);
    }
  },
  // 子组件
  components: {
    swiper,
    numberbox
  }
};
</script>

<style lang="scss">
.goodsinfo_container {
  background-color: #ccc;
  .mui-content {
    // 去除插件顶部的白条
    overflow: hidden;
  }
  // 商品购买区域
  .buy {
    .mui-card-header {
      font-size: 15px;
      line-height: 1.2;
      font-weight: 900;
    }
    .price {
      font-size: 16px;
      .sell {
        color: red;
      }
    }
    .number {
      display: inline;
    }
    .mint-button {
      margin-top: 10px;
    }
  }

  // 商品参数区域
  .args {
    .mui-card-footer {
      display: block;

      .mint-button {
        margin: 15px 0;
      }
    }
  }

  // 动画小球
  .ball {
    width: 15px;
    height: 15px;
    background-color: #f00;
    border-radius: 50%;
    position: absolute;
    top: 417px;
    left: 40%;
    z-index: 99;
  }
}
</style>78