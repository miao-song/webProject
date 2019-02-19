<template>
  <div class="desc_container">
    <h3 class='goods_title'>{{ info.title }}</h3>
    <div
      class='goods_desc'
      v-html='info.content'
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //请求成功返回的商品数据
      info: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      // this.$http.get('api/goods/getdesc/' + this.$route.params.id)
      this.$http.get("/static/data/getdesc.json").then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0];
        }
      });
    }
  }
};
</script>

<style lang="scss">
.desc_container {
  padding: 3%;

  .goods_title {
    font-size: 16px;
    padding: 15px 0;
    color: #226aff;
    text-align: center;
  }

  .goods_desc {
    width: 100%;
    text-align: center;

    img {
      width: 100%;
    }
  }
}
</style>

