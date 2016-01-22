import React from 'react'
import { connect } from 'react-redux'
import { Header } from '../new_index/component/header'
import { indexMonitorFetch, INDEX_MONITOR_STATUS_REQ } from './action'
import { Page } from '../new_index/component/page'
import { isEmptyObj, renderContent, INDEX_MONITOR } from '../new_index/component/util'
import { Table } from 'antd'
require('../../../style/css/new_index.css');

class Indexmonitor extends React.Component {

    componentWillMount(){
		const disk = this.props.new_index_monitor
		if(isEmptyObj(disk)){
			const dispatch = this.props.dispatch
		    dispatch(indexMonitorFetch ({area : '北京',p : 1}));
		}
	}

	render(){
		
		const { routing, dispatch, backData, currentCity} = this.props
        let total
		let currentPage
		let list
		let isloading = true
		let dialogData=[]
        
        if(!isEmptyObj(backData) && backData["type"] == INDEX_MONITOR_STATUS_REQ){
        	if(backData["data"]["monitors"] !==undefined && backData["data"]["monitors"].length != 0){
        		list = backData["data"]["monitors"]
        		isloading = false
        		currentPage = backData["data"]["p"]
        		total = backData["data"]["total_count"]
	        	for(let i = 0,len = list.length;i<len;i++){
	    			list[i]["key"] = "indexMonitorKey_" + i
	    		}
        	}
        }

		return (
			<div>
			    <Header router = {routing} dispatch = { dispatch } backData= { backData } currentCity= { currentCity }/>
			    <Table columns={INDEX_MONITOR} dataSource={list} pagination={false} bordered loading={ isloading }/>
			    <Page currentCity = { currentCity["data"]["area"] } currentPage = {currentPage} dispatch = {dispatch} total = {total} type= {INDEX_MONITOR_STATUS_REQ}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log("组件初始props",state);
	return {
		routing : state.routing,
		backData : state.new_index_monitor,
		currentCity : state.cityTab
	};
}
module.exports = connect(mapStateToProps)(Indexmonitor)