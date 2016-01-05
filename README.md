# R2框架
**R2**框架是基于React、Redux而构建的。使用webpack模块加载工具，采用ES6语法。
## 框架目录

```
R2/
	+ public/                      #项目最终生成处，直接拷贝到服务环境下即可访问
	- src/						   #框架和应用代码目录
		+ libs/					   #沉淀类库，也包括第三方的（极少，一般都再node_modules）
		- page/					   #项目页面模块开发代码，不同应用会有不用模块,有些文件是名称是不变的
			App.js 				   #应用界面顶层React Component,入口component，当然Redux提供的Provider和React Router除外
			Route.js 			   #路由配置处
			Reducers.js 		   #Redux reducers总入口
			store.js 			   #Redux store配置处
			- demo/ 			   #应用页面demo,参考使用
				index.js 		   #demo页面入口文件
				action.js     	   #Redux action，demo action任务定义处
	- style/					   #样式图片存放处
		+ css/					   #css样式
		+ img/ 					   #图片存放处
	Gruntfile.js 				   #grunt配置文件
	server.js      				   #启动服务配置文件
	webpack.config.js 			   #webpack配置 
	package.js  				   #npm配置文件
```
## 框架详解
### package.json

```js
{
    "name": "r2",
    "version": "1.0.0",
    "description": "r2",
    "dependencies": {
        "antd": "^0.10.4",//react ui
        "history": "^1.17.0",//react router history
        "isomorphic-fetch": "^2.2.0",// fetch框架，ajax异步处理
        "react": "^0.14.3",//react 框架
        "react-dom": "^0.14.3", //集成调用，兼容commodjs模式
        "react-redux": "^4.0.6", //redux与redux连接库
        "redux": "^3.0.5",
        "react-router": "^1.0.3",//react路由库
        "redux-logger": "^2.3.1",//redux console输出state 和 action状态方便调试
        "redux-simple-router": "^1.0.2",//基于react router,配置简单，上手快，官方推荐的
        "redux-thunk": "^1.0.3" //redux中需要用到thunk写法
    },
    "devDependencies": {
        "babel-core": "^6.0.1",//注意和bable-loader的版本，有时候会出问题，需要更新版本，保证最一般没问题
        "babel-loader": "^6.0.20",//需要和下面两个一起使用
        "babel-preset-es2015": "^6.3.13",//babel解析es6
        "babel-preset-react": "^6.3.13",//bable解析react jsx
        "css-loader": "^0.23.0",//css loader
        "express": "^4.13.3",//node express框架
        "grunt": "^0.4.5",//grunt
        "grunt-contrib-clean": "^0.7.0",
        "grunt-contrib-copy": "^0.8.2",
        "grunt-webpack": "^1.0.11",//是支持grunt-webpack 配置
        "http-server": "^0.8.5",//简易http server
        "react-hot-loader": "^1.3.0",//react 热替换，开发神工具
        "style-loader": "^0.13.0",//style loaders
        "webpack": "^1.12.9",
        "webpack-dev-server": "^1.14.0"
    },
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node server.js",//npm start启动服务
        "start2": "http-server -a 0.0.0.0 -p 8080",//npm run start2启动简单web服务，用于验证./public生成应用，需要在./public下运行此命令
        "build": "grunt webpack" //生成应用于public下
    },
    "author": "sam",
    "license": "ISC"
}

```
### webpack.config.js
这里的配置默认设置为开发环境。如果发布应用，请使用grunt-webpack,看Gruntfile.js

```js
var webpack = require('webpack')

/**
 * 开发环境开react热替换
 */
var entry;
var NODE_ENV = 'development';
entry = ['webpack-dev-server/client?http://localhost:8000','webpack/hot/only-dev-server','./src/index.js']; 
module.exports = {
	devtool: 'inline-source-map',
	entry: entry, 
    output: {
		path: __dirname + '/public/js/',//输出文件目录，以当前server.js为参考路径
        filename: 'bundle.js',//输出文件
        chunkFilename: '[id].chunk.js'//如果使用require([]).ensure()会单独打包文件并以此配置名生成文件输出文件，id是每个模块自动生成的id
    },
	module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },//配置识别css后缀并使用此配置loader解析css文件
			{
				test : /\.js[x]?$/,
				loader: 'react-hot',
				exclude: /node_modules///设置node_modules目录为根目录下的node_modules,根目录以package为参考

			},//js或jsx后缀名，使用此loader,注意需要比babel先配置，要不会报错
			{ 
            	test: /\.js[x]?$/, 
            	loader: 'babel',
				exclude: /node_modules/,//设置node_modules目录为根目录下的node_modules,根目录以package为参考
            	query: {
			        presets: ['es2015', 'react'] //配合es2015和react插件一起使用
			    }
            }
			
        ]
    },
	plugins: [
		new webpack.NoErrorsPlugin(),//页面无错误（自己删掉，出错后看看就清楚了）
		new webpack.HotModuleReplacementPlugin(),//启用热替换功能
        new webpack.optimize.CommonsChunkPlugin('chunk.js'),//打包的公共文件设置，多文件或异步加载文件等的公共部分
		new webpack.DefinePlugin({ //定义环境变量
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)  //定义开发和生产环境
		})
    ]
};

```
### server.js
```js
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = 8000;
new WebpackDevServer(webpack(config), {
    publicPath: '/js/',//缓冲目录，不会在真实目录中生成文件
    hot: true,//启用热替换
    historyApiFallback: true,//?
	contentBase : "./public/"//服务目录，服务运行后直接访问服务目录的index.html入口文件
}).listen(port, 'localhost', function(err, result) {
    if (err){
		console.log(err)
	}else{
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
	}
});

```
### Gruntfile.js
通过覆盖配置设置了生成环境，去掉热加载等开发环境模块

```js
var webpack = require('webpack')
var webpack_config = require('./webpack.config.js');//获取配置文件
// override webpack_config
var config = Object.assign({},webpack_config,{
	entry : './src/index.js',
	plugins: [
		new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('chunk.js'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify("production")  //定义为生产环境
		})
    ]
});
console.log(config.entry);
module.exports = function(grunt){
	grunt.initConfig({
		webpack : {
			production : config 
		}
	});
	grunt.loadNpmTasks('grunt-webpack');
	grunt.registerTask("default",['webpack']);
}

```
### Route配置
Route.js 详细参考[React-Router API](http://react-guide.github.io/react-router-cn/)

```js
import Layout from './Layout'
import App from './App'
import Demo from './demo'

export const rootRoute = {
	path : "/",
    component: App,
    childRoutes: [
		{
			path : '/demo',
			components : Demo 
		}
    ]
}


```
























