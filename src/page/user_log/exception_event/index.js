import React from 'react'
import { connect } from 'react-redux'
import { pushPath ,replacePath } from 'redux-simple-router'
import * as action from './action'
import {Form, Input, Button, Icon,Table } from 'antd_c'
import Monitor from '../../sidebar/user_log'
import Pagination from '../pagination.js'
import { title } from '../title.js'
import LogForm from '../form.js'
import { getUrlParams } from 'function'
import { columns,logData } from './data'
const FormItem = Form.Item;
let data = []; 

class exception_event extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.exception_event.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.route.path)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,exception_event } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { exception_event ,location,dispatch } = this.props;
		let { params } = exception_event;
		if(this.hasMount && exception_event.posts && exception_event.posts.logs){
			if(exception_event.posts.logs[0]){
				if( !exception_event.posts.logs[0].key){
					data = logData(exception_event);
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
					!exception_event.posts &&
					<Table className="" loading={exception_event.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					exception_event.posts &&
					<Table className="" loading={exception_event.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					exception_event.posts && exception_event.posts.total_pages > 1 &&
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
	//console.log("exception_event组件初始props",state);
	return {
		//routing : state.routing,
	    exception_event : state.exception_event
	};
}
module.exports = connect(mapStateToProps)(exception_event)
module.exports.component = exception_event;
