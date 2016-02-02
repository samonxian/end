import React from 'react'
import { connect } from 'react-redux'
import { Appheader } from './component/Appheader'
import { AddBtn } from './component/Addbtn'
import { appManagerFetch, APP_MANAGER_STATUS, GET_APP_TYPE_STATUS } from './action'
import { APP_HEADER } from './data/table'
import { Table, Row } from 'antd'
require('../../../style/css/new_index.css')
let commonFun = require('../../../src/libs/function.js')
let isEmptyObj = commonFun.isEmptyObj

class Appmanager extends React.Component {
    
    componentWillMount(){
    	const { dispatch } = this.props
    	dispatch(appManagerFetch({p:1}))
	}

	render(){ 
		const { appTableData, dispatch, appType } = this.props
		let appData = []
		let type = []

		if(!isEmptyObj(appTableData) && appTableData["type"]=== APP_MANAGER_STATUS){
			appData = appTableData["data"]["list"]
		}

		if(!isEmptyObj(appType) && appType["type"]=== GET_APP_TYPE_STATUS){
			type = appType["data"]
		}

		return (
			<div>
			    <Row type="flex" justify="start" className="header">
			        <h1>APP管理</h1>
			    </Row>
			    <Row type="flex" justify="end">
				     <AddBtn dispatch = { dispatch } appType= { type } />
				</Row>
				<Table columns = {APP_HEADER} dataSource={appData} pagination={false} bordered loading={false}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		appTableData : state.app_manager,
		appType : state.get_app_type
	};
}
module.exports = connect(mapStateToProps)(Appmanager)