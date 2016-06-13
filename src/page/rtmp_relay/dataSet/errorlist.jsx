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
		title: '上级主机名',
		dataIndex: 'paddress',
	},
	
	{
		title: '下级主机名',
		dataIndex: 'naddress',
	},
];

export function dataAdapter(data){
	originData = data;
	//console.debug(data)
	let re = [];
	re = r2fn.antdTabelFieldBind(data,columns,function(d,key){
		var tdata = data[key];
		d.paddress = tdata.address; 
		//console.debug(tdata.send_relays)
		d.naddress = tdata.send_relays.address; 
	})
	return re;
}

