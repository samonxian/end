import React from 'react'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { LineChart }from 'libs/defined-chart/LineChart'
import { isEmptyObj, Format } from 'libs/function'
import { STROKE_COLOR } from './data'

class RequestChar extends Component{
    
    dataAdapter(){
    	var _this = this;
    	return {
    		
    		adapterValues(data){
    			var values = [];

    			for(var i=0;i<data.length;i++){
    				values.push({
    					x : new Date(data[i][0]*1000),
    					y : data[i][1]
    				})
    			}

    			return values;
    		},
    		formateDate(value){
				 return new Date(value).Format("hh:mm");
			},
    		colorScale(desc,index){
                 return STROKE_COLOR[index];
    		},
    		tooltipHtml(label,value){
                const { charData, title, tickFormat, unit } = _this.props;
    			var dateStr = new Date(value["x"]).Format("yyyy-MM-dd hh:mm"),
                    htl = [],
    			    tempData = [];

    			for(var i = 0; i<charData.length; i++){
    				var obj = charData[i],
    				    currentObj = "",
    				    values = obj["values"];
                  
    				for(var j = 0; j<values.length; j++){
                        var tempDateStr = new Date(values[j]["x"]).Format("yyyy-MM-dd hh:mm");
    					if(dateStr === tempDateStr && value["y"] === values[j]["y"]){
    						currentObj = values[j];
    					}
    				}

    				if(currentObj !==""){
    					tempData.push({
    						label : charData[i]["label"],
    						values : currentObj
    					})
    				}
    			}

                for(var i=0;i<tempData.length;i++){
                    htl.push(<div key = { "collect_message_request_key_"+i }>
                             <span className = "collect_message_request_span">{ tempData[i]["label"] }类型</span>
                             <span>{ tickFormat?tickFormat(tempData[i]["values"]["y"]):tempData[i]["values"]["y"] }{ unit }</span>
                        </div>)
                }

    			return <div className = "collect_message_tips">
    			    <div>{ title }</div>
                    <div><span className = "collect_message_request_span">时间:</span><span>{ new Date(value["x"]).Format("yyyy-MM-dd hh:mm") }</span></div>
    			    { htl }
    			</div>
    		}
    	}
    }

	render(){
		var content_width = (document.body.clientWidth - 280)*0.5;
		const { charData, unit, tickFormat } = this.props;

		return (<LineChart
                data = { charData }
                colorScale = { this.colorScale }
                width = { content_width }
                height = { 180 }
                margin = {{top: 20, bottom: 30, left: 80, right: 80 }}
                yAxis = {{ 
                    label : "单位:"+unit,
                    tickFormat : tickFormat }}
                tooltipOffset = {{top : -100,left : 0}}
                tooltipHtml = { this.tooltipHtml }
		        xAxis = {{
		        	 tickFormat: this.formateDate,
		             label : "时间"}}/>)
	}
}

exports.RequestChar = RequestChar;