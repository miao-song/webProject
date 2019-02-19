# vue 项目 travel

## 1.项目初始化

- 在 index.html 中的设置 meta 信息

  ```html
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimun-scale=1.0,user-scalable=no">
  ```

- 引入 reset.css 初始化样式

  - 在 asset 文件夹 新建 styles 文件 在其中存放 reset.css
  - 在项目入口文件 main.js 中引入 reset.css

- 解决移动端 由于二倍屏的原因 1px 的边框 会被解析为 2px 或者 3px 的问题

  - 在项目中引入 border.css 以解决此问题

- 解决移动端 click 事件点击会出现 300ms 延迟的问题

  - 引入 fastclick
  - 安装项目依赖
  - `npm install fastclick --save`
  - 安装成功重启服务 `npm run start`

- 引入 fastclick 包 并使用

  - `import fastClick from 'fastclick'`
  - `fastClick.attach(document.body)`

- 安装 stylus， 类似于 scss 和 less

  - `npm install stylus --save`

- 安装 stylus-loader

  - `npm install stylus-loader --save`

## 2.进行首页开发

### 2.1 首页 header 区域 制作

#### header 区域

- pages目录home 文件中新建文件夹 components

  - components 中新建子组件 Header.vue，组件name为HomeHeader
  - Home 组件中引入 Header 并注册到自己的 components 中
  - 在 Home 的 template 模板中使用 HomeHeader 组件 `<home-heder>`

- 制作 header 区域的 html 结构和 style 样式

- 引入字体图标，使用 iconfont

  - src --> assets --> styles --> 新建 iconfont 文件 在其中放入 字体文件
  - styles 中放入 iconfont.css 并修改 iconfont.css 中字体文件的路径
  - 在 main.js 中引入 iconfont.css

- 样式优化

  - 将项目的主色调用变量来表示
  - src --> assets --> styles --> 新建 variable.styl 文件 在其中设置主色调 \$bgColor

- 在 `<style></style>` 中直接使用 src 文件的别名 @ 因为这是 vue 已经定义好的

  - 引入时需要加上 ~
  - `@import '~@/assets/styles/variable.styl';`

- 为 styles 文件路径设置别名

  - 在 bulid --> webpack.base.conf.js 中的 resolve 配置如下
  - 将 访问 styles 的路径 设置别名为 styles
  - `'styles': resolve('src/assets/styles'),`

- 综合以上两步

  - 就可以直接在 `<style>`中引入路径 如下
  - `@import '~styles/variable.styl';`
  - 修改配置文件后需要重新 npm run dev

- 设置好之后 可以同时将 main.js 中的路径也做修改
  - 注意： 在 `<style></style>` 中使用别名 需要在别名前面加上 ~
  - 在 js 文件中不需要加 ~ 直接使用别名即可

### 2.2 首页 轮播图 区域 制作

- 码云中新建一个分支 index-swiper

- 使用第三方插件完成轮播图
  - github 中搜索 vue-awesome-swiper 找到插件

  - 安装依赖 由于 swiper 新版本不稳定 因此安装时 使用之前的版本
    `npm install vue-awesome-swiper@2.6.7 --save`

  - main.js 中引入 并 使用

    ```javascript
    import Vue from 'vue'
    import VueAwesomeSwiper from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    Vue.use(VueAwesomeSwiper)
    ```

- 在文件 src --> pages --> home --> components 文件中 新建 Home 页的子组件 Swiper.vue

  - 在 Swiper.vue 中完成 swiper 模板和所需数据
  - 在 Home 中引入 Swiper 组件并使用

- 设置图片的宽高比 保证图片宽度高度比例保持不变 

  ```css
   外层图片容器 {
      overflow: hidden;
      /** padding-bottom的取值为图片的height/width的百分比比值 **/
      padding-bottom: 26.6666%;;
      width: 100%;
      height: 0;
      
    /** 内层图片 **/
    内层图片 {
      width: 100%;
      }
    }
  ```

- 其中 padding-bottom 中设置的百分比 是以图片的宽度高度为基准的

- Swiper 中定义轮播图所需图片的数组

  - v-for 循环 渲染轮播图图片

### 2.3 首页 图标 区域 制作

- 码云中新建一个分支 index-icons

- 在文件 src --> pages --> home --> components 文件中 新建 Home 页的子组件 Icons.vue

- 在 Icons.vue 中完成 Icons 模板和所需数据

- 在 Home 中引入 Icons 组件并使用

- 图标区域结构样式实现

