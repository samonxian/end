import React from 'react'
import { connect } from 'react-redux'
import * as log_query_action from './action'
import {Form, Input, Button,DatePicker } from 'antd_c'
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker;

class form extends React.Component {
	constructor(){
		super(); 
	}

	handleSubmit(e) {
		e.preventDefault();
		let { dispatch,form } = this.props;
		dispatch(log_query_action.fetchData(form))
	}
   
	onChange(value) {
		this.props.dispatch(log_query_action.input_start_time(value[0].Format("yyyy-MM-dd hh:mm:ss")));	
		this.props.dispatch(log_query_action.input_end_time(value[1].Format("yyyy-MM-dd hh:mm:ss")));	
	}

	setSessionValue(e){
		this.props.dispatch(log_query_action.input_session(e.target.value))
	}

	setIpValue(e){
		this.props.dispatch(log_query_action.input_ip(e.target.value))
	}

    render() {
		let { form } = this.props;
		let params = form;
		
        return (
			<Form inline onSubmit={this.handleSubmit.bind(this)}>

				<FormItem>
					<Input name="log_session"  placeholder="请输入session" onChange={this.setSessionValue.bind(this)}
						value={params && params.session}/>
				</FormItem>

				<FormItem>
					<Input name="user_log_ip" placeholder="请输入IP" onChange={this.setIpValue.bind(this)} 
						value={params && params.ip}/>
				</FormItem>

				<FormItem>
					<RangePicker format="yyyy-MM-dd HH:mm:ss" showTime value={params && [params.start_time,params.end_time] } 
						onChange={this.onChange.bind(this)} />
				</FormItem>
				
				<Button type="primary" htmlType="submit">提交</Button>
			</Form>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	// console.log("user_log_query组件初始props",state);
	return {
	    form : state.user_log_query_form,
		routing : state.routing
	};
}
module.exports = connect(mapStateToProps)(form)
