关键词 `vue` `typescript` `webpack`

本文是为下一篇《3分钟搞定 Vue + TypeScript开发》文章做的知识铺垫，后续会提供完整的github示例代码库。

### 准备

已经掌握vue开发的情况下，想体验一下TypeScript开发，可以通过以下过程配置一个脚手架。


#### 1.阅读webpack官网文档 https://www.webpackjs.com/
1. webpack工作原理
    - 入口起点(entry points)
    - 输出(output)
    - 模式(mode)
    - loader
    - 插件(plugins)
    - 配置(configuration)
    - 模块(modules)
    - 模块解析(module resolution)
    - 依赖图(dependency graph)
    - manifest
    - 构建目标(targets)
    - 模块热替换(hot module replace)


#### 2.阅读TypeScript官网文档 https://www.tslang.cn/docs/home.html
1. 脚手架搭建了解辅导教程部分
    - 5分钟上手TypeScript
    - ASP.NET Core
    - Gulp
    - JavaScript迁移
    - React & Webpack

#### 3.阅读Babel官网文档 https://www.babeljs.cn/
1. vue部分的构建需要Babel支持，重点掌握以下两点
    1. Plugins
    2. Presets

2. vue配置入门: https://cn.vuejs.org/v2/guide/installation.html

### 开始配置

npm < 5.x 建议升级到更高版本(当前稳定版本6.7.0), 或使用yarn来管理包

#### 配置文件
1. 完成准备工作后下面就要进行这几类文件的配置
    - package.json
    - webpack.config.js
    - tsconfig.json
    - babel.config.js
2. **配置思路**，渐进式配置避免过程中问题堆积，先让脚手架工作起来
    - 首先要让webpack能运行起来
    - 安装Vue框架, 配置Vue、TS编译所需的loader和plugins

#### 让webpack运行起来

这是一个使webpack能工作的最小配置。

当写好一个webpack配置, 从最简单的一步开始感受一下webpack, 建立亲切感往后就容易多了。


webpack配置文件:

``` json
/**
 * @file ./config/webpack.config.js
 * @author CharlesYu01
 */
module.exports = {
    entry: './index.ts',
    mode: 'production'
};
```

编译执行结果：

``` 
$  webpack --config ./config/webpack.config.js
Hash: 067221c5690968574418
Version: webpack 4.29.0
Time: 86ms
Built at: 2019-01-26 14:05:49
  Asset       Size  Chunks             Chunk Names
main.js  930 bytes       0  [emitted]  main
Entrypoint main = main.js
[0] ./index.ts 0 bytes {0} [built]
```

可以看一下编译出来的内容，默认在./dist/main.js中。

ps：恩，你已经掌握了webpack最核心的玩法了，处理更复杂的工作时再去了解loader、plugins的原理。

#### 用Vue+TS编写一个可浏览的页面
   - 安装插件   
  
