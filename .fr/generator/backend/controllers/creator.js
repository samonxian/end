'use strict';
var parse = require('co-body');
var CreateModule = require('../script/generator/CreateModule')

/**
 * Module dependencies.
 */

var page = {a:"2",b:"2",c:"3"};
module.exports = function* creator(next) {
	var post = yield parse(this, { limit: '1kb' });
	post = JSON.parse(post);
	this.body = page;
	this.status = 200;
	if(post.moduleId){
		new CreateModule({
			moduleId : post.moduleId
		});	
		//console.log(post)
	}
};
