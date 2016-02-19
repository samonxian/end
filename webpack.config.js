var webpack = require('webpack')
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * 开发环境开react热替换
 */
var entry,leb;
var NODE_ENV = 'development';
//entry = ['webpack-dev-server/client?http://localhost:8000','webpack/hot/only-dev-server','./src/index.jsx']; 
entry = [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index.jsx'
]
module.exports = {
	devtool: 'inline-source-map',
	entry: {
		app : entry,
		libs : ['react','antd'], 
	}, 
    output: {
		publicPath: '/js/',
		path: __dirname + '/public/js/',
        filename: 'bundle.js',
		chunkFilename: '[name].chunk.js'
    },
	module: {
        loaders: [
			{test: /\.(jpg|png)$/, loader: "url?limit=8192"},
			{ 
            	test: /\.js[x]?$/, 
            	loader: 'babel',
				exclude: /node_modules/,//设置node_modules目录为根目录下的node_modules,根目录以package为参考
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
			
        ]
    },
	resolve: {
		alias: {
			'.fr': __dirname + '/.fr/',
			'page': __dirname + '/src/page/',
			'libs': __dirname + '/src/libs/',
			'JSONP': __dirname + '/src/libs/jsonp.js',
			'function': __dirname + '/src/libs/function.js',
			'common': __dirname + '/src/libs/temp/user_log.js',
		}, 
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js",['app']),
		new webpack.optimize.CommonsChunkPlugin("libs","libs.bundle.js",['vendor','chunk']),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)  //定义开发和生产环境
		}),
		new ExtractTextPlugin('css/styles.css'),
    ]
};
console.log(module.exports.output.path)
