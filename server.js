var open_smart_function = {
	routes : true, 
	antd_splitting : true, 
}
if(open_smart_function){
	var o = open_smart_function;
	if(o.routes){
		require('./.fr/CreateRoute.js');
	}
	if(o.antd_splitting){
		require('./.fr/split_antd.js');
	}
}
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var port = 8000;
new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,//必须跟webpack.config.js一致
    hot: true,
    historyApiFallback: true,
	contentBase : "./public/"
}).listen(port, 'localhost', function(err, result) {
    if (err){
		console.log(err)
	}else{
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
	}
});


