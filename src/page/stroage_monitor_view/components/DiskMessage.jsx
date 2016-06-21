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
		    diskSpace = diskMessage["space_used"]*100/diskMessage["space_total"],
		    diskSpaceHtl = '',
		    diskErrorHtl = '',
		    diskWaitHtl = '',
		    diskUseingHtl = '';
         
         diskSpaceHtl = <Col span="20">
             <div style = {{width : diskSpace+"%"}}
                 className = "disk_process_num disk_process_wait"></div>
             <span className = "disk_num">{ flowTransformToKbMBGB(diskMessage["space_used"]) }</span>
         </Col>;

         diskWaitHtl = <Col span="20">
             <div style = {{width : diskWait+"%"}}
                 className = "disk_process_num disk_process_wait"></div>
             <span className = "disk_num">{ diskMessage["disc_wait"] }</span>
        </Col>;

        diskErrorHtl = <Col span="20">
             <div style = {{width : diskError+"%"}}
                 className = "disk_process_num disk_process_error"></div>
             <span className = "disk_num">{ diskMessage["disc_error"] }</span>
        </Col>

        diskUseingHtl = <Col span="20">
             <div style = {{width : diskUseing+"%"}}
                 className = "disk_process_num disk_process_useing"></div>
             <span className = "disk_num">{ diskMessage["disc_used"] }</span>
        </Col>

		if(diskSpace === 100){
			diskSpaceHtl = <div>
			 <Col span="17">
	             <div style={{ width:"100%"}}
	                  className = "disk_process_num disk_process_wait"></div>
	         </Col>
	         <Col span="3"><span className = "disk_num">{ flowTransformToKbMBGB(diskMessage["space_used"]) }</span></Col></div>
		}

		if(diskUseing === 100){
			 diskUseingHtl = <div>
			     <Col span="17">
		             <div style={{ width:"100%"}}
		                  className = "disk_process_num disk_process_useing"></div></Col>
		         <Col span="3"><span className = "disk_num">{ diskMessage["disc_used"] }</span></Col>
			 </div>
		}

		if(diskWait === 100){
			diskWaitHtl = <div>
			     <Col span="17">
		             <div style={{ width:"100%"}}
		                  className = "disk_process_num disk_process_wait"></div></Col>
		         <Col span="3"><span className = "disk_num">{ diskMessage["disc_wait"] }</span></Col>
			 </div>
		}

		if(diskError === 100){
			diskErrorHtl = <div>
			     <Col span="17">
		             <div style={{ width:"100%"}}
		                  className = "disk_process_num disk_process_error"></div></Col>
		         <Col span="3"><span className = "disk_num">{ diskMessage["disc_error"] }</span></Col>
			 </div>
		}

		return (<div className = "stroage_monitor_view_disk_message">
			<h1>磁盘信息</h1>
			<div>
			     <Row>
			        <Col span="12">
			            <Row className = "stroage_monitor_view_disk_message_items">
					         <Col span="4">磁盘总数</Col>
					         <Col span="17">
					             <div style={{ width:"100%"}}
					                  className = "disk_process_num disk_process_total"></div></Col>
					         <Col span="3"><span className = "disk_num">{ diskMessage["disc_total"] }</span></Col>
					    </Row>
					    <Row className = "stroage_monitor_view_disk_message_items">
					         <Col span="4">使用中磁盘数</Col>
					         { diskUseingHtl }
					    </Row>
					    <Row className = "stroage_monitor_view_disk_message_items">
					         <Col span="4">待命磁盘数</Col>
					         { diskWaitHtl }
					    </Row>
					    <Row className = "stroage_monitor_view_disk_message_items">
					         <Col span="4">异常磁盘数</Col>
					         { diskErrorHtl }
					    </Row>
			        </Col>
			        <Col span="12">
			            <Row className = "stroage_monitor_view_disk_message_items">
					         <Col span="4">总磁盘空间</Col>
					         <Col span="17">
					             <div style={{ width:"100%"}}
					                  className = "disk_process_num disk_process_total"></div></Col>
					         <Col span="3"><span className = "disk_num">{ flowTransformToKbMBGB(diskMessage["space_total"]) }</span></Col>
					    </Row>
					    <Row className = "stroage_monitor_view_disk_message_items">
					         <Col span="4">当前磁盘已使用空间</Col>
					         { diskSpaceHtl }
					    </Row>
			        </Col>
			     </Row>
			</div>
		</div>)
	}
} 