- 图标区域逻辑实现

  - 图标区使用轮播图的HTML结构 这样可以在图标过多时分屏显示

  - 每一屏代表一页 每页 8 个小图标 左右滑动以显示其他页的图标

  - 利用计算属性 computed 根据当前的图标 list 实现实时渲染分页的小图标 即使图标数量发生改变 计算属性也会实时更新并渲染页面

  - 在 computed 中定义 pages 计算属性 它是一个二维数组 每一项为一页 其中存放 8 个图标 超过 8 个图标就显示到第二页

  - 用 page 表示轮播的每一页 每一页中存放图标 最多为 8 个 页码 page 从 0 开始

    ```javascript
     computed: {
        pages() {
          const pages = [];
          this.list.forEach((item, index) => {
            const page = Math.floor(index / 8);
            if (!pages[page]) {
              pages[page] = [];
            }
            pages[page].push(item);
          });
          return pages;
        }
      }
    ```

  - 使用 v-for 循环将 pages 中的每一页数据 渲染到轮播区域

  - 同时 v-for 循环将 page 中的每一页的小图标渲染到当前屏

- 样式优化

  - 文字过多时 使用省略号

  - src --> assets --> styles --> 新建 mixins.styl 文件 在其中设置如下

    ```stylus
    ellipsis();
    overflow: hidden;
    text-overflow: nowrap;
    white-space: ellipsis;
    ```

- 在 `<style></style>` 中引入

  - `@import '~styles/mixins.styl';`

- 然后在样式中使用即可

  ```stylus
  p {
    ellipsis();
  }
  ```

### 2.4 首页 热门推荐 区域 制作

- 码云中新建一个分支 index-recommend
- 在文件 src --> pages --> home --> components 文件中 新建 Home 页的子组件 Recommend.vue
- 在 Recommend.vue 中完成 Recommend 模板和所需数据
- 在 Home 中引入 Recommend 组件并使用
- 绘制 热门推荐区域的 结构和样式
- 绘制样式的时候 给 li 设置一个类 class="border-bottom" 这样就会有一条下边框
- 将文字过多部分使用省略号显示 引入 mixins.styl 文件
- 设置 省略号样式的时候可能会不生效 此时可以给外部的包裹元素 设置 min-width: 0

### 2.5 首页 周末去哪儿 区域 制作

- 码云中新建一个分支 index-recommend
- 在文件 src --> pages --> home --> components 文件中 新建 Home 页的子组件 Weekend.vue
- 在 Weekend.vue 中完成 Weekend 模板和所需数据
- 在 Home 中引入 Weekend 组件并使用
- 绘制 周末游区域的 结构和样式
- 周末游的结构和样式 和 推荐区域基本相同可以借用 推荐区域的模板 稍作修饰即可

### 2.6 使用axios实现首页数据获取

- 云端创建新的分支 index-ajax

- 将分支拉取到本地

- 使用 axios 发送请求获取数据

- 安装项目依赖 axios

- `npm install axios --save`

- 完成后重启项目 `npm run dev`

- 我们希望首页所有的数据只通过一个 ajax 请求获取 因此选择在 Home.vue 中发送 获取到数据后再传递给子组件

- Home 组件中 引入 axios

- `import axios from 'axios'`

- 本地 mock 后台数据 在 static 目录下 新建 mock 文件 将模拟的 json 文件放置其中

- 在 .gitignore 文件中新增忽略文件 `static/mock`

- 定义发送请求的函数 getHomeInfo( )， 在 mounted 中调用该函数

- 我们希望项目上线时 获取数据的接口自动由本地模拟数据接口转换到到后端接口 此时可以借助 vue 的 proxy 代理功能 它可以实现将对后端 api 的 json 文件的请求转发到本地 mock 文件夹下

- 因此还需要在项目的 config 目录下的 index.js 中增加配置项

  ```javascript
    proxyTable: {
          "/api": {
            target: "http://localhost:8080",
            pathRewrite: {
              "^/api": "/static/mock"
            }
          }
        }
  ```

### 2.7 首页 父子组件数据传递

- 将 Home 中请求成功后返回的数据 通过属性绑定的方式传递给子组件

- 在渲染轮播图时, 由于页面渲染的时候 轮播图的数据可能还未返回 此时渲染的是一个空数组 因此我们给整个轮播图的容器设置 v-if="list.length" 意思是如果数组中还没有内容时 此时 v-if 的值为 false 整个轮播图就不会被创建
  避免首页刚打开时轮播图显示的不是第一张的图片的 bug

- 但直接写 v-if="list.length" 不太优雅 因为在模板中尽量避免出现逻辑性的代码 因此我们选择使用 computed 计算属性 实时监控数组长度的改变

  ```javascript
  computed: {
     showSwiper() {
        return this.list.length;
     }
  }
  ```

- 此时就可以设置为 `v-if="showSwiper"`

- icons 组价的优化 停止其自动轮播

- 到此 首页基本完成

- 将项目提交到线上

## 3.城市选择页面制作

### 3.1 城市选择页面路由配置

- 新建分支 city-router
- 将分支拉取到本地 `git pull`
- 切换到分支进行开发 `git checkout 分支名`
- pages 中新建 city 文件夹 在其中新建 City.vue
- 在 router 目录下的 index.js 中导入 City.vue 并设置对应的路由匹配规则
- 在 home 的 Header 组件中设置路由链接 `<router-link to="/city">`
- 完成之后上传到主分支

