import React from 'react'
import { connect } from 'react-redux'
import { push ,replace } from 'react-router-redux'
import * as action from './action'
import {Form, Input, Button, Icon,Table } from 'antd_c'
import Monitor from '../../sidebar/user_log'
import Pagination from '../pagination'
import { title } from '../title.js'
import LogForm from '../form'
import { getUrlParams } from 'function'
import { columns,logData } from './data'
const FormItem = Form.Item;
let data = []; 

class rtmp_conn_time extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.rtmp_conn_time.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.location.pathname)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,rtmp_conn_time } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { rtmp_conn_time ,location,dispatch } = this.props;
		let { params } = rtmp_conn_time;
		if(this.hasMount && rtmp_conn_time.posts && rtmp_conn_time.posts.logs){
			if(rtmp_conn_time.posts.logs[0]){
				if( !rtmp_conn_time.posts.logs[0].key){
					data = logData(rtmp_conn_time);
				}
			}else{
				data = [];
			}
			
		}
        return (
			<Monitor location={location} >
				<h2>{title[this.type]}</h2>
				<br/>
				<LogForm action={action}/>
				
				{
					!rtmp_conn_time.posts &&
					<Table className="" loading={rtmp_conn_time.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					rtmp_conn_time.posts &&
					<Table className="" loading={rtmp_conn_time.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					rtmp_conn_time.posts && rtmp_conn_time.posts.total_pages > 1 &&
					<Pagination action={action}/>
				}
			</Monitor>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state,props){
	//console.log("rtmp_conn_time组件初始props",state);
	return {
		
	    rtmp_conn_time : state.rtmp_conn_time
	};
}
module.exports = connect(mapStateToProps)(rtmp_conn_time)
module.exports.component = rtmp_conn_time;
