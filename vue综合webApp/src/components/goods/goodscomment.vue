<template>
  <div>
    <cmt-box :id='$route.params.id'></cmt-box>
  </div>
</template>

<script>
// 导入 评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {},
  methods: {},
  components: {
    // 注册子组件
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
</style>

