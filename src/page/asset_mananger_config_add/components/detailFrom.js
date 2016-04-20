import React from 'react'
import { Form, Input, Button, Cascader, Checkbox, Radio, Tooltip, Icon } from 'antd'
import { PROVINCE_DATA } from './province'
import { assetManagerConfigSaveFetch } from '../action'
import { isEmptyObj } from 'libs/function'
import { adapterType, adapterISP } from './until'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};

export const DetialFrom = React.createClass({

	render(){
		const { updateData } = this.props;

		console.log(123);
        var updateObj = updateData["data"],
            cityStr = updateObj["province"]+"/"+updateObj["city"],
            brandStr = adapterType(updateObj["type"]),
            ISPStr = adapterISP(updateObj["ISP"]);
		return ( 
			<Form horizontal 
			     form={ this.props.form } 
			     className = "asset_manager_config_add_from"
			     onSubmit={ this.saveAssetManagerAdd }>
			    <FormItem
		             {...formItemLayout}
		             label="类型：">
		             <p className="ant-form-text">{ brandStr }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="品牌：">
		             <p className="ant-form-text">{ updateObj["brand"] }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout} 
		             label="型号：">
		             <p className="ant-form-text">{ updateObj["model"] }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="地区：">
		             <p className="ant-form-text">{ cityStr }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="网卡：">
		             <p className="ant-form-text">{ updateObj["interface"] }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="主机名：">
		             <p className="ant-form-text">{ updateObj["hostname"] }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="IP公网地址：">
		             <p className="ant-form-text">{ updateObj["IP"] }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="运营商：">
		             <p className="ant-form-text">{ ISPStr }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="托管商：">
		             <p className="ant-form-text">{ updateObj["vendor"] }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
			         label="机柜号：">
			         <p className="ant-form-text">{ updateObj["cabinet"] }</p>
		        </FormItem>
		        <FormItem
		             {　...formItemLayout　}
		             label="机架号：">
		             <p className="ant-form-text">{ updateObj["rack"] }</p>
		        </FormItem>  
		        <FormItem
		             {...formItemLayout}
		             label="序列号：">
		             <p className="ant-form-text">{ updateObj["serial"] }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="CPU个数：">
		             <p className="ant-form-text">{ updateObj["CPU"] }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="内存大小：">
		             <p className="ant-form-text">{ updateObj["memroy"] }</p>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="硬盘大小：">
		             <p className="ant-form-text">{ updateObj["disk"] }</p>
		        </FormItem>
		        <FormItem
		             {　...formItemLayout　}
		             label="紧急联系电话：">
		             <p className="ant-form-text">{ updateObj["emergencall"] }</p>
		        </FormItem>
		        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
		             <Button type="primary" htmlType="button">返回</Button>
		        </FormItem>
	      </Form>)
	}
});