import React from 'react'
import { title } from '../../user_log/title.js'
import { Table } from 'antd_c'
import { fieldSort ,toUpperCase } from 'function'
import * as common from 'common'
let type = {
	'257':'start_service',
	'258':'stop_service',
	'259':'conn_media_src',
	'260':'disc_connect',
	'261':'start_transfer',
	'262':'start_play',
	'265':'recv_src_conn',
	'263':'relay_status',
	'264':'work_status',
	'513':'rtmp_device',
	'769':'camera_debug',
	'770':'camera_time',
	'1025':'mobile_debug',
	'1026':'rtmp_conn_time',
	'272':'exception_event',
}
export let index = []
for(var i in type){
	index.push(type[i]);
}

export function deal(data){
	let re = {};
	//console.log(data)
	data.forEach(function(value,key){
		data[key].key = key;
		data[key].t_create_at = value.create_at.replace(/(.*?)\ /g,'');
		data[key].type = type[value.msg_cmd];
	})
	//console.log(re)
	return data;	
}


/**
 *	基础信息
 */
let base_dataIndexs = [ 
	'app_name',
	'app_id',
	'sdk_verion',
	'created',
]
export let base_columns = [
	{
		title: '厂家名称',
	}, 
	{
		title: 'APPID',
	}, 
	{
		title: 'SDK版本',
	}, 
	{
		title: '首次激活时间',
	}, 
];

export function baseData(data){
	let t_data = [];
	let re = [];
	t_data.push(data);
	if(data){
		re = fieldSort(t_data,base_dataIndexs,base_columns,function(key,data){
			var temp_data = data[key];
			temp_data.sdk_verion = '暂无'
		})
	}
	//console.log(re)
	return re;
}
/**
 * 当前状态	
 */
let state_dataIndexs = [ 
	'ip',
	'area_t',
	'isp',
	'config_type',
]
export let state_columns = [
	{
		title: 'IP地址',
	}, 
	{
		title: '地区',
	}, 
	{
		title: '运营商',
	}, 
	{
		title: '配置类型',
	}, 
];

export function stateData(data){
	let t_data = [];
	let re = [];
	t_data.push(data);
	if(data){
		re = fieldSort(t_data,state_dataIndexs,state_columns,function(key,data){
			var temp_data = data[key];
			temp_data.ip = temp_data.public_ip.concat(':',temp_data.public_port);
			temp_data.area_t = temp_data.country.concat('/',temp_data.prov,'/',temp_data.city);
			temp_data.config_type = common.getConfigType(temp_data.config_type);
		})
	}
	//console.log(re)
	return re;
}

let time_dataIndexs = [ 
	'start_service_time',
	'time_update_at_1',
	'state',
	't_ip',
]
export let time_columns = [
	{
		title: '上线时间',
	}, 
	{
		title: '最近心跳时间',
	}, 
	{
		title: '摄像头状态',
	}, 
	{
		title: '调度ip',
	}, 
];

export function timeData(data){
	let t_data = [];
	let re = [];
	t_data.push(data);
	if(data){
		re = fieldSort(t_data,time_dataIndexs,time_columns,function(key,data){
			var temp_data = data[key];
			temp_data.state = common.getCameraState(temp_data.state);
			temp_data.t_ip = temp_data.tracker_ip.concat(':',temp_data.tracker_port);
			temp_data.time_update_at_1 = new Date(temp_data.time_update_at*1000).Format("yyyy-MM-dd hh:mm:ss");
		})
	}
	//console.log(re)
	return re;
}

let time2_dataIndexs = [ 
	'y_ip',
	'open_time_update_at_1',
	'open_time',
	'msg_split',
]
export let time2_columns = [
	{
		title: '源转发IP',
	}, 
	{
		title: '最近打开时间',
	}, 
	{
		title: '最近打开耗时',
	}, 
	{
		title: '发送比',
		render : function(text,columns){
			let live_stat_dataIndexs = [ 
				'T5_T1_1',
				'Tpe_Tns_1',
				'Ts_Te_1',
			]
			let live_stat_columns = [
				{
					title: '总时间',
				}, 
				{
					title: '空闲',
				}, 
				{
					title: '发送',
				}, 
			];

			function live_statData(data){
				let t_data = [] ;
				t_data.push(data);
				let re = [];
				if(data){
					re = fieldSort(t_data,live_stat_dataIndexs,live_stat_columns,function(key,data){
						var temp_data = data[key];
						temp_data.T5_T1_1 = '总时间：'.concat(temp_data.T5_T1) ;
						temp_data.Tpe_Tns_1 = '空闲：'.concat(temp_data.Tpe_Tns) ;
						temp_data.Ts_Te_1 = '发送：'.concat(temp_data.Ts_Te) ;
					})
				}
				//console.log(re)
				return re;
			}
			return(
				<Table className="none_head_table"  size="small" 
						columns={live_stat_columns} dataSource={live_statData(text)} pagination={false} bordered/>
			)
		}
	}, 
];

export function time2Data(data){
	let t_data = [];
	let re = [];
	t_data.push(data);
	if(data){
		re = fieldSort(t_data,time2_dataIndexs,time2_columns,function(key,data){
			var temp_data = data[key];
			temp_data.y_ip = temp_data.relay_ip.concat(':',temp_data.relay_port);
			//temp_data.f_rate = temp_data.msg_split.Ts_Te / temp_data.msg_split.T5_T1;
			temp_data.open_time_update_at_1 = new Date(temp_data.open_time_update_at*1000).Format("yyyy-MM-dd hh:mm:ss");
		})
	}
	//console.log(re)
	return re;
}


let live_stat_dataIndexs = [ 
	'server_ip',
	'time',
	'time_diff',
	'bw_in',
	'publish_stat',
]
export let live_stat_columns = [
	{
		title: '转发ip',
	}, 
	{
		title: '推流时间',
	}, 
	{
		title: '接收时间差',
	}, 
	{
		title: '码率',
	}, 
	{
		title: '推送状态',
		render : function(text,columns){
			let live_stat_dataIndexs = [ 
				'ip',
				'send_queue',
			]
			let live_stat_columns = [
				{
					title: '目标服务器',
				}, 
				{
					title: '发送队列数',
				}, 
			];

			function live_statData(data){
				let t_data = data;
				let re = [];
				if(data){
					re = fieldSort(t_data,live_stat_dataIndexs,live_stat_columns,function(key,data){
						var temp_data = data[key];
					})
				}
				//console.log(re)
				return re;
			}
			return(
				<Table  size="middle" 
						columns={live_stat_columns} dataSource={live_statData(text)} pagination={false} bordered/>
			)
		}
	}, 
];

export function live_statData(data){
	let t_data = [];
	let re = [];
	t_data = data.live_stat;
	if(data){
		re = fieldSort(t_data,live_stat_dataIndexs,live_stat_columns,function(key,data){
			var temp_data = data[key];
		})
	}
	//console.log(re)
	return re;
}
