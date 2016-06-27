import React from 'react'
import { Row, Col } from 'antd'
import * as d3 from "d3"
import { flowTransformToKbMBGB, transformToKbMbGb, generateMixed } from 'libs/function'

export const STROAGE_MONITOR_USER_TOTAL_STATUS_COLOR = [
     "rgba(0, 0, 255, 0.3)",
     "rgba(111, 179, 83, 0.5)",
     "rgba(236, 53, 53, 0.8)",
     "rgba(204, 204, 204, 0.5)"
]
export const STROAGE_MONITOR_USER_TOTAL_AREA_COLOR = [
     "rgb(255, 127, 14)",
     "rgb(255, 187, 120)",
     "rgb(23, 190, 207)",
     "rgb(44, 160, 44)",
     "rgb(152, 223, 138)"
]
export const STROAGE_MONITOR_VIEW_DISK_MESSAGE = [
    {
	     title: '区域名',
	     dataIndex: 'area',
	}, {
	     title: '总磁盘数',
	     dataIndex: 'disc_total',
	}, {
	     title: '使用中磁盘数',
	     dataIndex: 'disc_used',
	}, {
	     title: '待命磁盘数',
	     dataIndex: 'disc_wait',
	}, {
	     title: '异常磁盘数',
	     dataIndex: 'disc_error',
	}, {
	     title: '磁盘组数',
	     dataIndex: 'group_count',
	}, {
	     title: '转发个数',
	     dataIndex: 'relay_count',
	}, {
	     title: '7天存储用户数',
	     dataIndex: '7day_user',
	     render : function(text, record){
	     	 var max = record["max"],
	     	     width = text*100/max;
	     	 return (<Row style = {{ width : "100%"}}>
 	 		    <Col span = "18"><div className = "stroage_monitor_view_7day_user" style = {{ width: width+"%" }}></div></Col>
 	 		    <Col span = "6">{ text }</Col>
 	 		</Row>);
	     }
	}, {
	     title: '30天存储用户数',
	     dataIndex: '30day_user',
	}
];

export const STROAGE_MONITOR_VIEW_DISK_DETAIL = [
    {
	     title: '区域名',
	     dataIndex: 'area',
	}, {
	     title: '磁盘组ID',
	     dataIndex: 'group_id',
	},
	{
	     title: '组内did',
	     dataIndex: 'disc_list',
	     render : function(text){
	     	 var htlArr = [];

	     	 for(var j=0;j<text.length;j++){
	     	 	 var tempArr = text[j];
	     	 	 if(tempArr[1] > 0){
	     	 	 	 htlArr.push(<span 
	     	 	 	 	 key = { "stroage_minitor_disc_list_item_key_" + j }
	     	 	 	 	 className = "stroage_minitor_view_disc_list_items unhealth">■</span>)
	     	 	 }else{
	     	 	 	 htlArr.push(<span 
	     	 	 	 	key = { "stroage_minitor_disc_list_item_key_" + j }
	     	 	 	 	className = "stroage_minitor_view_disc_list_items health">■</span>)
	     	 	 }
	     	 }

	     	 return <div>{ htlArr }</div>
	     }
	}, 
	{
	     title: '保存时间',
	     dataIndex: 'cycle',
	}, {
	     title: '组总容量',
	     dataIndex: 'group_space_total',
	     render : function(text){
	     	 return <span>{ flowTransformToKbMBGB(text) }</span>
	     }
	}, {
	     title: '组使用容量',
	     dataIndex: 'group_space_used',
	     render : function(text){
	     	 return <span>{ flowTransformToKbMBGB(text) }</span>
	     }
	}, {
	     title: '实时健康度',
	     dataIndex: 'health_stat',
	}, {
	     title: '带宽进/出',
	     dataIndex: 'bandwidth_in',
	     render : function(text, record){
	     	return <span>{ transformToKbMbGb(text)}<span className = "split_line">/</span>{transformToKbMbGb(record["bandwidth_out"])}</span>
	    }
	}, {
	     title: '转发连接数',
	     dataIndex: 'forwardNum'
	}
]

