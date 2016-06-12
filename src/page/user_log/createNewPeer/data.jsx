import React from 'react'
import { fieldSort ,toUpperCase } from 'function'
import * as common from 'common/user_log'

let column_dataIndexs = [ 
	'peerid',
	'result',
	'public',
	'local',
	'status',
	'ip_tag',
]
export let columns = [
	{
		title: '设备id',
	}, 
	{
		title: '创建新peer结果',
		className : '',
	},
	{
		title: '公网IP',
	},
	{
		title: '内网IP',
	},
	{
		title: '状态码',
	},
	{
		title: 'ip_tag',
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
