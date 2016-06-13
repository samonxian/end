import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from '../action'
import Clipboard from "clipboard"

class Form extends Component {
	constructor(props){
		super(props); 
	}

	componentDidMount(){
		var _this = this;
		var clipboard = new Clipboard(".j-copy")
		clipboard.on('success', function(e) {
			Antd.message.success("复制成功！")
			console.info('Text:', e.text);
			console.info('Trigger:', e.trigger);
			e.clearSelection();
		});

		clipboard.on('error', function(e) {
			console.error('Action:', e.action);
			console.error('Trigger:', e.trigger);
			Antd.message.info("请使用⌘-C完成复制！")
		});
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
				return (e)=>{
					e.preventDefault();
					this.props.form.validateFieldsAndScroll((errors, values) => {
						//console.debug(checkbox)
						var control = [];
						var inputs = this.props.formInput;
						for(var i=0;i<8;i++){
							control.push(Number(!!inputs["type_1_"+i]));
						}
						control.push(values.access)
						control.push(Number(!!inputs.type_2_4))
						control.push(Number(!!inputs.type_2_5))
						control.push(Number(!!inputs.type_2_6))
						control.push(Number(!!inputs.type_2_7))
						for(var i=0;i<8;i++){
							control.push(Number(!!inputs["type_3_"+i]));
						}
						for(var i=0;i<8;i++){
							control.push(Number(!!inputs["type_4_"+i]));
						}
						var controlNum = parseInt(control.join(""),2)
						if (!!errors) {
							console.log('Errors in form!!!');
							return;
						}	
						var params = {
							app_key: values.app_key,
							cid: parseInt(values.cid,10),
							control: controlNum,
							expire: parseInt(+new Date(inputs.expire) / 1000,10),
						}
						//console.debug(params)
						this.props.dispatch(actionCreator.getToken(params,(json,dispatch)=>{
							this.setState({
								visible: true,
								token: json.token,
							})
						}))
					}) 
				}
			},
			handleCancel(){
                return ()=>{
                    this.setState({
                        visible: false,
                        token: "",
                    })
                }
            },
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		var mainFetching = false;
		if(targetProps && targetProps.main){
			mainFetching = targetProps.main.isFetching ;
		}	
		
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 17 },
		};
		//let emptyInput = require('validate/empty')(this.props.form);
		let emptyProps = require('validate/empty')(this.props.form);
		const selectProps = this.props.form.getFieldProps('access', {
			rules: [
				{ required: true, message: '请选择！' }
			],
		});
		return (
			<Antd.Form horizontal onSubmit={this.handleSubmit()} className="forget-form-con mt15" form={this.props.form}>
				
				<Antd.Form.Item label="App Key："  {...formItemLayout}>
					<Antd.Input  name="app_key" placeholder="请输入App Key" {...emptyProps('app_key','请输入App Key',[32,32],[
						"请输入32位App Key~",
						"请输入32位App Key~",
					])} { ...this.handleInputProps("app_key") }/>
				</Antd.Form.Item>

				<Antd.Form.Item label="摄像头ID："  {...formItemLayout}>
					<Antd.Input  name="cid" placeholder="请输入摄像头ID" {...emptyProps('cid','请输入摄像头ID',[0,30])}
						{ ...this.handleInputProps("cid") }/>
				</Antd.Form.Item>

				<Antd.Form.Item label="生效时间："  {...formItemLayout}>
					<Antd.DatePicker placeholder="请输入生效时间" { ...this.handleInputProps("expire") } format="yyyy-MM-dd HH:mm:ss"/>
				</Antd.Form.Item>

				<Antd.Form.Item label="验证及推送控制："  {...formItemLayout}>
					<Antd.Checkbox { ...this.handleInputProps("type_1_0") } value={1}>开启rtmp直播</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_1_1") } value={1}>开启hls直播</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_1_2") } value={1}>验证推送ip</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_1_3") } value={1}>验证refer</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_1_4") } value={1}>接受UDP连接</Antd.Checkbox>
				</Antd.Form.Item>

				<Antd.Form.Item label="存储时间权限："  {...formItemLayout}>
					<Antd.Select placeholder="请选择" style={{ width: 120 }} {...selectProps}>
						<Antd.Select.Option value="0000">没有存储权限</Antd.Select.Option>
						<Antd.Select.Option value="0001">存储7天</Antd.Select.Option>
						<Antd.Select.Option value="0010">存储30天</Antd.Select.Option>
						<Antd.Select.Option value="0011">90天其他保留</Antd.Select.Option>
					</Antd.Select>
				</Antd.Form.Item>

				<Antd.Form.Item label="录制控制："  {...formItemLayout} >
					<Antd.Checkbox { ...this.handleInputProps("type_2_4") } value={1}>FLV持久化</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_2_5") } value={1}>HLS 持久化</Antd.Checkbox>
				</Antd.Form.Item>

				<Antd.Form.Item label="播放控制："  {...formItemLayout} >
					<Antd.Checkbox { ...this.handleInputProps("type_3_0") } value={1}>观看公众</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_3_1") } value={1}>观看私有</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_3_2") } value={1}>观看时移</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_3_3") } value={1}>观看录像</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_3_4") } value={1}>语音回传</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_3_5") } value={1}>视频回传</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_3_6") } value={1}>查看截图</Antd.Checkbox>
					<Antd.Checkbox { ...this.handleInputProps("type_3_7") } value={1}>收听声音</Antd.Checkbox>
				</Antd.Form.Item>
				
				<Antd.Form.Item label=" "  {...formItemLayout}>
					<Antd.Button loading={mainFetching} className="btn-submit fr" 
							type="primary" htmlType="submit">生成Token</Antd.Button>
				</Antd.Form.Item>

				<Antd.Modal title="Token信息" visible={this.state.visible} onCancel={this.handleCancel()} footer={ false }> 
					<p>
						<div className="ant-search-input-wrapper">
							<Antd.Input.Group className="ant-search-input" >
								<Antd.Input id="token-content" value={ this.state.token }/>
								<div className="ant-input-group-wrap">
									<Antd.Button className="ant-search-btn j-copy" icon="copy" size="large" 
										data-clipboard-target="#token-content"/>
								</div>
							</Antd.Input.Group>
						</div>
					</p>
				</Antd.Modal>
			</Antd.Form>
		)	
    }
}

var ReduxForm = connect((state)=>{
	return {
	    formInput : state.formInput,
	    targetProps : state.token,
	};
})(Form)
module.exports = Antd.Form.create()(ReduxForm);



