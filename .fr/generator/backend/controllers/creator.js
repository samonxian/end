'use strict';
var path = require('path')
var parse = require('co-body');
var CreateModule = require('../script/generator/CreateModule')



function basicSetting(){
	var obj = {}
	obj.savePath = path.resolve("src/page");
	obj.path = path.resolve(".fr/generator/backend/script/tpls/module/basic");
	return obj;
}
/**
 * Module dependencies.
 */
module.exports = function* creator(next) {
	var post = yield parse(this, { limit: '9kb' });
	post = JSON.parse(post);
	var msg = { }
	if(post.moduleId){
		var setting = basicSetting();
		//post.form = [
			//'cid',
			//'test',
		//];
		var params = {
			moduleId : post.moduleId,
			path : setting.path,
			savePath : setting.savePath,
			type : post.type,
		}
		if(post.form){
			params.form = post.form;
		}
		if(post.fetch){
			params.fetch = post.fetch;
		}
		var createModule = new CreateModule(params);	
		msg = {
			error : createModule.error,
			msg : createModule.msg,
		}
		if(!post.type){
			msg.type = "toSave";
		}else{
			msg.type = "saved";
		}
		//console.log(createModule.contents)
	}else{
		msg = {
			ret : -1,
			error : "请填写表单！",
		}
	}
	this.body = msg;
	this.status = 200;
};
