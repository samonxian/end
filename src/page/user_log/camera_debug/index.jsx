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

class camera_debug extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.camera_debug.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.location.pathname)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,camera_debug } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { camera_debug ,location,dispatch } = this.props;
		let { params } = camera_debug;
		if(this.hasMount && camera_debug.posts && camera_debug.posts.logs){
			if(camera_debug.posts.logs[0]){
				if( !camera_debug.posts.logs[0].key){
					data = logData(camera_debug);
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
					!camera_debug.posts &&
					<Table className="" loading={camera_debug.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					camera_debug.posts &&
					<Table className="" loading={camera_debug.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					camera_debug.posts && camera_debug.posts.total_pages > 1 &&
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
	//console.log("camera_debug组件初始props",state);
	return {
		
	    camera_debug : state.camera_debug
	};
}
module.exports = connect(mapStateToProps)(camera_debug)
module.exports.component = camera_debug;
