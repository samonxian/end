import React from 'react'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { LineChart }from 'libs/defined-chart/LineChart'
import { isEmptyObj, Format } from 'libs/function'
import { LEVEL_INFO_COLOR,
         LEVEL_WARNING_COLOR,
         LEVEL_ERROR_COLOR,
         LEVEL_CREASH_COLOR } from './Until'

class DayChar extends Component{
    
    dataAdapter(){
    	var _this = this;
    	return {
    		adapterCharData(data){
    			var infoData = data["info"],
    			    warningData = data["warning"],
    			    errorData = data["error"],
    			    fatalData = data["fatal"];

    			return [
    			    {
	    				label : "info级别",
	    				values : _this.adapterValues(infoData)
	    			},
	    			{
	    				label : "warning级别",
	    				values : _this.adapterValues(warningData)
	    			},
	    			{
	    				label : "error级别",
	    				values : _this.adapterValues(errorData)
	    			},
	    			{
	    				label : "fatal级别",
	    				values : _this.adapterValues(fatalData)
	    			}
    			]
    		},
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
				 return new Date(value).Format("MM-dd");
			},
    		colorScale(desc){
    			 if(desc === "info级别"){
    			 	 return LEVEL_INFO_COLOR;
    			 }else if(desc === "warning级别"){
    			 	 return LEVEL_WARNING_COLOR;
    			 }else if(desc === "error级别"){
    			 	 return LEVEL_ERROR_COLOR;
    			 }else if(desc === "fatal级别"){
    			 	 return LEVEL_CREASH_COLOR;
    			 }else{
    			 	 return "#fff";
    			 }
    		},
    		tooltipHtml(label,value){
    			var data = _this.charData,
                    dateStr = new Date(value["x"]).Format("yyyy-MM-dd"),
                    htl = [],
                    tempData = [];

                for(var i = 0; i<data.length; i++){
                    var obj = data[i],
                        currentObj = "",
                        values = obj["values"];
                  
                    for(var j = 0; j<values.length; j++){
                        var tempDateStr = new Date(values[j]["x"]).Format("yyyy-MM-dd");
                        if(dateStr === tempDateStr && value["y"] === values[j]["y"]){
                            currentObj = values[j];
                        }
                    }

                    if(currentObj !==""){
                        tempData.push({
                            label : data[i]["label"],
                            values : currentObj
                        })
                    }
                }

                for(var i=0;i<tempData.length;i++){
                    htl.push(<div key = { "level_warning_tips_half_hour_key_"+i }>
                             <span className = "level_warning_tips_span">报警级别：{ tempData[i]["label"] }</span>
                             <span className = "level_warning_tips_span">个数：{ tempData[i]["values"]["y"] }</span>
                        </div>)
                }

                return <div className = "level_warning_tips">
                    <div>天统计详情</div>
                    <div><span className = "level_warning_tips_span">时间:</span><span>{ new Date(value["x"]).Format("yyyy-MM-dd hh:mm") }</span></div>
                    { htl }
                </div>
    		}
    	}
    }

	render(){
		var content_width = (document.body.clientWidth - 280)*0.5;
		const { levelWarningDayProps } = this.props;

		if(isEmptyObj(levelWarningDayProps) || isEmptyObj(levelWarningDayProps["param"])){
			return false;
		}

		this.charData = this.adapterCharData(levelWarningDayProps["param"]);

		return (<div>
			<h2>天统计</h2>
			<LineChart
                data = { this.charData }
                colorScale = { this.colorScale }
                width = { content_width }
                height = { 250 }
                margin = {{top: 20, bottom: 20, left: 50, right: 60 }}
                yAxis = {{ label : "单位：个" }}
                tooltipHtml = { this.tooltipHtml }
                tooltipOffset = {{ top : -150,left : 0 }}
		        xAxis={{
		        	 tickFormat: this.formateDate,
		             label : "时间"}}/>
		</div>)
	}
}

exports.DayChar = DayChar;
