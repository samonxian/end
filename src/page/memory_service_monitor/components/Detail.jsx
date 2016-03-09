import Component from 'libs/react-libs/Component'
import React from 'react'
import { Row, Col } from 'antd'
import { generateMixed } from 'libs/function'
import { DetailItem } from './DetailItem'

export class Detail extends Component{

    render(){

    	 const { healthData, healthWidth, healthHeight, type, style } = this.props;
         
    	 var rows = [],
             bg = 'red',
    	     len = healthData["returnArr"].length;

         for(var i=0;i<len;i++){
            var bg = 'red';
            if(i%2 == 0){
                bg = 'yellow';
            }
            rows.push(<DetailItem healthData = { healthData["returnArr"][i] } type = { type } healthWidth = { healthWidth } healthHeight = { healthHeight } key = {'memory_service_monitor_healthItem_key'+new Date().getTime()+generateMixed(6)} bg={ bg }/>)
         }

    	 return <Row className = { style }>
    	            <Col span="2" className = "memory_service_monitor_font"> { healthData["date"].split(" ")[1] }</Col>
		            <Col span="22">
                         { rows }
                    </Col>
		        </Row>
	}

}