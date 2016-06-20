import React from 'react'
import { DatePicker,Form,Input,Button,message} from 'antd'
import {CAMERA_FRAME_STATUS_QUERY,cameraFrameFetch} from '../../new_index_camera/action'
import { getQueryParam } from 'libs/function'
const FormItem = Form.Item

export let Queryfrom = React.createClass({
	getInitialState() {
		// var param = getQueryParam();
		// if(param.length){
		// 	var cid = param[0]["cid"];
		// 	this.props.formData["cid"] = cid;
		// 	this.props.formData["start_time"] = new Date().Format("yyyy-MM-dd hh:mm:ss");
		// 	this.props.formData["end_time"] = new Date().Format("yyyy-MM-dd hh:mm:ss");
		// }
		return {
			cid : "",
			start_time : new Date().Format("yyyy-MM-dd hh:mm:ss"),
			end_time : new Date().Format("yyyy-MM-dd hh:mm:ss")
		}
	},

	componentWillMount(){
		const { formData } = this.props;
		this.setState({
			cid : formData["cid"],
			start_time : formData["start_time"] === "" ? new Date().Format("yyyy-MM-dd hh:mm:ss") : new Date(formData["start_time"]).Format("yyyy-MM-dd hh:mm:ss"),
			end_time : formData["end_time"] === "" ? new Date().Format("yyyy-MM-dd hh:mm:ss") : new Date(formData["end_time"]).Format("yyyy-MM-dd hh:mm:ss")
		})
	},

	handleSubmit(e){
		e.preventDefault();
		const { getFieldValue } = this.props.form;
		const { dispatch } = this.props;
        
        let cid = getFieldValue("cid"),
            start_time = new Date(getFieldValue("start_time")).Format("yyyy-MM-dd hh:mm:ss"),
            end_time = new Date(getFieldValue("end_time")).Format("yyyy-MM-dd hh:mm:ss");
		dispatch(cameraFrameFetch({
			cid : cid,
			start_time : start_time,
			end_time : end_time
		}));
	},

	render(){
		const { dispatch , formData} = this.props
	    const { getFieldProps } = this.props.form;

		return (
			<Form inline onSubmit={dispatch => this.handleSubmit(dispatch)} className="new_index_camera_query">
		        <FormItem id="userName">
		            <Input 
		                { ... getFieldProps('cid',{initialValue: this.state.cid}) }
		                placeholder="视频源ID" />
		        </FormItem>
		        <FormItem id="startTime">
	                <DatePicker 
	                    { ... getFieldProps('start_time',{
	                    	initialValue: this.state.start_time
	                    }) } 
	                    placeholder="起始时间"
	                    showTime 
	                    format="yyyy-MM-dd HH:mm:ss"/>
	            </FormItem>
	            <FormItem id="endTime">
				    <DatePicker  
				         { ... getFieldProps('end_time',{
				         	 initialValue: this.state.end_time
				         }) }
				         placeholder="结束时间"
				         showTime 
				         format="yyyy-MM-dd HH:mm:ss"/>
	            </FormItem>
	            <Button type="primary" htmlType="submit">提交</Button>
	       </Form>
		)
	}
});

Queryfrom = Form.create()(Queryfrom);