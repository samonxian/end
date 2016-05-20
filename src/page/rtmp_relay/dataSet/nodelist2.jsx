import React from 'react'
import * as Antd from 'antd'
var _this;
var originData;
export function getCurrentComponent(e){
	_this = e;
};
export let columns = [
	
	{
		title: '最后更新时间',
		dataIndex: 'updated_at',
	},
	{
		title: '时间戳',
		dataIndex: 'timestamp',
	},
	{
		title: '地区',
		dataIndex: 'area',
	},
	{
		title: '下载流量',
		dataIndex: 'bytes_in',
	},
	{
		title: '上传流量',
		dataIndex: 'bytes_out',
	},
	{
		title: '观看人数',
		dataIndex: 'viwers',
	},
	{
		title: 'stat页面地址',
		dataIndex: 'staturl',
	},
];

export function dataAdapter(data){
	originData = data;
	//console.debug(data)
	let re = [];
	re = r2fn.antdTabelFieldBind(data,columns,function(d,key){
		var tdata = data[key];
		//console.debug(tdata.download_width)
		d.bytes_out = r2fn.flowTransformToKbMBGB(d.bytes_out)
		d.bytes_in = r2fn.flowTransformToKbMBGB(d.bytes_in)
	})
	return re;
}

