import React from 'react'
import { Form, Button, Modal, Input, DatePicker, Row } from 'antd'
import { ENTERPRISE_MANAGER_TABLE_BACK_DAILOG } from './until'
import { enterpriseDailog, getEnterpriseManagerStatusFetch } from '../action'
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
        dispatch(enterpriseDailog({},{}));
    },

    componentWillReceiveProps(nextProps){
        const { resetFields } = this.props.form;
        const { dailogData } = nextProps;
        if(!isEmptyObj(dailogData) && !isEmptyObj(dailogData["data"])){
            if(!dailogData["data"]["visible"]){
                resetFields();
            }
        }
    },

    handleSubmit(e){
         e.preventDefault();
        const { dispatch, dailogData } = this.props;

        this.props.form.validateFields((errors, values) => {
             if (!!errors) {
                 console.log('Errors in form!!!');
                 return;
             }

             dispatch(getEnterpriseManagerStatusFetch({
                 app_id : dailogData["data"]["app_id"],
                 status : dailogData["data"]["status"] === 0? 1:0,
                 reason :　values["reason"]
             }));
        });
    },

    render(){
        const { dailogData } = this.props;
        const { getFieldProps } = this.props.form;
        var content = "",
            reasonProps;
        
        if(!isEmptyObj(dailogData) && !isEmptyObj(dailogData["data"])){
            if(dailogData["data"]["status"]){
                reasonProps = getFieldProps('reason',{
                    validate: [
                        {
                            rules: [
                                 { required: true, message: '禁用原因不能为空！' }
                            ],
                            trigger: 'onBlur'
                        }
                    ]
                });
                content = <FormItem
                             {...formItemLayout}
                             hasFeedback
                             label="描述：">
                             <Input { ...reasonProps } type="textarea" placeholder="随便写" id="textarea" name="textarea" />
                        </FormItem>
            }else{
                content = <div className = "enterprise_manager_code_dailog">您确定要<span className="dailog_span">禁用</span>APP ID 为<span className="dailog_span">{ dailogData["data"]["app_id"] }</span>？</div>;
            }
        }

        return (
            <Form horizontal form={this.props.form}>
                { content }
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
    	const { dailogData } = nextProps;
        if(!isEmptyObj(dailogData) && !isEmptyObj(dailogData["data"])){
            this.setState({
                 visible: dailogData["data"]["visible"]
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
        dispatch(enterpriseDailog({},{}));
    }, 

    render(){
        const { dailogData } = this.props;
        var title = '';
        if(!isEmptyObj(dailogData) && !isEmptyObj(dailogData["data"])){
            if(dailogData["data"]["status"] === 1){
                title = "禁用APP ID";
            }else{
                title = "启用APP ID";
            }
        }

    	return (
            <Modal title = { title }
                 className = "enterprise_manager_back_dailog"
                 visible={this.state.visible}
	             onOk={this.handleOk} 
	             onCancel={this.handleCancel} >
	             <AddBackForm { ...this.props }/>
	        </Modal>
    	)
    }
})