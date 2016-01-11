var webpack = require('webpack')
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * 开发环境开react热替换
 */
var entry,leb;
var NODE_ENV = 'development';
entry = ['webpack-dev-server/client?http://localhost:8000','webpack/hot/only-dev-server','./src/index.js']; 
var vendor = require('./src/page/vendor.js');
if(!vendor){
	vendor = [];
	console.log('antd_splitting error!')
}else{
}
module.exports = {
	devtool: 'inline-source-map',
	entry: {
		app : entry,
		vendor : vendor 
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
				test : /\.js[x]?$/,
				loader: 'react-hot',
				exclude: /node_modules/

			},
			{ 
            	test: /\.js[x]?$/, 
            	loader: 'babel',
				exclude: /node_modules/,//设置node_modules目录为根目录下的node_modules,根目录以package为参考
            	query: {
			        presets: ['es2015', 'react']
			    }
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
			
        ]
    },
	resolve: {
		alias: {
			'JSONP': __dirname + '/src/libs/jsonp.js',
			'antd_c': __dirname + '/src/libs/antd',
		}
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js"),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)  //定义开发和生产环境
		}),
		new ExtractTextPlugin('css/styles.css'),
    ]
};
console.log(module.exports.output.path)
