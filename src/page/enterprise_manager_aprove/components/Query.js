import React from 'react'
import { Form, Select, Button, message, Input } from 'antd'
import { getEnterpriseManagerAprovalFetch } from '../action'

const FormItem = Form.Item;
const Option = Select.Option;

export let Query = React.createClass({
	getInitialState() {
        return { 
            app_id : "",
            identity : "",
            code : ""
        }
    },

    componentWillReceiveProps(nextProps){

    },

    enterpriseAuthenticate(){
    	const { getFieldValue } = this.props.form;
    	const { dispatch , enterpriseManagerAprovalList } = this.props;
    	var identity = getFieldValue("identity"),
            app_id = getFieldValue("app_id"),
    	    code = getFieldValue("code");
        dispatch(getEnterpriseManagerAprovalFetch({
            app_id : app_id,
            page : 1,
            size : 10,
            app_code : code,
            identity : identity,
            aproval_status : enterpriseManagerAprovalList["data"]["aproval_status"]
        }))
    },

    render(){
    	const { getFieldProps } = this.props.form;

    	return (
	        <Form inline style={{marginBottom:"20px"}}>
                <FormItem
                     label="APP ID：">
                     <Input 
                         { ...getFieldProps('app_id',{ initialValue: this.state.app_id }) }
                         placeholder="请输入APP ID"/>
                </FormItem>
                <FormItem
                     label="企业名称：">
                     <Input 
                         { ...getFieldProps('identity',{ initialValue: this.state.identity }) }
                         placeholder="请输入企业名称"/>
                </FormItem>
                <FormItem
                     label="APP代号：">
                     <Input 
                         { ... getFieldProps('code',{ initialValue: this.state.code }) }
                         placeholder="请输入APP代号"/>
                </FormItem>
                <Button type="primary" htmlType="button" onClick = { this.enterpriseAuthenticate }>查询</Button>
            </Form>
    	)
    }
})

Query = Form.create()(Query);