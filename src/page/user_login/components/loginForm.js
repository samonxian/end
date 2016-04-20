import React from 'react'
import { Form, Input, Row, Button, Col, Icon, Checkbox } from 'antd'
import { userLoginFetch } from '../action'
const FormItem = Form.Item
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
  
	render(){
    const { getFieldProps } = this.props.form;

    const nameProps = getFieldProps('name', {
       validate: [
        {
           rules: [
               { required: true },
           ],
           trigger: 'onBlur',
        }, 
        {
           rules: [
               { type: 'email', message: '请输入正确的邮箱地址' },
          ],
          trigger: ['onBlur', 'onChange'],
        }]
    });

    const passwordProps = getFieldProps('password', {
      rules: [
        {
          required: true, 
          message: '用户名不能为空！' 
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
                                 type="email"
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