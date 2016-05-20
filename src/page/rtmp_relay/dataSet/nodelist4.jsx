import React from 'react'
import * as Antd from 'antd'
var _this;
var originData;
export function getCurrentComponent(e){
	_this = e;
};
export let columns = [
	{
		title: '与下游服务器的连接数',
		dataIndex: 'down_conn',
	},
	
	{
		title: '发送队列峰值',
		dataIndex: 'queues_peak',
	},
	{
		title: '发送队列95峰值',
		dataIndex: 'queues_95peak',
	},
	{
		title: '发送队列均值',
		dataIndex: 'queues_ave',
	},
];

export function dataAdapter(data){
	originData = data;
	//console.debug(data)
	let re = [];
	re = r2fn.antdTabelFieldBind(data,columns,function(d,key){
		var tdata = data[key];
		//console.debug(tdata.download_width)
		d.bytes_in = r2fn.flowTransformToKbMBGB(d.bytes_in)
	})
	return re;
}