### 3.2 城市选择页面 Header 布局

- city 下新建目录 components 其中新建 Header.vue
- 在 City 组件中导入 Header.vue 注册并使用
- 绘制 Header 组件的结构和样式
- 完成之后上传到主分支

### 3.3 城市选择页面 搜索框布局

- 创建分支 city-search
- 将分支拉取到本地 `git pull`
- 切换到分支进行开发 `git checkout 分支名`
- components 其中新建 Search.vue
- 绘制结构和样式
- 完成之后上传到主分支

### 3.4 城市选择页面 列表布局

- 创建分支 city-list

- 将分支拉取到本地 `git pull`

- 切换到分支进行开发 `git checkout 分支名`

- components 其中新建 List.vue

- 绘制结构和样式

- 为每一项区域添加上下边框 使用类名 brder-topbottom

- 设置上下边框的颜色

  ```stylus
  .border-topbottom {
    &:before {
      border-color: #ccb;
    }
  
    &:after {
      border-color: #ccc;
    }
  }
  ```

- better-scroll 的使用 以及 字母表布局

- better-scroll 是对 isScroll 的一个封装 功能更全面

- 先安置项目依赖 `npm install better-scroll --save`

- 按照 better-screen 的结构 调整 滚动区域的 dom 结构

- 使用 ref 属性 获取包裹滚动内容的 dom 元素 `<div ref="wrapper">`

- List 组件中引入 better-scroll 包 `import BScroll from "better-scroll";`

- mounted 中初始化

  ```javascript
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper)
  }
  ```

- 创建字母表组件 Alphabet.vue

- city 的 components 中创建该组件

- City 中引入该组件并使用

- 绘制结构和样式

- 完成之后上传到主分支

### 3.5 城市选择页面 动态数据渲染

- 创建分支 city-ajax
- 拉取到本地
- static 目录下 mock 中新建 city.json 模拟城市数据
- 在 City 中发送 ajax 请求 然后再将返回的数据传递给各个自组件即可

### 3.6 兄弟组件间联动

- 实现点击右侧字母表 页面滚动到对应首字母的城市

- 创建分支 city-components

- 将分支拉取到本地 `git pull`

- 切换到分支进行开发 `git checkout 分支名`

- 为组件 Alphabet 中的每一个字母绑定点击事件 响应函数为 handleLetterClick

- 在 handleLetterClick 中触发父组件 City 的事件 handleLetterChange(letter)
  同时将当前点击时的 DOM 元素的文本内容传递给父组件

- 通过事件参数对象获取当前的点击字母 event.target.innerText

- 父组件中定义变量 letter 接收 Alphabet 子组件传递的数据

- 通过属性绑定 将该数据传递给子组件 List

- List 通 props 接收传递的数据保存在变量 letter 中 根据当前点击时的字母 在页面中显示对应首字母的城市区块

- 如何获取对应的区块呢？？？ 通过 :ref 获取

- 然后利用 better-scroll 提供的 API scroll.scrollToElement(dom 对象 或者 dom 选择器) 函数实现跳转到对应的区域

- List 中利用 watch 监听 letter 的改变 每当 letter 改变 就显示对应区块

  ```javascript
  watch: {
    letter() {
      if (this.letter) {
      const element = this.$refs[this.letter][0];
      this.scroll.scrollToElement(element);
      }
    }
  }
  ```

- 实现当手指在右侧字母区域滑动时 城市列表也一起做相应的滑动

- Alphabet 组件中 利用计算属性 letters 实时监控 字母

  ```javascript
  comouted: {
    letters() {
      const letters = [];
      for (let key in this.cities) {
        letters.push(key);
      }
    return letters; //返回一个数组 形如 ['A','B','C'......]
    }
  }
  ```

- 为右侧字母区域绑定 touch 事件` touchstart 、touchmove 、touchend`

- data 中定义一个变量touchStatus 标识手指是否在右侧字母列表区域滑动，初始为false

- 使用 :ref 属性绑定字母项

- 当标识为 true 时 获取字母 A 距离顶部的距离

- `const startY = this.$refs["A"][0].offsetTop;`

- 获取 手指距离 header 底部的距离 = 手指距离距离顶部的距离 - header 高度

- `const touchY = e.touches[0].clientY - header高度`

- 计算 字母 的索引

- `const index = Math.floor((touchY - startY) / 字母高度)`

- 判断当前字母的索引 index >= 0 && index < this.letters.length

- 进入判断后 触发父组件 City 的 change 事件

- `this.$emit('change', this.letters[index])`

### 3.7 列表切换性能优化

- 只要手指在屏幕右侧 字母列表区域滑动 就会一直触发 touchmove 事件 会一重复直获取字母 A 距离顶部的距离
- 为了提高性能 可以在 data 中 定义变量保存字母 A 距离顶部的距离
- 同时可以设置一个定时器 每间隔很短的时间(保证肉眼无法分辨) 比如 16ms 在 touchmove 中触发其中的代码实现功能

