import Component from 'libs/react-libs/Component'
import React from 'react'
import { Row, Col } from 'antd'
import { generateMixed } from 'libs/function'
import { HealthItems } from './HealthItems'
import { DiskItem } from './DiskItem'

export class Detail extends Component{

    render(){

    	 const { healthData, healthWidth, healthHeight, type } = this.props;
    	 var rows = [],
    	     arr = healthData["arr"];

         if( type === "memory_service_monitor_health"){
         	   for(var i=0;i<arr.length;i++){
  	    	    	rows.push(<HealthItems itemsData = { arr[i] } key = {'memory_service_monitor_healthItem_key'+new Date().getTime()+generateMixed(6)} />);
  	    	   }
         }else{
             for(var j=0;j<arr.length;j++){
                rows.push(<DiskItem itemsData = { arr[j] } key = {'memory_service_monitor_healthItem_key'+new Date().getTime()+generateMixed(6)} />);
             }
         }

    	 return <Row>
    	          <Col span="2"> { healthData["date"] }</Col>
		            <Col span="22"><svg width = { healthWidth } height = { healthHeight }>{ rows }</svg></Col>
		        </Row>
	}

}