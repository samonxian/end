import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from '../action'

class GeneratorForm extends Component {
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
			handleSubmit(){
				return function(e){
					e.preventDefault();
					var params = { moduleId : _this.props.targetProps.moduleId}
					_this.props.dispatch(actionCreator.fetchData(params))
				}
			},
			handleModuleIdChange(){
				return function(e){
					_this.props.dispatch(actionCreator.inputModuleId(e.target.value));
				}
			},
		}
	}

    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		return (
			<Antd.Form onSubmit={this.handleSubmit()}>
				<Antd.Form.Item>
					<Antd.Input name="module_id" onChange={ this.handleModuleIdChange() }
						placeholder="请输入模块ID" value={targetProps.moduleId}/>
				</Antd.Form.Item>
				<Antd.Button className="fr btn-submit" type="primary" htmlType="submit">提交</Antd.Button>
			</Antd.Form>
		)	
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	return {
	    targetProps : state.generatorForm
	};
}
module.exports = connect(mapStateToProps)(GeneratorForm)