### 3.8 搜索功能实现

- 实现在搜索框输入关键字 搜速框下方显示搜索的内容
- 创建分支
- 拉取到本地
- Search 组件的 input 搜索框下方添加 ul 结构 用于渲染搜索显示的内容
- props 中接受 父组件请求成功返回的数据 cities
- data 中 定义 keyword 和 input 搜索框 实现双向数据绑定 v-model
- 利用 watch 实时监听 keyword 的变化
- 为了节流 依然在 watch 中使用定时器 在其中 循环遍历 cities
- data 中定义 timer 作为定时器返回值的标识 定义 list 用于存放根据关键字匹配到的城市项
- 思路：

  - 先判断当前是否已经开启定时器 是就关闭

  - 判断 搜索框是否有 keyword 输入 没有 则 `this.list = []; return;`

  - 开启新的定时器 定义常量 result 用来存放和搜索关键字匹配的城市项

  - 循环后台返回的数据 cities

  - cities 为一个对象 根据循环的 key 值 遍历每一项

  - 从 name 和 spell 中查找是否有和搜索关键字匹配的项 有就将匹配到的城市 push 到 result 中

  - 循环结束 将 result 赋值给 this.list

  - 根据 匹配到的 list 使用 v-for 将其渲染到搜索框下方的 li 中

  - 至此搜索功能基本实现

    ```javascript
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
    ```

- 当匹配到的搜索内容过多时 页面无法滚动 此时可以使用 better-scroll
- 在 Search 组件中引入 better-scroll
- `import BScroll from 'better-scroll'`
- 通过 ref 获取 外层容器 用于 better-scroll 的初始化
- 在 mounted 函数中初始化 better-scroll
- 搜索框优化
  - 在显示匹配项的 li 下方添加一个 li
  - `<li class="search-item border-bottom" v-show="!this.list.length">没有找到匹配数据</li>`
  - 根据当前是否有匹配的数据 决定这个 li 显示 或 隐藏
  - 为整个搜索框容器设置 v-show 根据是否有 keyword 决定其显示 或 隐藏
- 进一步优化
  - v-show="!this.list.length" 这里在 v-show 中进行了逻辑运算 应该避免

  - 在 computed 中定义一个属性来设置 v-show 的值

    ```javascript
    computed: {
      hasNoData () {
        return !this.list.length;
      }
    }
    ```

    - 这样 v-show 就可以设置为 v-show="hasNoData"

### 3.8 使用 Vuex 实现数据共享

- 创建新的分支 city-vuex

- 拉取到本地

- 实现 在城市选择页选择城市后，首页 header 区域右边的城市同步切换

- 安装项目依赖

- `npm install vuex --save`

- src 目录下创建文件夹 store 在其中新建文件 index.js

- 在 index.js 导入 vuex

  ```javascript
  import Vue from 'vue'
  import Vuex from 'vuex'
  Vue.use(Vuex)
  ```

- 在 state 中保存 city 并将其暴露出去

  ```javascript
  export default Vuex.Store({
    state: {
    city: "北京"
    }
  })
  ```

- main.js 中引入 store 的 index.js 并注册到 vm 实例中

- `import store from './store'`

- 将 Home 组件中的有关 city 的数据都去除 因为它不需要从后端获取 它是一个共享的数据

- home 中的 Header 组价中的 props 中的 city 也去除 将页面中需要使用 city 的地方改为 this.\$store.state.city

- 城市选择页面 List 组件中的 "北京" 是手写固定的 也需要改为 this.\$store.state.city

- 接下来开始实现 在城市选择页选择城市后首页 header 区域右边的城市同步切换

- 为城市选择页中的城市按钮注册 click 事件 响应函数 为 handleCityClick(city)

- 因此在 city 的 List、Search 组件中为显示城市的按钮都注册点击事件 @click="handleCityClick(item.name)"

- 在各自组件的 methods 中定义响应函数 handleCityClick()

- 组件通过响应函数触发 store 中 mutations 中的方法 changeCity

- 同时通过编程式导航 当用户点击城市后跳转到主页

  ```javascript
  methods: {
    handleCityClick(city) {
      this.$state.commit("changeCity", city)
      this.$router.push("/")
    }
  }
  ```

- 定义 store 中的 mutations

  ```javascript
  mutations: {
    changeCity (state, city) {
    state.city = city
    }
  }
  ```

### 3.9 Vuex 与 localStorage 联合使用

- 利用 Vuex 和 localStorage 完成数据保存的功能 实现每次刷新页面时 页面显示的用户选择的数据依然是上一次的

- 在 mutations 的 changeCity() 中 设置 localStorage

