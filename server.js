require('./.fr/CreateRoute.js');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var port = 8000;
new WebpackDevServer(webpack(config), {
    publicPath: '/js/',
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


