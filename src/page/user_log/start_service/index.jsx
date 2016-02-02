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

class start_service extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){

		if(!this.props.start_service.posts){
			this.getData({ })	
		}
		this.hasMount = true;

		this.type = getUrlParams(this.props.location.pathname)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,start_service } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		let { start_service ,location,dispatch } = this.props;
		if(this.hasMount && start_service.posts && start_service.posts.logs){
			if(start_service.posts.logs[0]){
				if( !start_service.posts.logs[0].key){
					data = logData(start_service);
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
					!start_service.posts &&
					<Table className="" loading={start_service.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					start_service.posts &&
					<Table className="" loading={start_service.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					start_service.posts && start_service.posts.total_pages > 1 &&
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
	//console.log("start_service组件初始props",state);
	return {
		
	    start_service : state.start_service
	};
}
module.exports = connect(mapStateToProps)(start_service)