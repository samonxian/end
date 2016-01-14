import React from 'react'
import { fieldSort ,toUpperCase } from '../../../libs/function'

let column_dataIndexs = [ 
	'create_at',
	'peer_id',
	//'msg_sn',
	//'client_type',
	'ip_port',
	'area',
	'session',
	'msg_hash_cid',
	'msg_conn0_t',
	'msg_conn1_t',
	'msg_conn2_t',
	'msg_first_stream_t',
	'msg_first_packet_t',
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
		title: '哈希ID',
	},
	{
		title: 'HS-TCP',
	},
	{
		title: 'HS-RTMP',
	},
	{
		title: 'HD-msg',
	},
	{
		title: 'Recv-fp',
	},
	{
		title: 'Recv-fs',
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
