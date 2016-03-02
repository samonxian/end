import React from 'react'
import * as Antd from 'antd'
import { fieldSort ,toUpperCase,dealEU } from 'function'
import Graph from '../components/Graph'
import * as fn from 'function'

let column_dataIndexs = [ 
	'server_num',
	'active_connections',
	'bandwith',
	'conn_count',
	'ip_tracker_count',
	'conn_history',
	'bandwith_history',
]
export let columns = [
	{
		title: '服务器总数',
	}, 
	{
		title: '当前连接数',
	}, 
	{
		title: '总带宽',
		render: function(data,record){
			return(
				<span>{ fn.transformToKbMbGb(data) }</span>	
			)
		}
	}, 
	{
		title: 'HTTP请求数',
	}, 
	{
		title: 'IP调度请求数',
	}, 
	{
		title: '连接数曲线图',
		render: function(data,record){
			return(
				<Graph data={ data } left_text="" bottom_text="时间"/>	
			)
		}
	}, 
	{
		title: '带宽曲线图',
		render: function(data,record){
			data.forEach(function(v,k){
				v[1] = v[1] / 1000;
			})
			return(
				<Graph data={ data } left_text="带宽" bottom_text="时间"/>	
			)
		}
	}, 
];


export function dataAdapter(data){
	let re = [];
	re = fieldSort(data,column_dataIndexs,columns,function(key,data){
		let t_data = data[key];
	})
	return re;
}
