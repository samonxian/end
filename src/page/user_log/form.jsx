import React from 'react'
import { connect } from 'react-redux'
import {Form, Input, Button,DatePicker } from 'antd'
import { getUrlParams } from 'function'
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker;

class form extends React.Component {
	constructor(){
		super(); 
	}

	handleSubmit(e) {
		e.preventDefault();
		let { dispatch,form,action } = this.props;
		dispatch(action.fetchData(form))
	}
   
	onChange(value) {
		let { dispatch,action } = this.props;
		dispatch(action.input_start_time(value[0].Format("yyyy-MM-dd hh:mm:ss")));	
		dispatch(action.input_end_time(value[1].Format("yyyy-MM-dd hh:mm:ss")));	
	}

	setUidValue(e){
		let { dispatch,action } = this.props;
		dispatch(action.input_peerid(e.target.value))
	}

	setIpValue(e){
		dispatch(action.input_ip(e.target.value))
	}

    render() {
		let { form } = this.props;
		let params = form;
        return (
			<Form style={ { marginBottom:"15px", }
			}inline onSubmit={this.handleSubmit.bind(this)}>

				<FormItem>
					<Input name="log_uid"  placeholder="请输入UID" onChange={this.setUidValue.bind(this)}
						value={params && params.peer_id}/>
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
	//console.log("user_log_query组件初始props",state);	
	var target = getUrlParams(state.routing.location.pathname)[1];
	if(state[target]){
		// console.log("user_log_query组件初始props",state);
		return {
			form : state[target+"_form"],
		};
	}else{
		return {
			form : {
				
			}
		}
	}
	
}
module.exports = connect(mapStateToProps)(form)
