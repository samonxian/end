import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Layout from './Layout'
require('../../style/css/main.css')
class App extends React.Component {

    render() {
		//console.log("App",this.props)
		return (
			<div> 
				<Layout contents={this.props.children || "" }/>
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

