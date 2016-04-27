import React from 'react'
import { Form, Button, Modal } from 'antd'
import { ENTERPRISE_MANAGER_TABLE_BACK_DAILOG } from './until'
import { enterpriseManagerAprovalDailog, enterpriseManagerAprovalAgreeFetch } from '../action'
import { generateMixed } from 'libs/function'
const createForm = Form.create;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const formItemLayout = {
     labelCol: { span: 6 },
     wrapperCol: { span: 14 },
};
let AddBackForm = React.createClass({
    getInitialState(){
        return {
            alloc_type : 1
        }
    },

    handleChanageId(e){
        this.setState({
            alloc_type : e
        })
    },

    cancelBtn(){
        const { dispatch } = this.props;
        dispatch(enterpriseManagerAprovalDailog(false,{}));
    },

    handleSubmit(e){
         e.preventDefault();
        const { dispatch, dailog_data } = this.props;
        this.props.form.validateFields((errors, values) => {
             if (!!errors) {
                 console.log('Errors in form!!!');
                 return;
             }

             var id = dailog_data["json"]["id"],
                 data = {};
             if(values["alloc_type"] === 1){
                 data["start_str"] = values["start_str"];
                 data["mask_str"] = values["mask_str"];
             }else{
                 data["start"] = values["start"];
                 data["end"] = values["end"];
             }
             dispatch(enterpriseManagerAprovalAgreeFetch({
                 id : id,
                 type : values["type"],
                 alloc_type : values["alloc_type"],
                 data : data
             }));
            
        });
    },

    render(){
        const { getFieldProps } = this.props.form;
        var htlArr = [];

        if(this.state.alloc_type === 1){
            htlArr = <div>
                <FormItem
                     {...formItemLayout}
                     hasFeedback
                     label="ID段起始字符：">
                     <Input { ...getFieldProps('start_str',{
                            rules: [
                                { required: true, message: '起始字符不能为空' },
                            ]
                      }) } placeholder="请输入起始段字符" />
                </FormItem>
                <FormItem
                     {...formItemLayout}
                     label="ID段的分配掩码：">
                     <Select 
                         { ...getFieldProps('mask_str',{
                                 initialValue : "255.0.0.0"
                             })
                         }
                         style={{ width: "284px" }}>
                         <Option value= "255.0.0.0">A类</Option>
                         <Option value= "255.255.0.0">B类</Option>
                         <Option value= "255.255.255.0">C类</Option>
                     </Select>
                </FormItem>
            </div>
        }else{
            htlArr = <div>
                <FormItem
                     { ...formItemLayout }
                     hasFeedback
                     label="ID 段开始值：">
                     <Input { ...getFieldProps('start',{
                         validate:[
                             {
                                rules: [
                                    { required: true, message: 'ID段开始值不为空' },
                                ]
                             }
                         ]
                     }) } placeholder="请输入起始段字符" />
                </FormItem>
                <FormItem
                     { ...formItemLayout }
                     hasFeedback
                     label="ID 段结束值：">
                     <Input { ...getFieldProps('end',{
                         validate:[
                             {
                                rules: [
                                    { required: true, message: 'ID段结束值不为空' },
                                 ]
                             }
                         ]
                     }) } placeholder="请输入起始段字符" />
                </FormItem>
            </div>
        }
        
        return (
            <Form horizontal form={this.props.form}>
                <FormItem
                     {...formItemLayout}
                     label="ID段类型：">
                     <Select 
                         { ...getFieldProps('type',{
                                initialValue : 1
                            }) 
                         }
                         style={{ width: "284px" }}>
                         <Option value={ 1 }>摄像头</Option>
                         <Option value={ 2 }>用户</Option>
                     </Select>
                </FormItem>
                <FormItem
                     {...formItemLayout}
                     label="分配ID段的类型：">
                     <Select 
                         { ...getFieldProps('alloc_type',{
                                initialValue : this.state.alloc_type
                            }) 
                         }
                         style={{ width: "284px" }} onChange = { this.handleChanageId }>
                         <Option value= { 1 }>IP掩码方式</Option>
                         <Option value={ 2 }>起始点方式</Option>
                     </Select>
                </FormItem>
                { htlArr }
                <Row type="flex" justify="end">
                    <Button type="primary" className="enterprise_manager_back_dailog_btn cancel" onClick={this.cancelBtn}>取消</Button>
                    <Button type="primary" className="enterprise_manager_back_dailog_btn" onClick={this.handleSubmit}>确定</Button>
                </Row>
            </Form>
        )
    }
});
AddBackForm = createForm()(AddBackForm);

export const Dailog = React.createClass({
    getInitialState() {
        return { 
            visible: false,
        }
    },

    componentWillReceiveProps(nextProps){
    	const { dailog_data } = nextProps;
    	this.setState({
		     visible: dailog_data["visible"]
		});
    },

    handleOk(){
    	this.setState({
		     visible: false
		});
    },

    handleCancel(){
    	this.setState({
		     visible: false
		});
    }, 

    render(){
    	return (
            <Modal title="新增黑名单" 
                 className = "enterprise_manager_back_dailog"
                 visible={this.state.visible}
	             onOk={this.handleOk} 
	             onCancel={this.handleCancel} >
	             <AddBackForm { ...this.props }/>
	        </Modal>
    	)
    }
})