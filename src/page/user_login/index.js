import React from 'react'
import { connect } from 'react-redux'
import { pushPath,replacePath } from 'redux-simple-router'
import { Form, Input, Row, Button, Col, Icon, Checkbox } from 'antd'
require('antd/lib/index.css')
require('../../../style/css/login.css')
let imgData = require('../../../style/img/login_icon.png')
const FormItem = Form.Item

export const Userlogin = React.createClass({

  getInitialState() {
    return {
      nameValue : '',
      nameValidateStatus : '',
      nameHelpMessage : '',
      passwordValue : '',
      passwordValidateStatus : '',
    　passwordHelpMessage : ''
    };
  },

  handleSubmit(e){
     e.preventDefault()
     console.log(this.props);
     const { dispatch } = this.props
     let userName = this.state.nameValue
     let password = this.state.passwordValue
     if(!userName.length){
       this.setState({
          nameValue : userName,
          nameValidateStatus : 'error',
          nameHelpMessage : '请输入用户名',
        });
       return false;
     }
     if(!password.length){
       this.setState({
          passwordValue : password,
          passwordValidateStatus : 'error',
          passwordHelpMessage : '请输入密码'
        });
       return false;
     }
     dispatch(pushPath('/layout'));
  },
  
  handleChange(e){
    let currentDom = e.target.name
    let inputValue = e.target.value
    if(currentDom === "userName"){
      if(inputValue.length){
        this.setState({
          nameValue : inputValue,
          nameValidateStatus : 'success',
          nameHelpMessage : '',
        });
      }else{
        this.setState({
          nameValue : inputValue,
          nameValidateStatus : 'error',
          nameHelpMessage : '请输入用户名'
        });
      }
      
    }else if(currentDom === "password"){
      if(inputValue.length){
        this.setState({
          passwordValue : inputValue,
          passwordValidateStatus : 'success',
          passwordHelpMessage : ''
        });
      }else{
        this.setState({
          passwordValue : inputValue,
          passwordValidateStatus : 'error',
          passwordHelpMessage : '请输入密码'
        });
      }
    }
  },

	render(){ 
    let userMessage = this.state

		return (
			<div className="user_login">
          <div className="login_container">
              <div className="login_logo">
                  <div className="login_logo_container">
                      <img src={imgData}/>
                      <span className="login_logo_desc">羚羊云后台管理系统</span>
                  </div>
              </div>
              <div className="login_form">
                  <Form horizontal onSubmit={this.handleSubmit}>
                      <FormItem
                        id="userName"
                        wrapperCol={{span: 24}}
                        validateStatus={ userMessage["nameValidateStatus"]}
                        help = { userMessage["nameHelpMessage"]}
                        required>
                        <Icon type="user" />
                        <Input id="userName" name="userName" onChange={this.handleChange} onBlur={this.handleChange} placeholder="请输入登录账号" value={userMessage["nameValue"]}>
                        </Input>
                      </FormItem>
                      <FormItem
                        id="password"
                        wrapperCol={{span: 24}}
                        validateStatus={ userMessage["passwordValidateStatus"] }
                        help = { userMessage["passwordHelpMessage"] }
                        required>
                        <Icon type="lock" />
                        <Input id="password" name="password" onChange={this.handleChange} onBlur={this.handleChange} placeholder="请输入登录密码" value={userMessage["passwordValue"]}/>
                      </FormItem>
                      <FormItem
                        wrapperCol={{span: 24}} >
                          <label className="ant-checkbox-inline">
                            <Checkbox />自动登陆
                          </label>
                      </FormItem>
                      <Row>
                        <Col span="16" offset="8">
                          <Button type="primary" htmlType="submit">登录</Button>
                        </Col>
                    </Row>
                  </Form>
              </div>
          </div>
      </div>
		)
	}
})

function mapStateToProps(state){
  console.log("登录界面init:");
  console.log(state);
	return {
		routing : state.routing
	};
}
module.exports = connect(mapStateToProps)(Userlogin)