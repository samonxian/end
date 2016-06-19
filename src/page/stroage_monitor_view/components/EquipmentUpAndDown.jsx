import React from 'react'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { AreaChart } from 'libs/defined-chart/AreasChart'
import { isEmptyObj, generateMixed, Format } from 'libs/function'

export class EquipmentUpAndDown extends Component{
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
    			return {
    				label : "5分钟上线设备数",
    				values : value
    			}
    		},
    		adapterFormateDown(data){
    			var value = [];
    			for(var i =0 ; i < data.length; i++){
    				value.push({
    					x : new Date(data[i][0]*1000),
    					y : data[i][1]
    				})
    			}
    			return {
    				label : "5分钟下线设备数",
    				values : value
    			}
    		},
    		adapterYmax(arr){
				return arr[1];
			},
			formateDate(value){
				return new Date(value).Format("hh:mm");
			}
    	}
    }

	events(){
		return {
			tooltipHtml(y,x){
				return <div className = "stroage_monitor_view_tooltips">
					         <div>时间：{ new Date(x).Format("yyyy-MM-dd hh:mm") }</div>
					         <div>5分钟上线设备数：{ y[0] }</div>
					         <div>5分钟下线设备数：{ y[1] }</div>
					    </div>;
			}
		}
	}
    
	render(){
		const { stroageCharProps } = this.props;

		if(isEmptyObj(stroageCharProps)){
			return false;
		}

		var content_width = (document.body.clientWidth - 280)*0.4583333333;
		var equipmentUp = stroageCharProps["param"]["on_line_num"],
		    equipmentDown = stroageCharProps["param"]["off_line_num"],
		    yMax = d3.max(this.adapterYmax(equipmentUp)),
		    equipmentUpObj = this.adapterFormateData(equipmentUp),
		    equipmentDownObj = this.adapterFormateDown(equipmentDown),
		    totalArr = [];
        
		totalArr.push(equipmentUpObj);
		totalArr.push(equipmentDownObj);
  
		return (
			<div className = "stroage_monitor_view_char_equipment">
			     <h1>5分钟上/下线设备数</h1>
			     <div>
			         <AreaChart
		                 data={ totalArr }
		                 width={ content_width } 
		                 viewBox = { "0,0,"+content_width+",180" }
		                 tooltipHtml = { this.tooltipHtml }
		                 preserveAspectRatio = { "none" }
		                 tooltipMode = { "element" }
		                 height={ 180 }
		                 yMax = { yMax }
		                 separate = { true }
				         tooltipOffset = {{top : -100,left : 0}}
				         yAxis = {{
				         	label : "单位：个"
				         }}
				         xAxis={{
				        	 tickFormat: this.formateDate,
				             label : "时间"}}
		                 margin={{ top: 20, bottom: 20, left: 50, right: 60 }}
		                 style = {{ width:'100%',height:'180px' }}/>
		        </div>
			</div>
		)
	}
}