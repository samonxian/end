var fs = require('fs');
var Q = require('q')
var fn = require('./function.js');
//遍历获取path模块
var libs = [];
var p_libs = [];

function createLibsString(temp_con){
	var con = temp_con.match(/import(.*?)\{(.*?)\}(.*?)\'antd_c\'/g);
			//console.log(con);
	if(con){
		con.forEach(function(data){
			var temp = data.match(/\{(.*)\}/g)[0].replace('{','').replace('}','');
			var lib = temp.split(',');
			//console.log(lib);
			lib.map(function(l){
				var l_origin = l.replace(/\ /g,''); 
				var l_t = 'antd/lib/'+l_origin.toLowerCase();
				var l_p = l_origin + ": require('antd/lib/"+l_origin.toLowerCase()+"')";
				if(libs.indexOf(l_t) == -1){
					libs.push(l_t);	
					p_libs.push(l_p);	
				}
			})
		})
	}
}

var path = './src/page/'

var layout_path = path + 'layout/'
fn.each_file(layout_path,null,function(dir){
	var temppath = layout_path + dir;
	//console.log(temppath)
	if(fs.existsSync(temppath)){
		var temp_con = fs.readFileSync(temppath,options = {
			encoding : 'utf-8'
		});
		createLibsString(temp_con);	
	}
})

var sidebar_path = path + "sidebar/"
fn.each_file(sidebar_path,null,function(dir){
	var temppath = sidebar_path + dir;
	//console.log(temppath)
	if(fs.existsSync(temppath)){
		var temp_con = fs.readFileSync(temppath,options = {
			encoding : 'utf-8'
		});
		createLibsString(temp_con);	
	}
})

fn.each_file(path,function(dir){
	var temppath = path + dir + "/" + "index.js";
	if(fs.existsSync(temppath)){
		var temp_con = fs.readFileSync(temppath,options = {
			encoding : 'utf-8'
		});
		createLibsString(temp_con);	
	}
})

/**
 *	写入需要代码分离的antd模块
 */
function writeAntdVendor(){
	var w_file = path + 'vendor.js';
	if(fs.existsSync(w_file)){
		fs.unlinkSync(w_file);
	}
	var antd_tpl = fs.readFileSync('./.fr/antd_tpl.js',options = {
		encoding : 'utf-8'
	});
	var fd = fs.openSync(w_file,'a',0755);
    var temp_libs = JSON.stringify(libs).replace(/\",/g,'",\n	')
									.replace('[','')
									.replace(']','');
	temp_con = antd_tpl.replace(/{antd_tpl}/g,temp_libs);	
	fs.writeSync(fd,temp_con);
	fs.close(fd);

}
/**
 *	写入需要代码分离的antd模块,用于生产环境调用
 */
function writeAntdProduction(){
	var w_file = './src/libs/antd/production.js';
	if(fs.existsSync(w_file)){
		fs.unlinkSync(w_file);
	}
	var antd_tpl = fs.readFileSync('./.fr/antd_production_tpl.js',options = {
		encoding : 'utf-8'
	});
	var fd = fs.openSync(w_file,'a',0755);
    var temp_libs = JSON.stringify(p_libs).replace(/\",/g,'",\n	')
									.replace(/\"/g,'')
									.replace('[','')
									.replace(']','');
	temp_con = antd_tpl.replace(/{antd_tpl}/g,temp_libs);	
	fs.writeSync(fd,temp_con);
	fs.close(fd);

}

/**
 *	写入需要代码分离的模块
 */
function writeVendor(){
	writeAntdVendor();
	writeAntdProduction();
}
writeVendor();	
