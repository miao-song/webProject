<template>
  <div class='app_container'>
    <!-- 顶部固定 Header 部分 start -->
    <mt-header
      fixed
      title="美 好 未 来"
    >
      <!-- 顶部  < 返回按钮 -->
      <span
        slot="left"
        @click="goBack"
        v-show="flag"
      >
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <!-- 顶部 固定 Header 部分 end-->

    <!-- 中间主体 底部 tabBar根据路由匹配到的部分 start-->
    <!-- 给中间的部分设置切换时的动画效果 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 中间主体 底部 tabBar根据路由匹配到的部分 end-->

    <!-- 底部 tabBar 部分 start-->
    <footer>
      <nav class="mui-bar mui-bar-tab">
        <router-link
          to='/home'
          class="mui-tab-item-ms"
        >
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link
          to='/member'
          class="mui-tab-item-ms"
        >
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link
          to='/shopcart'
          class="mui-tab-item-ms"
        >
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span
              class="mui-badge"
              id="badge"
            >{{$store.getters.getCount }}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link
          to='/search'
          class="mui-tab-item-ms"
        >
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
    </footer>
    <!-- 底部 tab 部分 end-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    // 监听当前页面的路由 如果是首页的时候 就将后退按钮 隐藏
    "$route.path": function(newVal) {
      if (newVal === "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.app_container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

/* heade 区域 */
.mint-header {
  z-index: 99;
}

/* 设置中间部分切换时的动画效果 */
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(-100%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

/* 解决底部 tab 点击切换时无法显示对应组件的问题 */
.mui-bar-tab .mui-tab-item-ms.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-ms {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-ms .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-ms {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-ms .mui-icon ~ .mui-tab-label {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 11px;
}
</style>
