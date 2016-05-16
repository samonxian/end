import React from 'react'
import { ENTERPRISE_MANAGER_CODE_APP_TYPE } from './until'
import { generateMixed } from 'libs/function'
import { getEnterpriseManagerCodeFetch } from '../action'
import { Form, Select, Button, message, Input } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

export let Query = React.createClass({
	getInitialState() {
        return { 
            code : "",
            identity : "",
            type : "",
        }
    },

    componentWillReceiveProps(nextProps){

    },

    enterpriseCodeQuery(){
    	const { getFieldValue } = this.props.form;
    	const { dispatch } = this.props;
    	var identity = getFieldValue("identity"),
            type = getFieldValue("type"),
    	    code = getFieldValue("code");
            
        dispatch(getEnterpriseManagerCodeFetch({
            identity : identity,
            code : code,
            type : type,
            page : 1,
            size : 10
        }))
    },

    render(){
    	const { getFieldProps } = this.props.form;
        var rows = [];

        for(var i=0;i<ENTERPRISE_MANAGER_CODE_APP_TYPE.length;i++){
            var tempValue = ENTERPRISE_MANAGER_CODE_APP_TYPE[i];
            if(tempValue === ""){
                rows.push(<Option value="" key={"enterprise_manager_code_query_key"+new Date().getTime()+generateMixed(6)}>----请选择----</Option>)
            }else{
                rows.push(<Option value={ i } key={"enterprise_manager_code_query_key"+new Date().getTime()+generateMixed(6)}>{ tempValue }</Option>)
            }  
        }

    	return (
    		<Form inline style={{marginBottom:"20px"}}>
		        <FormItem
		             label="APP类型：">
		             <Select 
                        { ... getFieldProps('type',{　initialValue:this.state.type })}
                        style={{ width: 162 }}>
                        { rows }
                    </Select>
		        </FormItem>
		        <FormItem
		             label="APP代号：">
		             <Input 
		                 { ... getFieldProps('code',{ initialValue: this.state.code }) }
		                 placeholder="请输入APP代号"/>
		        </FormItem>
                <FormItem
                     label="企业名称：">
                     <Input 
                         { ... getFieldProps('identity',{ initialValue: this.state.identity }) }
                         placeholder="请输入企业名称"/>
                </FormItem>
		        <Button type="primary" htmlType="button" onClick = { this.enterpriseCodeQuery }>查询</Button>
		     </Form>
    	)
    }
})

Query = Form.create()(Query);