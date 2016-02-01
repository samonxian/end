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

class camera_time_last extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.camera_time_last.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.route.path)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,camera_time_last } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { camera_time_last ,location,dispatch } = this.props;
		let { params } = camera_time_last;
		if(this.hasMount && camera_time_last.posts && camera_time_last.posts.logs){
			if(camera_time_last.posts.logs[0]){
				if( !camera_time_last.posts.logs[0].key){
					data = logData(camera_time_last);
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
					!camera_time_last.posts &&
					<Table className="" loading={camera_time_last.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					camera_time_last.posts &&
					<Table className="" loading={camera_time_last.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					camera_time_last.posts && camera_time_last.posts.total_pages > 1 &&
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
	//console.log("camera_time_last组件初始props",state);
	return {
		//routing : state.routing,
	    camera_time_last : state.camera_time_last
	};
}
module.exports = connect(mapStateToProps)(camera_time_last)
module.exports.component = camera_time_last;
