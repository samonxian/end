import React from 'react'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { AreaChart } from 'libs/defined-chart/AreasChart'
import { isEmptyObj, generateMixed, Format } from 'libs/function'
import { formate_yAxis_bandWidth, transformUnit } from './Until'

export class ForwardTotalInAndOut extends Component{
    dataAdapter(){
    	return {
    		adapterFormateData(data,type){
    			var value = [],
    			    label = "";

    			for(var i =0 ; i < data.length; i++){
    				value.push({
    					x : new Date(data[i][0]*1000),
    					y : data[i][1]
    				})
    			}

    			if(type === "in"){
    				label = "转发总进带宽";
    			}else{
    				label = "转发总出带宽";
    			}

    			return {
    				label : label,
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
		var _this = this;
		return {
			tooltipHtml(y,x){
				var inUnit = _this.inUnit,
				    outUnit = _this.outUnit;

				return <div className = "stroage_monitor_view_tooltips">
					         <div>时间：{ new Date(x).Format("yyyy-MM-dd hh:mm") }</div>
					         <div>转发总进：{ transformUnit(y[0],inUnit) }</div>
					         <div>转发总出：{ transformUnit(y[1],inUnit) }</div>
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
		var relayIn = stroageCharProps["param"]["relay_in_bandwidth"],
		    relayOut = stroageCharProps["param"]["relay_out_bandwidth"],
		    yMax = d3.max(relayIn.map(function(data){
		    	return data[1];
		    })),
		    inObj = this.adapterFormateData(relayIn,"in"),
		    outObj = this.adapterFormateData(relayOut,"out"),
		    inBandWidth = formate_yAxis_bandWidth(inObj["values"]),
		    outBandWidth = formate_yAxis_bandWidth(outObj["values"]),
		    tempArr = [];

		this.inUnit = inBandWidth["unit"];
		this.outUnit = outBandWidth["unit"];

		tempArr.push(inObj);
		tempArr.push(outObj);
  
		return (
			<div className = "stroage_monitor_view_char_equipment">
			     <h1>转发总进/出带宽</h1>
			     <div>
				     <AreaChart
		                 data={ tempArr }
		                 width={ content_width } 
		                 viewBox = { "0,0,"+content_width+",180" }
		                 tooltipHtml = { this.tooltipHtml }
		                 preserveAspectRatio = { "none" }
		                 tooltipMode = { "element" }
		                 height={ 180 }
		                 yMax = { yMax }
		                 separate = { true }
		                 yAxis = {{
				        	 label : "单位：" + inBandWidth["unit"],
				        	 tickFormat : inBandWidth["fn"] }}
				         yAxisL = {{
				        	 label : "单位：" + outBandWidth["unit"],
				        	 tickFormat : outBandWidth["fn"] }}
				         tooltipOffset = {{top : -100,left : 0}}
				         xAxis={{
				        	 tickFormat: this.formateDate,
				             label : "时间"}}
		                 margin={{ top: 20, bottom: 20, left: 70, right: 60 }}
		                 style = {{ width:'100%',height:'180px' }}/>
		        </div>
			</div>
		)
	}
}