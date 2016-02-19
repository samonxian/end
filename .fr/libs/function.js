var Q = require('q')
var fs = require('fs');
//设置忽略目录和文件
var ignoreDir = ['layout','sidebar'];
var ignoreFiles = ['.DS_Store'];
var ignoreFilesWithSffix = ['.swp'];


module.exports = {
	/**
	 *	遍历文件夹文件，包括文件和文件夹
	 *@params callback [function] 文件夹回调函数,function(dir){ }
	 *@params callback2 [function] 文件回调函数,function(file){ }
	 */
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
	},
	/**
	 * [toUpperCase description]
	 * @param  {string} string [传进来的字符串]
	 * @param  {Number} start  [开始位置，默认0]
	 * @param  {Number} end    [介绍位置，默认1]
	 * @return {string} 
	 */
	toUpperCase : function(string,start,end){
		if(!start){
			start = 0;
		}
		if(!end){
			end = 1;
		}
		var str1 = string.substr(start,end).toUpperCase();
		var str2 = string.substr(end);
		return str1 + str2;
	}
}

