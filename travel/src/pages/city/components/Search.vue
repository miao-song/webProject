<template>
  <div>
    <div class="search">
      <input
        type="text"
        placeholder="输入城市名或拼音"
        class="search-input"
        v-model="keyword"
      >
    </div>

    <div
      class="search-content"
      ref="search"
      v-show="keyword"
    >
      <ul>
        <li
          class="search-item border-bottom"
          v-for="item of list"
          :key="item.id"
          @click="handleCityClick(item.name)"
        >
          {{ item.name }}
        </li>
        <li
          class="search-item border-bottom"
          v-show="hasNoData"
        >
          没有找到匹配数据
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapMutations } from "vuex";

export default {
  name: "CitySearch",
  data() {
    return {
      keyword: "",
      list: [],
      timer: null
    };
  },
  props: {
    cities: Object
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.search);
  },
  methods: {
    handleCityClick(city) {
      // this.$store.commit("changeCity", city);
      this.changeCity(city);
      this.$router.push("./");
    },
    ...mapMutations(["changeCity"])
  },
  computed: {
    hasNoData() {
      return !this.list.length;
    }
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.keyword) {
        this.list = [];
        return;
      }
      this.timer = setTimeout(() => {
        const result = [];
        for (let key in this.cities) {
          this.cities[key].forEach(item => {
            if (
              item.spell.indexOf(this.keyword) > -1 ||
              item.name.indexOf(this.keyword) > -1
            ) {
              result.push(item);
            }
          });
        }
        this.list = result;
      }, 100);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/variable.styl';

.search {
  height: 0.72rem;
  background-color: $bgColor;
  padding: 0 0.1rem;

  .search-input {
    height: 0.6rem;
    line-height: 0.6rem;
    width: 100%;
    text-align: center;
    border-radius: 0.06rem;
    color: #666;
    padding: 0 0.1rem;
    box-sizing: border-box;
  }
}

.search-content {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  top: 1.58rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;

  .search-item {
    line-height: 0.62rem;
    padding-left: 0.2rem;
    color: #666;
    background-color: #fff;
  }
}
</style>
