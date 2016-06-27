import React from 'react'
import Component from 'libs/react-libs/Component'
import * as d3 from "d3"
import { Spin, Table, Row, Col } from 'antd'
import { StroagePie } from 'libs/defined-chart/StroagePie'
import { isEmptyObj, generateMixed, Format } from 'libs/function'
import { STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR, 
         STROAGE_MONITOR_USER_TOTAL_AREA_COLOR } from './Until'

export class StorageHealth extends Component{
    
    dataAdapter(){
    	return {
    		adapterFormateData(data){
    			var values = [];

    			for(var i = 0;i<data.length;i++){
    				values.push({
    					x : data[i]["area"],
    					y : {
    						total : data[i]["user_total"],
    						children : [{
    							x : "发送状况好用户数",
    							y : data[i]["user_send_health"]
    						},{
    							x : "发送状况亚健康用户数",
    							y : data[i]["user_send_subhealth"]
    						},{
    							x : "发送状况不健康用户数",
    							y : data[i]["user_send_unhealth"]
    						},{
    							x : "发送状况未知用户数",
    							y : data[i]["user_send_unknow"]
    						}]
    					}
    				})
    			}
                
    			return {
    				label : "存储健康状态",
    				values : values
    			}
    		},
            adapterAreaHtl(data){
                var arr = [];
                for(var i = 0; i<data.length; i++){
                    arr.push(<div 
                            className = "stroage_monitor_view_health_area_items"
                            key = { "stroage_monitor_view_health_area_key_" + i }>
                        <span>{ data[i]["area"] }:</span>
                        <span>{ data[i]["user_total"] }</span></div>)
                }
                return arr;
            },
            adapterAreaIconHtl(data){
                var tempArr = [];
                for(var i = 0; i<data.length; i++){
                    tempArr.push(<p key = { "stroage_monitor_view_area_icon_items_key_" + i }>
                        <span className = "desc">{ data[i]["area"] }</span>
                        <span 
                             style = {{ background : STROAGE_MONITOR_USER_TOTAL_AREA_COLOR[i] }}
                             className = "stroage_monitor_view_area_icon_items"></span></p>)
                }
                return tempArr;
            },
            colorScale(index){
                return STROAGE_MONITOR_USER_TOTAL_AREA_COLOR[index];
            },
            outArcColorScale(desc,index){
                if(desc === "发送状况好用户数"){
                    return STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[0];
                }else if(desc === "发送状况亚健康用户数"){
                    return STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[1];
                }else if(desc === "发送状况不健康用户数"){
                    return STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[2];
                }else if(desc === "发送状况未知用户数"){
                    return STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[3];
                }else {
                    return "buld";
                }
            }
    	}
    }

	render(){
        var sort = null,
            areaHtl = [];
        
        const { stroageMonitorViewProps } = this.props;

        if(isEmptyObj(stroageMonitorViewProps)){
        	return false;
        }
        
        console.log("=============================stroageMonitorViewProps",stroageMonitorViewProps);

        var tempData = stroageMonitorViewProps["param"]["area_info"];
        var healthData = this.adapterFormateData(tempData),
            areaHtl = this.adapterAreaHtl(tempData),
            areaIconHtl = this.adapterAreaIconHtl(tempData);
		        
		return (
			<div className = "stroage_monitor_view_char_health">
                 <div className = "clear">
			         <h1>存储健康状态</h1>
                 </div>
			     <Row>
                     <Col span = "6">
                         { areaHtl }
                     </Col>
                     <Col span = "18" className = "stroage_monitor_health_detail_char">
                         <Row>
                             <Col span = "8">
                                 { areaIconHtl }
                                 <p><span className = "desc">状况好用户数</span>
                                    <span 
                                      className = "stroage_monitor_view_area_icon_items"
                                      style = {{ background : STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[0] }}></span></p>
                                 <p><span className = "desc">亚健康用户数</span>
                                    <span 
                                      className = "stroage_monitor_view_area_icon_items"
                                      style = {{ background : STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[1] }}></span></p>
                                 <p><span className = "desc">不健康用户数</span>
                                    <span 
                                      className = "stroage_monitor_view_area_icon_items"
                                      style = {{ background : STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[2] }}></span></p>
                                 <p><span className = "desc">未知用户数</span>
                                    <span 
                                      className = "stroage_monitor_view_area_icon_items"
                                      style = {{ background : STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[3] }}></span></p>
                             </Col>
                             <Col span = "16">
                                 <StroagePie
                                     data = { healthData }
                                     width = { 200 }
                                     height = { 200 }
                                     viewBox = { "0,0,200,200" }
                                     outerRadius = { 0 }
                                     colorScale = { this.colorScale }
                                     outArcColorScale = { this.outArcColorScale }
                                     style = {{ width:'200px',height:'200px' }}
                                     sort = { sort }/>
                             </Col>
                         </Row>
                     </Col>
			     </Row>
			</div>
		)
	}
}