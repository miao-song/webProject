<template>
  <div class="recommend-container">
    <div class="recommend-title">热门推荐</div>
    <ul>
      <router-link
        tag="li"
        :to="'/detail/' + item.id"
        class="item border-bottom"
        v-for="item of list"
        :key="item.id"
      >
        <img
          class="item-img"
          :src="item.imgUrl"
        >
        <div class="item-info">
          <p class="item-title">{{ item.title }}</p>
          <p class="item-desc">{{ item.desc }}</p>
          <button class="item-button">查看详情</button>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    list: Array
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.recommend-container {
  .recommend-title {
    line-height: 0.8rem;
    background-color: #eee;
    text-indent: 0.2rem;
    margin-top: 0.2rem;
  }

  .item {
    display: flex;
    height: 1.9rem;
    overflow: hidden;
    padding: 0.1rem 0;

    .item-img {
      width: 1.7rem;
      height: 1.7rem;
      padding: 0.1rem;
    }

    .item-info {
      flex: 1;
      padding: 0.1rem;
      min-width: 0;

      .item-title {
        line-height: 0.54rem;
        font-size: 0.32rem;
        ellipsis();
      }

      .item-desc {
        line-height: 0.4rem;
        color: #bbb;
        ellipsis();
      }

      .item-button {
        background-color: #ff9300;
        padding: 0 0.2rem;
        margin-top: 0.16rem;
        border-radius: 0.06rem;
        color: #fff;
        line-height: 0.44rem;
      }
    }
  }
}
</style>
