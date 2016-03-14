import React from 'react'
import { Table } from 'antd'

import { fieldSort ,toUpperCase,createAntdColumns } from 'function'

let column_dataIndexs = [ 
	'create_at',
	'peer_id',
	'ip_port',
	'area',
	'session',
	'cid',
	'relay_server',
	'error_type',
]


export let columns = [
	{
		title: '汇报时间',
	}, 
	{
		title: 'UID',
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
		title: '摄像头id',
	},
	{
		title: '3个转发服务器',
		render : function(text,record){
			let data = text; 
			let columns = [
				{
					title : 'IP',
				},
				{
					title : '端口',
				},
			];
			let column_dataIndexs = [
				'ip',	
				'port',	
			]
			data = fieldSort(data,column_dataIndexs,columns);
			return (
				<Table size="small" columns={columns} dataSource={data} pagination={false} >

				</Table>
			) 
		}
	},
	{
		title: '失败原因',
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
