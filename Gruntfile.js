var webpack = require('webpack')
var webpack_config = require('./webpack.config.js');
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
