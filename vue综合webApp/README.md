# 第一个 vue 实战项目

## 开始首页 App 组件

### 1. Header 区域 --使用 Mint-UI 中的 Header 组件

### 2. 底部 TabBar 区域 --使用 MUI 的 Tabber.html

- 制作底部区域 需要用到的文件 MUI 的 icons-extra.html
- 导入 MUI 中 fonts 文件中的字体图标到项目 lib 文件
  `import './lib/mui/fonts/mui-icons-extra.ttf'`
- 导入 MUI 中的 css 文件中的字体样式 到项目 lib 文件
  `import './lib/mui/css/icons-extra.css'`
- 给购物车图标加类 mui-icon-extra mui-icon-extra-cart
- 在 main.js 导入路由包 `import VueRouter from 'vue-router'`
- 使用路由` Vue.use(VueRouter)`
- 导入自己的路由模块 `import './router.js'`
- 将路由模块挂载到 vm 实例对象上
- 将 底部 tabBar 的 a 标签改为 ` <router-link>`
- 设置显示当前路由的高亮类(直接使用 mui 的高亮类)，在router.js 中 设置 linkActiveClass: "mui-active"

### 3. 在中间区域放置一个 router-view 来展示匹配到的组件

- src 中创建一个文件 components
- components 中创建一个文件 tabbar 用于存放底部通过路由匹配到的组件
- tabbar 中定义四个文件 分别是底部按钮项匹配的组件
- 在四个文件中创建对应的模版
- 在 router.js 中引入四个模版组件 同时 定义路由匹配规则
- 在 App.vue 中 放入` <router-view></router-view> `用于放置匹配到的四个组件中的某个组件

### 4. 完成首页轮播图 --- 使用 Mint-UI

- 导入 Mint-UI 中的 Swipe , SwipeItem 模块

- Vue.use(Swipe.name, Swipe)

- Vue.use(SwipeItem.name, SwipeItem)

- 在 HomeComponent 组件中 导入轮播图的 html 结构

- 设置 轮播图 容器 高度

- 使用 scss 语法 &:first-child 给每一个轮播图 图片容器 设置不同的图片

- 加载首页轮播图数据 使用 vue-resource 获取数据

- 先装包 `cnpm i vue-resource -S`

- 在 main.js 中导入 `import VueResource from 'vue-resource'`

- `Vue.use(VueResource)`

- HomeContainer.vue中，在data 中 定义一个变量 lunbotuList 用于接收请求成功后返回的轮播图数据

- HomeContainer.vue中，利用vue-resource提供的API，使用this.$http.get().then()发起数据请求，以获取轮播图的数据，将数据传递给轮播图子组件，在轮播图子组件swiper.vue中使用props进行数据接收，同时根据isfull类来控制轮播图的显示

- HomeContainer.vue中，定义一个方法getLunbotu( )用于获取轮播图数据

  ```javascript
  getLunbotu() {
    this.$http.get('url').then(result => {
      if (result.body.status === 0) {
        this.lunbotuList = this.body.message;
      } else {
        Toast('获取数据失败…………');
      }
    })
  }
  ```

- created() 中调用 getLunbotu 方法

- swiper.vue中，使用 v-for 在轮播图容器中 渲染 img

- 注意： 在组件中使用 v-for 必须绑定一个 key，用于保证数据的唯一性

- 在 img 中使用 v-bind 实现和图片地址的数据绑定` <img :src='item.imgurl'>`

### 5. 六宫格部分改造

- 使用 MUI 中的 grid-default.html 九宫格样式 改为六宫格

### 6. 完成组件切换时的动画效果

- 将放置组件的容器` <router-view> `用 `<transition> `包裹起来
- 设置动画效果
- .v-enter {opacity : 0; transform: translateX(100%)}
- .v-leave-to {opacity: 0; transform: translateX(-100%)}
- .v-enter-active, .v-leave-active {transition: all 0.5s ease}
- 给整个页面设置 overflow-x : hidden 以解决组件切换时出现横向滚动条的 bug
- 设置组件离开时 .v-leave-to {position: absolute} 以解决组件切换时出现的上浮 bug

### 7. 点击新闻资讯 转到 新闻资讯页面

