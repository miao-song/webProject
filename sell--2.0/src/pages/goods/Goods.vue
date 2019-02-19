<template>
  <div class="goods">
    <!-- 左侧商品菜单 -->
    <div
      class="menu-wrapper"
      ref="menuWrapper"
    >
      <ul>
        <li
          v-for="(item, index) of goods"
          :key="index"
          class="menu-item"
          :class="{'current': currentIndex === index}"
          @click="selectMenu(index)"
        >
          <span class="text">
            <span
              v-show="item.type > 0"
              class="icon"
              :class="classMap[item.type]"
            ></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>

    <!-- 右侧食品区 -->
    <div
      class="foods-wrapper"
      ref="foodsWrapper"
    >
      <ul>
        <li
          v-for="(item, index) of goods"
          :key=index
          class="food-list food-list-hock"
        >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              v-for="(food, index) of item.foods"
              :key=index
              class="food-item"
              @click="selectFood(food,$event)"
            >
              <!-- 右侧区域的 左侧图片 -->
              <div class=icon>
                <img
                  width="57"
                  :src="food.icon"
                >
              </div>
              <!-- 右侧区域的 右侧文字 -->
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span
                    class="old"
                    v-show="food.oldPrice"
                  >￥{{food.oldPrice}}</span>
                </div>

                <!-- 增加/减少 商品的控件 -->
                <div class="control-wrapper">
                  <cart-control
                    :food="food"
                    @add="onAdd"
                  />
                </div>
              </div>
            </li>
          </ul>

        </li>
      </ul>
    </div>

    <!-- 购物车区域 -->
    <shop-cart
      ref="shopCart"
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      :selectFoods="selectFoods"
    />

    <!-- 商品详情页 -->
    <food
      :food="selectedFood"
      ref="foodElement"
      @add="onAdd"
    />

  </div>
</template>

<script>
import BScroll from "better-scroll";
import shopCart from "./../shopCart/shopCart";
import cartControl from "./../cartControl/cartControl";
import Food from "./../food/Food";

export default {
  name: "Goods",
  data() {
    return {
      classMap: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  props: {
    // 后台传递的数据 所有的商品的相关数据 (如商品分类等)
    goods: {
      type: Array
    },
    // 后台传递的数据 店家的数据(如 店图片 店名 店面介绍等 )
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  // 初始化 BScroll
  mounted() {
    this.menuScroll = new BScroll(this.$refs.menuWrapper, { click: true });
    this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
      click: true,
      probeType: 3 //使用BScroll滚动时 能实时告诉我们滚动到的位置
    });
    // 监听 scroll 事件
    this.foodsScroll.on("scroll", pos => {
      this.scrollY = Math.abs(Math.round(pos.y));
    });
    this.calculateHeight();
  },
  methods: {
    // 获取右侧每个食品列表的高度 高度包含title
    calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hock"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        // 计算出右边根据食品分类所对应的每一个食品区的高度
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    // 点击左侧商品分类 右侧对应分类的商品滚动到列表头部
    selectMenu(index) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hock"
      );
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 100);
    },
    // 接收从 cartcontrol中传递的 点击'加控件'时的 加控件dom对象
    // 利用ref属性获取到 shopCart 对象 调用 shopCart中的drop方法 将目标加控件dom对象传递到 shopCart中
    // 这样我们就可以在 shopCart 中访问到 cartcontrol 中的控件元素  从而可以获取到控件的位置
    onAdd(target) {
      this.$refs.shopCart.drop(target);
    },
    // 利用ref属性获取到food组件 并调用food组件的show()方法 实现点击商品时显示商品详情页
    selectFood(food, event) {
      if (event) {
        this.selectedFood = food;
        this.$refs.foodElement.show();
      }
    }
  },
  computed: {
    // 获取当前右侧食品滚动时的实时变化的index
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];

        // 判断当前滚动的距离是否在某两个食品列表构成的一个区间内
        // 不包含最后一个食品列表 因为它没有下一个食品列表 因此没有height2
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0; //没有滚动则返回 0
    },
    // 实时监控加入购物车的商品
    selectFoods() {
      let foods = [];
      this.goods.forEach(item => {
        item.foods.forEach(innerItem => {
          if (innerItem.count) {
            foods.push(innerItem);
          }
        });
      });
      return foods;
    }
  },
  components: {
    shopCart,
    cartControl,
    Food
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins';

.goods {
  display: flex;
  position: absolute;
  top: 3.5rem; /* header的高度 */
  width: 100%;
  bottom: 0.92rem; /* goods组件底部购物车区域的高度 */
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 0.8rem;
    width: 1.8rem;
    background-color: #f3f5f7;

    .menu-item {
      display: table;
      height: 1.08rem;
      width: 1.5rem;
      line-height: 0.28rem;
      text-align: center;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -0.2rem;
        background-color: #fff;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        vertical-align: top;
        width: 0.24rem;
        height: 0.24rem;
        display: inline-block;
        margin-right: 0.02rem;
        background-size: 0.24rem 0.24rem;
        background-repeat: no-repeat;

        &.decrease {
          bg-image('./images/decrease_3');
        }

        &.discount {
          bg-image('./images/discount_3');
        }

        &.guarantee {
          bg-image('./images/guarantee_3');
        }

        &.invoice {
          bg-image('./images/invoice_3');
        }

        &.special {
          bg-image('./images/special_3');
        }
      }

      .text {
        display: table-cell;
        width: 1.12rem;
        vertical-align: middle;
        font-size: 0.24rem;
        border-1px(rgba(7, 17, 27, 0.1));
      }
    }
  }

  .foods-wrapper {
    flex: 1;
    background-color: #fff;

    .title {
      padding-left: 0.28rem;
      height: 0.52rem;
      line-height: 0.52rem;
      border-left: 0.01rem solid #d9dde1;
      font-size: 0.24rem;
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 0.36rem;
      border-1px(rgba(7, 17, 27, 0.1));
      padding-bottom: 0.36rem;

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 1.14rem;
        margin-right: 0.2rem;
      }

      .content {
        flex: 1;

        .name {
          margin: 0.04rem 0 0.08rem 0;
          height: 0.28rem;
          line-height: 0.28rem;
          font-size: 0.28rem;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 0.2rem;
          font-size: 0.2rem;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 0.3rem;
          margin: 0.16rem 0;
        }

        .extra {
          .count {
            margin-right: 0.24rem;
          }
        }

        .price {
          font-weight: 700;
          line-height: 0.48rem;

          .now {
            margin-right: 0.36rem;
            font-size: 0.2rem;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 0.2rem;
            color: rgb(147, 153, 159);
          }
        }

        .control-wrapper {
          position: absolute;
          right: 0;
          bottom: 0.24rem;
        }
      }
    }
  }
}
</style>
