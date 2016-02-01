import React from 'react'
import * as fn from 'function'
let column_dataIndexs = [ 
	'server_count',
	'up',
	'down',
	'cn_count',
]
export let columns = [
	{
		title: '节点服务器数',
	}, 
	{
		title: '上传带宽',
		className : 't_c',
		render : function(text,columns){
			return(
				<pre>
				{
					text
				}
				</pre>
			)
		}
	},
	{
		title: '下载带宽',
		className : 't_c',
		render : function(text,columns){
			return(
				<pre>
				{
					text
				}
				</pre>
			)
		}
	},
	{
		title: '当前连接数',
	},
];

export function getData(data){
	//console.debug(data)
	var server_count = 0,upSpeed=0,downSpeed=0,cn_count=0,totalUpSpeed=0,totalDownSpeed=0;
	data.forEach(function(value,key){
		server_count++; 
		upSpeed += value.CurrentUpSpeed;
		downSpeed += value.CurrentDownSpeed;
		cn_count += value.Connections;
		totalUpSpeed += value.TotalUpSpeed;
		totalDownSpeed += value.TotalDownSpeed;
	}) 
	var t_data = {
		upSpeed : upSpeed,
		totalUpSpeed : totalUpSpeed,
		downSpeed : downSpeed,
		totalDownSpeed : totalDownSpeed,
		server_count: server_count,
		cn_count: cn_count,
	}; 
	var d_data = []
	d_data.push(t_data)
	//console.debug(d_data)
	let re = [];
	re = fn.fieldSort(d_data,column_dataIndexs,columns,function(key,data2){
		var t_data = data2[key]
		t_data.up = t_data.upSpeed.toFixed(1) + '/' + t_data.totalUpSpeed + '\n' + ((t_data.upSpeed/t_data.totalUpSpeed)*100).toFixed(1) + "%";
		t_data.down = t_data.downSpeed.toFixed(1) + '/' + t_data.totalDownSpeed + '\n' + ((t_data.downSpeed/t_data.totalDownSpeed)*100).toFixed(1) + "%";
		//console.debug(t_data)
	})
	return re;
}
