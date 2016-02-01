import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Userlogin from './user_login'
import Layout from './layout'
import Loading from 'libs/antd/Loading'
require('../../style/css/main.css')
class App extends React.Component {

	constructor(){
		super(); 
		this.isLoading = true;
	}

    render() {
		const { routing } = this.props
		let url = routing.path
		let container 

        if(url.indexOf("user_login")!=-1 || url.length<5){
        	container = <Userlogin/>
        }else{
        	container = <Layout contents={this.props.children || "" } />
        }
		return (
			<div> 
				{container}
			</div>	
		);
    }
}
function mapStateToProps(state){
	return {
		routing : state.routing,
		current : 'mail',
		theme : 'dark'
	};
}
export default connect(mapStateToProps)(App)

