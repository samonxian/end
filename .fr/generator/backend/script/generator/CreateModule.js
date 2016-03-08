var ReadModuleDirTpl = require("./model/ReadModuleDirTpl.js")

class CreateModule {
	constructor(config){
		this.config = config;
		this.run();
	}

	run(){
		this.getTpls();	
	}

	getTpls(){
		var tplObj = new ReadModuleDirTpl({
			path : "../tpls/module/basic/",
		});
	}
}
module.exports = CreateModule;

new CreateModule();

