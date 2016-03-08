var fs = require('fs');
var ignoreFiles = ['.DS_Store'];
var ignoreFilesWithSffix = ['.swp'];

class ReadModuleDirTpl {
	constructor(config){
		if(!config){ config = { }}
		this.config = Object.assign(config,{
			ignoreFiles:[],
			ignoreFilesWithSffix:[]
		});
		this.ignoreFiles = ignoreFiles.concat(this.config.ignoreFiles); 
		this.ignoreFilesWithSffix = ignoreFiles.concat(this.config.ignoreFilesWithSffix); 
		this.run();
	}

	run(){
		var filesGenerator = this.getDirFilesGenerator();	
		this.eachAndReadFilesContents(filesGenerator);
	}
	/**
	 *	遍历读取文件内容
	 *@param [generator] files 文件遍历器
	 */
	eachAndReadFilesContents(files){
		for (var f of files) {
			console.log(f);
		}
	}
	/**
	 *	读取文件夹文件
	 */
	* getDirFilesGenerator (){
		var path = this.config.path;
		var files = fs.readdirSync(path);
		for(var i = 0;i<files.length;i++){
			var file = files[i];
			var stat =	fs.lstatSync(path+file);
			if(!stat.isDirectory()){
				//过滤忽略文件
				if(ignoreFiles.indexOf(file) == -1){
					var suffix = file.match(/\..*/)[0];
					//过滤忽略后缀名
					if(ignoreFilesWithSffix.indexOf(suffix) != -1){
						continue;
					}
					yield file; 
				}
			}
		}
		//console.log(path)
	}
}
module.exports = ReadModuleDirTpl;

