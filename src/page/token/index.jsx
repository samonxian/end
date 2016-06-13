import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'

import ForgetForm from './components/Form'

class View extends Component {
	constructor(props){
		super(props); 
		this.step = 0;
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
			<div>
				<ForgetForm parent={ this }/>
			</div>
		)	
    }
}

var ReduxView = connect((state)=>{
	return {
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: "生成token",
});
module.exports = ReduxView; 
