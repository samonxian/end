var fs = require('fs');
var Q = require('q')
var fn = require('../../libs/function');
var path = ['./src/page/','./.fr/generator/frontend/view/']
var import_tpl = "import { {import_tpl} } from './{dir}/reducer'";
var import_tpl = [
					"import { {import_tpl} } from './{dir}/reducer'",
					"import { {import_tpl} } from '../../.fr/generator/frontend/view/{dir}/reducer'",
				];

var import_con = '';
/**
 *	提取并构建reducers	
 *@param [string] dir 详细的文件夹名 
 *@param [string] imports 需要替换的import对象值 
 *@param [int] key 当前正在遍历的路径 
 */
function writeImport(dir,imports,key){
	import_con += import_tpl[key].replace('{dir}',dir)
			  .replace('{import_tpl}',imports) + '\n';	
}

var reducers_fn = [];
/**
 *	提取并构建reducers	
 *@param [string] temp_con 遍历的当前文件内容
 *@param [string] dir 详细的文件夹名 
 *@param [int] key 当前正在遍历的路径 
 */
function createReducers(temp_con,dir,key){
	var con = temp_con.match(/export(.*?)function(.*?)\(/g);
	if(con){
		var reducers = [];
		con.forEach(function(data){
			var re = data.split('function')[1].replace('(','')
											.replace(/\ /g,'');
			reducers_fn.push(re);	
			reducers.push(re);	
		})
		var imports = JSON.stringify(reducers).replace(/\",/g,'",')
												.replace(/\"/g,'')
												.replace('[','')
												.replace(']','');
		//console.log(imports)
		//console.log(dir)
		writeImport(dir,imports,key)
	}
}

/**
 *	按文件夹提取page中每个模块的reducer
 *@param [string] path 需要遍历的路径
 *@param [string] dir 详细的文件夹名 
 *@param [int] key 当前正在遍历的路径 
 */
function getReducers(path,dir,key){
	var temppath = path + dir + '/reducer.js';
	//console.log(temppath)
	if(fs.existsSync(temppath)){
		var temp_con = fs.readFileSync(temppath,options = {
			encoding : 'utf-8'
		});
		createReducers(temp_con,dir,key);	
	}
}

path.forEach(function(v,k){
	fn.each_file(v,function(dir){
		if(!fs.existsSync(v + dir +'/index.jsx')){
			var path2 = v + dir + "/";
			fn.each_file(path2,function(dir2){
				if(fs.existsSync(v + dir + "/" + dir2 +'/index.jsx')){
					getReducers(v,dir + "/" +dir2,k);
				}
			});
		}else{
			getReducers(v,dir,k);
		}
	})
})

function writeRecucers(){
	var w_file = './src/page/reducers.js';
	if(fs.existsSync(w_file)){
		fs.unlinkSync(w_file);
	}
	var antd_tpl = fs.readFileSync('./.fr/autoCreator/tpl/reducers_tpl.js',options = {
		encoding : 'utf-8'
	});
	var fd = fs.openSync(w_file,'a',0755);
    var temp_libs = JSON.stringify(reducers_fn).replace(/\",/g,'",\n	')
									.replace(/\"/g,'')
									.replace('[','')
									.replace(']','');
	//console.log(import_con)									
	temp_con = antd_tpl.replace(/{reducers_tpl}/g,temp_libs);	
	temp_con = temp_con.replace(/{import_tpl}/g,import_con);	
	fs.writeSync(fd,temp_con);
	fs.close(fd);
	console.log('create Reducers success!')
}
writeRecucers();
