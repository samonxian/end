var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var port = 8000;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,//必须跟webpack.config.js一致
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, 'localhost', function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
});

//new WebpackDevServer(webpack(config), {
//publicPath: config.output.publicPath,//必须跟webpack.config.js一致
//hot: true,
//historyApiFallback: true,
//contentBase : "./public/"
//}).listen(port, 'localhost', function(err, result) {
//if (err){
//console.log(err)
//}else{
//console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
//}
//});
