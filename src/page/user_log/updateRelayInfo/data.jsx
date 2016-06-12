import React from 'react'
import { fieldSort ,toUpperCase } from 'function'
import * as common from 'common/user_log'

let column_dataIndexs = [ 
	'peerid',
	'result',
	'public',
	'local',
	'areaid',
	'ability',
	'max',
	'cur',
]
export let columns = [
	{
		title: '设备id',
	}, 
	{
		title: '转发状态更新结果',
	},
	{
		title: '公网地址',
	},
	{
		title: '内网地址',
	},
	{
		title: '区域ID',
	},
	{
		title: '能力值',
	},
	{
		title: '最大连接数及带宽',
	},
	{
		title: '当前连接数及带宽（Mbps）',
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
