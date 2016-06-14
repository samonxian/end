import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from '../action'
import { push } from 'react-router-redux'

class Form extends Component {
	constructor(props){
		super(props); 
	}

	componentDidMount(){
		var _this = this;
	}

	componentWillUnmount(){
	}
	
	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var _this = this;
		return {
		}
	}
	events(){
		var _this = this;
		return{
			handleSubmit(){
				return (e)=>{
					e.preventDefault();
					this.props.form.validateFieldsAndScroll((errors, values) => {
						console.debug(values);
						if (!!errors) {
							console.log('Errors in form!!!');
							return;
						}	
						var params = { 
							email : values.email,
							new_password : values.passwd,
							code : values.code,
						}
						_this.props.dispatch(actionCreator.reset(params,(json)=>{
							Antd.message.success(json.message || "修改成功！")
							setTimeout(()=>{
								this.props.dispatch(push('/login'))
							},1000)
						}))
					}) 
				}
			},
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		var mainFetching = false;
		if(targetProps && targetProps.main1){
			mainFetching = targetProps.main1.isFetching ;
		}	
		
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 16 },
		};
		let emptyInput = require('validate/empty')(this.props.form);
		let emailProps = require('validate/email')(this.props.form);
		let pwdValidate = require('validate/password')(this.props.form);
		let pwdProps = pwdValidate.pwd();
		let repwdProps = pwdValidate.repwd();
		return (
			<Antd.Form horizontal onSubmit={this.handleSubmit()} className="forget-form-con mt15" form={this.props.form}>
				<Antd.Form.Item label="邮箱："  {...formItemLayout}>
					<Antd.Input  name="email" placeholder="请输入email" {...emailProps}/>
				</Antd.Form.Item>

				<Antd.Form.Item label="验证码："  {...formItemLayout}>
					<Antd.Input  name="code" placeholder="请输入验证码" {...emptyInput('code','请填写验证码！')}/>
				</Antd.Form.Item>
				
				<Antd.Form.Item label="密码："  {...formItemLayout}>
					<Antd.Input  name="password" placeholder="请输入密码" {...pwdProps}/>
				</Antd.Form.Item>
				
				<Antd.Form.Item label="重复密码："  {...formItemLayout}>
					<Antd.Input  name="repassword" placeholder="请输入重复密码" {...repwdProps}/>
				</Antd.Form.Item>

				<Antd.Form.Item label="&nbsp;"  {...formItemLayout}>
					<Antd.Button loading={mainFetching} className="btn-submit fr" 
							type="primary" htmlType="submit">提交</Antd.Button>
				</Antd.Form.Item>
			</Antd.Form>
		)	
    }
}

var ReduxForm = connect((state)=>{
	return {
	    formInput : state.formInput,
	    targetProps : state.forget,
	};
})(Form)
module.exports = Antd.Form.create()(ReduxForm);



