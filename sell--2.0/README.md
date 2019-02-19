# vue 实战项目 sell 外卖点餐系统

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

- 安装 stylus 类似于 scss 和 less

  - `npm install stylus --save`

- 安装 stylus-loader

  - `npm install stylus-loader --save`

## 2. 项目目资源准备 和 录结构搭建

- 使用 icomoon 将本地 SVG 图片生成 icon 图标
- 将生成的字体文件中的字体文件 fonts 和 style.css 放入 assets 目录下的 styles 中 同时将 style.css 重命名为 icon.styl
- 将 icon.style 中的 {} 和 ; 去除 让文件更符合 stylus 的结构
- 在项目入口文件 main.js 中引入 icon.styl

## 3. mock 后台数据

- static 目录下新建 mock 文件 将 data.json 放入其中

- 在 .gitignore 文件中新增忽略文件 `static/mock`

- 我们希望项目上线时 获取数据的接口自动由本地模拟数据接口转换到到后端接口 此时可以借助 vue 的 proxy 代理功能 它可以实现将对后端 api 的 json 文件的请求转发到本地 mock 文件夹下

- 因此还需要在项目的 config 目录下的 index.js 中增加配置项

  ```javascript
  proxyTable: {
    '/api': {
    target: 'http://localhost:8080',
    pathRewrite: {
      '^/api': '/static/mock'
       }
     }
  }
  ```

## 4. 为 styles 文件路径设置别名

- 在 bulid --> webpack.base.conf.js 中的 resolve 配置如下
- 将 访问 styles 的路径 设置别名为 styles
- `'styles': resolve('src/assets/styles'),`

- 然后就可直接在 `<style>`中引入路径 如下
- `@import 'styles/variable.styl';`
- 修改配置文件后需要重新 npm run dev

- 设置好之后 可以同时将 main.js 中的路径也做修改
  - 注意： 在 `<style></style>` 中使用别名 需要在别名前面加上 ~
  - 在 js 文件中不需要加 ~ 直接使用别名即可
- 在 styles 文件夹中创建 base.styl 将所有的公共样式都写在里面
- main.js 中引入 base.styl

## 5. 首页结构的组件拆分

- 整个页面可以分为三个区块
  - 1 header 区块
  - 2 导航区块 tab
  - 3 商品展示区块 goods
- 项目根目录下新建 pages 文件夹
- 在 src 目录下的 pages 中新建各个组件的文件夹 在文件夹中创建相应的组件
- 在 Home 组件 中引入对应的子组件
- 修改 router 目录下的 index.js 中的路由匹配规则 当 path 为根路径时访问 home 组件

### 5.1 Tab 组件结构和样式的绘制

- reset.css 中 html 的 font-size: 50px 所以使用 rem 的时候是按照 0.2 的比例 即 0.2rem 就是 10px

- 或者可以尝试设置 html 字体为 625% 即 100px 这样的话 0.1rem 是 10px

- 由于这里设计稿是二倍图的尺寸 html 的 font-size 为 50px 因此样式设置时还是按照 0.1 的比例

- tab 部分为三等分布局 ---> 使用 flex 布局 样式如下

  ```stylus
  .home-tab {
    display: flex;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    .tab-item {
      flex: 1;
      text-align: center;
     }
  }
  ```

### 5.2 利用 axios 在 Home 组件中发送请求获取数据

- 利用 axios 请求数据
- npm install axios --save
- 在 Home 组件中引入 axios
- 在 Home 组件中定义方法发起 get 请求 请求后台数据
- 在 created 钩子中调用该方法
- 在 home 组件中只发起一次 get 请求 获取到所有的数据 然后再分别传递给需要数据的子组件
- 可以定义一个常量用于保存请求返回的状态 这样即使以后后台数据的状态码发生改变也也只需要改动这个常量即可
- 拿到数据以后 将数据传递给子组件 Header 即可 之后由 Header 组件将数据渲染到页面
- 在 Home 组件中使用属性绑定的方式将数据传递给 Header
- 在 Header 组件中利用 props 属性进行接收即可

### 5.3 Header 组件的结构和样式绘制

- 使用属性绑定和插值表达式的方式将父组件传递的数据渲染到 headr 区域

- 在 渲染 满减字段时 需要使用 v-if="seller.supports"来判断数据是否已经返回 然后渲染 supports 中的第一条数据 否则如果 supports 数据还未返回则是一个 undefined 渲染时会报错

- assets 的 styles 中创建 mixins.styl 定义背景图为 2x 还是 3x 图的函数 如下

  ```stylus
  bg-image($url)
    background-image: url($url + "@2x.png")
    @media (-webkit-min-device-pixel-ratio: 3),(device-pixel-ratio: 3)
    background-image: url($url + "@3x.png")
  ```

- 然后在 Header 组件中引入 @import '~styles/mixins.styl'

- 使用 bg-image('images/brand')

- 满减区块 由于图标并不是固定的 而是根据后台数据来显示的 因此通过定义不同的类来实现

- 在样式中定义不同的类 这些类对应显示不同的满减背景图标

- 在 data 中定义一个数组 classMap 用于存放这些不同的类

- create() 钩子中根据后台满减的的类型的顺序(依据 seller.json 中 type 的顺序) 依次将对应的类名放入数组 classMap 中 如下

  ```javascript
  created () {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"]
  }
  ```

- 然后为图标绑定 class 设置不同的类 

  ```html
  <div class="icon" :class="classMap">
  ```

- 要让文字和图片对齐 需要给图片设置 ` vertical-align: top`

