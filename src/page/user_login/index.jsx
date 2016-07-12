import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import { push,replace } from 'react-router-redux'
import { LoginForm } from './components/loginForm'
import { isEmptyObj } from 'libs/function'
import { loginIntoPage } from '../enterprise_manager_authenticate/action'
//require('antd/lib/index.css')
require('css/login.css')

class Userlogin extends Component{

    componentWillReceiveProps(nextProps){
    	const { userLoginStatus, dispatch, intoPageProps } = nextProps;
    	if(userLoginStatus["param"]["status"] === 200){
    		if(!isEmptyObj(intoPageProps) && !isEmptyObj(intoPageProps["data"])){
    			dispatch(push(intoPageProps["data"]["url"]));
    		}else{
    			dispatch(push('/'));
    		}
    	}
    }

    componentWillUnmount(){
        const { dispatch } = this.props;
        dispatch(loginIntoPage({}));
    }

	render(){
		return (<LoginForm { ... this.props }/>)
	}
}

function mapStateToProps(state){
	return {
		userLoginStatus : state.user_login_status,
		intoPageProps : state.loginIntoPage
	};
}
module.exports = connect(mapStateToProps)(Userlogin)
