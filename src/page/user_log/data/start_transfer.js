import React from 'react'
import { Table } from 'antd_c'

import { fieldSort ,toUpperCase,createAntdColumns } from '../../../libs/function'

let column_dataIndexs = [ 
	'create_at',
	'peer_id',
	'ip_port',
	'area',
	'session',
	'msg',
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
		title: '转发信息',
		render : function(text,record){
			let data = text; 
			let columns = [
				{
					title : 'IP',
				},
				{
					title : '目标接受率',
				},
				{
					title : '转发接受率',
				},
				{
					title : '延迟',
				},
			];
			let column_dataIndexs = [
				'ip',	
				'recv_rate_to_relay',	
				'recv_rate',	
				'time',	
			]
			data = fieldSort(data,column_dataIndexs,columns);
			return (
				<Table size="small" columns={columns} dataSource={data} pagination={false} >

				</Table>
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
			if(temp_data.tracker_ip_isp == ''){
				temp_data.tracker_ip_isp = '未知' 
			}
			temp_data.remote_area = temp_data.tracker_ip_country + "/" + temp_data.tracker_ip_prov 
									+ "/" + temp_data.tracker_ip_city 
									+ "/" + temp_data.tracker_ip_isp

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
