var Q = require('q')
var fs = require('fs');
//设置忽略目录
var ingoreDir = ['layout','sidebar','.DS_Store'];
var tempIngore = [];
ingoreDir.map(function(value){
	tempIngore[value] = true;	
})
/**
 *	遍历文件夹文件，包括文件和文件夹
 *@params callback [function] 文件夹回调函数,function(dir){ }
 *@params callback2 [function] 文件回调函数,function(file){ }
 */
module.exports = {
	each_file : function(path,callback,callback2){
		var deferred = Q.defer();
		var files = fs.readdirSync(path);
		files.map(function(file){
			var stat =	fs.lstatSync(path+file);
			if(stat.isDirectory()){
				if(!(file in tempIngore)){
					callback && callback(file);	
				}
			}else{
				callback2 && callback2(file);
			}
		})
		
		deferred.resolve(files);
		return deferred.promise;
	}
}

