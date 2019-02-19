<template>
  <div class="header">
    <div class="header_left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header_input">
      <span class="iconfont">&#xe632;</span>
      输入城市/景点/游玩主题
    </div>
    <router-link to="/city">
      <div class="header_right">
        {{ this.city }}
        <span class="iconfont arrow-icon">&#xe6aa;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HomeHeader", //组件的名字
  computed: {
    // mapState的意思是将 vuex中的数据映射到当前组件的 computed 计算属性中
    // 将公用数据 city 映射到当前组件的计算属性 city 中
    // 这样在当前组件中就可以直接使用 this.city 替代 this.$store.state.city
    ...mapState(["city"])
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/variable.styl';

.header {
  display: flex;
  line-height: $HeaderHeight;
  background-color: $bgColor;
  color: #fff;

  .header_left {
    width: 0.64rem;
    float: left;

    .back-icon {
      text-align: center;
      font-size: 0.4rem;
    }
  }

  .header_input {
    flex: 1;
    background-color: #fff;
    border-radius: 0.1rem;
    margin-top: 0.12rem;
    margin-left: 0.2rem;
    padding-left: 0.2rem;
    height: 0.62rem;
    line-height: 0.62rem;
    color: #ccc;
  }

  .header_right {
    float: right;
    min-width: 1.04rem;
    padding: 0 0.1rem;
    text-align: center;
    color: #fff;

    .arrow-icon {
      margin-left: -0.04rem;
      font-size: 0.3rem;
    }
  }
}
</style>
