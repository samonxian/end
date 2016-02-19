import React from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import { push,replace } from 'react-router-redux'
const TabPane = Tabs.TabPane;

class Monitor extends React.Component {
	
	callback(key) {
		key = parseInt(key,10)
		let { dispatch } = this.props;
		switch(key){
			case 1:
				dispatch(push('/get_camera_info'));
			break;
			case 2:
				dispatch(push('/get_mobile_info'));
			break;
			case 3:
				dispatch(push('/get_relay_info'));
			break;
		}
	}

    render() {
		let route = this.props.location.pathname;

		let active = 1;
		if(route.indexOf('get_camera_info') != -1 ){
			active = 1;
		}
		if(route.indexOf('get_mobile_info') != -1 ){
			active = 2;
		}
		if(route.indexOf('get_relay_info') != -1 ){
			active = 3;
		}
        return (
			<div>
				<Tabs defaultActiveKey={active.toString()} onChange={this.callback.bind(this)} type="card">
					<TabPane tab="摄像头信息" key="1">
						{
							route.indexOf('get_camera_info') != -1 &&  this.props.children
						}
					</TabPane>
					<TabPane tab="手机信息" key="2">
						{
							route.indexOf('get_mobile_info') != -1 &&  this.props.children
						}
					</TabPane>
					<TabPane tab="转发服务信息" key="3">
						{
							route.indexOf('get_relay_info') != -1 &&  this.props.children
						}	
					</TabPane>
				</Tabs>
			</div>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	//console.log("Get_camera_info组件初始props",state);
	return {
	};
}
export default connect(mapStateToProps)(Monitor)
