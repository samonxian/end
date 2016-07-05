import React from 'react'
import { fieldSort ,toUpperCase } from 'function'
import * as common from 'common/user_log'

let column_dataIndexs = [ 
	'peerid',
	'result',
	'status',
]
export let columns = [
	{
		title: '设备id',
	}, 
	{
		title: '查询结果',
	},
	{
		title: '状态码',
	},
];


export function logData(user_log){
	let re = [];
	if(user_log.posts){
		re = fieldSort(user_log.posts.logs,column_dataIndexs,columns,function(key,data){
			var temp_data = data[key];
			temp_data.status = common.getCameraState(temp_data.status);
			
		})
	}
	return re;
}
