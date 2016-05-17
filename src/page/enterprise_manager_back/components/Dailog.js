import React from 'react'
import { Form, Button, Modal, Input, DatePicker, Row } from 'antd'
import { ENTERPRISE_MANAGER_TABLE_BACK_DAILOG } from './until'
import { dailogShowData, enterpriseAddBack } from '../action'
import { isEmptyObj } from 'libs/function'
const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
     labelCol: { span: 6 },
     wrapperCol: { span: 14 },
};
let AddBackForm = React.createClass({
    cancelBtn(){
        const { dispatch } = this.props;
        dispatch(dailogShowData({
            visible : false
        },{}));
    },

    componentWillReceiveProps(nextProps){
        const { resetFields } = this.props.form;
        const { dailog_data } = nextProps;
        if(!isEmptyObj(dailog_data) &&　!isEmptyObj(dailog_data["json"])){
            if(!dailog_data["json"]["visible"]){
                resetFields();
            }
        }
    },

    checkExpire(rule, value, callback) {
        if (value && value.getTime() <= Date.now()) {
            callback(new Error('过期时间不能小于当前日期'));
        } else {
            callback();
        }
    },

    handleSubmit(e){
         e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((errors, values) => {
             console.log(errors);
             if (!!errors) {
                 console.log('Errors in form!!!');
                 return;
             }
             dispatch(enterpriseAddBack({
                 cid : parseInt(values["cid"]),
                 expire : new Date(values["expire"]).getTime(),
                 description :　values["description"]
             }));
        });
    },

    render(){
        const { getFieldProps } = this.props.form;

        const cidProps = getFieldProps('cid',{
            validate: [
                {
                    rules: [
                         { required: true, message: '设备ID不能为空' }
                    ],
                    trigger: 'onBlur'
                }
            ]
        });
        
        const expireProps = getFieldProps('expire',{
            validate: [
                {
                    rules: [
                         {  required: true , 
                            type: 'date',
                            message: '过期时间不能为空' 
                        },{
                            validator: this.checkExpire,
                        }
                    ],
                    trigger: 'onChange'
                }
            ]
        });

        return (
            <Form horizontal form={this.props.form}>
                <FormItem
                     {...formItemLayout}
                     hasFeedback
                     label="设备ID：">
                     <Input {...cidProps } placeholder="请输入密码" />
                </FormItem>
                <FormItem
                     {...formItemLayout}
                     hasFeedback
                     label="过期时间：">
                     <DatePicker { ...expireProps } 
                         style = {{width:"284px"}}
                         placeholder="请输入密码"/>
                </FormItem>
                <FormItem
                     {...formItemLayout}
                     hasFeedback
                     label="描述：">
                     <Input { ...getFieldProps('description') } type="textarea" placeholder="随便写" id="textarea" name="textarea" />
                </FormItem>
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
        if(!isEmptyObj(dailog_data) &&　!isEmptyObj(dailog_data["json"])){
            this.setState({
                 visible: dailog_data["json"]["visible"]
            });
        }else{
            this.setState({
                 visible: false
            });
        }
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
        const { dispatch } = this.props;
        dispatch(dailogShowData({
            visible : false
        },{}));
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