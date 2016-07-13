import React from 'react'
import { Link }from 'react-router'
import * as Antd from 'antd'
var _this;
var originData;
export function getCurrentComponent(e){
	_this = e;
};
export let columns = [
	
	{
		title: '主机名',
		dataIndex: 'address',
	},
	
	{
		title: 'IP',
		dataIndex: 'ip',
		render(data,columns,id){
			return (
				<span>
					{
						data.map((v,k)=>{
							if(v.indexOf("192.168.2") != -1){
								return false;
							}
							return (
								<div key={ k }>{ v }</div>
							)
						})
					}
				</span>
			)
		}
	},
	{
		title: '服务器角色',
		dataIndex: 'mode',
	},
	{
		title: '推送连接数比',
		dataIndex: 'dconns',
	},
	{
		title: '接收连接数比',
		dataIndex: 'uconns',
	},
	{
		title: '接收带宽比',
		dataIndex: 'ubandwidth',
	},
	{
		title: '推送带宽比',
		dataIndex: 'dbandwidth',
	},
];

export function dataAdapter(data){
	originData = data;
	//console.debug(data)
	let re = [];
	re = r2fn.antdTabelFieldBind(data,columns,function(d,key){
		var tdata = data[key];
		//console.debug(tdata.download_width)
		d.dconns = tdata.down_conn + " / " + tdata.download_connections; 
		d.uconns = tdata.up_conn + " / " + tdata.upload_connections; 
		d.ubandwidth = r2fn.transformToKbMbGb(tdata.bw_in) + " / " + r2fn.transformToKbMbGb(parseInt(tdata.upload_width,10)); 
		d.dbandwidth = r2fn.transformToKbMbGb(tdata.bw_out) + " / " + r2fn.transformToKbMbGb(parseInt(tdata.download_width,10)); 
	})
	return re;
}

