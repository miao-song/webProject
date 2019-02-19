<template>
  <div>
    <div
      class="mui-numbox"
      data-numbox-min='1'
      style="height: 25px;"
    >
      <button
        class="mui-btn mui-btn-numbox-minus"
        type="button"
      >-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        :value="initcount"
        @change="countChanged"
        ref="numbox"
      />
      <button
        class="mui-btn mui-btn-numbox-plus"
        type="button"
      >+</button>
    </div>

  </div>

</template>

<script>
// 导入数字选择框
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    // 初始化数字选择框 组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    // 监听文本框的数字改变
    // 每当商品的数量发生改变就将最新的数据同步到购物车 store 中 覆盖之前的数值
    countChanged() {
      this.$store.commit("updatedGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      });
    }
  },
  props: ["initcount", "goodsid"]
};
</script>

<style lang="scss" scoped>
</style>