- 为了避免用户关闭了浏览器的本地存储功能或者使用了隐身模式 使用 localStrage 的时候会导致浏览器抛出异常 因此一般使用 localStorage 的时候都会在外层包裹一个 try catch

- 进一步的优化项目的结构
  - 将 store 目录下的 indx.js 进行分离 让 actions 、mutations 、state 分别处于单独的 js 文件，各自管理各自的数据 然后将其中的数据暴露出去 在 index.js 中引入这些 js 文件即可
  - 即 store 目录下的文件包含 index.js、state.js、actions.js、mutations.js
  - 在 index.js 中导入其他的 js 文件

- 优化 home 中的 Header 组件 解决 bug 当 header 区域右侧城市文字长为 4 个及以上时 header 的高度会被撑开

- 优化方案：对右侧城市的样式进行优化 设置 min-width 即可

  ```stylus
  .header_right {
    min-width: 1.04rem;
    padding: 0 0.1rem;
  }
  ```

- 对 vuex 进行优化

- vux 提供了公用数据映射 mapState
  - home 下 的 Header 组件中 引入 vuex 提供的映射 mapState

  - mapState 的意思是将 vuex 中的数据映射到当前组件的 computed 计算属性中

  - `import { mapState } from 'vuex'`

  - 在 Header 组件的计算属性中利用展开运算符 ... 和 mapState 将公用数据 city 以数组的方式传递 映射到当前组件的计算属性 city 中

    ```javascript
    computed: {
       ...mapState(['city'])
    }
    ```

  - 这样在当前组件中就可以直接使用 this.city 替代 this.\$store.state.city

  - 同理对 city 中的 List 组件也进行相同的优化

  - mapState 中除了可以传递数组 也可以传递对象

  - 将 vuex 中的公用数据 city 映射到当前组件的 computed 计算属性 currentCity 中

    ```javascript
    computed: {
      ...mapState ({
        currentCity: 'city'
      })
    }
    ```

  - 然后在当前组件中就可以直接使用 this.currentCity 替代 this.\$store.state.city

- vux 提供了 mutations 的映射 mapMutations
  - 在需要使用的组件中引入
  - city 中的 List 组件 引入
    - `import {mapState, mapMutations} form 'vuex'`

    - 在当前组件的 methods 中应用

    - 使用的方式和 mapState 一样 同样可以以数组或对象的方式将公用方法进行传递

    - 如: 将 mutations 中的 changeCity 方法映射到当前组件的 changeCity 方法

      ```javascript
      ...mapMutations(['changeCity'])
      ```

    - 然后就可以直接在当前组件使用` this.changeCity(city)` 替代 `this.$store.commit('changeCity',city)`

    - 对 city 中的 Search 组件 做相同的设置即可

### 4.0 使用 keep-alive 优化网页性能

- 创阿分支 city-keepalive
- 实现 当我们选择城市之后 跳转回首页时 整个首页对应的不同模块也显示所选城市的信息
- 在 home 的 Home 组价中 引入 mapState 将 state 中的 city 映射到当前组件
- 修改发送请求时的 api 添加一个查询字符串作为参数 该参数就是 mapState 映射的 city
- axios.get('/static/mock/index.json?city=" + this.city')
- 在 整个项目的根组件 APP.vue 组件中使用 `<keep-alive>` 将 `<router-link>` 包裹
  当我们使用`<keep-alive>`的时候 它所包裹的内容会被缓存起来 `<keep-alive>`取的就是缓存中的数据
- 设置 exclude 属性可以让某个组件显示的页面不被缓存 `<keep-alive exclude="组件名">`
- 使用`<keep-alive>`的时候 组件中会多出一个生命周期函数 activated 当页面重新显示的时候就会执行 activated 函数
- 因此我们可以在每次页面重新被显示的时候 判断当前页面显示的城市是否和上一次显示的城市相同 如果不相同 就再发一次 ajax 请求获取页面的数据重新渲染
- 代码实现
  - 在 home 目录下的 Home 组件中 data 上定义一个变量 `lastcity: ''`

  - 当页面被挂载后将当前渲染的公共数据 city 的值 传递给 lastCity 对上一次的城市做一个保存

  - mounted 中设置  `this.lastCity = this.city`

  - 当页面重新显示时 在 activated 中判断 当前的城市和上一次的城市是否相同 不相同则重新发送 ajax 请求 同时保存当前的城市 用于下次的判断

    ```javascript
    activated () {
      if (this.lastCity !== this.city) {
        this.lastCity = this.city
        this.getHomeInfo()
      }
    }
    ```

  - 至此 就完成了根据城市选择的不同 跳转回首页时显示对应的城市页面

## 4.详情页动态路由及 banner 布局

### 4.1 banner 部分结构样式绘制

- 创建分支 detail-banner

- 实现点击首页 热销推荐 区域中的故宫 可以跳转到故宫详情页

- home 目录下的 Recommend 组件中将 热销推荐区域对应的 li 修改为

  ```html
  <router-link tag="li" :to="'/detail/' + item.id">
  ```

