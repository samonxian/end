import React from 'react'
import { fieldSort ,toUpperCase } from 'function'
import * as common from 'common/user_log'

let column_dataIndexs = [ 
	'peerid',
	'peer_type',
	'result',
	'ip',
]
export let columns = [
	{
		title: '设备id',
	}, 
	{
		title: '设备类型',
	},
	{
		title: '退出登陆结果',
	},
	{
		title: 'ip地址',
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
