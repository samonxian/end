import React from 'react'
import { fieldSort ,toUpperCase } from 'function'

let column_dataIndexs = [ 
	'create_at',
	'peer_id',
	'ip_port',
	'area',
	'session',
	'cid',
	'relay_server',
	'DNSCosttime',
	'connect0time',
	'connect1time',
	'connect2time',
	'connect3time',
	'connect4time',
	'connectType',
	'reserved',
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
		title: '摄像头id',
	},
	{
		title: '3个转发服务器',
		render(text,columns){
			return (
				<span>
					{
						text.map((v,k)=>{
							return (
								<span key={k}>
									{v.ip + ":" + v.port} 
									<br />
								</span>
							)
						})
					}
				</span>
			)
		}
	},
	{
		title: 'DNS解析耗时',
	},
	{
		title: 'TCP连接耗时',
	},
	{
		title: 'RTMP握手耗时',
	},
	{
		title: 'RTMP连接耗时',
	},
	{
		title: '收到第一个包的总时间',
	},
	{
		title: '收到第一帧数据的总时间',
	},
	{
		title: '客户端类型',
	},
	{
		title: '保留字段',
	},
];


export function logData(user_log){
	let re = [];
	if(user_log.posts){
		re = fieldSort(user_log.posts.logs,column_dataIndexs,columns,function(key,data){
			var temp_data = data[key];
			temp_data.create_at = temp_data.create_at.replace(/[^-]+\-/,'');
			//console.log(temp_data.create_at)
			temp_data.ip_port = temp_data.ip + ":" + temp_data.port;
			temp_data.area = temp_data.public_ip_country + "/" + temp_data.public_ip_prov 
									+ "/" + temp_data.public_ip_city 
									+ "/" + temp_data.public_ip_isp
			switch(temp_data.connectType){
				case 1:
					temp_data.connectType = "拉流端";
					break;	
				case 2:
					temp_data.connectType = "推流端";
					break;	
			}
			
		})
	}
	return re;
}
