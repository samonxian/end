import React from 'react'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { EquipmentChart } from 'libs/defined-chart/EquipmentChart'
import { isEmptyObj, generateMixed, Format } from 'libs/function'
import { STROAGE_MONITOR_USER_TOTAL_AREA_COLOR } from './Until'

export class EquipmentTotal extends Component{
    dataAdapter(){
    	return {
    		adapterFormateData(data){
    			var value = [];
    			for(var i =0 ; i < data.length; i++){
    				value.push({
    					x : new Date(data[i][0]*1000),
    					y : data[i][1]
    				})
    			}
    			return [{
    				label : "总设备数",
    				values : value
    			}]
    		},
			formateDate(value){
				return new Date(value).Format("hh:mm");
			},
			adapterFormateAreaData(data){
				var retData = [];
				for(var i = 0; i < data.length; i++){
					var tempObj = data[i],
					    tempAreas = tempObj["area"],
					    arr = tempObj["device_num"],
					    values = [];

					for(var j = 0;j < arr.length;j++){
						values.push({
							x : new Date(arr[j][0]*1000),
							y : arr[j][1]
						})
					}

					retData.push({
						label : tempAreas,
						values : values
					})
				}

				return retData;
			},
			strokeFun(){
				return "rgba(31, 119, 180, 0.5)";
			},
			lineStrokeFun(index){
				return STROAGE_MONITOR_USER_TOTAL_AREA_COLOR[index];
			}
    	}
    }

	events(){
		return {
			tooltipHtml(y,arr,x){
				var arrHtl = [];
				for(var i = 0;i<arr.length; i++){
					arrHtl.push(<div key = { "equipment_total_tooltips_key_"+i }>{ arr[i]["areaName"] } : { arr[i]["yValue"] }</div>)
				}
				return <div className = "stroage_monitor_view_tooltips">
					         <div>时间：{ new Date(x).Format("yyyy-MM-dd hh:mm") }</div>
					         <div>总设备数：{ y }</div>
					         { arrHtl }
					    </div>;
			}
		}
	}
    
	render(){
		const { stroageCharProps } = this.props;

		if(isEmptyObj(stroageCharProps)){
			return false;
		}

		var content_width = (document.body.clientWidth - 280)*0.5833333333;
		var data = stroageCharProps["param"]["device_num"],
		    areaData = stroageCharProps["param"]["area_device_num"],
		    yMax = d3.max(data.map(function(arr){
		    	return arr[1];
		    })),
		    equipment_total = this.adapterFormateData(data),
		    equipment_city_total = this.adapterFormateAreaData(areaData);

		return (
			<div className = "stroage_monitor_view_char_equipment">
			     <h1>总设备数</h1>
			     <div>
				     <EquipmentChart
		                 data = { equipment_total }
		                 cityEquipmentData = { equipment_city_total }
		                 width = { content_width } 
		                 viewBox = { "0,0,"+content_width+",180" }
		                 tooltipHtml = { this.tooltipHtml }
		                 preserveAspectRatio = { "none" }
		                 tooltipMode = { "element" }
		                 height = { 180 }
		                 yMax = { yMax }
		                 yAxis = {{
				        	 label : "单位：个" }}
				         colorScale = { this.strokeFun }
				         tooltipOffset = {{top : -130,left : 0}}
				         lineStrokeFun = { this.lineStrokeFun }
				         xAxis = {{
				        	 tickFormat: this.formateDate,
				             label : "时间"}}
		                 margin = {{ top: 20, bottom: 20, left: 50, right: 60 }}
		                 style = {{ width:'100%',height:'180px' }}/>
		        </div>
			</div>
		)
	}
}