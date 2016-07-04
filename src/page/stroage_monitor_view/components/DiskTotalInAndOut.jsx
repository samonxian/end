import React from 'react'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { AreaChart } from 'libs/defined-chart/AreasChart'
import { isEmptyObj, generateMixed, Format } from 'libs/function'
import { formate_yAxis_bandWidth, transformUnit } from './Until'

export class DiskTotalInAndOut extends Component{
    dataAdapter(){
    	return {
    		adapterFormateData(data,type){
    			var value = [],
    			    label = "磁盘总进";

    			for(var i =0 ; i < data.length; i++){
    				value.push({
    					x : new Date(data[i][0]*1000),
    					y : data[i][1]
    				})
    			}

    			if(type != "in"){
    				label : "磁盘总出"
    			}

    			return {
    				label : label,
    				values : value
    			}
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
					         <div>磁盘总进：{ transformUnit( y[0], inUnit) }</div>
					         <div>磁盘总出：{ transformUnit( y[1], outUnit)}</div>
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
		var diskTotalIn = stroageCharProps["param"]["disc_in_bandwidth"],
		    diskTotalOut = stroageCharProps["param"]["disc_out_bandwidth"],
		    yMax = d3.max(diskTotalIn.map(function(data){
		    	return data[1];
		    })),
		    inObj = this.adapterFormateData(diskTotalIn,"in"),
		    outObj = this.adapterFormateData(diskTotalOut,"out"),
		    inDisk = formate_yAxis_bandWidth(inObj["values"]),
		    outDisk = formate_yAxis_bandWidth(outObj["values"]),
		    tempArr = [];
        
        this.inUnit = inDisk["unit"];
        this.outUnit = outDisk["unit"];

        tempArr.push(inObj);
        tempArr.push(outObj);

		return (
			<div className = "stroage_monitor_view_char_equipment">
			     <div className = "clear">
			         <h1>磁盘总进/出</h1>
			         <div className = "stroage_monitor_view_fig">
			             <span className = "stroage_monitor_view_fig_items">
			                 <span className = "stroage_monitor_view_area_icon_items" style = {{background:"rgba(31, 119, 180, 1)"}}></span>
			                 <span className = "desc">磁盘总进</span>
			             </span>
			             <span className = "stroage_monitor_view_fig_items">
			                 <span className = "stroage_monitor_view_area_icon_items" style = {{background:"rgba(111, 179, 83, 1)"}}></span>
			                 <span className = "desc">磁盘总出</span>
			             </span>
			         </div>
			     </div>
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
				        	 label : "单位：" + inDisk["unit"],
				        	 tickFormat : inDisk["fn"] }}
				         yAxisL = {{
				        	 label : "单位：" + outDisk["unit"],
				        	 tickFormat : outDisk["fn"] }}
				         tooltipOffset = {{top : -100,left : 0}}
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