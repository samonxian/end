import React from 'react'
import { tipsMessage, videoSearchFetch }from '../action'
import { DatePicker,Form,Input,Button,message} from 'antd'
const FormItem = Form.Item

export let Search = React.createClass({

	componentWillMount(){

	},

	handleSubmit(e){
		e.preventDefault();
		const { getFieldValue } = this.props.form;
		const { dispatch } = this.props;
        
        let cid = getFieldValue("cid"),
            start_time = getFieldValue("start_time"),
            end_time = getFieldValue("end_time");
        
        if(cid === ""){
        	dispatch(tipsMessage({
        		status : 203,
        		title : "设备ID不能为空！"
        	}));
        	return false;
        }

        if(start_time === "" || start_time === undefined){
        	dispatch(tipsMessage({
        		status : 203,
        		title : "开始时间不能为空！"
        	}));
        	return false;
        }

        if(end_time === "" || end_time === undefined){
        	dispatch(tipsMessage({
        		status : 203,
        		title : "结束时间不能为空！"
        	}));
        	return false;
        }

        if(new Date(start_time).getTime()>new Date(end_time).getTime()){
        	dispatch(tipsMessage({
        		status : 203,
        		title : "开始时间不能大于结束时间！"
        	}));
        	return false;
        }
        
		dispatch(videoSearchFetch({
			cid : cid,
			start_time : parseInt(new Date(start_time).getTime()/1000),
			end_time : parseInt(new Date(end_time).getTime()/1000)
		}))
	},

	render(){
		const { dispatch , formData} = this.props
	    const { getFieldProps } = this.props.form;

		return (
			<Form inline onSubmit = { this.handleSubmit } className="new_index_camera_query">
		        <FormItem 
		            label="设备ID：">
		            <Input 
		                { ... getFieldProps('cid',{
		                	initialValue : ""
		                }) }
		                placeholder="请输入设备ID" />
		        </FormItem>
		        <FormItem
		            label="开始时间：">
	                <DatePicker 
	                    { ... getFieldProps('start_time') } 
	                    placeholder="请选择开始时间"
	                    showTime 
	                    format="yyyy-MM-dd HH:mm"/>
	            </FormItem>
	            <FormItem
	                label="结束时间：">
				    <DatePicker  
				         { ... getFieldProps('end_time') }
				         placeholder="请选择结束时间"
				         showTime 
				         format="yyyy-MM-dd HH:mm"/>
	            </FormItem>
	            <Button type="primary" htmlType="submit">查询</Button>
	       </Form>
		)
	}
});

Search = Form.create()(Search);