import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
import GeneratorForm from './components/Form'
require('../../style/css/prism.css')

class Generator extends Component {
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

	events(){
		var _this = this;
		return{
			
		}
	}

    render() {
		super.render();
		var _this = this;
		let { generator } = this.props;
		return (
			<div className="creator-form">
				<GeneratorForm data={generator.posts}/>	
				
			</div>
		)	
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	return {
	    generator : state.generator
	};
}
module.exports = connect(mapStateToProps)(Generator)
