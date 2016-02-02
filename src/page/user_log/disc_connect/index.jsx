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

class disc_connect extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.disc_connect.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.location.pathname)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,disc_connect } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { disc_connect ,location,dispatch } = this.props;
		let { params } = disc_connect;
		if(this.hasMount && disc_connect.posts && disc_connect.posts.logs){
			if(disc_connect.posts.logs[0]){
				if( !disc_connect.posts.logs[0].key){
					data = logData(disc_connect);
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
					!disc_connect.posts &&
					<Table className="" loading={disc_connect.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					disc_connect.posts &&
					<Table className="" loading={disc_connect.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					disc_connect.posts && disc_connect.posts.total_pages > 1 &&
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
	//console.log("disc_connect组件初始props",state);
	return {
		
	    disc_connect : state.disc_connect
	};
}
module.exports = connect(mapStateToProps)(disc_connect)
module.exports.component = disc_connect;
