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

class start_transfer extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.start_transfer.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.route.path)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,start_transfer } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { start_transfer ,location,dispatch } = this.props;
		let { params } = start_transfer;
		if(this.hasMount && start_transfer.posts && start_transfer.posts.logs){
			if(start_transfer.posts.logs[0]){
				if( !start_transfer.posts.logs[0].key){
					data = logData(start_transfer);
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
					!start_transfer.posts &&
					<Table className="" loading={start_transfer.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					start_transfer.posts &&
					<Table className="" loading={start_transfer.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					start_transfer.posts && start_transfer.posts.total_pages > 1 &&
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
	//console.log("start_transfer组件初始props",state);
	return {
		//routing : state.routing,
	    start_transfer : state.start_transfer
	};
}
module.exports = connect(mapStateToProps)(start_transfer)
module.exports.component = start_transfer;
