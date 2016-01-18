var webpack = require('webpack')
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack_config = require('./webpack.config.js');
var vendor = require('./src/page/vendor.js');
vendor.push("react")
var config = Object.assign({},webpack_config,{
	devtool : 'source-map',
	entry: {
		app : './src/index.js',
		vendor : vendor, 
		libs : ['react'], 
	},
	resolve: {
		alias: {
			'JSONP': __dirname + '/src/libs/jsonp.js',
			'antd_c': __dirname + '/src/libs/antd/production.js',
		}
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js",['app']),
		new webpack.optimize.CommonsChunkPlugin("libs","libs.bundle.js",['vendor','chunk']),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify("production")  //定义为生产环境
		}),
		new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
		new ExtractTextPlugin('css/styles.css'),
    ]
});
console.log(config.entry);
module.exports = function(grunt){
	grunt.initConfig({
		webpack : {
			production : config 
		}
	});
	//grunt.loadNpmTasks('grunt-contrib-compass');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-string-replace');	
	//grunt.loadNpmTasks('grunt-contrib-htmlmin');
	//grunt.loadNpmTasks('grunt-contrib-clean');	
	//grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.registerTask("default",['webpack']);
}
