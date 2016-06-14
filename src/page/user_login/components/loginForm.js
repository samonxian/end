import React from 'react'
import { Form, Input, Row, Button, Col, Icon, Checkbox } from 'antd'
import { userLoginFetch } from '../action'
const FormItem = Form.Item
require('css/login.css')
let imgData = require('img/login_icon.png')

export let LoginForm = React.createClass({

  handleSubmit(e){
     e.preventDefault();
     const { dispatch } = this.props;
     this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          console.log('Errors in form!!!');
          return;
        }
        console.log("values",values);
        dispatch(userLoginFetch(values));
     });
  },

  checkEmailUrl(rule, value, callback){
     if(!value){
        callback("邮箱地址不能为空！");
     }else{
         var reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
         if(reg.test(value)){
            callback();
         }else{
            callback("请输入正确的邮箱地址!");
         }
     }
  },
  
  render(){
    const { getFieldProps } = this.props.form;

    const nameProps = getFieldProps('email', {
      rules: [
        {
            validator: this.checkEmailUrl,
        }
      ]
    });

    const passwordProps = getFieldProps('password', {
      rules: [
        {
            required: true, 
            message: '密码不能为空！' 
        }
      ]
    });

    const formItemLayout = {
        wrapperCol: { span: 24 }
    };

	return (<div className="user_login">
        <div className="login_container">
            <div className="login_logo">
                 <div className="login_logo_container">
                     <img src={imgData}/>
                     <span className="login_logo_desc">羚羊云后台管理系统</span>
                 </div>
            </div>
            <div className="login_form">
                <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                    <FormItem 
                         { ...formItemLayout }
                         hasFeedback>
                         <Input 
                             { ...nameProps }
                             placeholder="请输入登录邮箱"/>
                    </FormItem>
                    <FormItem 
                         { ...formItemLayout }
                         hasFeedback>
                         <Input 
                            { ...passwordProps }
                            type="password"
                            placeholder="请输入登录密码"/>
                    </FormItem>
                    <Row>
                         <Col span="16" offset="8">
                              <Button type="primary" htmlType="submit">登录</Button>
                         </Col>
                    </Row>
                </Form>
            </div>
        </div>
    </div>)
	}
})

LoginForm = Form.create()(LoginForm);