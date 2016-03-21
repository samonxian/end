import React from 'react'
import { connect } from 'react-redux'
import { Header } from '../new_index/component/header'
import { GET_AREA_LIST, getAreaListFetch } from '../new_index/action'
import { indexMonitorFetch, INDEX_MONITOR_STATUS_REQ } from './action'
import { Page } from '../new_index/component/page'
import { isEmptyObj, renderContent, INDEX_MONITOR } from '../new_index/component/util'
import { Table } from 'antd'
require('../../../style/css/new_index.css');

class Indexmonitor extends React.Component {

    componentWillMount(){
    	const { dispatch, cityList, backData, currentCity } = this.props

		if(cityList["data"] === undefined){
			dispatch(getAreaListFetch());
		}else{
			if(isEmptyObj(backData)){
    	        let area = cityList["data"]["area_list"][0]
    	        if(!isEmptyObj(currentCity)){
    	        	area = currentCity["data"]["area"]
    	        }
				dispatch(indexMonitorFetch ({area : area,p : 1}));
			}
		}
	}

	componentWillReceiveProps(nextProps){
	    const { cityList, backData, dispatch, currentCity } = nextProps;
        
	    if(!isEmptyObj(cityList) && cityList["data"]!=undefined && isEmptyObj(backData)){
	       let area = cityList["data"]["area_list"][0]
	       if(!isEmptyObj(currentCity)){
	       	   area = currentCity["data"]["area"]
	       }
	       dispatch(indexMonitorFetch({area : area ,p : 1}));
	    }

	 }

	render(){
		
		const { location, dispatch, backData, cityList} = this.props
        let total
		let currentPage
		let list
		let currentCity
		let isloading = true
		let dialogData=[]

		// currentCity = "佛山"

		if(isEmptyObj(cityList) || cityList["data"] == undefined){
	       return false;
	    }

	    if(isEmptyObj(this.props.currentCity)){
	    	currentCity = {
	    		data : {
	    			area : cityList["data"]["area_list"][0]
	    		}
	    	}
	    }else{
	    	currentCity = this.props.currentCity
	    }
        
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
			    <Header router = {location} dispatch = { dispatch } cityList = { cityList["data"]["area_list"] } backData= { backData } currentCity= { currentCity }/>
			    <Table columns={INDEX_MONITOR} dataSource={list} pagination={false} bordered loading={ isloading }/>
			    <Page currentCity = { currentCity["data"]["area"] } currentPage = {currentPage} dispatch = {dispatch} total = {total} type= {INDEX_MONITOR_STATUS_REQ}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log("组件初始props",state);
	return {
		backData : state.new_index_monitor,
		currentCity : state.cityTab,
		cityList : state.get_area_list
	};
}
module.exports = connect(mapStateToProps)(Indexmonitor)