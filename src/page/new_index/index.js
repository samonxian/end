import React from 'react'
import { connect } from 'react-redux'
import { fetchDiskData,DISK_DETAIL_STATUS_REQ,CAMERA_FRAME_STATUS_REQ,INDEX_MONITOR_STATUS_REQ,cameraFrameFetch,cameraFrameReq,indexMonitorFetch} from './action'
import { Tabs, Row, Col,Form,Select,Button,Input,Pagination,Table,TimePicker} from 'antd'
import { isEmptyObj,INDEX_HEAD,INDEX_MONITOR,INDEX_CAMERA} from './component/util'
const TabPane = Tabs.TabPane
const FormItem = Form.Item;

class Index extends React.Component {

	componentWillMount(){
		const disk = this.props.diskDetailResponse
		if(!isEmptyObj(disk)){
			const dispatch = this.props.dispatch
		    dispatch(fetchDiskData({area : '北京',p : 1}));
		}
	}

    render() {
        const { dispatch,backData } = this.props
        let list = []
        let total = 0
        let renderBody
        let showType
        let renderPage

        if(!isEmptyObj(backData) && backData["type"] == DISK_DETAIL_STATUS_REQ){
        	total = backData["data"]["total_pages"]
        	if(backData["data"]["disc_list"] !==undefined && backData["data"]["disc_list"].length != 0){
        		list = backData["data"]["disc_list"]
        		for(let i = 0,len = list.length;i<len;i++){
        			list[i]["key"] = "indexKey_" + list[i]["did"]
        		}
        	}
        }

        if(backData["type"] == DISK_DETAIL_STATUS_REQ){
	     	renderBody = <Table columns={INDEX_HEAD} dataSource={list} pagination={false} bordered />
	     	renderPage = <Pagination defaultCurrent={1} total={total} />
		}

		if(backData["type"] == CAMERA_FRAME_STATUS_REQ){
			showType = <Form inline onSubmit={this.handleSubmit}>
					        <FormItem id="userName">
					             <Input placeholder="视频源ID" id="userName" name="userName"/>
					        </FormItem>
					        <FormItem id="startTime">
                                 <TimePicker placeholder="起始时间" />
                            </FormItem>
                            <FormItem id="endTime">
                                 <TimePicker placeholder="结束时间" />
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交</Button>
                       </Form>
	     	renderBody = <Table columns={INDEX_CAMERA} dataSource={list} pagination={false} bordered />
	     	renderPage = <Pagination defaultCurrent={1} total={total} />
		}
        
        if(!isEmptyObj(backData) && backData["type"] == INDEX_MONITOR_STATUS_REQ){
        	if(backData["data"]["monitors"] !==undefined && backData["data"]["monitors"].length != 0){
        		list = backData["data"]["monitors"]
	        	for(let i = 0,len = list.length;i<len;i++){
	    			list[i]["key"] = "indexMonitorKey_" + i
	    		}
        	}
        	renderBody = <Table columns={INDEX_MONITOR} dataSource={list} pagination={false} bordered />
        }

        return (
			<div>
			    <Row type="flex" justify="end">
			        <Form horizontal>
			             <FormItem
						    id="select"
						    label=""
						    labelCol={{span: 6}}
						    wrapperCol={{span: 14}}>
						    <Select id="select" size="large" defaultValue="lucy" style={{width:200}}>
						        <Option value="jack">jack</Option>
						        <Option value="lucy">lucy</Option>
						        <Option value="disabled" disabled>disabled</Option>
						        < Option value="yiminghe">yiminghe</Option>
						    </Select>
						</FormItem>
			        </Form>
			    </Row>
			    <Row type="flex" justify="start">
			        <h1>磁盘索引信息</h1>
			    </Row>
				<Tabs type="card" onTabClick={dispatch => this.tabChange(dispatch)}>
					<TabPane tab="磁盘详细状态" key="1"></TabPane>
					<TabPane tab="摄像头时间信息片" key="2"></TabPane>
					<TabPane tab="索引监控数据" key="3"></TabPane>
				</Tabs>
				<div>
				     { showType }
				     { renderBody }
				     { renderPage }
				</div>
			</div>
        )
    }

    tabChange(key){
    	const dispatch = this.props.dispatch
    	if(key == 1){
    		dispatch(fetchDiskData({area : '北京',p : 1}));
    	}else if(key == 2){
    		dispatch(cameraFrameReq());
    	}else if(key == 3){
    		dispatch(indexMonitorFetch({area : '北京',p : 1}));
    	}
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	console.log("组件初始props",state);
	return {
		routing : state.routing,
		backData : state.diskDetailResponse
	};
}
module.exports = connect(mapStateToProps)(Index)

