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

class conn_media_src extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.conn_media_src.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.location.pathname)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,conn_media_src } = this.props
		dispatch(action.fetchData(params));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { conn_media_src ,location,dispatch } = this.props;
		let { params } = conn_media_src;
		if(this.hasMount && conn_media_src.posts && conn_media_src.posts.logs){
			if(conn_media_src.posts.logs[0]){
				if( !conn_media_src.posts.logs[0].key){
					data = logData(conn_media_src);
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
					!conn_media_src.posts &&
					<Table className="" loading={conn_media_src.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					conn_media_src.posts &&
					<Table className="" loading={conn_media_src.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					conn_media_src.posts && conn_media_src.posts.total_pages > 1 &&
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
	//console.log("conn_media_src组件初始props",state);
	return {
		
	    conn_media_src : state.conn_media_src
	};
}
module.exports = connect(mapStateToProps)(conn_media_src)