- 整个 header 部分的结构和样式都完成之后 需要给整个 header 一个模糊效果的背景

- 思路
  - 创建一个 div 区块作为背景区块
  - 模糊效果的实现 可以使用一个 image 标签，img 的 width height 100% 然后设置 img 的父容器即整个背景区块的 filter: blur() 通过 filter 这个滤镜达到模糊的效果
  - 将整个背景放到 header 部分底部的方法：背景区块 posotion: absolute 然后 z-index: -1 然后宽高 100% 撑满整个容器

### 5.4 Header 组件的 弹窗浮层 功能实现

- 绘制浮层的结构和样式

- 当我们点击右边的 "5 个" 和整个 headre 区域的时候弹出浮层

- 浮层的结构采用 css sticky footer 布局
  - css sticky footer 布局是指 当页面内容长度不够长时 页脚粘贴在视窗的底部
    当内容足够长时 页脚内容会被向下推送

  - sticky footer 的一般布局如下

    ```html
    <div class="detail"><div class="detail-wrapper clearfix"`
      <!-- 放文字等内容的区域 -->
      <div class="detail-main">放内容</div></div>
      <!--关闭按钮 -->
      <div class="detail-close">放关闭按钮</div>
    </div>
    ```

- 然后进行一般的样式设置
  - 1. 设置 detail 的 position 为 fixed 且 z-index 需要大于 1 才能浮层显示

  - 2. overflow 要设置为 auto 这样当页面内容过长时 页面可以滚动显示内容

    ```stylus
    .detail {
      position: fixed
      top: 0
      left: 0
      z-index: 99
      overfolw: auto
    }
    ```

- 内容区的容器 detail-wrapper 需要设置最小高度为屏幕的高度 这样即使内容很短时 依然可以在屏幕下方的固定位置显示关闭按钮 同时需要清除浮动

  ```stylus
  .detail-wrapper {
    min-height: 100%
  }
  ```

- 内容区 detail-main 需要设置 padding-bottom 这样才能为下方的关闭按钮预留出位置显示 否则当内容过长时 关闭按钮会被内容遮挡

  ```stylus
  .detail-main {
    padding-bottom : 1.28rem
  }
  ```

- 下方的关闭按钮区域需要设置相对定位 position: relative 定位到浮层页面的底部 同时需要清除浮动 clear: both

#### 5.4.1 创建公用组件 Star

- 因为页面中很多地方都需要用到评分的星星 因此将星星的显示单独抽离出来做一个公用的组件

- pages 目录下新建 star 目录 在其中新建 Star.vue 组件

- star 目录下新建 images 将所有的星星图都拷贝进去

- 绘制结构 `<div><span></span></div>`

- 在 Header 中引入 Star 作为子组件注册到 components 并在浮层区域使用

- 在 Header 中以属性绑定的方式将评分 score 和 显示几倍图的星星的参数 type 传递给 Star

- Star 中通过 props 属性接收 score 和 size

- Star 的星星容器 div 中 通过` :class="starType" `的方式来控制显示不同的星星尺寸图

- 在 computed 中计算 starType 它依赖于传递的 size 值 根据 size 拼接出一个用于显示不同尺寸星星的类 类名形如 star-48 如下

  ```stylus
  computed: {
    classType- () {
    return 'star-' + this.size
    }
  }
  ```

- 然后在 style 中定义每个尺寸图的类所对应的星星的样式

- 使用 v-for 在 span 中渲染对应的评分的星星样式 比如显示几倍图的几颗全星几颗半星这样 如下

- `<span v-for="item of itemClasses" class="star-item">`

- 定义几个常量 分别用于存放显示的星星的总个数 和 控制不同星星显示的类

- 将星星总个数 length 和星星的类 保存在外部的常量中 这样即使以后星星的样式或者长度发生变化 也只需要改变常量的值即可 不用做大幅度的修改

- 如下

  ```javascript
  const LENGTH = 5;
  const CLS_ON = "on";
  const CLS_HALF = "half";
  const CLS_OFF = "off";
  ```

- 在 style 中定义这些类(.on .half .off)的样式

- itemClasses 依赖于 score 因此我们也需在计算属性中计算 itemClasses 如下

  ```stylus
  computed: {
    itemClasses () {
      // 用于保存所有的类
      let result = []
      // 对评分进行 0.5 倍的向下取整 10分为满分 每两分为一个全星
      let score = Math.floor(this.score / 2) / 2
      // 判断是否有半星 比如评分是 3.5
      let hasDecmail = score % 1 !== 0
      // 全星的个数
      let integer = Math.floor(score)
      // 将全星的类样式放入 result 中
      this.result.push(CLS_ON)
      // 判断是否有半星 有就将半星的类样式放入 result 中
      if (hasDecmail) {
        this.result.push(CLS_HALF)
      }
      // 判断当前已经显示的星星的个数不足总个数 就将灰色星星的类样式放入 result 中
      if (result.length < LENGTH) {
        this.result.push(CLS_OFF)
      }
    }
    // 最后将 result 返回 这样才能访问到计算属性 itemClasses
    return result
  }
  ```

- 然后就可以根据父组件传递的 score 和 size 显示出对应的星星评分了

#### 5.4.2 继续浮层区结构编写

- 优惠信息区块 结构使用一个固定的布局以实现在不同浏览器中兼容

  ```html
  <div class="title">
    <div class="line"></div>
    <div class="text">优惠信息</div>
    <div class="line"></div>
  </div>
  ```

- 使用 flex 布局样式如下

  ```stylus
  .title {
    display: flex
    <!-- 由于直线距离屏幕两边有间隔 因此我们不写死 采用百分比以达到在不同屏幕自适应-->
    width: 80%
    <!-- 左右margin 设置为 auto让整个区域居中 -->
    margin: 0.56rem auto 0.48rem auto;
    .line {
      display: flex
      position: ralative
      top: -0.12rem
     }
    .text {
      padding: 0 0.24rem;
    }
  }
  ```

- 满减信息列表区块的结构和样式绘制

- 小图片的显示依然采用 class 绑定的方式 渲染列表时每一列的图片根据对应的类来确定
  - `<span :class="classMap[seller.supports[index].type]">`

  - data 中定义 `classMap: []`

  - 在 created 钩子中设置数组的值为每一个列表项渲染时图片的类名样式

    ```javascript
    created() {
      this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"]
    }
    ```

  - 在 style 中定义这几个类所应用的图片

  - 对应文字的显示如下

  - `<span>{{seller.supports[index].description}}</span>`

  - 商家公告区域 和 下方对应文字的结构和样式绘制

  - 为关闭按钮 x 绑定 click 事件 点击时 `this.detailShow = false`

  - 但是这样实现关闭的效果太生硬了 我们不妨为整个浮层区的显示和隐藏添加一个渐入渐出的动画效果
    - 实现
      - 使用 transition 标签将整个浮层区包裹 同时设置 name 属性用于表示动画的名称
      - `<transition name="fade">浮层区的结构</transition>`
      - 在 style 中设置控制动画的类 fade-enter fade-leave-to fade-enter-active fade-leave-active

- 至此 header 组件开发完成

### 5.4 goods 商品组件 ---重点部分

#### 5.4.1 goods 商品组件实现在屏幕中滚动的效果

- pages 中新建 goods 文件夹 在其中新建 Goods.vue

- 在 home 组件中引入该组件

- goods 组件展示的页面是一个两栏布局 左侧固定 右侧自适应 因此我们使用 flex 布局

- 因为这个组件是需要固定展示在页面的 header 区域的下面的 因此给一个绝对定位布局

- 在 home 组件中利用属性绑定的方式 传递请求获取到的 goods 组件所需的数据

- goods 组件中利用 props 进行接收

- 左侧布局
  - 让一个元素中的内容无论是一行还是多行都能垂直居中的技巧

    ```stylus
    父元素 display: table;
    
    子元素 display: table-cell; 
    vertical-align: middle;
    ```

- 右侧布局 ---》 商品列表

- 使用 better-scroll

- 安装项目依赖 `npm install better-scroll --save`

- 在 goods 组件中引入 better-scroll
  - `import BScroll from 'better-scroll'`

  - better-scroll 实例化的时候需要接受一个 DOM

  - 利用 ref 获取 DOM 元素` <div ref="foodWrapper">`

  - 在 mounted 中初始化

    ```javascript
    mounted() {
      this.scroll = new BScroll(this.$refs.foodWrapper)
    }
    ```

- 使用 better-scroll 时要求的基本结构是 滚动内容区外层需要一个 wrapper 一般结构如下

  ```html
  <div class="wrapper"> 
      <div class="content">内容区</div>
  </div>
  ```

#### 5.4.2 实现左侧商品分类和右侧的食物联动的效果

- 实现以下两个功能
- 1. 当滚动右侧食物列表时 左侧对应的商品分类高亮n
  - 思路：根据右侧每个食品项 li 的高度区间 求出每个区间的 index 根据这个 index 找到左侧商品分类对应的 li 让其应用高亮的类样式 实现如下
    - 1. 在方法 calculateHeight 中 利用 ref 获取右侧食品分类 ul 根据 `ul.getElementsByClassName("")`得到 li 集合 遍历 li 利用` clientHeight `计算出每个食品项 li 距离 ul 顶部的高度 将得到的每一个高度保存到一个数组变量 listHeight（在 data 中定义的一个数组）中 在 mounted 钩子中调用该函数
    - 2. 在 mounted 钩子中使用 better-scroll 提供的 API 监听滚动事件发生时时 ul 向上的滚动距离 保存到变量 scrollY (在 data 中定义) 如下

         ```javascript
         this.foodsScroll.on('on', pos => { 
             this.scrollY = Math.abs(Math.round(pos.y))
         }
         ```
    - 3. 在计算属性 currentIndex 中获取右侧每个 li 的索引 遍历 listHeight 计算出右侧每个 li 的高度区间 判断滚动时的 scrollY 是否在这个 li 高度区间内 是就返回当前遍历时的 i 否则就返回 0 ，0 表示右侧 ul 没有滚动
    - 4. 利用 :class 来决定右侧的商品分类项 li 是否应用高亮样式 当右侧计算属性中的索引和左侧的 li 的循环渲染时的索引相等时 就应用高亮类 如下

         ```html
         <li v-for="(item, index) of goods" :class="'current': currentIndex === index">
         ```
    - 5. current 类的样式在`<style>`中定义
- 2. 当点击左侧商品分类时 右侧自动滚动到对应的食品位置
  - 思路：点击左侧商品分类时 获取当前点击的 li 的索引 利用 better-scroll 提供的 api 让右侧食品列表滚动到对应的食品项
    - 为左侧商品分类项 li 绑定点击事件
    - 1. 在事件响应函数 selectMenu(index) 中 获取右侧食品列表 li 的集合
    - 2. 遍历 ul 拿到当前的 li 使用 better-scroll 的 api 让右侧食品列表滚动到对应的食品项 滚动的时间为 100ms 如下

         ```javascript
         this.foodsScroll.scrollToElement(当前的li, 100);
         ```

#### 5.4.3 shopCart 购物车组件的实现

- pages 目录下新建 shopCart 文件夹 在其中新建 shopCart.vue

- 在 Goods 组件中引入 shopCart 组件 注册并使用

- shopCart 组件的结构和样式绘制

- 从 home 组件中利用属性绑定的方式向 Goods 组件传递获取的后台数据 seller

- Goods 组件利用 props 属性接受 seller

- Goods 组件利用属性绑定的方式 将 seller 中的一些数据传递给 shopCart 组件 如下

  ```javascript
  :deliveryPrice="seller.deliveryPrice"
  :minPrice="seller.minPrice"
  ```

- shopCart 组件利用 props 属性进行数据的接收

- 因为购物车中商品的总价 数量等这些数据是实时变化的 需要做数据的双向联动

- 要做数据的联动 首先需要获取购物车控件中的数量 因此先创建购物车控件

#### 5.4.4 购物车控件组件 cartControl

- pages 目录下新建 cartControl 文件夹 在其中新建 cartControl.vue

- 在 Goods 组件中引入 cartControl 组件 注册并使用

- 在 Goods 组件中使用属性绑定传递 食品项 food

- 在 cartControl 中使用 props 进行 food 数据的接收

- '减控件' 的每个商品的数量的显示依赖于是否有商品加入购物车 在 food 中定义一个 count 属性字段表示加入购物车的商品的数量 因此使用 v-show="food.count"

- 点击 '加控件' 时, 单件商品数量加 1
  - 为 '加控件'绑定 click 事件 点击时先判断当前商品数量是否为 0 如果是 0 则点击时 count 为 1

  - 在 vue 中 如果某个观测对象的某个字段不存在 那么直接给这个字段赋值是无法生效的 因为 defineProperty 检测不到新增属性的变化

  - 因此需要引入 vue 的 API 利用 vue 的 set() API 去添加一个属性 这样这个属性的变化就可以被观测到 这样 DOM 就会自动发生变化

  - 因此对于我们自定义的 count 字段 就需要使用 this.\$set() 来为其赋值

  - 定义 click 事件的响应函数 如下

    ```javascript
    add () {
      // 如果当前还没有商品加入 点击时商品数量就变为 1
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    }
    ```

- 点击 '减控件' 时, 单件商品数量减 1

- 为 '减控件' 绑定 click 事件 响应函数 如下

  ```javascript
  decreaseCart () {
    this.food.count--
  }
  ```

#### 5.4.5 购物车控件组件 cartControl 动画

- 实现效果
- '减控件' 出现时从右向左旋转平移 同时有一个渐隐渐现效果
  - 用外层容器实现平移 内层的 icon 图标实现旋转

  - 使用 transition 将整个 '减控件' 包裹

  - 使用 vue 提供的动画类实现动画

    ```stylus
    .inner {
      transfrom: rotate(0)
      transition: all 0.4s linear
     }
     
     &.v-enter, &.v-leave-active {
       opacity: 0
       transition: trasform3d(.48rem, 0, 0)
      .inner {
        transition: rotate(180deg)
      }
     }
    &.v-enter-active, &.v-leave-active {
      transition: all .4s linear
      }
      
    :selectFoods="selectFoods"
    ```

#### 5.4.6 购物车 shopCart 组件 和 goods 组件 数据联动

- 因为在 cartControl 子组件中 我们向父组件传递的 food 中 添加了 count 字段 因此父组件 Goods 中 food 也会有这个属性 因为 food 是一个对象 对象的传值传递的是引用 当一个变量对 food 做出修改 其他引用了 food 的变量中的 food 也会发生改变

- 在父组件中通过计算属性 selectFoods 实时监控加到购物车的商品

  ```javascript
  computed: {
    selectedFoods{
    let foods = []
    this.goods.forEach(item => {
      item.foods.forEach(innerItem => {
        if(innerItem.count) {
          foods.push(innerItem)
         }
       })
     })
    return foods
    }
  }
  ```

- 在 goods 组件中利用属性绑定将所有加入到购物车的商品传递给 shopCart 购物车子组件 也就是将计算属性 selectedFoods 传递给 shopCart 购物车子组件

- shopCart 购物车子组件 使用 props 属性进行接收 在 shopCart 组件中利用计算属性 依赖 selectedFoods 计算出商品的总件数和总价

- 遍历 selectedFoods 得到商品件数总和 和总价

- 这样购物车和购物车控件就完成了数据联动 当我们点击控件向购物车中加或者减商品时 购物车都能实时的计算出总价和商品总件数

#### 5.4.7 点击控件加入购物车时实现小球半场动画

- 在 shopCart 组件中添加小球的结构和样式
- 我们用外层控制小球横向移动 内层控制小球纵向的移动
- shopCart 使用钩子函数 before-enter enter after-enter 实现半场动画
- 在 cartControl 组件中 当点击 '加控件时' 在 click 响应函数中通过 this.\$emit 向外触发事件 触发父组件 Goods 的 onAdd 方法 这样将当前点击的'加控件' DOM 元素 event.target 以参数的形式传递到父组件 Goods 中
- 在 Goods 组件的 onadd 方法中 调用 shopCart 的 drop 方法 将 当前点击的'加控件' DOM 元素以参数的形式传递到 shopCart 组件中 这样在 shopCart 组件中我们就可以拿到 '加控件' DOM 元素，从而能够计算出控件在视口的位置

#### 5.4.8 购物车弹层详情页 shopCartList 组件

- 新建 shopCartList.vue 组件 绘制结构和样式
- 在 shopCart 组件中引入 注册到 components 并使用
- 利用属性绑定 在 shopCart 组件中将 selectFoods 数据传递到 shopCartList
- 实现当我们点击购物车时 出现购物车详细商品的弹层 弹层的商品列表区有最大高度 MAX_HEGHT 且 overflow:hidden 当商品过多时 弹层的商品列表区可以滚动 当弹层没有达到最大高度时 其高度由内容撑开
  - 利用动画实现点击购物车时 出现购物车详细商品的弹层 用外层控制 opacity 内层控制位移 translate 让弹层从下方弹出

    ```html
    <transition name="move">
      <div class="shop-cart-list-wrapper">
        <shop-cart-list />
      </div>
    </transition>
    ```

    - 使用 vue 提供的动画类实现动画 因为商品列表的高度是实时变化的 无法固定高度 因此在使用 translate3d() 进行动画偏移时，给纵轴偏移量设置为 -100% 保证向上偏移的距离永远都是基于自身高度 `transform: transition3d(0, -100%, 0)`

  - 利用 better-scroll 实现当商品过多时 弹层的商品列表可以滚动
    - 在 shopCart 中引入 better-scroll
    - 在通过 ref 属性获取到包裹 shopCartList 组件的 dom 元素 通过 getElementsByClassName("list-content")[0]得到加入购物车的商品列表
    - 在 listShow 计算属性中初始化 better-scroll
- 实现清空功能

  - 点击清空按钮时 在响应函数中遍历 selectFoods 将其中的每一项的 count 置为 0
- 实现当购物车商品列表弹层出现时 同时出现蒙层
  - 在 shopCart 中书写蒙层的结构和样式 采用 fixed 定位 利用 v-show="listShow" 实现和购物车商品列表页的同步弹出 弹出时也使用 transition 动画淡入淡出
  - 当我们点击蒙层时 蒙层和购物车商品列表一起隐藏
    - 为蒙层绑定点击事件 在该 click 事件中设置 this.fold = true 即可 因为 listShow 计算属性依赖于 fold 当 fold 发生变化 listShow 的值就会立即重新计算
- 实现结算功能
  - 为结算区域绑定 click 事件
  - 在响应函数中判断当前商品的总价格 totalPrice 是否小于 minPrice 是则表示未达到配送的金额 此时 return 不做任何改变 ,否则就弹框显示应付金额

### 5.5 food 组件的开发 商品详情组件 包含图片 商品基本信息介绍 商品评价

- pages 中新建 food 组件

- 绘制结构和样式
  - 当页面第一次加载时 图片资源可能还未加载 等图片加载完成后显示时页面会有抖动效果
  - 页面防抖黑魔法 为 img 设置父容器 div 设置父容器宽 100% height: 0
  - 重点是设置 padding-top 或者 padding-bottom 为 100%
  - 在 w3c 标准中 padding-top 或者 padding-bottom 
  - 百分比是以元素的 width 为基准点的

- 在 Goods 组件中引入 注册 并使用

- 在 good 组件中点击右侧食物列表项 li 显示 food 组件
  - 实现如下
  - goods 组件中为 li 绑定 click 事件 click 响应函数 selectFood 中传递两个参数 分别是循环渲染时的 food 事件参数对象 event 即`<li v-for="food of foods" @click=selectFood(food, $event)>`
  - 在 food 组件中定义 show()方法 和 food 组件是否显示的标识 v-show="showFlag" showFlag 默认为 false 在 show 方法中置为 true
  - goods 组件中通过 ref 属性获取到 food 组件这个 DOM 元素 用于在父组件 goods 的 click 响应函数 selectFood 中调用子组件 food 的 show 方法 this.\$refs.DOM 元素.show() 从而实现点击商品显示商品详情
  - 同时在 click 响应函数中 获取到当前的商品 赋值到 data 中的变量 selectedFood 用于传递到 food 组件件中
  - 通过属性绑定 将 selectedFood 传递到 Food 组件中 `<food :food="selectedFood />`
  - 将利用 props 接收 food 数据 然后渲染到 food 组件中

- food 组件显示时希望可以从右侧缓动进入 实现动画效果
  - 在 food 组件中使用 transition
  - 利用 vue 提供的动画类实现动画 偏移量为 transla3d(0, 100%, 0)

- food 组件的页面可能会很长 此时我们也需要滚动 因此在 food 组装件中引入 better-scroll

- `import BScroll from "better-scroll"`

- 在 show()方法中初始化 better-scroll 这样可以保证是详情页被展示之后才可以滚动详情页

- 滚动的元素时整个 food 容器 因使用 ref 获取到 整个 food 容器 用于初始化 如下

  ```javascript
  show() {
    this.showFlag = true
    if (!this.scroll) {
    this.scroll = new BScroll(this.$refs.foodWrapper, {
      click: true
      })
    } else {
      this.scroll.refresh()
    }
  }
  ```

### 5.5.1 实现 food 组件中的 "加入购物车" 按钮

- 在 food 组件中引入 购物车控件 cartControl 组件

- 利用属性绑定 将 food 传递给 cartControl 组件

- "加入购物车" 按钮 按钮是否显示依赖于购物车中是否有商品 v-show="!food.count"

- 实现点击 "加入购物车" 按钮 cartControl 组件显示出来 "加入购物车" 按钮隐藏 同时有小球动画

- 为 "加入购物车" 按钮绑定 click 事件

- 事件响应函数 addFirst 中传递一个参数 event 事件参数对象

- 防止多次点击事件发生 先判断 event.\_constructed 是否为 true
  ```javascript
  addFirst(event) {
    if (!event._constructed) {
      Vue.set(this.food, 'count', 1)
      this.$emit('EVENT_ADD', event.target) //实现小球动画
    }
  }
  ```

- 因为点击按钮后 购物车中就有了商品 那么"加入购物车" 按钮的 v-show 条件就会变为 false 按钮就会自动隐藏

- 实现小球动画：在 goods 父组件中利用事件绑定将 onAdd 方法传递给 food 组件 @add="onAdd"

  - 在 food 组件中 将 onADD 方法保存在常量 EVENT_ADD 中 const EVENT_ADD = "add" 这样方便在 addFirst 中调用 触发父组件的 onAdd 方法时 将 food 组件中当前点击的目标对象 event.target 传递出去 用于小球做动画时计算目标对象的位置

- 在 food 组件的小球动画中有一个 bug 当第一次点击 "加入购物车" 按钮之后 小球就无法显示了 这是因为当购物车控件显示之后 "购物车"按钮就被隐藏了 disply: none 此时就无法获取该目标元素的位置 解决方案如下
  - 将 "加入购物车" 按钮的隐藏也做成一个缓动动画 这样它就不是立即隐藏 在缓动动画的时间间隙中就可以计算出它的位置
  - 因此为"加入购物车" 按钮 加上 transition 然后使用 vue 提供的动画类实现动画

- bug 当我们在首页点击 "加/减控件" 加入商品到购物车时 由于会事件冒泡 因此会同时触发 good 组件的 click 事件导致会同时跳转到商品详情页 因此我们在 cartControl 组件中阻止 "加/减控件" 的 click 事件冒泡 使用事件修饰符 .stop.prevent 同理 "加入购物车" 按钮 的 click 事件也要阻止冒泡

### 5.5.2 创建公共组件 split 分割线组件

- pages 目录下新建 split 组件
- 在 food 组件中引入并使用

### 5.5.3 创建公共组件 ratingSelect 商品评价组件

- pages 目录下新建 ratingSelect 组件

- 如果 span 和 字体图标 无法在垂直方向上对齐 可以将他们都设置为行内块 顶部对齐

  ```stylus
  display: inline-block
  vertical-align: top
  ```

- 在 food 组件中引入 ratingSelect 组件 注册并使用

- ratingSelect 组件需要的数据由 food 组件传递 依赖的数据如下

- :selectType="selectType" 评价的类型 包括：全部 推荐 吐槽
  :onlyContent="onlyContent" 是否只显示有内容的评价的标识
  :desc="desc" 具体的评价内容
  :ratings="food.ratings" 后台返回的数据 ratings

- 在 food 组件的 show() 方法中需要初始化 selectType 和 onlyContent 以保证每次打开商品详情时 看到的都是初始化的值 设置如下
  - this.selectType = ALL 默认显示全部评价内容
  - this.onlyContent = true 默认打开页面显示 "只显示有内容的评价"

- 使用 :class 根据不同的 selectType 值 吐槽类型框显示不同的样式

### 5.5.4 为 ratingSelect 商品评价组件添加点击事件

- 因为需要对父组件传递过来的数据做修改 而 vue 中不建议我们直接修改父组件的数据 因此我们在 data 中定义自己的变量 变量的值依然是父组件传递的数据的值

- 为评价类型按钮(全部 推荐 吐槽) 注册点击事件 根据传入的 selectType 的取值(type) 使点击时按钮的样式高亮

- 同时通过 `$emit` 触发父组件 food 的事件，将 selectType 的取值传递到父组件中 响应函数如下
  ```javascript
  select(type) {
    this. self_selectType = type
    this.$emit("selectTypeChange", type)
  }
  ```

- 调用 click 事件的响应函数 调用时 type 的取值有三种 2、0、1 分别对应不同的评价类型(全部 推荐 吐槽)

  - @click="select(2/0/1)"

- 同样的方法为 "只显示有内容的评价"按钮 注册 click 事件 让按钮在是否勾选状态之间来回切换

- 同时通过\$emit 触发父组件 food 的事件将 onlyContent 的取值传递到父组件中 响应函数如下

  ```javascript
  toggleContent (event, flag) {
    this. self_onlyContent = !this. self_onlyContent
    this.$emit("onlyContentChange", this. self_onlyContent)
  }
  ```

- 在按钮的 click 事件中中调用响应函数

  - @click="toggleContent()"

### 5.5.5 ratingSelect 组件中 商品评价的总数量

- 评价总数(全部按钮在页面的显示值)为 ratings.length

- 吐槽按钮和推荐按钮在页面显示的值 依赖于 ratings 因此我们在计算属性中监测

  ```javascript
  computed: {
    positives() {
    this.ratings.filter(rating => {
      return rating.rateType === POSITIVE
    })
  },
  negatives() {
    this.ratings.filter(rating => {
      return rating.rateType === NEGATIVE
     })
    },
  }
  ```

### 5.5.6 ratingSelect 组件中 商品评价类型（全部 推荐 吐槽）和下方 评价内容实时关联

- 绘制评价列表的结构和样式

- 实现 当点击评价的类型时 下方评论列表就展示对应类型的评价内容 当勾选 "只看有内容的评价"按钮后 下方只显示有内容的评价

- 比如 当点击评价的类型为推荐 同时勾选 "只看有内容的评价" 下方评论列表就展示推荐类型的的评价内容 实现如下
  - 1. 商品评价内容列表的显示也同时依赖于 "只显示有内容的评价" 按钮是否勾选 即依赖于 onlyContent 的取值 使用 v-show="onlyContent" 进行关联 实现勾选时 下方显示评论内容 不勾选时不显示 因此为 勾选按钮注册 click 事件，在响应函数中对 onlyContent 的取值进行改变 实现切换按钮 但由于 onlyContent 是从父组件 food 中传递过来的 父子组件之间的 onlyContent 值必须保持一致才能实现数据同步从而实现点击不同的按钮显示对应的内容 所以同时在 click 响应函数中通过事件触发的方式调用父组件的方法将 onlyContent 的取值传递到父组件中 同时在父组件中定义方法接收数据且通过事件绑定将这个方法传递给子组件用于子组件调用

  - 子组件中的勾选按钮的 click 响应函数如下

    ```javascript
    toggleContent() {
      this.self_onlyContent = !this.self_onlyContent;
      this.$emit("onlyContentChange", this.self_onlyContent);
    }
    ```

- 父组件中接收子组件数据的方法如下 同时在数据发生改变时异步更新 better-scroll
  ```javascript
  onlyContentChange(flag) {
    this.onlyContent = flag;
    this.$nextTick(() => {
      this.scroll.refresh();
    });
  }
  ```

- 同理 当我们点击不同评价类型的按钮时 在 click 事件响应函数中也需要修改父组件传递过来的 selectType 的取值 我们也需要让父子组件的值同步 因此也需要通过事件触发的方式 this.\$emit()调用父组件的方法 将 selectType 的值传递回父组件 子组件中响应函数如下

- 子组件中不同评价类型的按钮的 click 响应函数如下

  ```javascript
  select(type) {
  this.self_selectType = type;
  this.$emit("selectTypeChange", type);
  }
  ```

- 父组件中接收子组件数据的方法如下 同时在数据发生改变时异步更新 better-scroll
  ```javascript
  selectTypeChange(type) {
    this.selectType = type;
    this.$nextTick(() => {
      this.scroll.refresh();
    });
  }
  ```

- 2. 过滤列表 用 rating.rateType 来控制显示的评价内容的类型 rating.text 控制是否只看有评价的内容

- `li v-show="needShow(rating.rateType, rating.text)"`

- 父组件中 needShow()的逻辑如下
  1. 判断 勾选了 "只显示有内容的评价" 但是并没有评价内容 此时就什么都不显示
  2. 判断 点击 "全部" 按钮 查看所有的评价的评价 默认就是显示所有
  3. 判断 点击其他的两个按钮时（推荐 吐槽） 需要判断点击的评价类型是否和当前需要显示的评价类型一致 一致时才能 return true 对应评价内容才被显示

  ```javascript
  needShow(type, text) {
    if (this.onlyContent && !text) {
    return false
    }
    if (this.selectType === ALL ) {
      return true
    } else {
      return (type === this.selectType)
    }
  }
  ```

- 每次点击不同的评价类型按钮查看不同的类型的评价时 页面都会跳到上一次滚动的位置
  - 解决这个bug 需要在 selectTypeChange 和 onlyContentChange 事件中异步($nextTick)更新 better-scroll 如下

    ```javascript
    onlyContentChange(flag) {
      this.onlyContent = flag;
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    }
    ```

### 5.5.6 food 组件中 格式化评论时间的时间戳----使用 moment 提供的 API 格式化时间

- 安装项目依赖 moment

- `npm i moment -S`

- 在 food 组件中引入 moment

- `import moment from 'moment'`

- methods 中定义方法使用 moment 提供的格式化时间的 API

  ```javascript
  methods: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  }
  ```

- 在需要格式化时间的地方使用即可 如下

  - `<div class="time">{{ formatDate(rating.rateTime) }}</div>`

## 6 ratings 评论页组件的开发

- pages 目录下新建 ratings 文件夹 在其中新建 Ratings.vue
- home 组件中引入 Ratings 注册并使用
- 同时传递 ratings 组件需要的数据 seller
- 在 ratings 组件中引入 Start 作为子组件 传递 Start 组件所需要的数据
  - `<star :size="36" :score="seller.serviceScore" />`
- 适配移动端 Iphone5 以下的手机屏幕 利用媒体查询
- @media only screen and (max-width: 320px) { 书写适配方案 }

#### 6.1 ratings 组件中的评论列表

- ratings 中引入 ratingSelect 和 split 为子组件 注册并使用

- 在 honme 组件中将后台返回的数据传递给 ratings 组件

- 然后 ratings 组件将 ratingSelect 组件需要的数据以属性绑定的方式传递过去

- 引入 better-scroll 实现页面滚动

- 引用 ratings 组件的最外层容器 `ref="ratingsWrapper" `用于初始化 better-scroll

- 在 mounted()钩子中初始化 better-scroll

- 同时还需要在 watch 中监测后台返回的 ratings 数据 当数据返回后 初始化 better-scroll 因为只有当后台返回了数据时 容器高度才会被数据内容撑开 否则没有高度就无法实现滚动

- 将初始化的方法定义在 methods 中 分别在 mounted 和 watch 中调用 实现如下
  ```javascript 
   mounted() {
     this._inintScroll()
   }
  
   watch: {
     ratings() {
      this._initScroll()
     }
   }
  
   methods() {
     _initScroll() {
     if (!this.scroll) {
       this.scroll = new BScroll(this.$refs.ratingsWrapper, {click: true})
     } else {
       this.scroll.refresh()
      }
    }
  }
  ```

#### 6.2 实现 ratings 组件中的评论列表的评价类型（全部 推荐 吐槽）和下方 评价内容实时关联

- 实现 当点击评价的类型时 下方评论列表就展示对应类型的评价内容 当勾选 "只看有内容的评价"按钮后 下方只显示有内容的评价
- 比如 当点击评价的类型为推荐 同时勾选 "只看有内容的评价" 下方评论列表就展示推荐类型的的评价内容
- 这部分逻辑实现和 5.5.6 部分的实现一模一样 参考上面的 5.5.6 即可实现

### 7 seller 组件的开发

- 引入 Star Split 组件
- 满减活动区块 可以复用 Header 组件中相同的区块 只是样式需要调整
- 引入 better-scroll 同理 需要在 mounted 和 watch 中监测后台数据 seller 返回时初始化 better-scroll

#### 7.1 seller 组件中的 商家实景 部分的开发

- 绘制结构和样式
- 使用 better-scroll 当图片过度时实现横线滚动的效果
- 要实现图片滚动 必须让图片 ul 容器的宽度大于包裹 ul 的容器的宽度
  - 实现如下

  - mounted 和 watch 中监测 seller 时 设置 ul 的 width 同时初始化 better-scroll 实现横向滚动

  - ulWidth = (图片 widhth + 图片右边距) \* 图片数量 - 最后一张图片的右边距，因为最后一张图没有右边距

  - 通过 ref 获取到 ul 和 ul 的父容器

  - 通过\$refs 设置 ul 的宽度

  - 通过\$refs 获取 ul 的父容器 用于初始化 better-scroll

  - 实现的方法如下

    ```javascript
    _inintPic() {
      if (this.seller.pics) {
      // 要实现滚动 必须让图片 ul 容器的宽度大于包裹 ul 的容器
        let picWidth = 120;
        let picMargin = 6;
          
      // ul 的 width = （图片右 margin + 图片宽度） _ 图片数量 - 最后一张图的 margin ，因为 最后一张图没有右 marin
       let ulWidth = (picWidth + picMargin) _ this.seller.pics.length - picMargin;
       this.$refs.picUl.style.width = `${ulWidth}px`;
      // 初始化 better-scroll 实现横向滚动
      if (!this.picScroll) {
        this.$nextTick(() => {
           this.picScroll = new BScroll(this.$refs.picWrapper, {
           scrollX: true,
           eventPassthrough: "vertical",
           click: true
        });
       });
      } else {
        this.picScroll.refresh();
      }
    }
    ```
- 然后分别在 mounted 和 watch 的 seller 中调用 ` _inintPic()`

#### 7.2 seller 组件中的 商家信息 部分的开发

#### 7.3 seller 组件中的 收藏 部分的开发

- 收藏的桃心使用图标字体 它的样式对应两种状态 收藏和未收藏 因此使用 `:class={'active': favorite}`

- 在 data 中定义 favirite 默认为 false

- 收藏图标下方的文字(已收藏/未收藏) 和 favorite 变量的值相关 因此在计算属性中观测 使用 favoriteText 代表下方文字 如下

  ```javascript
  computed: {
    favoriteText() {
      return this.favorite ? "已收藏" : "收藏"
    }
  }
  ```

- 为整个收藏容器注册 click 事件 点击时收藏的图标样式和文字进行切换 文字依赖于 favorite 因此只需设置 favorite 即可 点击时 `this.favorite = ! favorite`

#### 7.4 seller 组件中的 收藏 缓存

- 当我们收藏之后 希望刷新页面或者下一次进入时依然显示收藏 因此需要使用 localStorage 实现如下
- 1. 获取 url 中的参数 id 值 因为每个 id 代表一个商家
  - 在 common 目录下新建 util.js 在其中定义方法 urlParse 获取 url 地址中的查询字符串
    - 在 home 中引入 urlParse 在 data 中使用 IIFE 将获取到的 id 返回保存到 seller 中 如下

      ```javascript
      data() {
        return {
          seller: {
          // 拿到地址中的参数 id
            id: (() => {
              let queryParam = urlParse();
              return queryParam.id;
       })()
      ```
- 2.将返回的 id 值添加到 seller 中

  - 同时当我们发送 get 请求获取到 seller 时 向返回的 seller 数据中添加 urlParse 方法返回的 id 如下
  - 利用 ES6 的语法 Object.assign()
  - this.seller = Object.assign({}, this.seller, seller);
- 3. 根据 id 向 localStorage 中存贮 seller 中的数据
  - 然后 common 目录下新建 store.js 在其中定义方法
  - saveToLocal(id, key, value) 实现向 localStorage 中存贮数据
  - loadFromToLocal(id, key, \_default) 实现读取 localStorage 中的数据
  - seller 组件中 引入 saveToLocal 方法
  - 在点击收藏的响应函数中调用 saveToLocal 并传递参数 将当前的 favorite 的值存贮到"favorite"字段
    - saveToLocal(this.seller.id, "favorite", this.favorite)
- 4. 然后我们从缓存中根据 id 获取商家数据 seller
  - 在 data 的 favorite 的取值中 使用 IIFE 调用 loadFromToLocal 方法 将函数的返回值赋值给 favorite 这样下次打开页面或者刷新页面就可以保证还是上次的收藏状态 如下

    ```javascript
    data() {
      return {
        favorite: (() => {
          return loadFromToLocal(this.sellre.id, "favorite", false);
      })()
    }
    ```

### 8 组件优化

- 使用 `<keep-alive>` 将 `<router-view/>` 包裹 用于实现在组件间来回切换时保留上一次的组件状态

### 9 项目打包

- npm run build
- 打包完成会生成一个 dist 目录
