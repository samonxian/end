import React from 'react'
import { connect } from 'react-redux'
import Component from 'libs/react-libs/Component'
import * as Antd from 'antd_c'
import * as actionCreator from '../action'
const FormItem = Antd.Form.Item
const RangePicker = Antd.DatePicker.RangePicker;

class Form extends Component {
	constructor(){
		super(); 
	}

	events(){
		var _this = this;
		return {
			handleSubmit: () => function(e){
				e.preventDefault();
				_this.setLoading();
				_this.props.dispatch(actionCreator.fetchData(_this.props.form))
			},
			onChange : () => function(value){
				console.debug(value)
				_this.props.dispatch(actionCreator.input_end_time(value.Format("yyyy-MM-dd hh:mm:ss")));	
			},
			setCidValue : () => function(e){
				_this.props.dispatch(actionCreator.input_cid(e.target.value))
			}
		}
	}

    render() {
		let { form,dispatch } = this.props;
		let params = form;
        return (
			<Antd.Form inline onSubmit={this.handleSubmit()}>

				<FormItem>
					<Antd.Input name="log_uid"  placeholder="请输入uid" onChange={this.setCidValue()}
						value={params && params.cid}/>
				</FormItem>

				<FormItem>
					<Antd.DatePicker Format="yyyy-MM-dd HH:mm:ss" showTime value={params && params.end_time } 
						onChange={this.onChange()} />
				</FormItem>
				
				<FormItem>
					<Antd.Button type="primary" htmlType="submit" size="middle">提交</Antd.Button>
				</FormItem>
				<FormItem >
					<div className="info_define">
						<div className="info_define_item bg_success">优</div>
						<div className="info_define_item bg_info">良</div>
						<div className="info_define_item bg_warn">中</div>
						<div className="info_define_item bg_error">差</div>
					</div>
				</FormItem>
			</Antd.Form>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	// console.log("user_log_query组件初始props",state);
	return {
	    form : state.user_log_query_form,
	};
}
module.exports = connect(mapStateToProps)(Form)
