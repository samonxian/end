import React from 'react'
import { connect } from 'react-redux'
import { pushPath ,replacePath } from 'redux-simple-router'
import { input_peerid,input_start_time,input_end_time,fetchData } from './action'
import {Form, Input, Button, Icon,Table,Select,DatePicker,Pagination} from 'antd_c'
import Monitor from '../sidebar/user_log'
import { title } from '../user_log/data/title.js'
import { fieldSort } from '../../libs/function'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
let data = []; 

class User_log extends React.Component {
	constructor(){
		super(); 
	}

	componentDidUpdate(){
	}

	componentDidMount(){
		console.log('mount')
		let { user_log ,location,dispatch } = this.props;
		let type = location.query.type;
		if(!type){
			type = 'start_service';	
		}
		dispatch(fetchData({ },type));
	
	}

	getData(params={}){
		let { user_log ,location,dispatch } = this.props;
		let type = location.query.type;
		if(!type){
			type = 'start_service';	
		}
		params = Object.assign({}, user_log.params,params);
		dispatch(fetchData(params,type));	
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.getData();
	}
   
	setPeeridValue(e){
		this.props.dispatch(input_peerid(e.target.value));	
	}

	setSnValue(e){
		this.props.dispatch(input_sn(e.target.value));	
	}

	handleChange(value){
		this.props.dispatch(select_client_type(value));	
	}

	onChange(value) {
		this.props.dispatch(input_start_time(value[0].Format("yyyy-MM-dd hh:mm:ss")));	
		this.props.dispatch(input_end_time(value[1].Format("yyyy-MM-dd hh:mm:ss")));	
	}

	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

	getType(type){
		switch(type){
			case 'camera_debug':
				type = 'rtmp_device';
			case 'camera_time':
				type = 'rtmp_device';
			case 'mobile_debug':
				type = 'rtmp_device';
			case 'camera_time_last':
				type = 'rtmp_device';
			case 'camera_debug_last':
				type = 'rtmp_device';
		}
		return type;
	}

	getLogData(){
		let obj = { }
		let { location } = this.props;
		if(!this.obj){
			for(var key in title){
				key = this.getType(key);
				obj[key] =  require('./data/'+key+'.js');
			}
			this.obj = obj;
		}
		let type = location.query.type;
		if(!type){
			type = 'start_service';	
		}
		type = this.getType(type);
		return this.obj[type];
	}

    render() {
		let { user_log ,location,dispatch } = this.props;
		let { params } = user_log;
		let columns = this.getLogData().columns; 
		let logData = this.getLogData().logData; 
		if(user_log.change_data){
			//console.log(this.props)
			data = logData(user_log); 
		}
        return (
			<Monitor location={location} params={params}>
				<h2>{title[location.query.type]}</h2>
				<br/>
				<Form inline onSubmit={this.handleSubmit.bind(this)}>

					<FormItem>
						<Input placeholder="请输入UID" onChange={this.setPeeridValue.bind(this)} value={params && params.peer_id}/>
					</FormItem>

					<FormItem>
						<RangePicker format="yyyy-MM-dd HH:mm:ss" showTime value={params && [params.start_time,params.end_time] } 
							onChange={this.onChange.bind(this)} />
					</FormItem>
					
					<Button type="primary" htmlType="submit">提交</Button>
				</Form>
				{
					!user_log.posts &&
					<Table className="" loading={user_log.isFetching} size="middle"
						columns={columns} dataSource={[]} pagination={false} bordered/>
				}
				{
					user_log.posts &&
					<Table className="" loading={user_log.isFetching} size="middle"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
				{
					user_log.posts && user_log.posts.total_pages > 1 &&
					<div className="pagination">
						<Pagination onChange={this.onPaginationChange.bind(this)} 
							defaultCurrent={1} total={user_log.posts.total_pages * 10} />
					</div>
				}
			</Monitor>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	//console.log("user_log组件初始props",state);
	return {
	    user_log : state.user_log,
		routing : state.routing
	};
}
module.exports = connect(mapStateToProps)(User_log)
