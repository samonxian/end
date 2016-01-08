var webpack = require('webpack')
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

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
		publicPath: '/js/',
		path: __dirname + '/public/js/',
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    },
	module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
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
            }
			
        ]
    },
	resolve: {
		alias: {
			'JSONP': __dirname + '/src/libs/jsonp.js'
		}
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('chunk.js'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)  //定义开发和生产环境
		})
    ]
};
console.log(module.exports.output.path)
