import React from 'react'
import { fieldSort ,toUpperCase } from 'function'
import * as common from 'common/user_log'

let column_dataIndexs = [ 
	'peerid',
	'result',
	'ip',
	'error_code',
]
export let columns = [
	{
		title: '设备id',
	}, 
	{
		title: '获取转发结果',
	},
	{
		title: 'ip地址',
	},
	{
		title: '错误码',
	},
];


export function logData(user_log){
	let re = [];
	if(user_log.posts){
		re = fieldSort(user_log.posts.logs,column_dataIndexs,columns,function(key,data){
			var temp_data = data[key];
			temp_data.status = common.getConfigType(temp_data.status);
			
		})
	}
	return re;
}
