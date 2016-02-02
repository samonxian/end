import React from 'react'
import { connect } from 'react-redux'
import { Appheader } from '../app_manager/component/Appheader'
import { CAMERA_HEADER } from './data/camera_table'
import { Table } from 'antd'
require('../../../style/css/new_index.css');

class Appcameralist extends React.Component {

    componentWillMount(){
	}

	render(){ 
		const { location, dispatch} = this.props
		let cameraList = []

		return (
			<div>
				<Appheader router = { location } dispatch={ dispatch }/>
				<Table columns = {CAMERA_HEADER} dataSource={ cameraList } pagination={false} bordered loading={false}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log("组件初始props",state);
	return {
	};
}
module.exports = connect(mapStateToProps)(Appcameralist)