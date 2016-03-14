import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'

import TestForm from './components/Form'


class Test extends Component {
	constructor(){
		super(); 
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
	/**
	 *	事件处理
	 */
	events(){
		var _this = this;
		return{
			
		}
	}

    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		return (
			<div className="creator-form">
				<TestForm />
			</div>
		)	
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	return {
	    targetProps : state.test
	};
}
module.exports = connect(mapStateToProps)(Test)
