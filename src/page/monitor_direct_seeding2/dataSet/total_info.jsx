import React from 'react'
import * as Antd from 'antd'
import { fieldSort ,toUpperCase,dealEU } from 'function'
import Graph from '../components/Graph'
import * as fn from 'function'

let column_dataIndexs = [ 
	'server_num',
	'con',
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
		title: '连接数',
		render: function(data,record){
			return(
				<span>
					<span>当&nbsp;&nbsp;&nbsp;&nbsp;前：{ data.active_connections }</span>
					<br/>
					<span>24小时：{ data.last_24_max_live}</span>
					<br/>
					<span>昨&nbsp;&nbsp;&nbsp;&nbsp;天：{ data.yeaterday_max_live }</span>
				</span>
			)
		}
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
				//v[1] = v[1] / 1000;
			})
			let format = function(d){
				return fn.transformToKbMbGb(d);
			}
			return(
				<Graph data={ data } left_text="带宽" bottom_text="时间" formatY={format}/>	
			)
		}
	}, 
];


export function dataAdapter(data){
	let re = [];
	re = fieldSort(data,column_dataIndexs,columns,function(key,data){
		let t_data = data[key];
		t_data.con = { }
		t_data.con.active_connections = t_data.active_connections; 
		t_data.con.last_24_max_live = t_data.last_24_max_live; 
		t_data.con.yeaterday_max_live = t_data.yeaterday_max_live; 
	})
	return re;
}