- pages 目录下新建 detail 文件夹 在其中新建 Detail.vue 组件

- router 目录下的 inex.js 中引入该组件 并配置对应的路由规则

  ```javascript
  import Detail from '@/detail/Detail'
  { 
      path: '/detail/:id', 
      name: 'Detail', 
      component: Detail
  }
  ```

- detail 目录下创建 components 文件夹 在其中创建 Banner.vue 组件

- Detail 组件中引入 Banner 然后注册并使用

- 绘制 Banner 组件的结构和样式

- 其中 设置背景从上向下颜色渐变的效果 样式书写如下

  ```stylus
  background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8));
  ```

### 4.2 公用图片画廊组件拆分

- 画廊组件不只是会在 banner 组件中使用 项目中的其他地方都有可能会使用 因此将其设置为一个公用的组件

- src 目录下新建 common 文件夹 在其中新建 gallary 文件夹 其中创建 Gallary.vue 组件

- bulid 目录下的 webpack.base.conf.js 文件中 为 common 文件路径指定一个别名 common 配置如下

  ```javascript
  alias: {
    'common':resolve('src/common')
  }
  ```

- 我们需要在 banner 组件中使用 因此在 banner 中引入 gallary 组件 注册到 components 中并使用

- 绘制公用组件 gallary 的结构和样式 其结构采用 swiper.js 轮播图的结构

- 当画廊显示时 我们希望在轮播图片的下方显示对应的图片数量和当前显示的是第几章图 如 2/39 此时为轮播图增加配置信息 在 data 中配置如下

  ```javascript
  data() {
      return {
          swiperOptions: {
            pagination: ".swiper-pagination",
            paginationType: "fraction"
          }
      }
  }
  ```

- gallary 中的图片由父组件 banner 传递 gallary 组件中使用 props 接受图片数据 然后 v-for 渲染到页面

- 同时 画廊 也就是 gallary 组件默认为隐藏 因此在 banner 组件中使用一个标识 showGallary 来确定它的显示或隐藏 `<common-gallary v-show="showGallary">`需要在 banner 的 data 中定义 showGallary 默认为 false

- 为 banner 容器注册点击事件 @click="handleBannerClick" 当点击 banner 区域时 画廊就显示 方法如下

- banner 的 methods 中定义 handleBannerClick
  ```javascript
  handleBannerClick () {
    this.showGallary = true
  }
  ```

- 此时当我们点击时画廊会显示 但是轮播图左右切换时会有 bug 因此需要在公用 gallary 组件中为轮播图增加一些配置项
  在 data 中配置如下数据

  - observer: true,
    observeParents: true

- 当我们在画廊中点击画廊页面的任何区域时 希望画廊隐藏 回到 banner 组件的页面
  - 实现思路 如下
  - gallary 组件中为整个画廊容器注册点击事件 `@click="handleGallaryClick"`
  - gallary 组件的 methods 中定义该方法 handleGallaryClick 在该方法中通过 this.\$emmit 触发父组件的方法 handleGallaryClose
  - 父组件中定义关闭画廊的方法 handleGallaryClose 在该方法中让` this.showGallary = false` 即可隐藏画廊
  - 在 banner 中通过事件绑定的方式将方法传递给 gallary 使用变量 close 接受该方法 即 `<common-gallary @close="方法">`
  - 以上就可以实现点击图片外的区域 实现画廊隐藏了

### 4.3 实现 Header 渐隐渐现的效果

- 实现 在 detail 页面中 当手指在屏幕中向上滑动查看页面下方更多的内容时 页面顶部的返回箭头消失 然后渐渐显示一个 headr 区域

- 创建分支 detail-header

- 将分支拉取到本地

- detail 目录下的 components 中新建 Header 组件

- Detail 组件中引入 Header 组件注册并使用

- 绘制 Header 组件的结构和样式 可以复制 city 目录下的 Header 组件的结构和样式

- 结构和样式书写完毕 开始实现功能 当页面向下滚动超过一定距离时 左侧回退按钮隐藏 顶部渐渐显示 header

- data 中定义一个变量 showAbs 用于标识回退按钮和 header 的显示和隐藏 默认为 true

- 回退按钮 使用 v-show="showAbs"

- header 使用 v-show="!showAbs"

- data 中还需定义一个变量用于保存 header 显示时的透明度样式 如下

  ```javascript
  data() {
    return {
      showAbs: true,
      opcityStyle: {
        opacity: 0
      }
    }
  }
  ```

- 利用 :style 为 header 设置 opacity 样式 `<div :style='opacityStyle' v-show="!showAbs">`

- 在 activated 钩子中 监听整个页面的滚动事件 调用滚动事件触发时的响应函数 如下

- activated() {
  window.addEventerListener('scroll', this.handleScroll)
  }

- methods 中定义响应函数 handleScroll

- 响应函数实现功能的思路

