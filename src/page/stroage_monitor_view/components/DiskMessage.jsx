import React from 'react'
import { Spin, Row, Col } from 'antd'
import { flowTransformToKbMBGB } from 'libs/function'

export class DiskMessage extends React.Component{

	render(){
		const { stroageMonitorViewProps } = this.props;
		var diskMessage = stroageMonitorViewProps["param"]["total"],
		    diskUseing = diskMessage["disc_used"]*100/diskMessage["disc_total"],
		    diskWait = diskMessage["disc_wait"]*100/diskMessage["disc_total"],
		    diskError = diskMessage["disc_error"]*100/diskMessage["disc_total"],
		    diskSpace = diskMessage["space_used"]*100/diskMessage["space_total"];


		return (<div className = "stroage_monitor_view_disk_message">
			<div className = "stroage_monitor_view_disk_title">
			     <h1>磁盘信息</h1>
			     <div className = "stroage_monitor_tooltips_contianer">
			         <div className = "stroage_monitor_view_tooltips_items"><span>磁盘总数/总磁盘空间</span><span className = "total"></span></div>
			         <div className = "stroage_monitor_view_tooltips_items"><span>使用中磁盘数/当前磁盘已使用空间</span><span className = "used"></span></div>
			         <div className = "stroage_monitor_view_tooltips_items"><span>待命磁盘数</span><span className = "wait"></span></div>
			         <div className = "stroage_monitor_view_tooltips_items"><span>异常磁盘数</span><span className = "error"></span></div>
			     </div>
			</div>
			<div>
			     <Row>
			        <Col span="12">
			            <Row className = "stroage_monitor_view_disk_message_items">
					         <Col span="4">磁盘总数</Col>
					         <Col span="17">
					             <div style={{ width:"100%"}} className = "disk_process_num disk_process_total">
					                 <div style = {{width : diskUseing+"%"}} className = "disk_process_num disk_process_useing">{ diskMessage["disc_used"] === 0?"": diskMessage["disc_used"] }</div>
					                 <div style = {{width : diskWait+"%"}} className = "disk_process_num disk_process_wait">{ diskMessage["disc_wait"] === 0?"": diskMessage["disc_wait"] }</div>
					                 <div style = {{width : diskError+"%"}} className = "disk_process_num disk_process_error">{ diskMessage["disc_error"] ===0?"": diskMessage["disc_error"] }</div>
					             </div>
					         </Col>
					         <Col span="3"><span className = "disk_num">{ diskMessage["disc_total"] }</span></Col>
					    </Row>
			        </Col>
			        <Col span="12">
			            <Row className = "stroage_monitor_view_disk_message_items">
					         <Col span="4">总磁盘空间</Col>
					         <Col span="17">
					             <div style={{ width:"100%"}}
					                  className = "disk_process_num disk_process_total">
					                 <div style = {{width : diskSpace+"%"}} className = "disk_process_num disk_process_wait">{ flowTransformToKbMBGB(diskMessage["space_used"]) }</div>
					             </div></Col>
					         <Col span="3"><span className = "disk_num">{ flowTransformToKbMBGB(diskMessage["space_total"]) }</span></Col>
					    </Row>
			        </Col>
			     </Row>
			</div>
		</div>)
	}
} 