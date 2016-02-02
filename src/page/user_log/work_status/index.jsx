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

class work_status extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.work_status.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.location.pathname)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,work_status } = this.props
		dispatch(action.fetchData(params));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { work_status ,location,dispatch } = this.props;
		let { params } = work_status;
		if(this.hasMount && work_status.posts && work_status.posts.logs){
			if(work_status.posts.logs[0]){
				if( !work_status.posts.logs[0].key){
					data = logData(work_status);
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
					!work_status.posts &&
					<Table className="" loading={work_status.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					work_status.posts &&
					<Table className="" loading={work_status.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					work_status.posts && work_status.posts.total_pages > 1 &&
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
	//console.log("work_status组件初始props",state);
	return {
		
	    work_status : state.work_status
	};
}
module.exports = connect(mapStateToProps)(work_status)
module.exports.component = work_status;
