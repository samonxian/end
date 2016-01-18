import React from 'react'
import { fieldSort ,toUpperCase } from 'function'

let column_dataIndexs = [ 
	'create_at',
	'peer_id',
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
			//console.log(text)
			text && (text = toUpperCase(text.toString()));
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
			text && (text = toUpperCase(text.toString()));
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
			//console.log(temp_data.create_at)
			temp_data.ip_port = temp_data.ip + ":" + temp_data.port;
			temp_data.area = temp_data.public_ip_country + "/" + temp_data.public_ip_prov 
									+ "/" + temp_data.public_ip_city 
									+ "/" + temp_data.public_ip_isp
		})
		user_log.posts.logs = re;
	}
	return re;
}
