import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from '../action'

class ${className}Form extends Component {
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
					let targetProps = _this.props.targetProps;
					var params = { 
						<!--form_params_begin-->
						${inputId} : targetProps.${inputId},
						<!--form_params_end-->
					}
					_this.props.dispatch(actionCreator.fetchData(params))
				}
			},
			<!--form_handle_begin-->
			handle${inputId}Change(){
				return function(e){
					_this.props.dispatch(actionCreator.input${inputId}(e.target.value));
				}
			},
			<!--form_handle_end-->
		}
	}

    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		return (
			<Antd.Form onSubmit={this.handleSubmit()}>
				<!--form_content_begin-->
				<Antd.Form.Item>
					<Antd.Input name="module_id" onChange={ this.handle${inputId}Change() }
						placeholder="请输入模块ID" value={targetProps.${inputId}}/>
				</Antd.Form.Item>
				<!--form_content_end-->
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
	    targetProps : state.${moduleId}Form
	};
}
module.exports = connect(mapStateToProps)(${className}Form)
