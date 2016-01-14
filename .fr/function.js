var Q = require('q')
var fs = require('fs');
//设置忽略目录和文件
var ignoreDir = ['layout','sidebar'];
var ignoreFiles = ['.DS_Store'];
var ignoreFilesWithSffix = ['.swp'];

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
				if(ignoreDir.indexOf(file) == -1){
					//console.log(file)
					callback && callback(file);	
				}
			}else{
				if(ignoreFiles.indexOf(file) == -1){
					var flag = true;
					ignoreFilesWithSffix.forEach(function(value){
						if(file.indexOf(value) != -1){
							flag = false;
							return;
						}
					});
					if(flag){
						//console.log(file)
						callback2 && callback2(file);
					}
				}
			}
		})
		
		deferred.resolve(files);
		return deferred.promise;
	}
}

