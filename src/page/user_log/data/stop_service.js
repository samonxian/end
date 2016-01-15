import React from 'react'
import { fieldSort ,toUpperCase } from '../../../libs/function'

export let title = {
	'start_service':'启动云服务',
	'stop_service':'停止云服务',
	'conn_media_src':'开始连接',
	'disc_connect':'断开连接',
	'start_transfer':'开始传输数据',
	'start_play':'开始播放',
	'recv_src_conn':'接收数据连接',
	'relay_status':'转发状态',
	'work_status':'运行状态',
	'rtmp_device':'RTMP设备日志',
	'camera_debug':'摄像头日志',
	'camera_time':'摄像头时间日志',
	'mobile_debug':'用户操作日志',
	'rtmp_conn_time':'RTMP 连接日志',
	'exception_event':'异常事件日志',
	'camera_time_last':'摄像头时间日志(最后)',
	'camera_debug_last':'摄像头日志(最后)',
}
let column_dataIndexs = [ 
	'create_at',
	'peer_id',
	//'msg_sn',
	//'client_type',
	'ip_port',
	'area',
	'session',
	'msg_is_play',
	'msg_is_capture',
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
		title: 'is_play',
		render : function(text,record){
			text = toUpperCase(text.toString());
			return (
				<pre>
					{text} 	
				</pre>
			) 
		}
	},
	{
		title: 'is_capture',
		render : function(text,record){
			text = toUpperCase(text.toString());
			return (
				<pre>
					{text} 	
				</pre>
			) 
		}
	}
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
			switch(temp_data.client_type){
				case 0:
					temp_data.client_type = '用户';
					break
				case 1:
					temp_data.client_type = '摄像头';
					break
			}
		})
	}
	//console.log(re)
	return re;
}
