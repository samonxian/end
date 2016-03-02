import React from 'react'
import * as Antd from 'antd'
import * as user_log_common from 'common/user_log'
import { fieldSort ,toUpperCase,dealEU } from 'function'
import ViewInfo from './components/ViewInfo'

let column_dataIndexs = [ 
	'snapshot',
	'cid',
	'c_s_con',
	'relay_ip_t',
	'online',
	//'http_online',
	//'rtmp_online',
	'play',
	//'http_played',
	//'rtmp_played',
	'edge',
	'viwers_from_node',
	'source_time',
	'send_queue_max',
	'send_queue',
]
export let columns = [
	{
		title: '快照',
		render : function(text,record){
			return(
				<div>
					<img style={{display:"none"}} className="defaultImg" width="80" src={text} /> 
					<Antd.Spin size="small"/>
					<span style={{display:"none"}}>暂无快照</span>
				</div>
			)	
		}
	}, 
	{
		title: '摄像头id',
	}, 
	{
		title: <div>状态<div className="line"/>配置类型</div>,
		render : function(text,record){
			let config_type = user_log_common.getConfigType(text.config_type); 
			let state = user_log_common.getCameraState(text.state); 
				//console.debug(state)
			return (
				<div>
					{ text.state != 0 && <span>{dealEU(state)}</span> }
					{ text.state == 0 && <span style={{ color:'red' }}>{dealEU(state)}</span> }
					<div className="line"/>
					{ dealEU(state) }
				</div>)
		}
	},
	{
		title: <div>转发ip<br/>(调度/转发)</div>,
		render : function(text,record){
			return(
				<div>
					{ text.relay_ip || '暂无数据' }
					<div className="line"/>
					{ text.relay_ip2 || '暂无数据' }
				</div>
			)
		}
	},
	{
		title: <div>在线数<br/>(all/hls/rtmp)</div>,
		className : 't_c',
		render : function(text,record){
			return(
				<div>
					{ dealEU(text.all) }
					<div className="line"/>
					{ dealEU(text.hls) }
					<div className="line"/>
					{ dealEU(text.rtmp) }
				</div>
			)
		}
	},
	//{
		//title: 'hls在线数',
	//},
	//{
		//title: 'rtmp在线数',
	//},
	{
		title: <div>播放数<br/>(all/hls/rtmp)</div>,
		className : 't_c',
		render : function(text,record){
			return(
				<div>
					{ dealEU(text.all) }
					<div className="line"/>
					{ dealEU(text.hls) }
					<div className="line"/>
					{ dealEU(text.rtmp) }
				</div>
			)
		}
	},
	//{
		//title: 'hls历史播放数',
	//},
	//{
		//title: 'rtmp历史播放数',
	//},
	{
		title: '边缘节点信息',
		className: 't_c',
		render : function(text,record){
			let flag = false;
			let column_dataIndexs = [ 
				'ip',
				'viwers'
			]
			let columns = [
				{
					title:'边缘节点ip',
				},
				{
					title:'观看人数',
				},
			]
			function dataAdapter(data){
				let re = [];
				re = fieldSort(data,column_dataIndexs,columns,function(key,data){ })
				return re;
			}
			let data = dataAdapter(text);
			return (
				<ViewInfo size="small" columns={columns} data={data}/>
			) 
		}
	},
	{
		title: '观看人数',
	},
	{
		title: '源转发time值',
	},
	{
		title: '最大发送队列数',
	},
	{
		title: '平均发送队列数',
	},
];


export function dataAdapter(data){
	let re = [];
	re = fieldSort(data,column_dataIndexs,columns,function(key,data){
		let t_data = data[key];
		let cid = t_data.cid.toString();
		let num = cid[cid.length-1]
		t_data = dealEU(t_data)
		t_data.snapshot = `http://rtmp${num}.public.topvdn.cn/snapshot/${cid}.jpg`; 
		t_data.play = { }
		t_data.play.all = t_data.all_played;
		t_data.play.hls = t_data.http_played;
		t_data.play.rtmp = t_data.rtmp_played;
		t_data.online = { }
		t_data.online.all = t_data.all_online;
		t_data.online.hls = t_data.http_online;
		t_data.online.rtmp = t_data.rtmp_online;
		t_data.relay_ip_t = { }
		t_data.relay_ip_t.relay_ip = t_data.relay_ip; 
		t_data.relay_ip_t.relay_ip2 = t_data.source_ip_from_node; 
		t_data.c_s_con = { }
		t_data.c_s_con.state = t_data.state;
		t_data.c_s_con.config_type = t_data.config_type;
	})
	return re;
}