- 在 components 文件中 创建 文件 news 在其中创建新闻页面的组件
- 将新闻页面组件在 router.js 中引入 并设置对应路由规则
- 将` <router-link></router-link>` 放到 home 对应位置 替换原来的 `<a>` 标签 指定 to 属性值到对应的页面

### 8. 新闻资讯 页面 的绘制

- newsList.vue组件中绘制新闻页面 --使用 MUI 中的 media-list.html

- 使用 flex 布局实现 两端对齐 父容器 {display: flex; justify-contnet: space-between;}

- 使用 vue-resource 获取数据 将所有获取数据的 API 根路径设为全局根路径 Vue.http.options.root = '根路径'

- 定义方法 getNewsList() 获取新闻资讯数据

- 在钩子函数 created() 函数中 调用 该方法

- 将请求成功后返回的数据渲染到新闻列表对应的位置

- 注意：新闻图片的渲染需要使用 v-bind 实现数据绑定 `<img :src='item.img_url'>`

- 定义格式化时间的全局过滤器 --->方便项目中的所有需要格式化时间的页面都可以使用

- 使用 moment.js 来格式化时间 先在项目中安装 `npm(cnpm) i moment -S`

- 导入 moment ---> ` import moment from 'moment'`

- 在过滤器中使用 moment ---用法 `moment(dateStr).format(pattern)`

- 组合使用moment和过滤器实现日期格式化 

  ```javascript
  Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    moment(dateStr).format(pattern);
  };
  ```

- 在新闻资讯中需要格式化时间的地方调用过滤器
  如 ` <span>发表时间：{{ item.add_time | dateFormat }}</span>`

### 9. 实现 点击新闻资讯列表 跳转到对应的新闻详情页面

- 将新闻资讯列表中的每一项` <a> `改为 路由链接 `<router-link>` 同时设置属性 to

- 同时在跳转的时候应该提供唯一的 id 标识符 用于实现对应新闻跳转到新闻详情页

- news目录下，创建一个新闻详情的组件 newsInfo.vue

- 在 router.js 中导入新闻详情页  `impotr newsInfo from './components/news/newsInfo.vue'`

- 配置新闻详情页的路由匹配规则 将路由地址 和 组件页面对应起来

- 配置路由规则时 传入参数 id 

  ```javascript
  routes: [
    {
      path: "/home/newsInfo/:id",
      component: newsInfo
    }
  ];
  ```

- 在新闻详情页组件中 挂载 url 中传递过来的 id 方便以后调用

### 10. 实现新闻详情的页面布局 和 数据渲染

- 在newsinfo.vue中，使用 `$http.get().then()` 获取详情页的显示数据
- 注意：带有 html 标签的页面在渲染时 需要使用 v-html 绑定

### 11. 评论区 --- 单独封装一个评论子组件

- 在 components 中 创建 subcomponents 文件夹
- subcomponents 中 创建一个 评论组件 comment.vue
- 在需要使用评论子组件的页面中 如新闻详情页 手动导入 comment 组件

* `import comment from '../subcomponents/comment.vue'`

- 在父组件中使用 `components` 属性， 将 comment 组件注册为自己的子组件
- 将注册子组件时候的名称以标签的形式在页面中引用即可

### 12. 获取所有的评论数据 显示到新闻详情页面中

- comment.vue中，定义方法 getComments() 根据 api 获取评论数据
- 在 api 中 需要传递 父组件中的 id 因此需要通过属性绑定 将父组件的数据传递给子组件 同时在子组件中 定义 props 属性 接收 id 值
- 同时 在 api 中还需要传递页码 在 comment.vue 的 data 中定义 变量 pageIndex 用于表示页码 默认值为 1
- 注意：每次加载数据时 已经获取到的前几页的评论数据 需要 和 获取的新一页的数据做拼接 否则当点击加载更多按钮时 新的评论数据会覆盖前面已经加载的所有评论数据
- 在钩子函数 created() 中调用 getComments()
- 使用 v-for 将获取到的评论数据渲染到评论区

### 13. 实现点击更多 加载更多评论的功能

- 实现思路 为更多按钮绑定 click 事件 每点击一次 就加载下一页评论数据
- 定义点击事件响应函数 getMoreComments() 代码实现 让 pageIndex++ 同时发起请求获取新一页的评论数据 即调用 getComments()

