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

class recv_src_conn extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.recv_src_conn.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.route.path)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,recv_src_conn } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { recv_src_conn ,location,dispatch } = this.props;
		let { params } = recv_src_conn;
		if(this.hasMount && recv_src_conn.posts && recv_src_conn.posts.logs){
			if(recv_src_conn.posts.logs[0]){
				if( !recv_src_conn.posts.logs[0].key){
					data = logData(recv_src_conn);
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
					!recv_src_conn.posts &&
					<Table className="" loading={recv_src_conn.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					recv_src_conn.posts &&
					<Table className="" loading={recv_src_conn.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					recv_src_conn.posts && recv_src_conn.posts.total_pages > 1 &&
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
	//console.log("recv_src_conn组件初始props",state);
	return {
		//routing : state.routing,
	    recv_src_conn : state.recv_src_conn
	};
}
module.exports = connect(mapStateToProps)(recv_src_conn)
module.exports.component = recv_src_conn;
