var fs = require('fs');
var Q = require('q')
var fn = require('../../libs/function.js')
/**
 *	生成index.html
 */
//var index_html = './.fr/index.html';
//var new_index_html = './public/index.html';
//if(!fs.existsSync(new_index_html)){
	//var index_contents = fs.readFileSync(index_html,options = {
		//encoding : 'utf-8'
	//});
	//var i_temp = fs.openSync(new_index_html,'a',0755);
	//fs.write(i_temp,index_contents,function(){
		//console.log('copy index.html success!')
		//fs.close(i_temp);
	//});
//}

/**
 * 框架Route处理
 */
var fs = require('fs');
var Q = require('q')
//可以设定多文件夹
var path = ['./src/page/','./.fr/generator/frontend/view/']
var contents = '';

//获取tpl
var routes_tpl_contents = fs.readFileSync('./.fr/autoCreator/tpl/routes_tpl.js',options = {
	encoding : 'utf-8'
});
//获取chunk_tpl
var chunk_tpl_contents = [];
chunk_tpl_contents.push(fs.readFileSync('./.fr/autoCreator/tpl/chunk_tpl.js',options = {
	encoding : 'utf-8'
}));
chunk_tpl_contents.push(fs.readFileSync('./.fr/autoCreator/tpl/chunk_tpl_frontend.js',options = {
	encoding : 'utf-8'
}));
//存放routes
var routes = [ ];
//打开route配置文件
var route_file = './src/page/Route.js';
if(fs.existsSync(route_file)){
	fs.unlinkSync(route_file);
}
var routes_config = fs.openSync(route_file,'a',0755);
var require_tpl = "require('.fr/autoCreator/chunks/{filename}')";

/**
 * 生成每个router的chunk模块
 *@param dir [string] 需要处理的一级目录
 *@param dir2 [string] 需要处理的二级目录
 *@param k [int] 当前处理的路径index 
 */
function chunks(dir,dir2,k){
	var temp_con = chunk_tpl_contents[k];
	var chunk_file = './.fr/autoCreator/chunks/'+ dir +'.js';
	if(fs.existsSync(chunk_file)){
		fs.unlinkSync(chunk_file);
	}
	var chunk_config = fs.openSync(chunk_file,'a',0755);
	temp_con = temp_con.replace(/{filename}/g,dir2);	
	fs.writeSync(chunk_config,temp_con);
	fs.close(chunk_config);
}

//遍历获取path模块

path.forEach(function(v,k){
	fn.each_file(v,function(dir){
		if(!fs.existsSync(v + dir +'/index.jsx')){
			//处理含有多个page目录,根据是否有index.js来判断
			var path2 = v + dir + "/";
			fn.each_file(path2,function(dir2){
				if(fs.existsSync(v + dir + "/" + dir2 +'/index.jsx')){
					chunks(dir2,dir + "/" +dir2,k);	
					//构建childRoutes 对象
					routes.push(require_tpl.replace('{filename}',dir2));
				}
			});
		}else{
			//处理本身就是page的目录，不包含其他的page目录
			chunks(dir,dir,k);	
			//构建childRoutes 对象
			routes.push(require_tpl.replace('{filename}',dir));
		}
	}).then(function(files){
		var setting_tpl = JSON.stringify(routes).replace(/\"/g,'')
												.replace(/\,/g,',\n	')
												.replace(/\[/g,'').replace(/\]/g,'');
		routes_tpl_contents = routes_tpl_contents.replace(/{setting_tpl}/,setting_tpl);	
		fs.writeSync(routes_config,routes_tpl_contents);
		fs.close(routes_config);
		console.log('create routes success!')
	});
})