### 14. 实现 发表评论功能

- 对评论框 进行 双向数据绑定 v-model 同时在 data 中定义一个变量msg用做数据的双向绑定
- 为发表按钮绑定 click 事件 绑定发表当前评论的响应函数 postComment()
- 实现 postComment() 的代码
  -1- 先判断当前需要发表的评论内容调用 trim() 后 length 是否为 0 是则 Toast 提示发表信息不能为空
  -2- 发送 post 请求 将 post 的 请求头 定义为全局 post 请求时的 表单数据格式 application/x-www-form-urlencoded
  -3- 设置为 Vue.http.options.emulalteHTTP = true
  -4- 请求成功后 在成功的回调中 手动拼接一个评论内容的对象 将当前评论内容 trim()
  -5- 将拼接的对象 unshift 到 评论数组中
  -6- 评论发表成功 将评论框内容清空

### 15. 首页点击图分享 跳转到图片列表

- 将 home 页面中的对应 `<a>` 标签改为 `<router-link to='/home/photoList'>`

### 16. 绘制图片列表

- 在 components 文件夹中 新建文件夹 photos 在其中 创建 图片列表页面模版 photoList.vue
- 在 router.js 中引入该组件 并设置对应路由匹配规则

### 17. 开始绘制 图片列表页面

- 绘制页面顶部滑动 tab 栏 -- html结构使用 MUI 中的 tab-top-webview-main.html
- 在使用该组件时 需要将类 .mui-fullscreen 去掉
- 查看官方文档 让 tab 区域滑动 还需要引入 mui.min.js 初始化该组件
- 初始化该插件 需要在页面 DOM 结构加载完毕完全渲染到页面中之后再初始化 否则 刚进入 图片页面后 tab 会无法滑动 因为此时 DOM 结构可能还没有加载完毕
  因此在 mounted() 钩子函数中去初始化
- 注意：webpack 打包时会启用严格模式 因此我们需要禁用严格模式
- 实现方式 使用插件 `npm install babel-plugin-transform-remove-strict-mode`
- 装入插件及插件配置完成后 tab 可以 实现滑动效果 但是 chrome 浏览器会有警告或者错误
- 解决警告问题 在 css 中设置 touch-action 它用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作（比如浏览器自带的划动、缩放等）
- 我们启用 pan-x 表示单指水平平移手势 它可以与 pan-y 、pan-up、pan-down 和／或 pinch-zoom 组合使用
- 导入 mui 后会出现一个 bug 点击底部导航 无法切换到对应的组件 原因 底部运用了 mui 此 bug 由其中的类名 mui-tab-item 导致
- 解决 bug ---> 在 App.vue 中将底部 tab 应用的 mui-tab-item 类的样式 以新的类名在 style 中复制一份重写 然后替换出现问题的类名 mui-tab-item 为 mui-tab-item-ms

### 18. 发送请求 获取所有的分类列表 渲染数据

- 定义方法 getAllcategories() 获取请求成功后返回的数据 调用 unshift 手动创建一个对象 {title: '全部', id: 0} 添加到数据中
- 页面刚初始化 就发送请求获取数据 即在 created 中调用 getAllcategories()
- 使用 v-for 将获取到的数据渲染到页面中
- 默认页面打开时列表项 "全部" 显示高亮
- 实现思路 绑定 class 属性 根据列表 id == 0 ？ 来判断是否是 "全部" 列表项
- :class="['其他的类', item.id == 0 ? '高亮的类' : '']"
- :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"

### 19. 制作 图片列表区域

- 图片列表使用 mint-ui 的 js 组件 Lazy load 懒加载
- 定义获取 图片的 方法 getPhotoListByCateId() 发送 get 请求 根据每个图片分类的 id 获取所有的图片
- 将请求成功后返回的图片数据 渲染到页面中
- 页面刚进入时 默认显示 图片分类为 "全部" 的图片 ---> 因此需要在 created() 中去调用 getPhotoListByCateId()
- 当点击 每个图片分类选项时 调用 getPhotoListByCateId() 方法 渲染对应的图片 ---> 需要给每个 图片分类 绑定 点击事件
- 注意：要实现懒加载 mint-ui 必须使用 全部导入 不能使用按需导入
- 最后徐要给 header 部分 设置一下 z-index 因为图片列表层级高 会遮盖 header

