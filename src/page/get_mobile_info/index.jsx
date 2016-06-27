import React from 'react'
import { connect } from 'react-redux'
import { push,replace } from 'react-router-redux'
import { inputValue ,fetchData,displayTable2 } from './action'
import {Form, Input, Button, Icon,Table} from 'antd'
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
		className : 'camera_info_column2',
		render : function(text,record){
			return (
				<pre>
					{text} 	
				</pre>
			) 
		}
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

class Get_mobile_info extends React.Component {

	constructor(){
		super(); 
		this.show_flag = false;
	}

	componentDidMount(){
		let { get_mobile_info ,location,dispatch } = this.props;
		if(location.query.uid){
			dispatch(fetchData(location.query.uid));
		}
	}
	
	handleSubmit(e) {
		e.preventDefault();
		//this.props.dispatch(replace('/get_mobile_info?uid='+this.props.get_mobile_info.id),{
		//});
		this.props.dispatch(fetchData(this.props.get_mobile_info.id));	
	}
   
	setValue(e){
		this.props.dispatch(inputValue(e.target.value));	
	}


	showTable2(e){
		this.props.dispatch(displayTable2(!this.show_flag));
		this.show_flag = !this.show_flag;
	}

    render() {
		let { get_mobile_info ,location} = this.props;
		if(get_mobile_info.posts && get_mobile_info.posts.result_code == 0){
			let center_data = get_mobile_info.posts.center_data;	
			let tracker_data = get_mobile_info.posts.tracker_data;	
			var last_relay = '';
			tracker_data.last_relay.map(function(data){
				last_relay +=  data.ip + ":" + data.port + "\n"
			})
			data = [
				{
					key: '1',
					column1: 'tracker_ip',
					column2: tracker_data.tracker_ip,
					column3: '',
					column4: ''
				},
				{
					key: '2',
					column1: '摄像头ID',
					column2: get_mobile_info.id,
					column3: 'ip_tag',
					column4: tracker_data.info.ip_tag 
				},
				{
					key: '3',
					column1: '公网ip',
					column2: tracker_data.info.public_ip.ip+":"+tracker_data.info.public_ip.port,
					column3: '内网ip',
					column4: tracker_data.info.local_ip.ip+":"+tracker_data.info.local_ip.port
				},
				{
					key: '4',
					column1: '最后更新时间',
					column2: tracker_data.info.last_heartbeat,
					column3: 'msg_seq',
					column4: tracker_data.info.msg_seq 
				},
				{
					key: '5',
					column1: '状态',
					column2: tracker_data.status ,
					column3: '上次获取转发时间',
					column4: tracker_data.last_relay_time 
				},
				{
					key: '6',
					column1: '上次获取转发列表',
					column2: last_relay,
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
				case 5:
					config_type = "不存储，不分发"; 
				break;
			}
			data2 = [
				{
					key: '1',
					column1: 'tracker_ip',
					column2: center_data.tracker_ip,
					column3: '',
					column4: ''
				},
				{
					key: '2',
					column1: '摄像头ID',
					column2: get_mobile_info.id,
					column3: 'appid',
					column4: center_data.app_id 
				},
				{
					key: '3',
					column1: '公网ip',
					column2: center_data.public_ip+":"+center_data.public_port,
					column3: '内网ip',
					column4: center_data.local_ip+":"+center_data.local_port
				},
				{
					key: '4',
					column1: '最后更新时间',
					column2: center_data.updated,
					column3: '',
					column4: '' 
				},
				{
					key: '5',
					column1: '设备状态',
					column2: state,
					column3: '设备配置类型',
					column4: config_type 
				},
				{
					key: '6',
					column1: '源转发ip',
					column2: center_data.relay_ip+":"+center_data.relay_port,
					column3: '',
					column4: ''
				}
			]
		}
		let icon = 'plus';
		if(get_mobile_info.show_flag){
			icon = 'minus';
		}else{
			icon = 'plus';
		}
		let input_value;
		
		if(get_mobile_info.id){
			input_value = get_mobile_info.id; 
		}else if(location.query.id){
			input_value = location.query.id;
		}
        return (
			<Monitor location={location}>
				<Form inline onSubmit={this.handleSubmit.bind(this)}>
					<FormItem id="userName" >
						<Input size="large" placeholder="请输入手机ID" onChange={this.setValue.bind(this)}
							name="camera_info"   value={input_value}/>
					</FormItem>
					
				
					<Button type="primary" htmlType="submit">提交</Button>
				</Form>
				{
					get_mobile_info.fetched &&
					<div>
						<h2 className="h2_black">Tracker来源</h2> 
						<Table className="camera_info_table1" columns={columns}
							dataSource={data} pagination={false} bordered/>
					</div>
				}
				{
					get_mobile_info.fetched && 
					<div>
						<div className="clearfix">
							<h2 className="center-title h2_black">Center来源</h2> 
							<Icon onClick={this.showTable2.bind(this)} type={icon} className="center-plus" />
						</div>
						{
							get_mobile_info.show_flag && 
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
	//console.log("get_mobile_info组件初始props",state);
	return {
	    get_mobile_info : state.get_mobile_info,
	};
}
module.exports = connect(mapStateToProps)(Get_mobile_info)
