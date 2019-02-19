<template>
  <div class="shopcar_container">
    <div class="goods_list">
      <!-- 商品列表项区 -->
      <div
        class="mui-card"
        v-for="(item, i) in goodslist"
        :key="item.id"
      >
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img
              class="sp"
              :src="item.thumbpath"
            >
            <div class="info">
              <h4>{{ item.title }}</h4>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>&nbsp;&nbsp;
                <numberbox
                  class="number"
                  :initcount="$store.getters.getGoodsCount[item.id]"
                  :goodsid="item.id"
                ></numberbox>&nbsp;&nbsp;
                <a @click.prevent='remove9(item.id, i)'>删除</a>
              </p>
            </div>

          </div>
        </div>
      </div>

      <!-- 商品结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content jiesuan">
          <div class="mui-card-content-inner">
            <div class="left">
              <P>总计(不含运费)</P>
              <p>已勾选商品<span class="count"> {{$store.getters.getGoodsSelectedAndAmount.count}} </span>件，总价：<span class="total_price"> ￥{{$store.getters.getGoodsSelectedAndAmount.amont}} </span></p>
            </div>
            <mt-button
              type="danger"
              class='go'
            >去结算</mt-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 导入数字框子组件 并注册
import numberbox from "../subcomponents/shopcar_numberbox.vue";

export default {
  data() {
    return {
      // 购物车中所有商品的数据
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 获取购物车列表
    getGoodsList() {
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));

      // // 发请求之前先判断 idArr 是否为空----即判断购物车中是否有商品存在 没有就不用发送请求 否则会报错
      // if (idArr.length <= 0) {
      //   return;
      // }
      // this.$http.get("api/getshopcarlist.json/" + idArr.join(","))
      this.$http.get("/static/data/getshopcarlist.json").then(result => {
        if (result.body.status === 0) {
          this.goodslist = result.body.message;
        }
      });
    },
    // 点击删除 根据 id 删除当前的商品 同时将当前组件中对应要删除的商品使用 index 删除
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    // 将商品是否选中的开关状态 同步到 localStorage中
    selectedChanged(id, val) {
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    numberbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar_container {
  overflow: hidden;
  background-color: #eee;

  .goods_list {
    .mui-card-content-inner {
      display: flex;
      align-items: center; //纵向居中

      .sp {
        width: 60px;
        height: 60px;
        vertical-align: middle;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h4 {
          font-size: 13px;
          margin-bottom: 15px;
        }

        p {
          .price {
            color: #f00;
            font-weight: 900;
          }

          .number {
            display: inline;
          }
        }
      }
    }
  }
  .jiesuan {
    .mui-card-content-inner {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .count {
        color: #f00;
        font-size: 16px;
        font-weight: 900;
      }
      .total_price {
        color: #f00;
        font-size: 16px;
        font-weight: 900;
      }
    }
  }
}
</style>


