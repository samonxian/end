import React from 'react'
import { Form, Select, Button, message } from 'antd'
import { getEnterpriseManagerFetch } from '../action'

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

export let Query = React.createClass({
	getInitialState() {
        return { 
            email : "",
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
    	var code = getFieldValue("code");
        
        dispatch(getEnterpriseManagerFetch({
            page : 1,
            code : code,
            status : enterpriseManagerList["data"]["status"],
        }));
    },

    render(){
    	const { getFieldProps } = this.props.form;

    	return (
    		<Form inline style={{marginBottom:"20px"}}>
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