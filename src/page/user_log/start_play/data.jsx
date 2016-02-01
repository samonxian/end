import React from 'react'
import { fieldSort ,toUpperCase } from 'function'

let column_dataIndexs = [ 
	'create_at',
	'peer_id',
	'ip_port',
	'area',
	'session',
	'msg_uid',
	'msg_cid',
	'msg_req_tracker_time',
	'msg_test_tracker_time',
	'msg_data_transfer_time',
	'msg_total_time',
]
export let columns = [
	{
		title: '汇报时间',
	}, 
	{
		title: 'UID',
		className : '',
	},
	{
		title: '节点IP',
	},
	{
		title: '国家/省份/城市/ISP',
	},
	{
		title: 'session',
	},
	{
		title: '用户ID',
	},
	{
		title: '设备ID',
	},
	{
		title: '请求转发耗时',
	},
	{
		title: '测试转发耗时',
	},
	{
		title: '数据传输耗时',
	},
	{
		title: '总耗时',
	},
];

export function logData(user_log){
	let re = [];
	if(user_log.posts){
		re = fieldSort(user_log.posts.logs,column_dataIndexs,columns,function(key,data){
			var temp_data = data[key];
			temp_data.create_at = temp_data.create_at.replace(/[^-]+\-/,'');
			temp_data.ip_port = temp_data.ip + ":" + temp_data.port;
			temp_data.area = temp_data.public_ip_country + "/" + temp_data.public_ip_prov 
									+ "/" + temp_data.public_ip_city 
									+ "/" + temp_data.public_ip_isp
		})
	}
	//console.log(re)
	return re;
}
