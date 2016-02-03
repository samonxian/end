/**
* 对Date的扩展，将 Date 转化为指定格式的String
* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
* @example 
* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
*/
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 *	字段返回值指定排序
 *@param data [object] 二维json对象,原始数据
 *@param fields [array] 一维数组,需要展示的fields
 *@param columns [array] 二维json对象,antd column设置
 *@param callback [fn] 参数为data 索引和data本身 
 */
export function fieldSort(data,fields,columns,callback){
	var reData = [];
	if(data && data[0] && !data[0]._reData_){
		data.forEach(function(value,key){
			reData[key] = { };
			callback && callback(key,data);
			fields.forEach(function(v,k){
				reData[key][v] = data[key][v];	
			})	
			//react组件，key值设定
			reData[key]['key'] = key;
			data[key]['_key_'] = key;
		})
		data[0]._reData_ = reData; 
	}else if(data && data[0]){
		reData = data[0]._reData_;
	}
	columns && columns.forEach(function(value,key){
		columns[key]['dataIndex'] = fields[key];
		columns[key]['key'] = fields[key];
	})
	return reData;
}

export function toUpperCase(string,start=0,end=1){
	var str1 = string.substr(start,end).toUpperCase();
	var str2 = string.substr(end);
	return str1 + str2;
}
/**
 * 生成数字title,columns，用于隐藏
 */
export function createAntdColumns(num){
	var columns = [];
	for(var i = 0;i < num;i++){
		columns[i] = { }
		columns[i].title = i;
		columns[i].dataIndex = i;
		columns[i].key = i;
	}
	return columns;
}
/**
 *	更加json对象拼接url参数(一级)
 *@params url [string] 需要拼接的url
 *@params params [objct] 需要拼接的url json参数
 */
export function params(url,params){
	var p = '';
	var i = 0;
	for(var key in params){
		var value = params[key];
		if(i == 0 && url.indexOf('?')==-1){
			p += '?'+key+'='+value;
		}else{
			p += '&'+key+'='+value;
		}
		i++;
	}
	//console.log(p)
	return url + p;
}
/**
 *	获取url以"/"这个为分割
 */
export function getUrlParams(url){
	var p = url.split('?')[0]
				.replace(/http(.*?)\:\/\/(.*?)\//g,'')
                .replace(/^\//g,'')
				.split('/');		
	return p;
}
/**
 *	判断对象是否为空
 */
export function isEmptyObj(obj){
	var name;
	for ( name in obj ) {
		return false;
	}
	return true;
}

/**
 *	全屏
 */
export function fullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 *	退出全屏
 */
export function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

