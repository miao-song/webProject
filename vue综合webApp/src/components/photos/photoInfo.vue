<template>
  <div>
    <div class='photoInfo_container'>
      <!-- 头部标题区域  start -->
      <h4 class='photoInfo_title'>{{ photoInfo.title }}</h4>
      <p class='subtitle'>
        <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
        <span>点击次数：{{ photoInfo.click }}次</span>
      </p>
      <!-- 头部标题区域  end -->
      <hr>
      <!-- 缩略图区域  start -->
      <div class='thumb'>
        <vue-preview
          :slides="slides"
          @close="handleClose"
        ></vue-preview>
      </div>
      <!-- 缩略图区域  end -->

      <!-- 图片内容文字区域 start -->
      <!-- <div class="content" v-html='photoInfo.content'></div> -->
      <div class="content">{{ photoInfo.content }}</div>
      <!-- 图片内容文字区域 end -->

      <!-- 评论子组件 区域 start-->
      <cmt-box :id="id"></cmt-box>
      <!-- 评论子组件 区域 end-->
    </div>

  </div>
</template>

<script>
//导入现有的评论子组件
import comment from "./../subcomponents/comment.vue";

export default {
  data() {
    return {
      // 根据页面的 id 获取对应的图片信息
      id: this.$route.params.id,
      photoInfo: [],
      // 缩略图列表
      slides: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbImages();
  },
  methods: {
    //  发起请求 获取 图片详情
    getPhotoInfo() {
      this.$http;
      // .get("api/getimageinfo/" + this.id)
      this.$http.get("/static/data/getimageinfo.json").then(result => {
        if (result.body.status === 0) {
          this.photoInfo = result.body.message[0];
        }
      });
    },
    // 发起请求 获取 缩略图 和 原尺寸图片
    getThumbImages() {
      // this.$http.get("api/getthumbimages/" + this.id)
      this.$http.get("/static/data/getthumbimages.json").then(result => {
        if (result.body.status === 0) {
          // 将请求成功后的每一项数据 补全图片的 宽 和 高 属性
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          this.slides = result.body.message;
        }
      });
    },

    handleClose() {
      console.log("close event");
    }
  },
  // 注册子组件
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang="scss">
.photoInfo_container {
  padding: 3px;

  h4 {
    font-size: 15px;
    color: #26a2ff;
    text-align: center;
    margin: 15px 0;
  }
  // 子标题
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  // 文字内容
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  // 缩略图 设置样式要去掉 scoped
  .thumb {
    text-align: center;
    figure {
      margin: 5px 15px;
      display: inline-flex;
    }
  }
}
</style>

