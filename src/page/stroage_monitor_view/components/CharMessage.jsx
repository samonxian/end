import React from 'react'
import Component from 'libs/react-libs/Component'
import { Row, Col } from 'antd'
import { EquipmentUpAndDown } from './EquipmentUpAndDown'
import { VideoRequest } from './VideoRequest'
import { VideoResponse } from './VideoResponse'
import { VideoAverage } from './VideoAverage'
import { DiskTotalInAndOut } from './DiskTotalInAndOut'
import { ForwardTotalInAndOut } from './ForwardTotalInAndOut'

export class CharMessage extends Component{

	render(){
		// <Row className = "stroage_monitor_char_items clear">
		// 		    <Col span="8" className = "stroage_monitor_char_items_left">
		// 		         <VideoRequest { ...this.props }/>
		// 	        </Col> 
		// 	        <Col span="8" className = "stroage_monitor_char_items_left">
		// 	             <VideoResponse { ...this.props }/>
		// 	        </Col>
		// 	        <Col span="8" className = "stroage_monitor_char_items_left">
		// 	             <VideoAverage { ...this.props }/>
		// 	        </Col>
		//         </Row>
		return (
			<div className = "stroage_monitor_char">
			    <Row className = "stroage_monitor_char_items clear">
				    <Col span="11" className = "stroage_monitor_char_items_left">
				         <VideoRequest { ...this.props }/>
			        </Col> 
			        <Col span="11" className = "stroage_monitor_char_items_right">
			             <VideoResponse { ...this.props }/>
			        </Col>
		        </Row>
			    <Row className = "stroage_monitor_char_items clear">
			        <Col span="8" className = "stroage_monitor_char_items_left">
			            <EquipmentUpAndDown { ...this.props }/>
			        </Col>
			        <Col span="8" className = "stroage_monitor_char_items_left">
			            <DiskTotalInAndOut { ...this.props }/>
			        </Col>
			        <Col span="8" className = "stroage_monitor_char_items_left">
			            <ForwardTotalInAndOut { ...this.props }/>
			        </Col>
			    </Row>
			</div>
			)
	}

}