### 20. 点击图片 根据 id 跳转到对应的图片详情

- photoList.vue中，先将装图片的标签 li 改为路由链接` <router-link></router-link> `同时 为路由链接指定 tag 属性值为 li
- 在 photos 文件夹中创建组件 photosInfo.vue 组件
- 在 router.js 中导入该组件 并定义对应路由规则

### 21. 实现图片详情页的布局 和 样式美化 同时 获取数据渲染页面

- 创建组件photoinfo.vue，绘制基本结构
- 定义getPhotoInfo()方法发送 get 请求 获取图片详情数据 将数据渲染到页面
- 其中 页面中的评论子组件 可以使用已经定义好的

### 22. 详情页 缩略图 部分的实现

- 使用插件 vue-preview ---> 一个 Vue 集成 photoSwipe 图片预览插件
- 安装 `npm i vue-preview `并引入使用
- 导入插件模版
- 定义方法 getThumbImages() 发送 get 请求 获取图片数据
- 将成功后返回的数据 foreach() 循环遍历 为每一项 添加 图片的 宽 和 高 属性
- 然后将完整的图片数据 存入 data 中
- 在 created() 中调用 getThumbImages() 将图片数据渲染到页面中
- 注意 为缩略图设置样式 一定要去掉 scoped 否则无法生效

### 23. 绘制商品列表基本结构 并设置样式

- goods目录下新建goodslist.vue，使用 flex 布局实现经典两列布局

### 24.发送请求 获取后台数据 将数据渲染到页面

- 定义方法 getGoodslist() 发送 get 请求 根据对应的页码 获取后台数据
- 将请求成功返回的数据 和当前存放的数据 进行拼接 --->使用 concat() 方法
- v-for 循环遍历 将数据渲染到页面
- 在商品列表下端 添加 '加载更多' 按钮 ---> 使用 minu-ui 的 按钮` <mt-button type="danger" size="large">`
- 为  '加载更多' 按钮注册点击事件 绑定响应函数 以获取下一页的商品数据
- 响应函数实现的功能 页码加一 然后 调用 getGoodslist() 将数据渲染到页面

### 25. 使用 编程式导航 实现 页面的跳转

- $ruouter 的使用方式
  -1- 直接传递路径

   `this.$router.push("/home/goodsinfo/" + id)`

  -2- 传递一个对象作为参数
  `this.$router.push({ path: "/home/goodsinfo/" + id })`

  -3- 传递 命名的路由 和 params参数对象

   `this.$router.push({ name: "goodsinfo", params: { id } })`

  -4- 传递 path 和 jquery 参数对象
  `this.$router.push({ path: "/home/goodsinfo/", jquery: { id: id } })}`

  以上方式，一般使用第三种

- 注意 path 和 params 同时使用时 params 会失效

- 使用编程式导航实现在商品列表页面点击商品时加载商品详情

  ```javascript
  this.$router.push({name: 'goodsinfo', params: {id}})
  ```

### 26. 绘制商品详情页面基本结构 并 设置样式

- goods目录下新建 goodsinfo.vue，使用 mui 中的组件 card.html
- 商品详情中的 轮播图 可以 和首页公用一个结构 因此 可以将轮播图区域单独抽离封装为一个子组件
- 分别在 home 组件 和 商品详情组件goodsinfo.vue中 引入轮播图子组件
- 同过属性绑定 将父组件中的轮播图数据 传递到自组件中 在子组件中定义属性 props 属性接收
- 在轮播图子组件中定义 类 full 样式设置为 width: 100%, 类是否显示的标识为 isfull，分别在父组件中设置 isfull 的属性值为 false/true 来确定 是否应用该样式
- 商品数量的增加或减少按钮 使用 mui 中的组件 numberbox.html 数字选择框组件
- 将该按钮封装为一个单独的组件goodsinfo_numberbox.vue

### 27. 获取商品参数 和 价格 标题 等数据

- goodsinfo.vue中定义getGoodsInfo() 方法 发送 get 请求
- 在 created 中调用 方法
- 将数据渲染到页面

### 28. 获取商品评论

- 直接引入已有的评论子组件即可

### 29. 实现小球半场动画

