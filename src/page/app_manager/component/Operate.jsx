import React from 'react'
import { Modal, Form, Icon, Select, Input} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

export const Operate = React.createClass({

	getInitialState() {
	    return { 
            visible: false,
            type : 'show',
            title : 'APP KEY'
        }
	},
    
    showKey(){
    	this.setState({
    		visible : true,
    		type : 'show',
    		title : 'APP KEY'
    	});
    },

    resetKey(){
    	this.setState({
    		visible : true,
    		type : 'resetKey',
    		title : '重新生成KEY'
    	});
    },

    deleteKey(){
    	this.setState({
    		visible : true,
    		type : 'deleteKey',
    		title : '删除APP'
    	});
    },

    editKey(){
    	this.setState({
    		visible : true,
    		type : 'editKey',
    		title : '修改APP'
    	});
    },

    handleCancel(){
    	this.setState({
    		visible : false
    	});
    },

	render(){

		let type = this.state.type
		let tip
		let formContent

		if(type === "deleteKey" || type ==="resetKey"){
			tip = <div className="app_manager_operate_warn"><Icon type="exclamation-circle-o" />危险的操作！请确认后在下面输入APP代号执行！</div>
			formContent = <div><FormItem
			     id="code"
			     label="代号："
			     labelCol={{span: 6}}
			     wrapperCol={{span: 14}}>
			     <Input id="code" name = "code" placeholder="请输入代号" />
		    </FormItem></div>
		}
        
        if(type ==="show"){
        	formContent = <div><FormItem
			     id="code"
			     label="代号："
			     labelCol={{span: 6}}
			     wrapperCol={{span: 14}}>
			     <Input id="code" name = "code" placeholder="请输入代号" />
		    </FormItem></div>
        }

        if(type === "editKey"){
        	formContent = <div><FormItem
			     id="code"
			     label="代号："
			     labelCol={{span: 6}}
			     wrapperCol={{span: 14}}>
			     <Input id="code" name = "code" placeholder="请输入代号" />
		    </FormItem>
		    <FormItem
			     id="select"
			     label="特权APP："
			     labelCol={{span: 6}}
			     wrapperCol={{span: 14}}>
			     <Select id="select" size="large" name = "code" defaultValue="0" style={{width:285}}>
			        <Option value="0">否</Option>
			        <Option value="1">是</Option>
			     </Select>
		    </FormItem>
		    <FormItem
			     id="select"dacadca
			     label="APP类型："
			     labelCol={{span: 6}}
			     wrapperCol={{span: 14}}>
			     <Select id="select" size="large" name = "code" defaultValue="0" style={{width:285}}>
			     </Select>
		    </FormItem>
		    <FormItem
			     id="control-input"
			     label="事件回调地址："
			     labelCol={{span: 6}}
			     wrapperCol={{span: 14}}>
			     <Input id="control-input" name = "code" placeholder="请输入事件回调地址..." />
		    </FormItem>
		    <FormItem
			     id="control-input"
			     label="状态回调地址："
			     labelCol={{span: 6}}
			     wrapperCol={{span: 14}}>
			     <Input id="control-input" name = "code" placeholder="请输入状态回调地址..." />
		    </FormItem></div>
        }

		return (
			<div>
			    <div>
			         <a href="#" className="app_manager_key_operate" onClick={ this.showKey }>KEY</a>
			         <a href="#" className="app_manager_reset_key_operate" onClick={ this.resetKey }>重新生成KEY</a>
			         <a href="#" className="app_manager_delete_operate" onClick={ this.deleteKey}>删除</a>
			         <a href="#" className="app_manager_edit_operate" onClick={ this.editKey}>修改</a>
			    </div>
			    <Modal title={this.state.title} visible={this.state.visible}
			        onOk={this.handleOk} onCancel={this.handleCancel}>
			        { tip }
			        <Form horizontal>
			            { formContent }
			        </Form>
			    </Modal>
			</div>)
	}
})