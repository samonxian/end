import React from 'react'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { AreaChart } from 'libs/defined-chart/AreaChart'
import { isEmptyObj, generateMixed, Format } from 'libs/function'

export class EquipmentDown extends Component{

	dataAdapter(){
    	return {
    		createData(){
    			var date = new Date(new Date().Format("yyyy-MM-dd") + " 00:00:00").getTime()/1000,
                    tempArr = [];

    			for(var i = 0; i<144;i++){
    				var time = date + 60*5*(i+1),
    				    random = Math.round(Math.random()*1000);
    				tempArr.push([time,random]);
    			}
    			return tempArr;
    		},
    		adapterFormateData(data){
    			var value = [];
    			for(var i =0 ; i < data.length; i++){
    				value.push({
    					x : new Date(data[i][0]*1000),
    					y : data[i][1]
    				})
    			}
    			return {
    				label : "总设备数",
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
			tooltipHtml(y,yValueCumulative,x){
				return <div className = "stroage_monitor_view_tooltips">
					         <div>时间：{ new Date(x).Format("yyyy-MM-dd hh:mm") }</div>
					         <div>5分钟下线设备数：{ y }</div>
					    </div>;
			}
		}
	}
    
	render(){
		const { stroageCharProps } = this.props;

		// if(isEmptyObj(stroageCharProps)){
		// 	return false;
		// }

		var content_width = (document.body.clientWidth - 280)*0.4583333333;
		var data = this.createData(),
		    yMax = d3.max(this.adapterYmax(data)),
		    equipment_total = this.adapterFormateData(data);
  
		return (
			<div className = "stroage_monitor_view_char_equipment">
			     <h1>5分钟下线设备数</h1>
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
		                 yAxis = {{
				        	 label : "单位：个" }}
				         tooltipOffset = {{top : -60,left : 0}}
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