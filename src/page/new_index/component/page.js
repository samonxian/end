import React from 'react'
import {fetchDiskData,DISK_DETAIL_STATUS_REQ,INDEX_MONITOR_STATUS_REQ,indexMonitorFetch} from '../action'
import { Pagination , Row } from 'antd'

export class Page extends React.Component{

	render(){
		const { dispatch, total, currentPage,type} = this.props
		return (
		<div className="footer">
			<Row type="flex" justify="end">
			     <Pagination defaultCurrent={currentPage} onChange={(dispatch,type) => this.onShowSizeChange(dispatch,type)} pageSize={20} showQuickJumper = {true} total={total} />
			</Row>
		</div>)
	}

	onShowSizeChange(current){
		const { dispatch, total, type, currentCity } = this.props
		if(type === DISK_DETAIL_STATUS_REQ){
			dispatch(fetchDiskData({area : currentCity,p : current}))
		}
		if(type === INDEX_MONITOR_STATUS_REQ){
			dispatch(indexMonitorFetch({area : currentCity,p : current}))
		}
	}
}