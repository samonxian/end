//公共方法
window.r2fn = require('function');;
//公共Redux actionCreator
var Fetch = require('r2/fetch/Fetch');
window.r2fetch = function(option){
	return new Fetch(option)
};
