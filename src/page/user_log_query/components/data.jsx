import React from 'react'
import { Tabs,Table,Timeline,Icon,Row,Col,Alert } from 'antd'
import { title } from '../../user_log/title.js'
import NCollapse from './collapse'
import NTable from './table'
const Item = Timeline.Item
const TabPane = Tabs.TabPane;
class LogData extends React.Component {
	
	getType(type){
		switch(type){
			case 'camera_debug':
				type = 'rtmp_device';
			case 'camera_time':
				type = 'rtmp_device';
			case 'mobile_debug':
				type = 'rtmp_device';
			case 'camera_time_last':
				type = 'rtmp_device';
			case 'camera_debug_last':
				type = 'rtmp_device';
		}
		return type;
	}
	
    render() {
		let _this = this;
		let { data,deal_table,dispatch,time,switch_type,parent,post_count } =  this.props;
		let columns = [];
		let left_data = [];
		for(var key in data){
			if(title[key]){
				data[key].typeName = key;
				left_data.push(data[key]);
			}
		}
		//console.debug(this.props.data)

		let active_key = 'other';
        return (
			<div>
				
				<Row className="ulq_logs_bottom" type="flex" align="top">
					<Col >
						<Row className="ulq_left_log" type="flex" align="top">
						{
							left_data.map(function(value,key){
								var type = "info";
								let message = title[value.typeName] + ":" 
								switch(parseInt(value.status,10)){
									case 0:
										type = "bg_success";
										message += "优";
										break;
									case 1:
										type = "bg_info";
										message += "良";
										break;
									case 2:
										type = "bg_warn";
										message += "中";
										break;
									case 3:
										type = "bg_error";
										message += "差";
										break;
								}
								//console.debug(post_count[value.typeName])
								if(post_count[value.typeName] == 0){
									type = 'bg_gray'	
									message = '无数据'
								}
								return(
									<div title={message} className={'color_bar ' + type} key={ key } onClick={switch_type.bind(parent,value.typeName)} >
									</div>
								)
							})
						}
						</Row>
					</Col>	
					<Col className="ulq_right_log">
						<NCollapse data={data.logs} deal_table={deal_table} active={ _this.props.active } typeName="other"/>	
						{
							left_data.map(function(value,key){
								return (
									<NTable active={ _this.props.active } typeName={value.typeName}
										key={key} data={value.details} deal_table={deal_table}/>	
								)
							})
						}
					</Col>	
					
				</Row>

			</div>
			
        )
    }
}

export default LogData 
