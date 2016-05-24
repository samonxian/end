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
		title: '带宽',
		dataIndex: 'bw_in',
		render(data,columns){
			return (
				<span>{ data }</span>
			)
		}
	},

	{
		title: '上级主机名',
		dataIndex: 'paddress',
	},
	{
		title: '上级IP',
		dataIndex: 'pip',
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
		title: '下级主机名',
		dataIndex: 'naddress',
	},
	{
		title: '下级IP',
		dataIndex: 'nip',
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
];

export function dataAdapter(data){
	originData = data;
	//console.debug(data)
	let re = [];
	re = r2fn.antdTabelFieldBind(data,columns,function(d,key){
		var tdata = data[key];
		//console.debug(tdata)
		d.paddress = tdata.source.address;
		d.pip = tdata.source.ip;
		d.naddress = tdata.target.address;
		d.nip = tdata.target.ip;
		d.bw_in = r2fn.transformToKbMbGb(tdata.bw_in);
		//console.debug(tdata.bw_in)
	})
	return re;
}

