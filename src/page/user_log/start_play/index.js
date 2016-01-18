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

class start_play extends React.Component {
	constructor(){
		super(); 
		this.type = null;
	}

	componentDidMount(){
		if(!this.props.start_play.posts){
			this.getData({ })	
		}
		this.hasMount = true;
		this.type = getUrlParams(this.props.route.path)[1];
		//console.log(1)
	}

	getData(params={}){
		let { dispatch,start_play } = this.props
		dispatch(action.fetchData(params,this.type));	
	}
	
	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log(this.props)
		let { start_play ,location,dispatch } = this.props;
		let { params } = start_play;
		if(this.hasMount && start_play.posts && start_play.posts.logs){
			if(start_play.posts.logs[0]){
				if( !start_play.posts.logs[0].key){
					data = logData(start_play);
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
					!start_play.posts &&
					<Table className="" loading={start_play.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					start_play.posts &&
					<Table className="" loading={start_play.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					start_play.posts && start_play.posts.total_pages > 1 &&
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
	//console.log("start_play组件初始props",state);
	return {
		//routing : state.routing,
	    start_play : state.start_play
	};
}
module.exports = connect(mapStateToProps)(start_play)
module.exports.component = start_play;
