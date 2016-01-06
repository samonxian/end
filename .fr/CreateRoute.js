/**
 * 框架Route处理
 */
var fs = require('fs');
var Q = require('q')
var path = './src/page/'
var import_tpl = "import {var} from './{filename}' \n";
var childRoutes_tpl = "let {filename}_route = { path : '/{path}',components : {filename}} \n"
var childRoutes_tpl2 = "{parent}_route.childRoutes = {child2}\n"
var contents = '';
var import_contents = '';
var child_contents = '';
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
var route_files = [ ];
//打开route配置文件
var route_file = './src/page/Route.js';
if(fs.existsSync(route_file)){
	fs.unlinkSync(route_file);
}
var routes_config = fs.openSync(route_file,'a',0755);

function each_file(path,callback){
	var deferred = Q.defer();
	var files = fs.readdirSync(path);
	files.map(function(file){
		var stat =	fs.lstatSync(path+file);
		if(stat.isDirectory()){
			if(!(file in tempIngore)){
				callback(file);	
			}
		}
	})
	
	deferred.resolve(route_files);
	return deferred.promise;
}

function create_route_import(com,filename){
	if(contents == ''){
		contents += "import Layout from './Layout' \n";
		contents += "import App from './App' \n";
	}
	var temp = import_tpl.replace(/\{var\}/g,com);
	import_contents += temp.replace(/\{filename\}/g,filename);
}
/**
 *一级目录
 */
function create_route_child(filename,path){
	var temp = childRoutes_tpl.replace(/\{path\}/g,path);
	child_contents += temp.replace(/\{filename\}/g,filename);
}
/**
 * 二级目录
 */
function create_route_child2(dir1,child){
	var temp = childRoutes_tpl2.replace(/\{parent\}/g,dir1);
	child_contents += temp.replace(/\{child2\}/g,JSON.stringify(child).replace(/\"/g,''));
}



//遍历获取path模块
each_file(path,function(dir){
	create_route_import(dir,dir);	
	create_route_child(dir,dir);
	routes.push(dir+"_route");
	route_files.push(dir);
}).then(function(dir){
	var routes2 = [];
	each_file(path+dir+'/',function(dir2){
		create_route_import(dir2,dir+"/"+dir2);		
		create_route_child(dir2,dir+"/"+dir2);
		routes2.push(dir2+"_route");
	})	
	create_route_child2(dir,routes2);
	routes_tpl_contents =  routes_tpl_contents.replace(/{import_tpl}/,import_contents);	
	routes_tpl_contents = routes_tpl_contents.replace(/{child_tpl}/,child_contents);	
	routes_tpl_contents = routes_tpl_contents.replace(/{setting_tpl}/,JSON.stringify(routes).replace(/\"/g,''));	
	fs.writeSync(routes_config,routes_tpl_contents);
	fs.close(routes_config);
});