```
// package.json 
// TODO: 掌握各插件的作用
...
"devDependencies": {
	"awesome-typescript-loader": "^5.2.1",
	"html-webpack-plugin": "^3.2.0",
	"source-map-loader": "^0.2.4",
	"ts-loader": "^5.3.3",
	"typescript": "^3.2.4",
	"vue-class-component": "^6.3.2",
	"vue-loader": "^15.6.1",
	"vue-tsx-support": "^2.2.2",
	"webpack": "^4.29.0",
	"webpack-cli": "^3.2.1",
	"webpack-dev-server": "^3.1.14"
},
"dependencies": {
	"vue": "^2.5.22",
	"vue-property-decorator": "^7.3.0"
}
...
```
  
  webpack安装时如有异常，使用官网推荐方法 `yarn add webpack --dev`

  - 添加html入口文件
  
   有了编译产出的js，还需要将js引入到页面中，此时使用webpack plugins配置一个插件 `html-webpack-plugin` ， 就可以完成html页面引入js的功能。

  - 添加vue template 的编译能力 `vue-loader`

   引用vue官网：
   > ### 运行时 + 编译器 vs. 只包含运行时
   > #### 如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版：
   > ``` 
   // 需要编译器
	new Vue({
	  template: '<div>{{ hi }}</div>'
	})
	// 不需要编译器
	new Vue({
	  render (h) {
	    return h('div', this.hi)
	  }
	})
	// 配置webpack
	module.exports = {
	  resolve: {
	    alias: {
	      'vue$': 'vue/dist/vue.esm.js'
	    }
	  }
	}	
	```
 
	
  - 添加一个可预览的webServer `webpack-dev-server`
  
  ``` js
  devServer: {
    	contentBase: '../dist',
    	port: 9000
  }
 
  ```
  
  ####  验证结果
  
  1.用TypeScript实现一个Input组件
  
  ```
  	import {VNode} from 'vue/types';
	import Component from 'vue-class-component';
	import * as Vue from 'vue-tsx-support';
	import { Prop } from 'vue-property-decorator';

	export interface InputProps   {
 		placeholder: String
	}
	@Component
	export default class Input extends Vue.Component<InputProps,any> {
	    [x: string]: any;
	    text: any;
	    input(e) {
	        this.text = e.target.value
	        this.$emit('input', e.target.value);
	    }
	    @Prop([String, Boolean]) value: string | boolean | undefined;
	
	    data() {
	      return {
	        text: ''
	      }
	    }
	        
	    render() {
	        return <input value={this.value} onInput={this.input}/>   
	    }
	}
  ```
  2.引用组件
  
	```
	new Vue({
	template: '<div>组件<Input value="" @input="input"/>{{message}}</div> ',
	data:{
	    message:'hello Vue!'
	},
	methods:{
	    input:function(e) {
	       this.message = e.target.value;  
	    }
	}
	}).$mount('#app');
	```  

  3.预览
  
  ```
	// 可以全量安装一次项目依赖
	yarn install

  yarn start
  $ webpack-dev-server --config ./config/webpack.config.js
ℹ ｢wds｣: Project is running at http://localhost:9000/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from ../dist
ℹ ｢wdm｣: Hash: 9bf165f80a4d3c7600c0
Version: webpack 4.29.0
Time: 2129ms
Built at: 2019-01-26 19:49:49
       Asset       Size  Chunks             Chunk Names
./index.html  409 bytes          [emitted]
     main.js    662 KiB    main  [emitted]  main
	Entrypoint main = main.js
	[0] multi (webpack)-dev-server/client?http://localhost:9000 ./example/index.ts 40 bytes {main} [built]
	[./example/index.ts] 471 bytes {main} [built]
	[./node_modules/ansi-html/index.js] 4.16 KiB {main} [built]
	[./node_modules/ansi-regex/index.js] 135 bytes {main} [built]
	[./node_modules/events/events.js] 13.3 KiB {main} [built]
	[./node_modules/html-entities/index.js] 231 bytes {main} [built]
	[./node_modules/loglevel/lib/loglevel.js] 7.68 KiB {main} [built]
	[./node_modules/strip-ansi/index.js] 161 bytes {main} [built]
	[./node_modules/url/url.js] 22.8 KiB {main} [built]
	[./node_modules/vue/dist/vue.esm.js] 289 KiB {main} [built]
	[./node_modules/webpack-dev-server/client/index.js?http://localhost:9000] (webpack)-dev-server/client?http://localhost:9000 7.78 KiB {main} [built]
	[./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.58 KiB {main} [built]
	[./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.05 KiB {main} [built]
	[./node_modules/webpack/hot sync ^\.\/log$] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {main} [built]
	[./node_modules/webpack/hot/emitter.js] (webpack)/hot/emitter.js 75 bytes {main} [built]
	    + 15 hidden modules
	Child html-webpack-plugin for "index.html":
	     1 asset
	    Entrypoint undefined = ./index.html
	    [./node_modules/html-webpack-plugin/lib/loader.js!./example/index.html] 618 bytes {0} [built]
	    [./node_modules/lodash/lodash.js] 527 KiB {0} [built]
	    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
	    [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
	ℹ ｢wdm｣: Compiled successfully.

  ```