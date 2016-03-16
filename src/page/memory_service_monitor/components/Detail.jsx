import Component from 'libs/react-libs/Component'
import React from 'react'
import { Row, Col } from 'antd'
import { generateMixed } from 'libs/function'
import { DetailItem } from './DetailItem'
import { AREA_BG } from './until'

export class Detail extends Component{

    render(){

         const { healthData, healthWidth, healthHeight, type, style, padding, rate, colorPadding } = this.props;
         
         var rows = [],
             len = healthData["returnArr"].length;

         for(var i=0;i<len;i++){
            var bg = AREA_BG[0];
            if(i%2 == 0){
                bg = AREA_BG[1];
            }
            rows.push(<DetailItem healthData = { healthData["returnArr"][i] } padding = { padding } type = { type } healthWidth = { healthWidth } 
                rate = { rate } healthHeight = { healthHeight } key = {'memory_service_monitor_healthItem_key'+new Date().getTime()+generateMixed(6)} bg={ bg }/>)
         }

         return <Row className = { style }>
                    <Col span="2" className = "memory_service_monitor_font" style = {{padding:colorPadding}}> { healthData["date"].split(" ")[1] }</Col>
                    <Col span="22">
                         { rows }
                    </Col>
                </Row>
    }

}