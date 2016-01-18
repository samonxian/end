import React from 'react'
import { fieldSort ,toUpperCase } from 'function'

let column_dataIndexs = [ 
	'create_at',
	'peer_id',
	'ip_port',
	'area',
	'session',
	'msg_data_cnt',
	'msg_packet_cnt',
	'msg_player_cnt',
	'msg_push_frame_cnt',
	'msg_pop_frame_cnt',
	'msg_push_avg_speed',
	'msg_send_avg_speed',
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
		title: '一级缓冲',
	},
	{
		title: '二级缓冲',
	},
	{
		title: '播放缓冲',
	},
	{
		title: '采集帧率',
	},
	{
		title: '播放帧率',
	},
	{
		title: '采集码流',
	},
	{
		title: '采集码流',
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
		user_log.posts.logs = re;
	}
	//console.log(re)
	return re;
}