export const STROAGE_MONITOR_VIEW_DISK_FORWORAD_DETAIL = [
    {
	     title: '主机',
	     dataIndex: 'hostname',
	}, {
	     title: 'IP地址',
	     dataIndex: 'ip',
	}, {
	     title: '16进制PID',
	     dataIndex: 'pid',
	}, {
	     title: '上/下行连接数',
	     dataIndex: 'conn_in',
	     render : function(text, record){
	     	 return <span>{ text }/{ record["conn_out"] }</span>
	     }
	}, {
	     title: '5分钟新建连接数',
	     dataIndex: '5min_conn',
	}, {
	     title: '带宽进/出',
	     dataIndex: 'bandwidth_in',
	     render : function(text, record){
	     	return <span>{ transformToKbMbGb(text)}<span className = "split_line">/</span>{transformToKbMbGb(record["bandwidth_out"])}</span>
	     }
	}, {
	     title: '转发能力值',
	     dataIndex: 'ability',
	}, {
	     title: '平均发送队列',
	     dataIndex: 'send_queue_ave',
	}, {
	     title: '5分钟推流失败计数',
	     dataIndex: '5min_publish_failed',
	}, {
	     title: '5分钟打开失败计数',
	     dataIndex: '5min_open_failed',
	}
];

function getY(data){
	return data["y"];
}

export function transformUnit(value,type){
	var retValue = 0;
	if(type === 'Gb'){
		retValue = Math.round(value / 1000 / 1000 / 1000 * 100) / 100 + 'Gb'
	}else if(type === 'Mb'){
		retValue = Math.round(value / 1000 / 1000 * 100) / 100 + 'Mb'
	}else if(type === 'Kb'){
		retValue = Math.round(value / 1000　* 100) / 100 + 'Kb'
	}else{
		retValue = value + '';	
	}
	return retValue;
}

export let formate_date = function(data){
    var data = data,
        unitValue;

    function getMaxY(){
        return d3.max(data,getY);
    }

    function getUnitValue(){
        var max = getMaxY();
        if(max > 60 * 60 * 24){
            unitValue = '天';
        }else if(max > 60 * 60){
            unitValue = '小时';   
        }else if(max > 60 ){
            unitValue = '分';   
        }else{
            unitValue = '秒';   
        }
    }

    function transformUnit(value){
        var retValue = 0;
        if(unitValue === '天'){
            retValue = Math.round(value / 60 / 60 / 24 * 100) / 100
        }else if(unitValue === '小时'){
            retValue = Math.round(value / 60 / 60 * 100) / 100
        }else if(unitValue === '分'){
            retValue = Math.round(value / 60 * 100) / 100
        }else{
            retValue = value + '';  
        }
        return retValue;
    }

    getUnitValue();

    return {
        unit : unitValue,
        fn : transformUnit
    }
     
}

export let formate_yAxis_bandWidth = function(data){
	var data = data,
	    unitValue;

    function getMaxY(){
    	return d3.max(data,getY);
    }

    function getUnitValue(){
    	var max = getMaxY();
    	if(max > 1000 * 1000 * 1000){
			unitValue = 'Gb';	
		}else if(max > 1000 * 1000){
			unitValue = 'Mb';	
		}else if(max > 1000){
			unitValue = 'Kb';	
		}else{
			unitValue = '字节';	
		}
    }

    function transformUnit(value){
    	var retValue = 0;
    	if(unitValue === 'Gb'){
    		retValue = Math.round(value / 1000 / 1000 / 1000 * 100) / 100
    	}else if(unitValue === 'Mb'){
    		retValue = Math.round(value / 1000 / 1000 * 100) / 100
    	}else if(unitValue === 'Kb'){
    		retValue = Math.round(value / 1000　* 100) / 100
    	}else{
    		retValue = value + '';	
    	}
    	return retValue;
    }
    
    getUnitValue();

    return {
    	unit : unitValue,
    	fn : transformUnit
    }
}
