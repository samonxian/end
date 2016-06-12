import React from 'react'
import { fieldSort ,toUpperCase } from 'function'
import * as common from 'common/user_log'

let column_dataIndexs = [ 
	'peerid',
	'relay',
	'rtag',
	'ability',
	'connval',
]
export let columns = [
	{
		title: '设备id',
	}, 
	{
		title: '转发ip',
	},
	{
		title: 'rtag',
	},
	{
		title: '能力值',
	},
	{
		title: '当前连接数',
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
