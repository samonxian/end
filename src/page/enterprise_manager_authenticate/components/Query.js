import React from 'react'
import { Form, Select, Button, message } from 'antd'
import { getEnterpriseManagerFetch } from '../action'

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

export let Query = React.createClass({
	getInitialState() {
        return { 
            status : 0,
            name : "",
            code : ""
        }
    },

    componentWillReceiveProps(nextProps){
        const { enterpriseManagerList } = this.props;
        this.setState({
            code : enterpriseManagerList["data"]["code"]
        })
    },

    enterpriseAuthenticate(){
    	const { getFieldValue } = this.props.form;
    	const { dispatch, enterpriseManagerList } = this.props;
    	var code = getFieldValue("code"),
            status = getFieldValue("status"),
            name = getFieldValue("name");
        
        dispatch(getEnterpriseManagerFetch({
            page : 1,
            size : 10,
            code : code,
            name : name,
            authenicate_status : status,
        }));
    },

    render(){
    	const { getFieldProps } = this.props.form;

    	return (
    		<Form inline style={{marginBottom:"20px"}}>
                <FormItem
                     label="企业认证状态：">
                     <Select 
                        { ... getFieldProps('status',{　initialValue:this.state.status })}
                        style={{ width: 162 }}>
                        <Option value="">所有</Option>
                        <Option value={ 0 }>未审核</Option>
                        <Option value={ 1 }>已审核</Option>
                        <Option value={ 2 }>拒绝</Option>
                    </Select>
                </FormItem>
                <FormItem
                     label="企业名称：">
                     <Input 
                         { ... getFieldProps('name',{ initialValue: this.state.name }) }
                         placeholder="请输入企业名称"/>
                </FormItem>
		        <FormItem
		             label="企业执照号：">
		             <Input 
		                 { ... getFieldProps('code',{ initialValue: this.state.code }) }
		                 placeholder="请输入企业执照号"/>
		        </FormItem>
		        <Button type="primary" htmlType="button" onClick = { this.enterpriseAuthenticate }>查询</Button>
		     </Form>
    	)
    }
})

Query = Form.create()(Query);