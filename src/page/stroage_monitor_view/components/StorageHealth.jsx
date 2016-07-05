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
    							x : "发送状况中用户数",
    							y : data[i]["user_send_subhealth"]
    						},{
    							x : "发送状况差用户数",
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
            adapterAreaIconHtl(data){
                var tempArr = [];
                for(var i = 0; i<data.length; i++){
                    tempArr.push(<p key = { "stroage_monitor_view_area_icon_items_key_" + i }>
                        <span 
                             style = {{ background : STROAGE_MONITOR_USER_TOTAL_AREA_COLOR[i] }}
                             className = "stroage_monitor_view_area_icon_items"></span>
                        <span className = "desc">{ data[i]["area"] }</span>
                        <span className = "stroage_monitor_view_area_desc_items">{ data[i]["user_total"] }</span></p>)
                }
                return tempArr;
            },
            colorScale(index){
                return STROAGE_MONITOR_USER_TOTAL_AREA_COLOR[index];
            },
            outArcColorScale(desc,index){
                if(desc === "发送状况好用户数"){
                    return STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[0];
                }else if(desc === "发送状况中用户数"){
                    return STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[1];
                }else if(desc === "发送状况差用户数"){
                    return STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[2];
                }else if(desc === "发送状况未知用户数"){
                    return STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[3];
                }else {
                    return "buld";
                }
            }
    	}
    }

    events(){
        return {
            tooltipHtml(data){
                var x = "",
                    y = "";
                if(data["type"] === "status"){
                    x = data["x"];
                    y = data["y"];
                }else{
                    x = data["x"];
                    y = data["y"]["total"];
                }
                return (<div className = "stroage_monitor_health_status_tooltips">
                        <div>详情</div>
                        <div>{ x }:{ y }</div>
                    </div>)
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

        var tempData = stroageMonitorViewProps["param"]["area_info"];
        var healthData = this.adapterFormateData(tempData),
            areaIconHtl = this.adapterAreaIconHtl(tempData);

         // <Col span = "10">
         //     <Row>
         //         <Col span = "24" className = "stroage_monitor_health_detail_char">
         //             { areaIconHtl }
         //             <p> 
         //                 <span 
         //                     className = "stroage_monitor_view_area_icon_items"
         //                     style = {{ background : STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[0] }}></span>
         //                 <span className = "desc">发送状况好用户数</span>
         //             </p>
         //             <p>
         //                 <span 
         //                     className = "stroage_monitor_view_area_icon_items"
         //                     style = {{ background : STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[1] }}></span>
         //                 <span className = "desc">发送状况中用户数</span>
         //             </p>
         //             <p>
         //                 <span 
         //                     className = "stroage_monitor_view_area_icon_items"
         //                     style = {{ background : STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[2] }}></span>
         //                 <span className = "desc">发送状况差用户数</span>
         //             </p>
         //             <p>
         //                 <span 
         //                     className = "stroage_monitor_view_area_icon_items"
         //                     style = {{ background : STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR[3] }}></span>
         //                 <span className = "desc">发送状况未知用户数</span>
         //             </p>
         //         </Col>
         //     </Row>
         // </Col>
		        
		return (
			<div className = "stroage_monitor_view_char_health">
                 <div className = "clear">
			         <h1>存储健康状态</h1>
                 </div>
			     <Row className = "stroage_monitor_health_detail_char">
                     <StroagePie
                         data = { healthData }
                         width = { 200 }
                         height = { 200 }
                         viewBox = { "0,0,200,200" }
                         outerRadius = { 0 }
                         colorScale = { this.colorScale }
                         tooltipOffset = {{top: -80, left: 0}}
                         outArcColorScale = { this.outArcColorScale }
                         style = {{ width:'200px',height:'200px' }}
                         tooltipHtml = { this.tooltipHtml }
                         sort = { sort }/>
			     </Row>
			</div>
		)
	}
}