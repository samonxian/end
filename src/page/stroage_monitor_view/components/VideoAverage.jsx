import React from 'react'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { AreaChart } from 'libs/defined-chart/AreaChart'
import { isEmptyObj, generateMixed, Format } from 'libs/function'
import { formate_date } from './Until'

export class VideoAverage extends Component{

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
    				label : "录像平均观看时长",
    				values : value
    			}
    		},
    		adapterYmax(arr){
				return arr[1];
			},
			formateDate(value){
				return new Date(value).Format("hh:mm");
			},
			strokeFun(){
				return "rgba(111, 179, 83, 0.3)"
			}
    	}
    }

	events(){
		var _this = this;
		return {
			tooltipHtml(y,yValueCumulative,x){
				var yValue = 0;
				if(_this.unit === "秒"){
					yValue = y + '秒';
				}else if(_this.unit === "分"){
					yValue = Math.round(y / 60 * 100) / 100  + '分';
				}else if(_this.unit === "小时"){
					yValue = Math.round(t_value / 60 / 60 * 100 ) / 100  + '小时';
				}
				return <div className = "stroage_monitor_view_tooltips">
					         <div>时间：{ new Date(x).Format("yyyy-MM-dd hh:mm") }</div>
					         <div>录像平均观看时长：{ yValue }</div>
					    </div>;
			}
		}
	}
    
	render(){
		const { stroageCharProps } = this.props;

		if(isEmptyObj(stroageCharProps)){
			return false;
		}

		var content_width = (document.body.clientWidth - 280)*0.3333333333;
		var data = stroageCharProps["param"]["view_time"],
		    yMax = d3.max(data.map(function(arr){
		    	return arr[1];
		    })),
		    equipment_total = this.adapterFormateData(data),
		    formateObj = formate_date(equipment_total["values"]);

		this.unit = formateObj["unit"];
  
		return (
			<div className = "stroage_monitor_view_char_equipment">
			     <h1>平均录像观看时长</h1>
			     <div>
				     <AreaChart
		                 data={ equipment_total }
		                 width={ content_width } 
		                 viewBox = { "0,0,"+content_width+",180" }
		                 tooltipHtml = { this.tooltipHtml }
		                 preserveAspectRatio = { "none" }
		                 tooltipMode = { "element" }
		                 height={ 180 }
		                 yMax = { yMax }
				         tooltipOffset = {{top : -60,left : 0}}
				         yAxis = {{
				        	 tickFormat: formateObj["fn"],
				             label : "单位：" + formateObj["unit"] }}
				         xAxis = {{
				        	 tickFormat: this.formateDate,
				             label : "时间" }}
				         colorScale = { this.strokeFun }
		                 margin={{ top: 20, bottom: 20, left: 50, right: 60 }}
		                 style = {{ width:'100%',height:'180px' }}/>
		        </div>
			</div>
		)
	}
}