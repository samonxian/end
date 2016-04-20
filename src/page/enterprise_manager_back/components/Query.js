import React from 'react'
import { getEnterpriseManagerBackFetch } from '../action'
import { Form, Select, Button, message } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

export let Query = React.createClass({
	getInitialState() {
        return { 
            cid : "",
            app_id : "",
            app_code : "",
            identity : ""
        }
    },

    componentWillReceiveProps(nextProps){
        console.log("+++++++++++++++++  nextProps",nextProps);
        const { enterpriseManagerBackList } = nextProps;
        var tempBackData = enterpriseManagerBackList["data"];
        // this.setState({
        //     cid : tempBackData["cid"],
        //     app_id : tempBackData["app_id"],
        //     app_code : tempBackData["app_code"],
        //     identity : tempBackData["identity"]
        // })
    },

    enterpriseAuthenticate(){
    	const { getFieldValue } = this.props.form;
    	const { dispatch, enterpriseManagerBackList } = this.props;
    	var app_id = getFieldValue("app_id"),
            cid = getFieldValue("cid"),
            identity = getFieldValue("identity"),
    	    app_code = getFieldValue("app_code");
        dispatch(getEnterpriseManagerBackFetch({
            app_id : app_id,
            app_code : app_code,
            identity : identity,
            cid : cid,
            page : 1,
            size : 10
        }));
    },

    render(){
    	const { getFieldProps } = this.props.form;

    	return (
            <Form inline style={{marginBottom:"20px"}}>
                <FormItem
                     label="设备ID：">
                     <Input { ...getFieldProps('cid',{ initialValue: this.state.app_id }) }
                            placeholder="请输入设备ID"/>
                </FormItem>
                <FormItem
                     label="APP ID：">
                     <Input { ...getFieldProps('app_id',{ initialValue: this.state.app_id }) }
                            placeholder="请输入APP ID"/>
                </FormItem>
                <FormItem
                     label="APP代号：">
                     <Input  { ...getFieldProps('app_code',{ initialValue: this.state.app_code }) }
                             placeholder="请输入APP代号"/>
                </FormItem>
                <FormItem 
                     label="企业名称：">
                     <Input  { ...getFieldProps('identity',{ initialValue: this.state.identity }) }
                             placeholder="请输入企业名称"/>  
                </FormItem>
                <Button type="primary" htmlType="button" onClick = { this.enterpriseAuthenticate }>查询</Button>
            </Form>
    	)
    }
})

Query = Form.create()(Query);