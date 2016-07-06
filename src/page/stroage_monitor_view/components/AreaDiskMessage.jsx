
import React from 'react'
import { Spin, Row, Col } from 'antd'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { flowTransformToKbMBGB, isEmptyObj } from 'libs/function'
import {STROAGE_MONITOR_USER_TOTAL_AREA_COLOR } from './Until'

export class AreaDiskMessage extends Component{

	dataAdapter(){
		return {
			adapterAreaData(data){
				var maxSpace = d3.max(data.map(function(obj){
						return obj["space_total"];
					})),
				    maxDisk = d3.max(data.map(function(obj){
				    	return obj["disc_total"]
				    })),
				    areaItems = ((document.body.clientWidth - 280)*0.2083333333  - 10*(data.length - 1))/data.length,
				    smallWidth = (areaItems - 20)/2,
				    htl = [];

				for(var i=0;i<data.length;i++){
					var tempObj = data[i],
					    diskHeight = (data[i]["disc_total"]/maxDisk)*100 - 35,
					    spaceHeight = (data[i]["space_total"]/maxSpace)*100 -35,
					    disc_wait = (data[i]["disc_wait"]/data[i]["disc_total"])*100,
					    disc_err = (data[i]["disc_error"]/data[i]["disc_total"])*100,
					    disk_useing = (data[i]["disc_used"]/data[i]["disc_total"])*100,
					    used_space = (data[i]["space_used"]/data[i]["space_total"])*100;

					htl.push(<div key = {"stroage_monitor_view_area_disk_message_key_"+i}
						className = "stroage_monitor_view_area_disk_items">
						    <div className = "container">
						        <div className = "container_disk">
							        <div style = {{ height : diskHeight + "%",background : STROAGE_MONITOR_USER_TOTAL_AREA_COLOR[i]}}
							            className = "stroage_monitor_view_area_disk_total">
							            <div 
							               style = {{height : disc_wait+"%"}}
							               className = "disk_wait"><span className = "rotate">{ data[i]["disc_wait"] === 0? "" : data[i]["disc_wait"] }</span></div>
							            <div 
							                style = {{bottom : disc_wait + "%",height : disc_err+"%"}}
							                className = "disk_error"><span className = "rotate">{ data[i]["disc_error"] === 0? "" : data[i]["disc_error"] }</span></div>
							            <div 
							                style = {{bottom : (disc_wait + disc_err) + "%",height : disk_useing+"%",background : STROAGE_MONITOR_USER_TOTAL_AREA_COLOR[i]}}
							                className = "disk_useing"><span className = "rotate">{ data[i]["disc_used"] === 0? "" : data[i]["disc_used"] }</span></div>
							        </div>
							        <div style = {{bottom : diskHeight + "%"}}
							            className = "total rotate">{ data[i]["disc_total"] }</div>
							    </div>
							    <div className = "container_space">
							        <div style = {{ height : spaceHeight + "%",background : STROAGE_MONITOR_USER_TOTAL_AREA_COLOR[i]}}
							             className = "stroage_monitor_view_area_space_total">
							             <div 
							                 style = {{height : used_space+"%"}}
							                 className = "disk_used"><span className = "rotate">{ flowTransformToKbMBGB(data[i]["space_used"]) }</span></div>
							        </div>
							        <div style = {{bottom : spaceHeight + "%"}}
							            className = "total rotate">{ flowTransformToKbMBGB(data[i]["space_total"]) }</div>
							    </div>
						    </div>
						    <div className = "desc clear">
						         <span style = {{ background : STROAGE_MONITOR_USER_TOTAL_AREA_COLOR[i]}}
						             className = "stroage_monitor_view_area_icon_items"></span>
						         <span className = "areaName">{ tempObj["area"] }</span>
						    </div>
						</div>)
				}

				return htl;
			}
		}
	}

	render(){
		const { stroageMonitorViewProps } = this.props;

		if(isEmptyObj(stroageMonitorViewProps)){
        	return false;
        }

		var diskMessage = stroageMonitorViewProps["param"]["area_info"],
		       htl = this.adapterAreaData(diskMessage);


		return (<div className = "stroage_monitor_view_disk_message">
			<div className = "stroage_monitor_view_disk_title">
			     <h1>磁盘信息</h1>
			</div>
			<div className = "clear"> { htl }</div>
		</div>)
	}
} 