import React from 'react'
import { fieldSort ,toUpperCase } from 'function'
import * as common from 'common/user_log'

let column_dataIndexs = [ 
	'msg_from',
	'msg_to',
	'result',
	'msg_id',
	'msg_type',
	'msg_len',
	'send_count',
]
export let columns = [
	{
		title: '消息发送者',
	}, 
	{
		title: '消息接收者',
	},
	{
		title: '处理消息结果',
	},
	{
		title: '消息id',
	},
	{
		title: '消息类型',
	},
	{
		title: '消息长度',
	},
	{
		title: '发送次数',
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
