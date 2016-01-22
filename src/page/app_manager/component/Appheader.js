import React from 'react'
import { connect } from 'react-redux'
import { pushPath,replacePath } from 'redux-simple-router'
import { DISK_DETAIL_STATUS_REQ, newIndexTab, fetchDiskData } from '../../new_index_disk/action'
import { INDEX_MONITOR_STATUS_REQ, indexMonitorFetch } from '../../new_index_monitor/action'
import { CAMERA_FRAME_STATUS_REQ, CAMERA_FRAME_STATUS_QUERY, cameraFrameFetch } from '../../new_index_camera/action'
import { Tabs, Row, Form, Select } from 'antd'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
require('../../../../style/css/new_index.css');

export class Appheader extends React.Component {

	callback(key) {
		key = parseInt(key,10)
		let { dispatch } = this.props
		switch(key){
			case 1:
				dispatch(pushPath('/app_manager'));
			break;
			case 2:
				dispatch(pushPath('/app_user_list'));
			break;
			case 3:
				dispatch(pushPath('/app_camera_list'));
			break;
		}
	}

    handleSelectChange(value){

    	const { backData , dispatch } = this.props
    	if(backData["type"] === DISK_DETAIL_STATUS_REQ){
    		dispatch(fetchDiskData({ area : value,p : 1}));
    	}
        if(backData["type"] === CAMERA_FRAME_STATUS_REQ){
            dispatch(cameraFrameReq({cid : '',start_time : '',end_time : '', area : value}));
        }
        if(backData["type"] === CAMERA_FRAME_STATUS_QUERY){
            dispatch(cameraFrameFetch({area : value,cid : backData["data"]["cid"],end_time: backData["data"]["end_time"],start_time: backData["data"]["start_time"]}));
        }
    	if(backData["type"] === INDEX_MONITOR_STATUS_REQ){
    		dispatch(indexMonitorFetch({ area : value,p : 1}));
    	}
    	dispatch(newIndexTab({area : value}))
    }

	render(){
		const { router, backData, dispatch, currentCity, cityList} = this.props
		let route = router.path;
		let optionRow = [];
		let active = 1;
		if(route.indexOf('app_manager') != -1 ){
			active = 1;
		}
		if(route.indexOf('app_user_list') != -1 ){
			active = 2;
		}
		if(route.indexOf('app_camera_list') != -1 ){
			active = 3;
		}
        
		return (
		<div>
		    <Row type="flex" justify="start" className="header">
		        <h1>APP管理</h1>
		    </Row>
			<Tabs defaultActiveKey={active.toString()} type="card" onChange={dispatch => this.callback(dispatch)}>
				<TabPane tab="APP管理" key="1"></TabPane>
				<TabPane tab="用户列表" key="2"></TabPane>
				<TabPane tab="摄像头列表" key="3"></TabPane>
			</Tabs>
		</div>);
	}
}