- 1- 先获取页面滚动时滚动出去的距离 scrollTop 定义 top 保存该数据

- 2- 当这个距离 top 大于某个数值时 就让 header 逐渐显示 回退按钮隐藏

  - 也就是判断 top > 某个数值时 this.showAbs=false 反之就为 true

- 3- header 渐渐显示的效果利用透明度来实现
  - 定义变量 opaci = top / 一个合理的数值, 数值越大 透明度变化的就越慢 渐变的效果就越慢
  - 判断 opacity 的取值范围 `opacity = opacity > 1 ? 1 : opacity`

- 然后重新为 opacityStyle 赋值

- 响应函数 handleScroll 代码实现如下

  ```javas
  handleScroll() {
    let top = document.documentElement.scrollTop
    if (top > 60 ) {
      let opacity = top / 140
      opacity = opacity > 1 ? 1 : opacity
      this.opacityStyle= {
        opacity: opcity -->键和值相等可以简写为 opacity
      }
    this.showAbs = false;
    } else {
      this.showAbs = true;
    }
  }
  ```

### 4.4 对全局事件的解绑

- 在 window 上绑定的全局事件会对项目的所有组件都产生影响 其他的组件也会触发 window 上绑定的全局事件

- 当我们对一个组件使用 `<keep-alive>` 的时候 该组件中会自动多出 2 个生命周期函数 分别如下
  - activated 它在每次页面展示的时候被执行 比如页面刷新 重新显示等等
  - deactivated 它在页面即将被隐藏 或者 页面即将被替换为新的页面时执行 比如离开当前页面去往其他页面等

- 因此我们可以在 deactivated 钩子中解绑全局事件 如下
  - deactivated() {
    window.removeEventListener('事件名', this.对应的响应函数)
    }

- 因此利用 deactivated 我们可以对 detail 的 Header 组件中绑定的全局 scroll 事件进行移除 代码如下

  ```javascript
  deactivated() {
    window.removEventListener('scroll', this.handleScroll);
  }
  ```

### 4.5 使用递归组件实现详情页列表

- 创建分支 detail-list
- 拉取到本地
- detail 目录下的 components 中新建 List 组件
- Detail 组件中引入 List 组件注册并使用
- 递归组件：在组件自身调用自身这个组件 就是递归组件
- 利用递归组件 可以实现多级标题的渲染

### 4.6 使用 ajax 获取动态数据 渲染详情页

- Detail 组件中导入 axios 利用 axios 发起 ajax 请求

- `import axios form 'axios'`

- 组件的 methods 中定义方法 发送请求的方法 getDetailInfo 以及请求成功的回调函数 handleGetDataSucc

- 请求 api 时需要传递参数 一般传递参数的方式是拼串 如下

  ```javascript
  axios
      .get('api/detail.json/?id='+ this.$route.params.id)
      .then(this.handleGetDataSucc)
  ```

- 我们也可以换一种方式传递参数 以对象的方式传递

  ```javascript
  axios
      .get('api/detail.json', {params: {id: this.$route.params.id } } )
      .then(this.handleGetDataSucc)
  ```

- mounted 中调用 `this.getDetailInfo()`

- 将请求返回的数据以属性绑定的方式传递给各个子组件 子组件利用 props 进行接收

- 子组件中渲染数据到页面即可

- 当我们点击热门推荐中的选项进入对应的详情页时 会出现一个小 bug：页面并不是滚动到顶部显示

- 要解决此 bug 我们需要设置 router 的滚动行为
  - 在 router 目录下 index.js 中 路由匹配规则 routes 后面配置如下

    ```javascript
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
    ```

- 以上配置是指：对于所有路由导航 简单地让页面滚动到顶部

### 4.7 在项目中加入基础的动画

- 创建分支 detail-animation
- 实现在画廊页面点击图片是 有渐隐渐现的动画效果
- src 目录下的 common 中新建 文件夹 fade 在其中创建组件 FadeAnimation.vue
- Fade 组件模板中 使用 `<transition>` 将 `<slot>` 包裹 在样式中设置动画效果的类 .v-enter .v-leave-to .v-enter-active .v-leave-active
- 在 Banner 组件中引入 FadeAnimation 组件 注册并使用
- 使用 `<fade-animation>` 包裹 `<common-gallary>` 这样 `<common-gallary>` 就会作为一个插槽插入到 FadeAnimation 组件中的 `<slot></slot>` 位置 从而实现动画

## 5 vue 项目的接口联调

- 前后端联调是指：前端开发已经完成 api 接口需要从 mock 本地的数据替换为后端的数据 进行前后端的调试
- 此时可以删除 mock 文件夹 然后进入 config 目录下 index.js 然后对 proxyTable 中的配置进行修改 将端口修改为后台服务器的和后台的端口 配置如下
  - 比如后台服务器是 192.168.42.57 端口为 80 也就是http://192.168.42.57:80 由于 80 是默认端口 那么就可以直接写为 `target: 'http://192.168.42.57',`

  -  然后路径('^/api')会映射为后端服务器的('/api')目录下 `pathRewrite: { '^/api': '/api'} `这样写的话这句话就可以省略

  - 最终 proxyTable 配置如下

    ```javascript
    proxyTable: {
      '/api': {
      target: 'http://192.168.42.57'
      }
    }
    ```

