<template>
  <div class='goods_list'>
    <!-- 去往商品详情的方式 -->
    <!-- 方式一 路由链接导航到商品详情 -->
    <!--
    <router-link
      tag="div"
      class="goods_item"
      v-for="item in goodslist"
      :key='item.id'
      :to="'/home/goodsinfo/' + item.id"
    >
      <img
        :src="item.img_url"
        class="goods"
      >
      <h4 class="title">{{ item.title }}</h4>

      <div class="discription">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余：{{item.stock_quantity}}</span>
        </p>
      </div>
    </router-link>
    -->

    <!-- 方式二 通过 vue-router 的编程式导航 去往对应的商品详情-->
    <div
      tag="div"
      class="goods_item"
      v-for="item in goodslist"
      :key='item.id'
      @click='goDetail(item.id)'
    >
      <img
        :src="item.img_url"
        class="goods"
      >
      <h4 class="title">{{ item.title }}</h4>

      <div class="discription">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余：{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <!-- 加载更多 按钮-->
    <mt-button
      type="danger"
      size="large"
      @click="getMoreGoods"
    >加载更多</mt-button>
  </div>
</template>

<script>
export default {
  // 往自己组件内部挂载私有数据
  data() {
    return {
      // 展示商品列表的页码 默认加载第一页
      pageIndex: 1,
      // 保存请求成功返回的数据
      goodslist: []
    };
  },
  created() {
    this.getGoodslist();
  },
  methods: {
    // 发送请求 获取商品数据
    getGoodslist() {
      // this.$http.get("api/getgoods?pageindex=" + this.pageIndex)
      this.$http.get("/static/data/getgoods.json").then(result => {
        if (result.body.status === 0) {
          // 当前显示的商品数据为： 之前的数据 和 当前获取的数据 进行拼接 后的数据
          // 否则 后面点击加载更多按钮时 新的数据就会 覆盖原有的商品列表
          this.goodslist = this.goodslist.concat(result.body.message);
        }
      });
    },
    // 点击加载更多按钮  显示下一页的商品
    getMoreGoods() {
      // this.pageIndex++;
      this.getGoodslist();
    },
    // 点击商品 根据商品的id 去往对应的商品详情页
    goDetail(id) {
      // $ruouter 的使用方式
      // -1- 直接传递路径
      // this.$router.push("/home/goodsinfo/" + id);
      // -2- 传递一个对象作为参数
      // this.$router.push({ path: "/home/goodsinfo/" + id });
      // -3- 传递 命名的路由 和 params参数对象
      this.$router.push({ name: "goodsinfo", params: { id } });
      // -4- 传递 path  和 jquery 参数对象
      // this.$router.push({ path: "/home/goodsinfo/", jquery: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods_list {
  display: flex;
  flex-wrap: wrap; //换行
  justify-content: space-between;
  padding: 2%;

  .goods_item {
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #bbb;
    margin: 4px 0;
    width: 49%;
    padding: 0.5%;
    // 防止网速慢的时候图片还未加载时 商品容器高度变窄 影响用户体验
    min-height: 192px;
    // 实现当每一个商品的标题所占行数不同时 同一行的两个商品的描述信息仍然可以底部对齐
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
      width: 100%;
    }

    .title {
      font-size: 12px;
      line-height: 1.1;
    }

    p {
      margin: 0;
      padding: 5px;
    }

    .discription {
      background-color: #eee;
      flex-flow: column;

      .price {
        .old {
          font-size: 12px;
          text-decoration: line-through;
          padding-left: 10px;
        }

        .now {
          color: #f30000;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;

        span {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
