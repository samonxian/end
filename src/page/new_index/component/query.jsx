import React from 'react'
import { DatePicker,Form,Input,Button,message} from 'antd'
import {CAMERA_FRAME_STATUS_QUERY,cameraFrameFetch} from '../../new_index_camera/action'

export const Queryfrom = React.createClass({
	getInitialState() {
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
			<Form inline onSubmit={dispatch => this.handleSubmit(dispatch)}>
		        <FormItem id="userName"
		                  required>
		             <Input placeholder="视频源ID" id="cid" name="cid" onChange={this.ChangeValue} value={this.state.cid}/>
		        </FormItem>
		        <FormItem id="startTime"
                           required>
	                <DatePicker placeholder="起始时间" showTime onChange={this.changeStartTime} format="yyyy-MM-dd HH:mm:ss" id="start_time" name="start_time" value={this.state.start_time}/>
	            </FormItem>
	            <FormItem id="endTime">
				     <DatePicker placeholder="结束时间" showTime onChange={this.changeEndTime} format="yyyy-MM-dd HH:mm:ss" id="end_time" name="end_time" value={this.state.end_time}/>
	            </FormItem>
	            <Button type="primary" htmlType="submit">提交</Button>
	       </Form>
		)
	}
});