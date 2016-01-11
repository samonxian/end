var fs = require('fs');
var Q = require('q')
/**
 *	生成index.html
 */
var index_html = './.fr/index.html';
var new_index_html = './public/index.html';
if(!fs.existsSync(new_index_html)){
	var index_contents = fs.readFileSync(index_html,options = {
		encoding : 'utf-8'
	});
	var i_temp = fs.openSync(new_index_html,'a',0755);
	fs.write(i_temp,index_contents,function(){
		console.log('copy index.html success!')
		fs.close(i_temp);
	});
}

/**
 * 框架Route处理
 */
var fs = require('fs');
var Q = require('q')
var path = './src/page/'
var contents = '';

//获取tpl
var routes_tpl_contents = fs.readFileSync('./.fr/routes_tpl.js',options = {
	encoding : 'utf-8'
});
//获取chunk_tpl
var chunk_tpl_contents = fs.readFileSync('./.fr/chunk_tpl.js',options = {
	encoding : 'utf-8'
});
//存放routes
var routes = [ ];
var route_files = [ ];
//打开route配置文件
var route_file = './src/page/Route.js';
if(fs.existsSync(route_file)){
	fs.unlinkSync(route_file);
}
var routes_config = fs.openSync(route_file,'a',0755);
var require_tpl = "require('../../.fr/chunks/{filename}')";

//遍历获取path模块
var fn = require('./function.js')
fn.each_file(path,function(dir){
	//生成每个router的chunk模块
	var temp_con = chunk_tpl_contents;
	var chunk_file = './.fr/chunks/'+ dir +'.js';
	if(fs.existsSync(chunk_file)){
		fs.unlinkSync(chunk_file);
	}
	var chunk_config = fs.openSync(chunk_file,'a',0755);
	temp_con = temp_con.replace(/{filename}/g,dir);	
	fs.writeSync(chunk_config,temp_con);
	fs.close(chunk_config);
	//构建childRoutes 对象
	routes.push(require_tpl.replace('{filename}',dir));
	route_files.push(dir);
}).then(function(files){
	var setting_tpl = JSON.stringify(routes).replace(/\"/g,'')
											.replace(/\,/g,',\n	')
											.replace(/\[/g,'').replace(/\]/g,'');
	routes_tpl_contents = routes_tpl_contents.replace(/{setting_tpl}/,setting_tpl);	
	fs.writeSync(routes_config,routes_tpl_contents);
	fs.close(routes_config);
	console.log('create routes success!')
});


