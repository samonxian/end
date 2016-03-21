import React from 'react'
import { DatePicker,Form,Input,Button,message} from 'antd'
import {CAMERA_FRAME_STATUS_QUERY,cameraFrameFetch} from '../../new_index_camera/action'
import { getQueryParam } from 'libs/function'

export const Queryfrom = React.createClass({
	getInitialState() {
		var param = getQueryParam();
		if(param.length){
			var cid = param[0]["cid"];
			this.props.formData["cid"] = cid;
			this.props.formData["start_time"] = new Date().Format("yyyy-MM-dd hh:mm:ss");
			this.props.formData["end_time"] = new Date().Format("yyyy-MM-dd hh:mm:ss");
		}
	    return this.props.formData;
	},
	ChangeValue(e){
		this.setState({
			cid : e.target.value
		});
	},
	changeStartTime(e){
		this.setState({
			start_time : new Date(e).Format("yyyy-MM-dd hh:mm:ss")
		});
	},
	changeEndTime(e){
		this.setState({
			end_time : new Date(e).Format("yyyy-MM-dd hh:mm:ss")
		});
	},
	handleSubmit(e){
		e.preventDefault();
		const { dispatch , formData } = this.props
		const temp = Object.assign({}, this.state);
		dispatch(cameraFrameFetch(temp));
	},
	render(){
		const { dispatch , formData} = this.props
		const FormItem = Form.Item
		return (
			<Form inline onSubmit={dispatch => this.handleSubmit(dispatch)} className="new_index_camera_query">
		        <FormItem id="userName">
		             <Input placeholder="视频源ID" id="cid" name="cid" onChange={this.ChangeValue} value={this.state.cid}/>
		        </FormItem>
		        <FormItem id="startTime">
	                <DatePicker placeholder="起始时间" showTime 
	                            onChange={this.changeStartTime} 
	                            format="yyyy-MM-dd HH:mm:ss" id="start_time" name="start_time" value={this.state.start_time}/>
	            </FormItem>
	            <FormItem id="endTime">
				     <DatePicker placeholder="结束时间" showTime onChange={this.changeEndTime} format="yyyy-MM-dd HH:mm:ss" id="end_time" name="end_time" value={this.state.end_time}/>
	            </FormItem>
	            <Button type="primary" htmlType="submit">提交</Button>
	       </Form>
		)
	}
});