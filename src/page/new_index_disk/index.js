import React from 'react'
import { connect } from 'react-redux'
import { Header } from '../new_index/component/header'
import { Dialog } from '../new_index/component/dialog'
import { fetchDiskData, DISK_DETAIL_STATUS_REQ, DISK_STORAGE_STATUS_REQ } from './action'
import { isEmptyObj, renderContent } from '../new_index/component/util'
import { Page } from '../new_index/component/page'
import { Table } from 'antd'
require('../../../style/css/new_index.css');

class Indexdisk extends React.Component {

  componentWillMount(){
		const disk = this.props.new_index_disk
		if(isEmptyObj(disk)){
			const dispatch = this.props.dispatch
		    dispatch(fetchDiskData({area : '北京',p : 1}));
		}
	}

	render(){ 

		const { routing, dispatch, backData, storageData, currentCity } = this.props
		let total
		let currentPage
		let list
    let loading = true
		let dialogData ={
       label:"",
       values : []
    }

    if(!isEmptyObj(storageData) && storageData["type"] == DISK_STORAGE_STATUS_REQ){
        if(storageData["data"]["ok"]){
            var tempData = storageData["data"]["data"]
            for(var i=0,len=tempData.length;i<len;i++){
               if(i>0){
                  dialogData.values.push({x:tempData[i][4],y:(tempData[i][2]-tempData[i-1][2])/(360*tempData[i][3])})
               }else{
                  dialogData.values.push({x:tempData[i][4],y:0})
               }
            }
        }
    }

    if(!isEmptyObj(backData) && backData["type"] == DISK_DETAIL_STATUS_REQ){
    	total = backData["data"]["total_count"]
    	currentPage = backData["data"]["p"]
    	if(backData["data"]["disc_list"] !==undefined && backData["data"]["disc_list"].length != 0){
    		loading = false
        list = backData["data"]["disc_list"]
    		for(let i = 0,len = list.length;i<len;i++){
    			list[i]["key"] = "indexKey_" + list[i]["did"]
    		}
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

		return (
			<div>
				<Header router = {routing} dispatch = { dispatch } backData= { backData } currentCity= { currentCity }/>
				<Table columns = {INDEX_HEAD} dataSource={list} pagination={false}  bordered loading={ loading }/>
				<Page currentCity = { currentCity["data"]["area"] } currentPage = {currentPage} dispatch = {dispatch} total = {total} type= {DISK_DETAIL_STATUS_REQ}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log("组件初始props",state);
	return {
		routing : state.routing,
		storageData : state.getStorageResponse,
		backData : state.new_index_disk,
    currentCity : state.cityTab
	};
}
module.exports = connect(mapStateToProps)(Indexdisk)