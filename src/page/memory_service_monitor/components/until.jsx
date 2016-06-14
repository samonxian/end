import { generateMixed,getHost } from 'libs/function'
import React from 'react'

export const AREA_BG = ["rgba(102,102,102,0.3)","rgba(255,255,255,0)"]
export const THRITY_USER_TOTAL_COLOR = 'rgb(112, 186, 239)'
export const SEVEN_USER_TOTAL_COLOR = 'rgb(49, 181, 246)'
export const MEMORY_SERVICE_MONITOR_UNHEALTH = ''
export const MENORY_SERVICE_MONITOR_SUBHEALTH = ''
export const MENORY_SERVICE_MONITOR_SEVEN_NORMAL = 'rgb(47, 213, 238)'
export const MENORY_SERVICE_MONITOR_THRITY_NORMAL = 'rgb(112, 186, 239)'
export const MENORY_SERVICE_MONITOR_THRITY_BG = 'rgba(255, 255, 255, 0.5980392)'
export const MENORY_SERVICE_MONITOR_SEVEN_BG = "rgba(255, 255, 255, 0.2980392)"

export const renderContent = function(value, row, index) {
	 let obj = {
	    children: value,
	    props: {}
	 }
	 return obj
}

export const areaColor = function(data){
	var color = "rgba(255, 255, 255,0)";
	switch(data){
		case "佛山":
		    color = "#6FB353";
		    break;
		case "台州":
		    color = "#2C94C3";
		    break;
		case "石家庄":
		    color = "rgb(79, 84, 222)";
		    break;
		default:
		  break;
	}
	return color;
}

export const intoIndexPage = function(text,record){
	var cidArr= record["cid"].split(","),
	    location = getHost(),
	    arr = [];
	for(var i=0;i<cidArr.length;i++){
		arr.push(<a className="memory_service_monitor_a" key = {"memory_service_monitor_table_key"+new Date().getTime()+generateMixed(6)} 
			       href = {"http://"+location+'/new_index_camera?cid='+cidArr[i]}>{cidArr[i]}</a>)
	}
	return arr;
}

export const MEMORY_SERVICE_MONITOR_HEADER = [
    {
	 	title : "AREA",
		dataIndex : "area",
		render : renderContent
	},
	{
		title : "GROUP_ID",
		dataIndex : "group_id",
		render : renderContent
	},
	{
		title : "CYCLE",
		dataIndex : "cycle",
		render : renderContent
	},
	{
		title : "CID",
		dataIndex : "cid",
		render : intoIndexPage
	}
]
