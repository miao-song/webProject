<template>
  <div>
    <!-- header 区域 -->
    <city-header></city-header>
    <!-- search 搜索框区域 -->
    <city-search :cities="cities"></city-search>
    <!-- list 城市列表区域 -->
    <city-list
      :cities="cities"
      :hotCities="hotCities"
      :letter="letter"
    ></city-list>
    <!-- alphabet页面右侧字母表区域 -->
    <city-alphabet
      :cities="cities"
      @change="handleLetterChange"
    ></city-alphabet>

  </div>
</template>

<script>
// 引入 headr组价 并注册 使用
import CityHeader from "./components/Header";
// 引入 Search组件 并注册 使用
import CitySearch from "./components/Search";
// 引入 List组件 注册并使用
import CityList from "./components/List";
// 引入 Alphabet组件 注册并使用
import CityAlphabet from "./components/Alphabet";

import axios from "axios";

export default {
  name: "City",
  data() {
    return {
      cities: {},
      hotCities: [],
      letter: ""
    };
  },
  mounted() {
    this.getCityInfo();
  },
  methods: {
    getCityInfo() {
      axios.get("api/city.json").then(this.getCityInfoSucc);
    },
    getCityInfoSucc(res) {
      res = res.data;
      if (res.ret && res.data) {
        const data = res.data;
        this.cities = data.cities;
        this.hotCities = data.hotCities;
      }
    },
    handleLetterChange(letter) {
      this.letter = letter;
    }
  },
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  }
};
</script>

<style lang="stylus" scoped>
</style>