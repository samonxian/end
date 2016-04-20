import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import { push,replace } from 'react-router-redux'
import { LoginForm } from './components/loginForm'
require('antd/lib/index.css')
require('css/login.css')

class Userlogin extends Component{
    componentWillReceiveProps(nextProps){
    	const { userLoginStatus } = this.props;
    	console.log("++++++++++++++++++++= userLoginStatus",userLoginStatus);
    }

	render(){
		return (<LoginForm { ... this.props }/>)
	}
}

function mapStateToProps(state){
	return {
		userLoginStatus : state.user_login_status
	};
}
module.exports = connect(mapStateToProps)(Userlogin)