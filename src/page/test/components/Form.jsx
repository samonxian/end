import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from '../action'
class TestForm extends Component {
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
						
						cid : targetProps.cid,
						
						mid : targetProps.mid,
						
					}
					// _this.props.dispatch(actionCreator.fetchData(params))
				}
			},
			
			handleCidChange(){
				return function(e){
					_this.props.dispatch(actionCreator.inputCid(e.target.value));
				}
			},
			
			handleMidChange(){
				return function(e){
					_this.props.dispatch(actionCreator.inputMid(e.target.value));
				}
			},
			
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 18 },
		};

		return (
			<Antd.Form horizontal onSubmit={this.handleSubmit()}>
				
				<Antd.Form.Item label="cid："  {...formItemLayout}>
					<Antd.Input name="cid" onChange={ this.handleCidChange() }
						placeholder="请输入cid" value={targetProps.cid}/>
				</Antd.Form.Item>
				
				<Antd.Form.Item label="mid："  {...formItemLayout}>
					<Antd.Input name="mid" onChange={ this.handleMidChange() }
						placeholder="请输入mid" value={targetProps.mid}/>
				</Antd.Form.Item>
				
				<Antd.Form.Item label="&nbsp;"  {...formItemLayout}>
					<Antd.Button className="fr btn-submit" type="primary" htmlType="submit">提交</Antd.Button>
				</Antd.Form.Item>
			</Antd.Form>
		)	
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	return {
	    targetProps : state.testForm
	};
}
module.exports = connect(mapStateToProps)(TestForm)
