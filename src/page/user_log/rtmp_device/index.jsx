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

class rtmp_device extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.rtmp_device.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.route.path)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,rtmp_device } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { rtmp_device ,location,dispatch } = this.props;
		let { params } = rtmp_device;
		if(this.hasMount && rtmp_device.posts && rtmp_device.posts.logs){
			if(rtmp_device.posts.logs[0]){
				if( !rtmp_device.posts.logs[0].key){
					data = logData(rtmp_device);
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
					!rtmp_device.posts &&
					<Table className="" loading={rtmp_device.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					rtmp_device.posts &&
					<Table className="" loading={rtmp_device.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					rtmp_device.posts && rtmp_device.posts.total_pages > 1 &&
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
	//console.log("rtmp_device组件初始props",state);
	return {
		//routing : state.routing,
	    rtmp_device : state.rtmp_device
	};
}
module.exports = connect(mapStateToProps)(rtmp_device)
module.exports.component = rtmp_device;
