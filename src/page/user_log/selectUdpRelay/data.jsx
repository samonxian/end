import React from 'react'
import { fieldSort ,toUpperCase } from 'function'

let column_dataIndexs = [ 
	'peerid',
	'result',
	'wanted',
	'selected',
]
export let columns = [
	{
		title: '设备id',
	}, 
	{
		title: '获取UDP转发结果',
		className : '',
	},
	{
		title: '请求获取转发数目',
	},
	{
		title: '查询符合结果的转发数目',
	},
];


export function logData(user_log){
	let re = [];
	if(user_log.posts){
		re = fieldSort(user_log.posts.logs,column_dataIndexs,columns,function(key,data){
			var temp_data = data[key];
			
		})
	}
	return re;
}
