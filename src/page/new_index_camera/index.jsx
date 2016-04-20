import React from 'react'
import { connect } from 'react-redux'
import { Header } from '../new_index/component/header'
import { CAMERA_FRAME_STATUS_REQ, CAMERA_FRAME_STATUS_QUERY } from './action'
import { Queryfrom } from '../new_index/component/query'
import { isEmptyObj, renderContent, INDEX_CAMERA} from '../new_index/component/util'
import { Table } from 'antd'
require('../../../style/css/new_index.css');

class Indexcamera extends React.Component {

	render(){
        
		const { location, dispatch, backData } = this.props
        let total
		let currentPage
		let list = []
        let isloading 
        let isEmpty = isEmptyObj(backData)
		let queryData = {
            cid : isEmpty ? '' : backData["data"]["cid"],
            end_time: isEmpty ? '' : backData["data"]["end_time"],
            start_time: isEmpty ? '' : backData["data"]["start_time"]
		}

        if(!isEmpty && backData["type"] == CAMERA_FRAME_STATUS_QUERY){
        	var tempList = backData["data"]["cam_store_details"];
            isloading = false
        	for(let i=0,len=tempList.length;i<len;i++){
        		var temp = tempList[i],
        		    detailList = temp["details"],
        		    timeline = new Date(temp["start_time"]*1000).Format("yyyy-MM-dd hh:mm:ss")+" ~ "+new Date(temp["end_time"]*1000).Format("yyyy-MM-dd hh:mm:ss");
                for(let j=0,delen = detailList.length;j<delen;j++){
                	var start = new Date(detailList[j]["start_time"]*1000).Format("yyyy-MM-dd hh:mm:ss");
                	var key = "timeline_"+ new Date().getTime()+Math.random();
                	var end = new Date(detailList[j]["end_time"]*1000).Format("yyyy-MM-dd hh:mm:ss");
                	list.push({
                        key: key,
                        timeline: timeline,
                        area : temp["area"],
                        group: temp["group"],
                        length: j === 0?delen : "",
                        start_time: start,
                        end_time: end,
                        detail: {
                             desc : detailList[j]["discs"],
                             filterArra : temp["disc_list"]
                        }
                   })
                }
        	}
        }
        
        if(backData["type"] == CAMERA_FRAME_STATUS_REQ){
            isloading = true
        }else{
            isloading = false
        }

		return (
			<div>
			     <Header router = {location} dispatch = { dispatch } backData= { backData } cityList = { [] }/>
			     <Queryfrom dispatch = {dispatch} formData={queryData}/>
			     <Table columns={INDEX_CAMERA} dataSource={list} pagination={false} bordered loading={isloading}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log("组件初始props",state);
	return {
        backData : state.new_index_camera,
	};
}
module.exports = connect(mapStateToProps)(Indexcamera)