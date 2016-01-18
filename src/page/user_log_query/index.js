import React from 'react'
import { connect } from 'react-redux'
import { pushPath ,replacePath } from 'redux-simple-router'
import * as log_query_action from './action'
import {Form, Input, Button, Icon,Table,DatePicker,Pagination,Spin } from 'antd_c'
import Monitor from '../sidebar/user_log'
import QueryForm from './form'
import { title } from '../user_log/title.js'
import { getUrlParams } from 'function'
import * as deal from './data'
import LogData from './data/data'
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker;
let data = [];

class user_log_query extends React.Component {
	constructor(){
		super(); 
	}

	componentDidUpdate(){
	}

	componentDidMount(){
	}
	
	getType(type){
		switch(type){
			case 'camera_debug':
				type = 'rtmp_device';
			case 'camera_time':
				type = 'rtmp_device';
			case 'mobile_debug':
				type = 'rtmp_device';
			case 'camera_time_last':
				type = 'rtmp_device';
			case 'camera_debug_last':
				type = 'rtmp_device';
		}
		return type;
	}

	getLogData(){
		
		let obj = { }
		let { location,route } = this.props;
		if(!this.obj){
			for(var key in title){
				key = this.getType(key);
				obj[key] =  require('../user_log/'+key+'/data.js');
			}
			this.obj = obj;
		}
		let type = location.query.type;
		if(!type){
			type = 'start_service';	
		}
		type = this.getType(type);
		return this.obj;
	}

    render() {
			//console.log(this.props)
		let { user_log_query ,location,dispatch } = this.props;
		let { params } = user_log_query;
		let deal_table = this.getLogData(); 
		if(user_log_query.change_data && user_log_query.posts){
			data = deal.deal(user_log_query.posts.logs);
			//console.log(data)
		}
        return (
			<Monitor location={location} params={params}>
				<h2>{title[location.query.type]}</h2>
				<br/>
				<QueryForm />	
				{
					user_log_query.isFetching && <Spin size="large" />
				}
				{
					!user_log_query.isFetching && user_log_query.posts &&
					<LogData className="user_log_query_table" 
						 data={data} deal={ deal_table } index={deal.index}/>
				}
			</Monitor>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	//console.log("user_log_query组件初始props",state);
	return {
	    user_log_query : state.user_log_query,
		//routing : state.routing
	};
}
module.exports = connect(mapStateToProps)(user_log_query)
