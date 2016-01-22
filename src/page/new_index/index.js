import React from 'react'
import { connect } from 'react-redux'
import { fetchDiskData,DISK_DETAIL_STATUS_REQ,CAMERA_FRAME_STATUS_REQ,CAMERA_FRAME_STATUS_QUERY,
	     INDEX_MONITOR_STATUS_REQ,cameraFrameFetch,cameraFrameReq,indexMonitorFetch,DISK_STORAGE_STATUS_REQ} from './action'
import { Tabs, Row, Calendar,Col,Form,Select,Button,Input,Pagination,Table,TimePicker} from 'antd'
import { isEmptyObj,INDEX_MONITOR,INDEX_HEAD,INDEX_CAMERA} from './component/util'
import { Queryfrom } from './component/query'
import { Dialog } from './component/dialog'
import { Page } from './component/page'
require('../../../style/css/new_index.css');
const TabPane = Tabs.TabPane
const FormItem = Form.Item;

class Index extends React.Component {

	componentWillMount(){
		const disk = this.props.diskDetailResponse
		if(isEmptyObj(disk)){
			const dispatch = this.props.dispatch
		    dispatch(fetchDiskData({area : '北京',p : 1}));
		}
	}

    render() {
        const { dispatch,backData,storageData } = this.props
        let list = [],dialogData = [],total = 0,renderBody,showType,renderPage,currentPage;
        const renderContent = function(value, row, index) {
            let obj = {
                children: value,
                props: {}
            }
            return obj
        }

        if(!isEmptyObj(storageData) && storageData["type"] == DISK_STORAGE_STATUS_REQ){
            if(storageData["data"]["ok"]){
                console.log("刷新存储数据刷新");
                console.log(storageData);
                dialogData = storageData["data"]["data"]
            }
        }

        const INDEX_HEAD = [
           {
              title: '磁盘ID',
              dataIndex: 'did',
              render: renderContent
            },
            {
              title: 'IP地址',
              dataIndex: 'ip',
              render: renderContent
            },
            {
              title: '端口号',
              dataIndex: 'port',
              render: renderContent
            },
            {
              title: '磁盘空间大小',
              dataIndex: 'size_data',
              render: renderContent
            },
            {
              title: '但前偏移',
              dataIndex: 'pos_data',
              render: renderContent
            },
            {
              title: '起始时间',
              dataIndex: 'first',
              render: renderContent
            },
            {
              title: '终点时间',
              dataIndex: 'last',
              render: renderContent
            },
            {
              title: '当前用户数',
              dataIndex: 'user_count',
              render: renderContent
            },
            {
              title: '磁盘上行宽带',
              dataIndex: 'upload_rate',
              render: renderContent
            },
            {
              title: '磁盘下行宽带',
              dataIndex: 'download_rate',
              render: renderContent
            },
            {
              title: '在线状态',
              dataIndex: 'keepalive_timelast',
              render: renderContent
            },
            {
              title: '操作',
              render: function(text, record){
                 return <Dialog keyId={record.did} dispatch={dispatch} dialogData={dialogData}/>;
              }
            }
        ]

        if(!isEmptyObj(backData) && backData["type"] == DISK_DETAIL_STATUS_REQ){
        	total = backData["data"]["total_count"]
        	currentPage = backData["data"]["p"]
        	if(backData["data"]["disc_list"] !==undefined && backData["data"]["disc_list"].length != 0){
        		list = backData["data"]["disc_list"]
        		for(let i = 0,len = list.length;i<len;i++){
        			list[i]["key"] = "indexKey_" + list[i]["did"]
        		}
        	}
        }

        if(backData["type"] == DISK_DETAIL_STATUS_REQ){
        	console.log("磁盘详细状态当前页："+currentPage);
	     	renderBody = <Table columns = {INDEX_HEAD} dataSource={list} pagination={false} bordered />
	     	renderPage = <Page currentCity = { backData["data"]["area"] } currentPage = {currentPage} dispatch = {dispatch} total = {total} type= {DISK_DETAIL_STATUS_REQ}/>
		}

		if(backData["type"] == CAMERA_FRAME_STATUS_REQ ){
            let formData = {
                area : backData["data"]["area"],
                cid : backData["data"]["cid"],
                end_time: backData["data"]["end_time"],
                start_time: backData["data"]["start_time"]
            }
            console.log("CAMERA_FRAME_STATUS_REQ:");
            console.log(formData);
			showType = <Queryfrom dispatch = {dispatch} formData = {formData}/>
	     	renderBody = <Table columns={INDEX_CAMERA} dataSource={list} pagination={false} bordered />
	     	renderPage = ""
		}
        
        if(backData["type"] == CAMERA_FRAME_STATUS_QUERY){
        	var tempList = backData["data"]["cam_store_details"];
        	for(let i=0,len=tempList.length;i<len;i++){
        		var temp = tempList[i],
        		    detailList = temp["details"],
        		    timeline = new Date(temp["start_time"]).Format("yyyy-MM-dd hh:mm:ss")+" "+new Date(temp["end_time"]).Format("yyyy-MM-dd hh:mm:ss");
                for(let j=0,delen = detailList.length;j<delen;j++){
                	var start = new Date(detailList[j]["start_time"]).Format("yyyy-MM-dd hh:mm:ss");
                	var key = "timeline_"+ new Date().getTime()+Math.random();
                	var end = new Date(detailList[j]["end_time"]).Format("yyyy-MM-dd hh:mm:ss");
                	list.push({key:key,timeline:timeline,group:temp["group"],start_time:start,end_time:end,detail:{
                        desc : detailList[j]["discs"],
                        filterArra : temp["disc_list"]
                    }})
                }
        	}
            console.log("CAMERA_FRAME_STATUS_QUERY：");
            console.log(list);
            let queryData = {
                area : backData["data"]["area"],
                cid : backData["data"]["cid"],
                end_time: backData["data"]["end_time"],
                start_time: backData["data"]["start_time"]
            }
        	showType = <Queryfrom dispatch = {dispatch} formData={queryData}/>
	     	renderBody = <Table columns={INDEX_CAMERA} dataSource={list} pagination={false} bordered />
	     	renderPage = ""
        }

        if(!isEmptyObj(backData) && backData["type"] == INDEX_MONITOR_STATUS_REQ){
        	if(backData["data"]["monitors"] !==undefined && backData["data"]["monitors"].length != 0){
        		list = backData["data"]["monitors"]
        		currentPage = backData["data"]["p"]
        		total = backData["data"]["total_count"]
	        	for(let i = 0,len = list.length;i<len;i++){
	    			list[i]["key"] = "indexMonitorKey_" + i
	    		}
        	}

        	renderBody = <Table columns={INDEX_MONITOR} dataSource={list} pagination={false} bordered />
        	renderPage = <Page currentCity = { backData["data"]["area"] } currentPage = {currentPage} dispatch = {dispatch} total = {total} type= {INDEX_MONITOR_STATUS_REQ}/>
        }

        return (
			<div>
			    <Row type="flex" justify="end">
			        <Form horizontal>
			             <FormItem
						    id="select">
						    <Select id="select" size="large" defaultValue="北京" style={{width:200}} onChange={(dispatch,backData)=>this.handleSelectChange(dispatch,backData)}>
						        <Option value="北京">北京</Option>
						        <Option value="佛山">佛山</Option>
						    </Select>
						</FormItem>
			        </Form>
			    </Row>
			    <Row type="flex" justify="start" className="header">
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
    }

    tabChange(key){
    	const { backData , dispatch } = this.props
    	if(key == 1){
    		dispatch(fetchDiskData({ area : backData["data"]["area"],p : 1}));
    	}else if(key == 2){
            let formData = {
                cid : '',
                start_time : '',
                end_time : '',
                area : backData["data"]["area"]
            };
    		dispatch(cameraFrameReq(formData));
    	}else if(key == 3){
    		dispatch(indexMonitorFetch({area : backData["data"]["area"],p : 1}));
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
		backData : state.diskDetailResponse,
    storageData : state.getStorageResponse
	};
}
module.exports = connect(mapStateToProps)(Index)

