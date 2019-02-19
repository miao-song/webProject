<template>
  <div>
    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for='item in newsList'
        :key='item.id'
      >
        <!-- 点击整条新闻会去往对应的新闻详情页 -->
        <router-link :to="'/home/newsInfo/'+ item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          >
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <!-- 使用过滤器格式化时间 -->
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// 按需导入 MINT-UI
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      // 定义一个变量 用于接收请求成功后返回的新闻数据
      newsList: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      // this.$http.get("api/getnewslist")
      this.$http.get("/static/data/getnewslist.json").then(result => {
        if (result.body.status === 0) {
          this.newsList = result.body.message;
        } else {
          Toast("获取新闻失败……");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
  }
  .mui-ellipsis {
    // 两端对齐
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #226aff;
  }
}
</style>