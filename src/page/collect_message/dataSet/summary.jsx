import React from 'react'
import * as Antd from 'antd'
var _this;
var originData;
export function getCurrentComponent(e){
	_this = e;
};
export let columns = [
	{
		title: '客户名',
		dataIndex: 'app',
		className: 'app',
	},
	
	{
		title: '公众设备数',
		dataIndex: 'clients_num',
	},
	
	{
		title: '观看人数',
		dataIndex: 'viewers',
	},
	
	{
		title: '推送/分发/观看流量',
		dataIndex: 'publish_traffic_bandwidth',
	},
	
	{
		title: '推送/分发/观看带宽',
		dataIndex: 'inner_traffic_bandwidth',
	},
	{
		title: '平均发送比',
		dataIndex: 'send_rate',
	},
	{
		title: '平均发送时间',
		dataIndex: 'send_time',
	},
	{
		title: '平均观看时间',
		dataIndex: 'view_time',
	},
	
];

export function dataAdapter(data){
	originData = data;
	let re = [];
	re = r2fn.antdTabelFieldBind(data,columns,function(d,key){
		var tdata = data[key];	
		d.publish_traffic_bandwidth = r2fn.flowTransformToKbMBGB(tdata.publish_traffic) + " / " + r2fn.flowTransformToKbMBGB(tdata.inner_traffic)  +  " / " + r2fn.flowTransformToKbMBGB(tdata.view_traffic);
		d.inner_traffic_bandwidth  = r2fn.transformToKbMbGb(tdata.publish_bandwidth) + " / " + r2fn.transformToKbMbGb(tdata.inner_bandwidth) + " / " + r2fn.transformToKbMbGb(tdata.view_bandwidth);
		d.send_time = r2fn.secondTranformToMH(d.send_time)
		d.view_time = r2fn.secondTranformToMH(d.view_time)
	})
	return re;
}
