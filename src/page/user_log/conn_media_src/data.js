import React from 'react'
import { Table } from 'antd_c'

import { fieldSort ,toUpperCase,createAntdColumns } from 'function'

let column_dataIndexs = [ 
	'create_at',
	'peer_id',
	'ip_port',
	'area',
	'msg_gateway_ip',
	'remote_area',
	'session',
	'msg_id',
	'msg_remote_ips',
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
		title: '远程IP',
	},
	{
		title: '国家/省份/城市/ISP',
	},
	{
		title: 'session',
	},
	{
		title: '摄像头ID',
		render : function(text,record){
			return (
				<pre>
					{text} 	
				</pre>
			) 
		}
	},
	{
		title: '转发IP',
		className: 'none_head_table',
		render : function(text,record){
			let data = [
				{
					'0' : text[0].ip,
					'1' :text[1].ip,
					key : 0,
				},	
				{
					'0' :text[2].ip,
					'1' :text[3].ip,
					key : 1,
				},	
				{
					'0' :text[4].ip,
					'1' :text[5].ip,
					key : 2,
				},	
				{
					'0' :text[6].ip,
					'1' :text[7].ip,
					key : 3,
				},	
			];
			let columns = createAntdColumns(2);
			//console.log(columns)

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
			if(temp_data.tracker_ip_isp == '' || !temp_data.tracker_ip_isp){
				temp_data.tracker_ip_isp = '未知' 
			}
			if(temp_data.tracker_ip_city == '' || !temp_data.tracker_ip_city){
				temp_data.tracker_ip_city = '未知' 
			}
			temp_data.remote_area = temp_data.tracker_ip_country + "/" + temp_data.tracker_ip_prov 
									+ "/" + temp_data.tracker_ip_city 
									+ "/" + temp_data.tracker_ip_isp
			
		})
		user_log.posts.logs = re;
	}
	//console.log(re)
	return re;
}
