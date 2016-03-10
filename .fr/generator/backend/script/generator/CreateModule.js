var fs = require('fs');
var util = require('util');
var ReadModuleDirTpl = require("./model/ReadModuleDirTpl.js")
var fn = require("../../../../libs/function")

class CreateModule {
	constructor(config){
		this.config = config;
		if(!this.config) this.config = { }

		//this.config.moduleId = "test";
		//this.config.path = "../tpls/module/basic/";
		//this.config.savePath = "../tpls/";
		this.config.path = "./script/tpls/module/basic/";
		this.config.savePath = "./script/tpls/";
		this.config.form = [
			'cid',
			'test',
		];
		this.config.fetch = true;

		this.run();
	}

	run(){
		this.infoSet();
		this.setTpls();	
		this.mkdirNotExist();
		this.createIndexModule();
		this.createReducerModule();
		this.createActionModule();
		if(this.config.form){
			this.createFormModule();
		}
	}

	setTpls(){
		var tplObj = new ReadModuleDirTpl({
			path : this.config.path,
		});
		var tplInfo = tplObj.getDirFilesInfo();
		//console.log(tplInfo.index.tagsInfo)
		this.tpls = tplInfo;
	}
	/**
	 *	信息内容字段等处理
	 */
	infoSet(){
		this.config.classId = fn.toUpperCase(this.config.moduleId)	
		this.config.MODULEID = fn.toUpperCase(this.config.moduleId,0,this.config.moduleId.length)	
		this.config.formId = fn.toUpperCase(this.config.moduleId) + "Form";	
		this.moduleDir = this.config.savePath + this.config.moduleId;
		this.componentDir = this.moduleDir + '/' + 'components';
		//console.log(this.config)
	}
	/**
	 * 共同替换
	 */
	commonReplace(content){
		//模块名替换
		content = content.replace(/\$\{moduleId\}/g,this.config.moduleId)
		//类名替换
		content = content.replace(/\$\{className\}/g,this.config.classId)
		return content;
	}
	/**
	 *	创建不存在的目录
	 */
	mkdirNotExist(){
		if(!fs.existsSync(this.moduleDir)){
			fs.mkdirSync(this.moduleDir);
		}
		if(!fs.existsSync(this.componentDir)){
			fs.mkdirSync(this.componentDir);
		}
	}


	createIndexModule(){
		var tpl = this.tpls.index,	
			content = tpl.contents,	
			w_file = this.moduleDir + "/" + "index.jsx";
		content = this.commonReplace(content);
		//imports替换
		var imports = '',
			components = '';
		if(this.config.form){
			imports += tpl.tagsInfo.tagContents.index_import
							.replace("${import_var}",this.config.formId)
							.replace("${import_libs}","./components/" + this.config.formId);
			//console.log(tpl.tagsInfo.tagRegex.index_import);
			components = `<${this.config.formId} />`;
		}
		content = content.replace(tpl.tagsInfo.tagRegex.index_import,imports)
		content = content.replace("${components}",components)
		fs.writeFileSync(w_file,content)
		//console.log(content)
	}

	createFormModule(){
		var tpl = this.tpls.Form,	
			content = tpl.contents,	
			tagContents = tpl.tagsInfo.tagContents,
			tagRegex = tpl.tagsInfo.tagRegex,
			w_file = this.componentDir + "/" + "Form.jsx";
		content = this.commonReplace(content);
		var jsx = '',
			event = '',
			params = '';
		this.config.form.forEach(function(v){
			var v2 = fn.toUpperCase(v);
			jsx += tagContents.form_content.replace(/\$\{inputId\}/g,v2)
			event += tagContents.form_handle.replace(/\$\{inputId\}/g,v2)
			params += tpl.tagsInfo.tagContents.form_params.replace(/\$\{inputid\}/g,v)
		})
		//jsx替换
		content = content.replace(tagRegex.form_content,jsx)
		//event替换
		content = content.replace(tagRegex.form_handle,event)
		//params替换
		content = content.replace(tagRegex.form_params,params)

		fs.writeFileSync(w_file,content)
		//console.log(content)
	}

	createReducerModule(){
		var _this = this,
			tpl = this.tpls.reducer,	
			content = tpl.contents,	
			tagContents = tpl.tagsInfo.tagContents,
			tagRegex = tpl.tagsInfo.tagRegex,
			w_file = this.moduleDir + "/" + "reducer.js";
		content = this.commonReplace(content);
		var fetch = '',
			input = '';
		if(this.config.fetch){
			fetch += tagContents.reducer_fetch.replace(/\$\{MODULEID\}/g,this.config.MODULEID);
		}
		this.config.form && this.config.form.forEach(function(v){
			var v2 = "INPUT" + fn.toUpperCase(v,0,v.length) + "MODULEID";
			input += tagContents.reducer_input.replace(/\$\{const\}/g,v2)
		})
		content = content.replace(tagRegex.reducer_fetch,fetch)
		content = content.replace(tagRegex.reducer_input,input)
		fs.writeFileSync(w_file,content)
		//console.log(tagContents)
	}

	createActionModule(){
		var tpl = this.tpls.action,	
			content = tpl.contents,	
			tagContents = tpl.tagsInfo.tagContents,
			tagRegex = tpl.tagsInfo.tagRegex,
			w_file = this.moduleDir + "/" + "action.js";
		content = this.commonReplace(content);
		//imports替换
		var imports = '',
			fetch = '';
		if(this.config.fetch){
			imports += tagContents.action_import
							.replace("${import_var}","fetch")
							.replace("${import_libs}","isomorphic-fetch");
			fetch += tagContents.action_fetch.replace(/\$\{MODULEID\}/g,this.config.MODULEID)
		}
		var _const = "", 
			input = ""; 
		this.config.form && this.config.form.forEach(function(v){
			var v2 = "INPUT" + fn.toUpperCase(v,0,v.length) + "MODULEID";
			_const += tagContents.action_const.replace(/\$\{const\}/g,v2)
			input += tagContents.action_input.replace(/\$\{const\}/g,v2)
									.replace(/\$\{inputid\}/g,v)
		})
		//console.log(tagRegex.action_import)
		//import替换
		content = content.replace(tagRegex.action_import,imports)
		//常量替换
		content = content.replace(tagRegex.action_const,_const)
		//input替换
		content = content.replace(tagRegex.action_input,input)
		//fetch替换
		content = content.replace(tagRegex.action_fetch,fetch)
		//console.log(tagContents)
		fs.writeFileSync(w_file,content)
	}

}
module.exports = CreateModule;

//new CreateModule();

