import React from 'react'
import { connect } from 'react-redux'
import { push,replace } from 'react-router-redux'
import { DISK_DETAIL_STATUS_REQ, newIndexTab, fetchDiskData } from '../../new_index_disk/action'
import { INDEX_MONITOR_STATUS_REQ, indexMonitorFetch } from '../../new_index_monitor/action'
import { CAMERA_FRAME_STATUS_REQ, CAMERA_FRAME_STATUS_QUERY, cameraFrameFetch } from '../../new_index_camera/action'
import { Tabs, Row, Form, Select } from 'antd'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
require('../../../../style/css/new_index.css');

export class Header extends React.Component{

	callback(key) {
		key = parseInt(key,10)
		let { dispatch } = this.props;
		switch(key){
			case 1:
				dispatch(push('/new_index_disk'));
			break;
			case 2:
				dispatch(push('/new_index_camera'));
			break;
			case 3:
				dispatch(push('/new_index_monitor'));
			break;
		}
	}

    handleSelectChange(value){
    	const { backData , dispatch } = this.props
    	if(backData["type"] === DISK_DETAIL_STATUS_REQ){
    		dispatch(fetchDiskData({ area : value,p : 1}));
    	}
        if(backData["type"] === CAMERA_FRAME_STATUS_REQ){
            dispatch(cameraFrameReq({cid : '',start_time : '',end_time : ''}));
        }
        // if(backData["type"] === CAMERA_FRAME_STATUS_QUERY){
        //     dispatch(cameraFrameFetch({area : value,cid : backData["data"]["cid"],end_time: backData["data"]["end_time"],start_time: backData["data"]["start_time"]}));
        // }
    	if(backData["type"] === INDEX_MONITOR_STATUS_REQ){
    		dispatch(indexMonitorFetch({ area : value,p : 1}));
    	}
    	dispatch(newIndexTab({area : value}))
    }

	render(){
		 
		const { router, dispatch, backData, currentCity, cityList} = this.props
		let route = router.pathname;
		let optionRow = [];
		let active = 1;

		if(route.indexOf('new_index_disk') != -1 ){
			active = 1;
		}
		if(route.indexOf('new_index_camera') != -1 ){
			active = 2;
		}
		if(route.indexOf('new_index_monitor') != -1 ){
			active = 3;
		}
        
        for(let i=0,len=cityList.length;i<len;i++){
        	optionRow.push(<Option value={ cityList[i] } key={"city_lisy_key_0"+i}>{ cityList[i] }</Option>)
        }

        if(route.indexOf('new_index_camera') != -1){
        	return (
				<div>
					<Row type="flex" justify="end">
				        <Form horizontal>
				             <FormItem
							    id="select">
							    <Select id="select" size="large" style={{width:200}} disabled></Select>
							</FormItem>
				        </Form>
				    </Row>
				    <Row type="flex" justify="start" className="header">
				        <h1>磁盘索引信息</h1>
				    </Row>
					<Tabs defaultActiveKey={active.toString()} type="card" onChange={dispatch => this.callback(dispatch)}>
						<TabPane tab="磁盘详细状态" key="1"></TabPane>
						<TabPane tab="摄像头时间信息片" key="2"></TabPane>
						<TabPane tab="索引监控数据" key="3"></TabPane>
					</Tabs>
				</div>)
        }else {
        	return (
				<div>
					<Row type="flex" justify="end">
				        <Form horizontal>
				             <FormItem
							    id="select">
							    <Select id="select" size="large" defaultValue = { currentCity["data"]["area"] } style={{width:200}} onChange={(dispatch,backData)=>this.handleSelectChange(dispatch,backData)}>
							        { optionRow }
							    </Select>
							</FormItem>
				        </Form>
				    </Row>
				    <Row type="flex" justify="start" className="header">
				        <h1>磁盘索引信息</h1>
				    </Row>
					<Tabs defaultActiveKey={active.toString()} type="card" onChange={dispatch => this.callback(dispatch)}>
						<TabPane tab="磁盘详细状态" key="1"></TabPane>
						<TabPane tab="摄像头时间信息片" key="2"></TabPane>
						<TabPane tab="索引监控数据" key="3"></TabPane>
					</Tabs>
				</div>)
        }

		
	}
}
