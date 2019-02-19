<template>
  <div class='newsInfo_container'>
    <!-- 主标题 start-->
    <h1
      title
      class='title'
    >{{ newsInfo.title }}</h1>
    <!-- 主标题 end -->
    <!-- 子标题 start-->
    <p class='subTitle'>
      <!-- <span>发表时间：{{ newsInfo.add_time | timeFormat }}</span> -->
      <span>发表时间：{{ newsInfo.add_time }}</span>
      <span>点击次数：{{ newsInfo.click }}次</span>
    </p>
    <!-- 子标题 end-->
    <hr>
    <!-- 新闻内容 start-->
    <!-- 带有html的内容渲染需要使用 v-html='newsInfo.content' -->
    <!-- <div class="content" v-html='newsInfo.content'></div> -->
    <div class="content">{{ newsInfo.content }}</div>
    <br>
    <!-- 新闻内容 end-->

    <!-- 评论子组件 start-->
    <!-- 将父组件中的 id 传递给子组件  -->
    <!-- 在子组件中定义 props 属性 -->
    <comment-box :id='this.id'></comment-box>
    <!-- 评论子组件 end-->
  </div>

</template>

<script>
//按需导入 Mint-UI
import { Toast } from "mint-ui";

//导入评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      // 进入页面后就应该立即拿到新闻详情 因次需要立即获取 id
      // 将 url中传递过来的 id值 挂载到 data 上 方便以后调用
      id: this.$route.params.id,
      // 新闻对象
      newsInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    //获取新闻详情
    getNewsInfo() {
      // 根据 id 获取到对应新闻的新闻详情
      // this.$http.get("api/getnew/" + this.id)
      this.$http.get("/static/data/getnew.json").then(result => {
        if (result.body.status === 0) {
          // 显示的是第一个新闻详情
          this.newsInfo = result.body.message[0];
        } else {
          Toast("获取新闻失败……");
        }
      });
    }
  },
  // 注册 commet 评论组件为子组件
  components: {
    "comment-box": comment
  }
};
</script>

<style lang="scss">
.newsInfo_container {
  padding: 0 4px;
  .title {
    margin: 15px 0;
    text-align: center;
    font-size: 16px;
  }
  .subTitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #226aff;
  }

  // 要将 style 的 scoped 属性去掉才会生效
  // 因为所有的样式都写在.newsInfo_container中 而这个类是唯一的  所以不会对其他的组件产生影响
  .content {
    padding: 0 15px;
    line-height: 1.5;
    text-indent: 2em;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