### 5.1 vue 项目真机测试

- cmd 中输入 ifconfig 或者 ipconfig(windows 操作系统) 获取当前的 ip
- 由于 项目是通过 webpack Dev server 启动的 而 webpack Dev server 默认不支持以 ip 的方式进行页面的访问 因此需做一些配置
  - 找到项目根目录下的 package.json 文件 在 scrips 中的 dev 中增加一些配置 --host 0.0.0.0 即可

    配置如下

    ```javascript
    "scripts": {
      "dev": "webpack-dev-server --host 0.0.0.0 --inline --progress --config   build/webpack.dev.conf.js",
    },
    ```
- 然后就可以进行真机的访问了
  - 比如本地 ip 是 192.168.253.1
  - 端口默认是 8080 然后如果在 config 目录下的 index.js 中将端口配置项更改为 8081
  - 在真机浏览器中访问项目时 url 地址就是 `192.168.253.1:8081`
- 真机测试时发现一个 bug 在 Alphabet 组价中的字母表在滑动时整个页面都会滑动
  - 解决 bug 进入 city 目录下的 components 中的 Alphabet 组件
  - 在 Alphabet 中为 touchstart 添加事件修饰符 .prevent 阻止 touchstart 的默认行为
- 真机测试时 部分安卓手机可能在打开项目的时候看到的是白屏
- 产生的原因有 2 种
  - 原因 1- 手机浏览器不支持 promise
  - 解决此 BUG 在项目中安装 babel-polyfill 这个包会帮助我们判断浏览器是否有 promise 没有就会自动添加 ES6 的新特性
  - `npm install babel-polyfill --save`
  - 然后在 main.js 中引入 babel-polyfill
  - `import 'babel-polyfill'`
  - 原因 2- webpack dev server 的问题

### 5.2 vue 项目的打包上线

- 进入项目根目录中 开始命令行

- `npm run build`

- 执行以上命令时 vue 的脚手架工具会自动帮我们对 src 目录下的源代码进行打包编译 生成一个能被浏览器运行的代码 同时该代码也是压缩过后的代码

- 当控制台中显示 `Build complete` 时 项目跟目录下会多一个文件夹 dist 它里面的代码就是最终上线的代码包含一个 index.html 文件和一个 static 目录 因此可以将 dist 文件移出来 然后将 dist 中的两个文件传给后端人员

- 如果我们希望项目并不是在根目录下访问的而是在另一个一个目录中 比如我们希望项目在后端的 project 目录中 那么我们就需要将 dist 中的文件移动到 project 中 然后对前段代码更改一些配置更改如下

- 进入项目 config 目录下的 index.js 找到打包部分的配置项 build 对其中的 assetsPublicPath 进行设置 如下

  ```javascript
  build: {
    assetsPublicPath: '/project',
  }
  ```

- 然后重新对项目进行打包 `npm run build` 将重新生成的 dist 目录重命名为 project 然后将 project 文件移出来 然后将整个 project 文件传给后端人员即可

### 5.3 vue 中异步组件的使用

- 合理使用异步组件会提升项目的性能

- 打包后的的 dist 文件中的 js 文件 它其中的 app.js 存放了整个项目的 js 逻辑代码

- 我们希望 js 逻辑异步加载 也就是页面需要的时候再加载 而不是一开始在访问首页的时候其他页面的 js 逻辑也被全部加载出来 因此我们需要用到异步组件来实现异步加载 将 app.js 拆分为为一个个独立的 js 文件

- 进入项目 router 目录下的 index.js 将组件导入的方式改变一下 如下 利用箭头函数的方式引入组件

  ```javascript
  routes: [{
    path: '/',
    name: 'Home',
  // component: Home
  // 使用异步组件 
    component: () => import('@/pages/home/Home')
    },
    {
    path: '/city',
    name: 'City',
    component: () => import('@/pages/city/City')
    },
    {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import("@/pages/detail/Detail")
    }
  ]
  ```

- 但是如果项目中的 app.js 文件不是很大的情况下 不建议使用异组件步将 app.js 进行代码的拆分 因为拆分后每加载一个页面都需要重新发送一次 http 请求

- 当然除了在路由中使用异步组件 项目中的其他组件也可以使用异步加载的方式引入子组件 代码和路由中的配置相似 如下

  ```javascript
  父组件的 components: {
    子组件名: () => import('子组件的路径')
  }
  ```

- 一般如果 app.js 文件没有超过 1Mb 的情况下都不推荐使用异步组件 它反而会降低项目性能
