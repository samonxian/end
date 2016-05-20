import React from 'react'
import * as Antd from 'antd'
var _this;
var originData;
export function getCurrentComponent(e){
	_this = e;
};
export let columns = [
	{
		title: '下载流量',
		dataIndex: 'bytes_in',
	},
	
	{
		title: '下载带宽',
		dataIndex: 'bw_in',
	},
	{
		title: '与上游服务器连接数',
		dataIndex: 'up_conn',
	},
	{
		title: '接收情况95值取',
		dataIndex: 'send_time_95peak',
	},
	{
		title: '接收情况均值',
		dataIndex: 'send_time_ave',
	},
	{
		title: '接收情况峰值',
		dataIndex: 'send_time_peak',
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

