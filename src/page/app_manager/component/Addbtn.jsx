import React from 'react'
import { Button, Icon, Modal, Form, Select, Input} from 'antd'
import { getAppTypeFetch } from '../action'
require('../../../../style/css/new_index.css')
const FormItem = Form.Item;
const Option = Select.Option;

export const AddBtn = React.createClass({

    getInitialState() {
	    return { 
            visible: false
        }
	},

	componentWillMount(){
    	const { dispatch } = this.props
		dispatch(getAppTypeFetch())
	},
    
    addAppEvent(){
    	this.setState({
    		visible : true
    	});
    },

    handleCancel(){
    	this.setState({
    		visible : false
    	});
    },

	render(){
		let state = this.state
		let rows = []
		const { appType } = this.props

		for(let i=0,len = appType.length;i<len;i++){
			rows.push(<Option value={ appType[i]["value"] } key={ "app_type_key"+new Date().getTime()+Math.random()}>{ appType[i]["desc"] }</Option>)
		}
		return (
			<div className="app_manager_add_btn">
			    <Button  type="primary" size="large" onClick={this.addAppEvent}>
			         <Icon type="plus" />新增APP
			    </Button>
			    <Modal title="新增APP" visible={ this.state.visible}
			        onOk={this.handleOk} onCancel={this.handleCancel} className="appManager">
			        <Form horizontal>
			            <FormItem
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
						         { rows }
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
					    </FormItem>
			        </Form>
			    </Modal>
			</div>)
	}
})