<template>
  <div class='cmt_container'>
    <h3>发表评论</h3>
    <hr>
    <textarea
      v-model='msg'
      placeholder="请输入要评论的内容(最多120字)"
      maxlength="120"
    ></textarea>

    <mt-button
      @click='postComment'
      type='primary'
      size='large'
    >发表评论</mt-button>

    <!-- 已存在的用户评论 -->
    <div class="cmt_list">
      <!-- 渲染评论 -->
      <div
        class="cmt_item"
        v-for='(item, i) in comments'
        :key='item.add_time'
      >
        <div class="cmt_title">
          <!-- 注意  这里不可以用 i++ 否则相当于重新给 i 赋值 -->
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;
          发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt_body">
          {{ item.content == 'undefined' ? '此用户暂时没有评论': item.content }}
        </div>
      </div>
    </div>
    <!-- 幽灵按钮 使用 plain -->
    <mt-button
      @click='getMoreComments'
      type='danger'
      size='large'
      plain
    >加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      comments: [],
      // 页码 默认展示第一页评论数据
      // pageIndex: 1,
      // 当前正在编辑的即将发表的评论内容
      msg: ""
    };
  },
  props: ["id"],
  created() {
    this.getComments();
  },
  methods: {
    // 获取新闻评论信息
    getComments() {
      this.$http
        // .get("api/getcomments/" +this.id + "?pageindex=" + this.pageIndex)
        .get("/static/data/getcomments.json")
        .then(result => {
          if (result.body.status === 0) {
            // 每次点击加载更多时将前面的评论数据和当前获取到的评论数据进行拼接 防止将前几页的数据覆盖了
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论失败……");
          }
        });
    },
    // 点击更多按钮 加载跟多评论信息
    getMoreComments() {
      // this.pageIndex++;
      this.getComments();
    },
    // 点击发表按钮 发送当前编辑好的评论
    // post() 参数1-- 请求的地址
    // 参数2-- 提交给服务器的数据对象
    // 参数3-- 提交时表单中的数据格式 {emulateJSON: true  }
    // 参数3-- 可以预先在全局定义 Vue.http.options.emulateHTTP = true
    postComment() {
      //发表评论前先校验评论内容是否为空
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空");
      }
      this.$http
        // .post("/static/data/getcomments.json/" + this.$route.params.id, {content: this.msg.trim()})
        .get("/static/data/getcomments.json")
        .then(result => {
          if (result.body.status === 0) {
            // 手动拼接一个对象 将其添加到评论最前面
            let cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            // this.comments.unshift(cmt);
            this.comments = this.comments.concat(result.body.message);
            // 把当前评论的数据添加到评论数据最前面
            this.comments.unshift(cmt);
            // 发表评论成功后 清空评论框
            this.msg = "";
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt_container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt_list {
    font-size: 13px;
    margin: 5px 0;
    .cmt_item {
      .cmt_title {
        background-color: #ccc;
        line-height: 30px;
      }
      .cmt_body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
