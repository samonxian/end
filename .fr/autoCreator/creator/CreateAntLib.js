var fs = require('fs');
var Q = require('q')
var fn = require('../../libs/function');
var vendor = require('../../../src/page/vendor');

function formatLibs(){
	var text = '';
	vendor.forEach(function(value,key){
		var v = value.split('/')[2];
		switch(v){
			case 'date-picker':
				v = "DatePicker";
				break;
			case 'time-picker':
				v = "TimePicker";
				break;
			case 'input-number':
				v = "InputNumber";
				break;
			case 'queue-anim':
				v = "QueueAnim";
				break;
		}
		text += fn.toUpperCase(v) + ":" + "require('"+value+"'),\n	";
	});
	
	return text;
}

function create(){
	var content = formatLibs();
	var w_file = './src/libs/antd/production.js';
	if(fs.existsSync(w_file)){
		fs.unlinkSync(w_file);
	}
	var antd_tpl = fs.readFileSync('./.fr/autoCreator/tpl/ant_lib_tpl.js',options = {
		encoding : 'utf-8'
	});
	var fd = fs.openSync(w_file,'a',0755);	
	var temp_con = antd_tpl.replace(/{tpl}/g,content);
	fs.writeSync(fd,temp_con); 
	fs.close(fd);
	console.log('success!')
}

create();