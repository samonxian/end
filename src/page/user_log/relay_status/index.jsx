import React from 'react'
import { connect } from 'react-redux'
import { pushPath ,replacePath } from 'redux-simple-router'
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

class relay_status extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.relay_status.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.route.path)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,relay_status } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { relay_status ,location,dispatch } = this.props;
		let { params } = relay_status;
		if(this.hasMount && relay_status.posts && relay_status.posts.logs){
			if(relay_status.posts.logs[0]){
				if( !relay_status.posts.logs[0].key){
					data = logData(relay_status);
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
					!relay_status.posts &&
					<Table className="" loading={relay_status.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					relay_status.posts &&
					<Table className="" loading={relay_status.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					relay_status.posts && relay_status.posts.total_pages > 1 &&
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
	//console.log("relay_status组件初始props",state);
	return {
		//routing : state.routing,
	    relay_status : state.relay_status
	};
}
module.exports = connect(mapStateToProps)(relay_status)
module.exports.component = relay_status;