- 使用钩子函数 beforeEnter(el) 、enter(el, done) 、afterEnter(el)
- 使用 v-show 为小球设置显示和隐藏的标识 flag ，flag 为 true 或者 false

### 30. 解决小球在不同分辨率和不同屏幕尺寸以及 页面滚动条滚动后 出现位移不准确的 bug

- 解决思路：得到小球要去往的徽章的 x y 坐标，小球本身的 x y 坐标
- 用徽章的 坐标 减去 小球的坐标 x y  所得的差值就是小球要位移的横纵方向的距离
- 使用 domObject.getBoundingClientReact() 可以获取到 dom 元素 距离页面顶部左上角 x y 的坐标
- 该方法返回一个矩形对象 包含 4 个属性 left top right bottom 分别表示元素各边距离页面上边和左边的距离
- 小球属于当前的组件页面 因此设置其 ref 属性 然后通过 this.\$refs 获取后 求出其 x y 坐标即可
- 购物车上的徽章属于 App.vue 组件 因此无法直接获取 但我们可以为徽章设置 id 属性 通过 DOM提供的API，getElementById('徽章的id') 在goodsinfo.vue子组件中获取到徽章元素 然后使用API，getBoundingClientReact() 求出它的 x y 坐标

### 31.在商品详情页实现 点击加入购物车 按钮 将其子组件数字框中的商品件数 同步到其父组件的购物车徽章上

- 分析：加入购物车按钮属于当前商品详情页面 数字选择框number-box属于其子组件 ----涉及到子组件向父组件传值
- 解决方案：通过事件触发的方式在子组件中使用this.$emit触发父组件的方法，父组件向子组件传递方法 然后子组件调用该方法 同时把数据作为参数 传递给父组件
- 在子组件中为数字选择框绑定 change 事件 用于实时监听数字的变化 每当数字发生改变就将该数字传递给父组件 因此在该事件的响应函数中调用 父组件的方法
- 以上思路的代码实现
  -1- 在父组件goodinfo.vue中定义方法 getSelectedCount(count) 同时在 data 中定义一个变量 selectedCount 保存子组件传递过来的值
  -2- 将该事件 绑定给子组件
  -3- 在子组件中通过 change 事件监听数字框的实时改变
  -4- 在该事件的响应函数中通过 \$emit 调用父组件的方法 完成值传递
- 为数字选择框设置可添加商品的的最大数量 ---> 父组件向子组件进行传值
- 实现思路 通过属性绑定的方式 完成父组件向子组件传值
- 由于商品的库存量是通过异步方式获取到的 因此 很可能在页面已经渲染完成之后 数据还未返回，这就会造成 传值失败
- 我们需要通过 watch 属性监听的方式来监听 父组件传递过来的值

### 32. 使用 vuex 实现组件之间的传值 将组件之间共享的数据存放到 vuex 实例对象 store 中

- 如何使用 vuex
  -1- `npm i vuex -S`

  -2- 引入 vuex 并注册 `import Vuex from 'vuex'`

  -3- Vue.use(Vuex);

  -4- 创建实例对象 

  ```javascript
  var store = new Vuex.Store({
    state: {},
    mutations: {},
    getters: {}
  });
  ```

- 如何调用 vuex 实例中的数据
  -1- 调用 state 中的数据 this.$store.state.***

  -2- 调用mutations中的方法 this.$store.commit('方法名',唯一的一个参数)

  -3- 调用 getters 中的方法 this.\$store.getters.\*\*\*

### 33.使用 vuex 将商品购买的数量同步到购物车的徽章中

- 获取到的商品数据保存到 本地存储 localStorage 中 以实现 每次打开应用 购物车中的的商品数量都是上一次操作的结果

### 34.将购物车中的商品的数量同步到商品结算的页面

- 先创建一个空对象
- 循环购物车中所有商品的数据 将当前循环的商品 id 作为对象的属性名 商品件数 count 作为对象的属性值 如此 当所有商品循环完毕 就可以得到一个对象 如 {88: 1, 89: 6,.....}

### 35.配置 package.json 实现手机端真机测试

注意：需要保证手机和电脑在同一个局域网内才可以

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // 配置：端口号3000 热启动: --hot 局域网ip: --host 192.168.253.1
    "dev": "webpack-dev-server --open --port 3000 --hot --host 192.168.253.1"
}
```


