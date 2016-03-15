//import React from 'react'
import * as fn from 'function'

let column_dataIndexs = [ 
	'app_name',
	'user_all',
	'user_new',
	'user_online',
	'daily_publish_traffic',
	'daily_play_traffic',
	'daily_play_count',
]
export let columns = [
	{
		title: '厂商',
	}, 
	{
		title: '用户数',
	}, 
	{
		title: '今日新增用户数',
	}, 
	{
		title: '在线用户数',
	}, 
	{
		title: '昨日推流流量',
	}, 
	{
		title: '昨日收看流量',
	}, 
	{
		title: '昨日观看人次',
	}, 
];


export function dataAdapter(data,app_count){
	let re = [];
	data[0]._reData_ = null;
	re = fn.fieldSort(data,column_dataIndexs,columns,function(key){
		let t_data = data[key];
		var appid = t_data.app_id;
		var app_info = app_count[appid]
		//console.debug(app_info)
		if(app_info){
			t_data.daily_publish_traffic = app_info.daily_publish_traffic
			t_data.daily_play_traffic = app_info.daily_play_traffic
			t_data.daily_play_count = app_info.daily_play_count
		}
	})
	return re;
}
