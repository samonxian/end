import React from 'react'
import { connect } from 'react-redux'
import { push ,replace } from 'react-router-redux'
import { inputValue ,fetchData,displayTable2 } from './action'
import {Form, Input, Button, Icon,Table} from 'antd_c'
import Monitor from '../sidebar/monitor'
const FormItem = Form.Item;
const columns = [
	{
		title: '姓名',
		dataIndex: 'column1',
		key: 'column1',
	}, 
	{
		title: '年龄',
		dataIndex: 'column2',
		key: 'column2',
		className : 'camera_info_column2'
	},
	{
		title: '住址',
		dataIndex: 'column3',
		key: 'column3',
	}, 
	{
		title: '住址',
		dataIndex: 'column4',
		key: 'column4',
	}
];
let data = [ ];
let data2 = [ ];

class Get_relay_info extends React.Component {

	constructor(){
		super(); 
		this.show_flag = false;
	}

	componentDidMount(){
		let { get_relay_info ,location,dispatch } = this.props;
		if(location.query.sid){
			dispatch(fetchData(location.query.sid));
		}
	}
	
	handleSubmit(e) {
		e.preventDefault();
		//this.props.dispatch(replace('/get_relay_info?sid='+this.props.get_relay_info.id),{
			//avoidRouterUpdate : true
		//});
		this.props.dispatch(fetchData(this.props.get_relay_info.id));	
	}
   
	setValue(e){
		this.props.dispatch(inputValue(e.target.value));	
	}


	showTable2(e){
		this.props.dispatch(displayTable2(!this.show_flag));
		this.show_flag = !this.show_flag;
	}

    render() {
		let { get_relay_info ,location} = this.props;
		if(get_relay_info.posts && get_relay_info.posts.result_code == 0){
			let center_data = get_relay_info.posts.center_data;	
			let tracker_data = get_relay_info.posts.tracker_data;	
			
			data = [
				{
					key: '1',
					column1: '设备ID',
					column2: tracker_data.info.peerid,
					column3: 'ip_tag',
					column4: tracker_data.info.ip_tag 
				},
				{
					key: '2',
					column1: '公网ip',
					column2: tracker_data.info.public_ip.ip+":"+tracker_data.info.public_ip.port,
					column3: '内网ip',
					column4: tracker_data.info.local_ip.ip+":"+tracker_data.info.local_ip.port
				},
				{
					key: '3',
					column1: '最后更新时间',
					column2: tracker_data.info.last_heartbeat,
					column3: 'msg_seq',
					column4: tracker_data.info.msg_seq 
				},
				{
					key: '4',
					column1: '转发类型ID号',
					column2: tracker_data.areaid,
					column3: '分组掩码',
					column4: tracker_data.group_mask
				},
				{
					key: '5',
					column1: '当前上行连接数',
					column2: tracker_data.upspeed,
					column3: '当前下行连接数',
					column4: tracker_data.downspeed
				},
				{
					key: '6',
					column1: '最大上行带宽(Mbit)',
					column2: tracker_data.max_out_bandwidth,
					column3: '最大下行带宽(Mbit)',
					column4: tracker_data.max_in_bandwidth
				},
				{
					key: '7',
					column1: '最大上行连接数',
					column2: tracker_data.max_out_connections,
					column3: '最大下行连接数',
					column4: tracker_data.max_in_connections 
				},
				{
					key: '8',
					column1: '服务器综合能力值',
					column2: tracker_data.ability,
					column3: '',
					column4: ''
				}
			]
			data2 = [
				{
					key: '1',
					column1: '设备ID',
					column2: '无提供',
					column3: 'ip_tag',
					column4: '无提供' 
				},
				{
					key: '2',
					column1: '公网ip',
					column2: center_data.public_ip+":"+center_data.public_ip,
					column3: '内网ip',
					column4: '无提供' 
				},
				{
					key: '3',
					column1: '最后更新时间',
					column2: center_data.updated, 
					column3: 'msg_seq',
					column4: '无提供' 
				},
				{
					key: '4',
					column1: '转发类型ID号',
					column2: center_data.areaid, 
					column3: '分组掩码',
					column4: '无提供' 
				},
				{
					key: '5',
					column1: '当前上行连接数',
					column2: center_data.upspeed,
					column3: '当前下行连接数',
					column4: center_data.downspeed
				},
				{
					key: '6',
					column1: '最大上行带宽(Mbit)',
					column2: center_data.max_out_bandwidth,
					column3: '最大下行带宽(Mbit)',
					column4: center_data.max_in_bandwidth
				},
				{
					key: '7',
					column1: '最大上行连接数',
					column2: center_data.max_out_connections,
					column3: '最大下行连接数',
					column4: center_data.max_in_connections 
				},
				{
					key: '8',
					column1: '服务器综合能力值',
					column2: tracker_data.ability,
					column3: '',
					column4: ''
				}
			]	
			let state,config_type;
			switch(center_data.state){
				case 0:
					state = "异常或离线"; 
				break;
				case 1:
					state = "就绪"; 
				break;
				case 2:
					state = "获取转发中"; 

				break;
				case 3:
					state = "链接转发中"; 

				break;
				case 4:
					state = "推流中"; 

				break;
				case 5:
					state = "断开转发中"; 

				break;
			}
			switch(center_data.config_type){
				case 0:
					config_type = "私有"; 
				break;
				case 1:
					config_type = "私有广播"; 
				break;
				case 2:
					config_type = "公众"; 

				break;
				case 3:
					config_type = "私有录像"; 

				break;
				case 4:
					config_type = "公众录像"; 

				break;
			}
			
		}
		let icon = 'plus';
		if(get_relay_info.show_flag){
			icon = 'minus';
		}else{
			icon = 'plus';
		}
		let input_value;
		
		if(get_relay_info.id){
			input_value = get_relay_info.id; 
		}else if(location.query.id){
			input_value = location.query.id;
		}
        return (
			<Monitor location={location}>
				<Form inline onSubmit={this.handleSubmit.bind(this)}>
					<FormItem id="userName" >
						<Input size="large" placeholder="请输入转发服务ID" onChange={this.setValue.bind(this)}
							name="camera_info"   value={input_value}/>
					</FormItem>
					
				
					<Button type="primary" htmlType="submit">提交</Button>
				</Form>
				{
					get_relay_info.fetched &&
					<div>
						<h2>Tracker来源</h2> 
						<Table className="camera_info_table1" columns={columns}
							dataSource={data} pagination={false} bordered/>
					</div>
				}
				{
					get_relay_info.fetched && 
					<div>
						<div className="clearfix">
							<h2 className="center-title">Center来源</h2> 
							<Icon onClick={this.showTable2.bind(this)} type={icon} className="center-plus" />
						</div>
						{
							get_relay_info.show_flag && 
							<Table className="camera_info_table2"
								columns={columns} dataSource={data2} pagination={false} bordered/>
						}
						
					</div>
				}

			</Monitor>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	//console.log("get_relay_info组件初始props",state);
	return {
	    get_relay_info : state.get_relay_info,
	};
}
module.exports = connect(mapStateToProps)(Get_relay_info)
