import React from 'react'
import { connect } from 'react-redux'
import { Appheader } from '../app_manager/component/Appheader'
import { USER_LIST } from './data/user_table'
import { Table } from 'antd'
require('../../../style/css/new_index.css')

class Appuserlist extends React.Component {

    componentWillMount(){
    	console.log(1);
	}

	render(){ 
		const { location, dispatch } = this.props
		let userData = []
		return (
			<div>
				<Appheader router = {location} dispatch = { dispatch }/>
				<Table columns = { USER_LIST } dataSource={userData} pagination={false} bordered loading={false}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log("组件初始props",state);
	return {
	};
}
module.exports = connect(mapStateToProps)(Appuserlist)