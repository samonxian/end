/**
 * 框架Route处理
 */
var fs = require('fs');
var path = './src/page/'
//设置忽略目录
var ingoreDir = ['layout'];
var tempIngore = [];
ingoreDir.map(function(value){
	tempIngore[value] = true;	
})
//获取tpl
var routes_tpl_contents = fs.readFileSync('./.fr/routes_tpl.js',options = {
	encoding : 'utf-8'
});
//存放routes
var routes = [ ];
//打开route配置文件
var route_file = './src/page/Route.js';
if(fs.existsSync(route_file)){
	fs.unlinkSync(route_file);
}
var routes_config = fs.openSync(route_file,'a',0755);
//遍历获取path模块
fs.readdir(path,function(err,files){
	files.map(function(file){
		var stat =	fs.lstatSync(path+file);
		if(stat.isDirectory()){
			if(!(file in tempIngore)){
				create_route_import(file);	
				create_route_child(file);
				routes.push(file+"_route");
			}
		}
	})
	routes_tpl_contents =  routes_tpl_contents.replace(/{import_tpl}/,import_contents);	
	routes_tpl_contents = routes_tpl_contents.replace(/{child_tpl}/,child_contents);	
	routes_tpl_contents = routes_tpl_contents.replace(/{setting_tpl}/,JSON.stringify(routes).replace(/\"/g,''));	
	fs.writeSync(routes_config,routes_tpl_contents);
	fs.close(routes_config);
})
var import_tpl = "import {filename} from './{filename}' \n";
var childRoutes_tpl = "let {filename}_route = { path : '/{filename}',components : {filename}} \n"
var contents = '';
var import_contents = '';
var child_contents = '';
function create_route_import(filename){
	if(contents == ''){
		contents += "import Layout from './Layout' \n";
		contents += "import App from './App' \n";
	}
	import_contents += import_tpl.replace(/\{filename\}/g,filename);
}
function create_route_child(filename){
	child_contents += childRoutes_tpl.replace(/\{filename\}/g,filename);
}
