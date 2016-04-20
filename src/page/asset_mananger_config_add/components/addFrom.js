import React from 'react'
import { Form, Input, Button, Cascader, Checkbox, Radio, Tooltip, Icon } from 'antd'
import { PROVINCE_DATA } from './province'
import { assetManagerConfigSaveFetch } from '../action'
import { isEmptyObj } from 'libs/function'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};

export let AddFrom = React.createClass({
	getInitialState(){
		return {
			city : [],
			opt : 'add',
			cityMessage : '',
			ISP : '',
			ISPMessage : '',
			ISPStatus : '',
			type : '',
			typeMessage : '',
			typeStatus : '',
			cityValidateStatus : '',
			hostname : '',
			hostnameStatus: '',
			hostNameHelp: '',
			IP : '',
			IpStatus : '',
			IpHelp : '',
			IpStatus : '',
			vendor : '',
			vendorStatus : '',
			vendorHelp : '',
			brand : '',
			brandHelp : '',
			brandStatus : '',
			model : '',
			modelStatus : '',
			modelHelp : '',
			serial : '',
			serialStatus : '',
			serialHelp : '',
			CPU : '',
			memroy : '',
			disk : '',
			interface : '',
			cabinet : '',
			cabinetStatus : '',
			cabinetHelp : '',
			rack : '',
			rackStatus : '',
			rackHelp : '',
			emergencall : '',
			emergencallStatus : '',
			emergencallHelp : '',
		}
	},

	selectCityCallback(rule, value, callback){
		var arr = [];
		if(value !==""){
			for(var i=0;i<value.length;i++){
				arr.push(value[i]["value"])
			}
			if(value.length === 0){
				this.setState({
					city : arr,
					cityValidateStatus : "error",
					cityMessage : "地址不能为空！",
				});
			}else if(value.length === 1){
				this.setState({
					city : arr,
					cityValidateStatus : "error",
					cityMessage : "请输入完整的地址",
				});
			}else{
				this.setState({
					city : arr,
					cityValidateStatus : "success",
					cityMessage : "",
				});
			}	
		}
	},

	saveAssetManagerAdd(e){
         e.preventDefault();
         const { dispatch } = this.props;
         this.props.form.validateFields((errors, values) => {
      
         });
        if(this.state.hostnameStatus !=="success" || this.state.IpStatus !=="success" || this.state.typeStatus !=="success" ||
         	this.state.ISPStatus !=="success" || this.state.vendorStatus !=="success" || this.state.cityValidateStatus !=="success" ||
         	this.state.brandStatus !=="success" || this.state.modelStatus !=="success" || this.state.serialStatus !=="success"||
         	this.state.cabinetStatus !=="success" || this.state.rackStatus !=="success" || this.state.emergencallStatus !=="success"){
         	return false;
         }else{
         	 dispatch(assetManagerConfigSaveFetch({
				 hostname : this.state.hostname,
	             IP : this.state.IP,
	             type : this.state.type,
	             ISP : this.state.ISP,
	             vendor : this.state.vendor,
	             province : this.state.city[0],
	             city : this.state.city[1],
	             brand : this.state.brand,
	             serial : this.state.serial,
	             model : this.state.model,
	             CPU : this.state.CPU,
	             memroy : this.state.memroy,
	             disk : this.state.disk,
	             interface : this.state.interface,
	             cabinet : this.state.cabinet,
	             rack : this.state.rack,
	             emergencall : this.state.emergencall
         	})); 
         }
	},

	checkTellphoneNumber(rule, value, callback){
		if(value === ""){
    		this.setState({
    			emergencall : "",
    			emergencallStatus : "error",
    			emergencallHelp : "请输入主机名"
    		});
    	}else{
    		this.setState({
    			emergencall : value,
    			emergencallStatus : "success",
    			emergencallHelp : ""
    		});
    	}
	},

    validatorHostName(rule, value, callback){
    	if(value === ""){
    		this.setState({
    			hostname : "",
    			hostnameStatus : "error",
    			hostNameHelp : "请输入主机名"
    		});
    	}else{
    		this.setState({
    			hostname : value,
    			hostnameStatus : "success",
    			hostNameHelp : ""
    		});
    	}
    },

    validatorIp(rule, value, callback){
    	if(value === ""){
    		this.setState({
    			IP : "",
    			IpStatus : "error",
    			IpHelp : "请输入主机名"
    		});
    	}else{
    		this.setState({
    			IP : value,
    			IpStatus : "success",
    			IpHelp : ""
    		});
    	}
    },

    validatorVendor(rule, value, callback){
    	if(value === ""){
    		this.setState({
    			vendor : "",
    			vendorStatus : "error",
    			vendorHelp : "请输入主机名"
    		});
    	}else{
    		this.setState({
    			vendor : value,
    			vendorStatus : "success",
    			vendorHelp : ""
    		});
    	}
    },

    validatorBrand(rule, value, callback){
    	if(value === ""){
    		this.setState({
    			brand : "",
    			brandStatus : "error",
    			brandHelp : "请输入主机名"
    		});
    	}else{
    		this.setState({
    			brand : value,
    			brandStatus : "success",
    			brandHelp : ""
    		});
    	}
    },

    validatorModel(rule, value, callback){
    	if(value === ""){
    		this.setState({
    			model : "",
    			modelStatus : "error",
    			modelHelp : "请输入主机名"
    		});
    	}else{
    		this.setState({
    			model : value,
    			modelStatus : "success",
    			modelHelp : ""
    		});
    	}
    },

    validatorSerial(rule, value, callback){
    	if(value === ""){
    		this.setState({
    			serial : "",
    			serialStatus : "error",
    			serialHelp : "请输入主机名"
    		});
    	}else{
    		this.setState({
    			serial : value,
    			serialStatus : "success",
    			serialHelp : ""
    		});
    	}
    },

    validatorCabinet(rule, value, callback){
    	if(value === ""){
    		this.setState({
    			cabinet : "",
    			cabinetStatus : "error",
    			cabinetHelp : "机柜号不能为空"
    		});
    	}else{
    		this.setState({
    			cabinet : value,
    			cabinetStatus : "success",
    			cabinetHelp : ""
    		});
    	}
    },

    validatorRack(rule, value, callback){
    	if(value === ""){
    		this.setState({
    			rack : "",
    			rackStatus : "error",
    			rackHelp : "请输入主机名"
    		});
    	}else{
    		this.setState({
    			rack : value,
    			rackStatus : "success",
    			rackHelp : ""
    		});
    	}
    },
    
    validatorType(rule, value, callback){
    	console.log("state type",this.state.type);
    	if((value === undefined && this.state.type === "") || (value === "" && this.state.type === "") ){
    		this.setState({
				type : "",
				typeMessage : '请选择类型值',
				typeStatus : 'error'
			});
    	}else{
    		if(value === undefined){
    			this.setState({
					typeMessage : '',
					typeStatus : 'success',
				});
    		}else{
    			if(value === ""){
	    			this.setState({
						type : value,
						typeMessage : '请选择类型值',
						typeStatus : 'error',
					});
    		    }else{
    		    	this.setState({
    		    		type : value,
						typeMessage : '',
						typeStatus : 'success',
					});
    		    }
    		} 
    	}
    },
    
    validatorIsp(rule, value, callback){
    	if((value === undefined && this.state.isp === "") || (value === "" && this.state.isp === "") ){
    		this.setState({
				ISP : "",
				ISPMessage : '请选择类型值',
				ISPStatus : 'error'
			});
    	}else{
    		if(value !== undefined){
    			this.setState({
					ISP : value,
					ISPMessage : '',
					ISPStatus : 'success',
				});
    		}if(value === ""){
    			this.setState({
					ISP : value,
					ISPMessage : '请选择类型值',
					ISPStatus : 'error',
				});
    		}else{
    			this.setState({
					ISPMessage : '',
					ISPStatus : 'success',
				});
    		}
    	}
    },

	render(){
		const { getFieldProps } = this.props.form;
		const { updateData } = this.props;

        const hostNameProps = getFieldProps('hostname', {
        	initialValue: this.state.hostname,
        	validate: [{
        		rules: [
			        { 
			        	required: true, 
			        	message: '主机名不能为空！' 
			        },
			        {
			            validator: this.validatorHostName,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});
        
        const ipProps = getFieldProps('IP', {
        	initialValue: this.state.IP,
        	validate: [{
        		rules: [
			        {    required: true, 
			        	 message: 'ip地址不能为空' 
			        },
			        {
			            validator: this.validatorIp,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});

		const typeProps = getFieldProps('type', {
			initialValue: this.state.type,
			validate: [{
        		rules: [
			        { 
			        	 required: true, 
			        	 message: '请选择类型' 
			        },
			        {
			            validator: this.validatorType,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});

		const ispProps = getFieldProps('ISP', {
			initialValue: this.state.ISP,
			validate: [{
        		rules: [
			        { 
			        	 required: true, 
			        	 message: '请选择运营商' 
			        },
			        {
			            validator: this.validatorIsp,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});

		const vendorProps = getFieldProps('vendor', {
			initialValue: this.state.vendor,
			validate: [{
        		rules: [
			        { 
			        	 required: true, 
			        	 message: '托管商不能为空' 
			        },
			        {
			            validator: this.validatorVendor,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});
       
		const brandProps = getFieldProps('brand', {
			initialValue: this.state.brand,
			validate: [{
        		rules: [
			        { 
			        	 required: true, 
			        	 message: '品牌不能为空'
			        },
			        {
			            validator: this.validatorBrand,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});

		const modelProps = getFieldProps('model', {
			initialValue: this.state.model,
			validate: [{
        		rules: [
			        { 
			        	 required: true, 
			        	 message: '型号不能为空' 
			        },
			        {
			            validator: this.validatorModel,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});

		const serialProps = getFieldProps('serial', {
			initialValue: this.state.serial,
			validate: [{
        		rules: [
			        { 
			        	 required: true, 
			        	 message: '序列号不能为空' 
			        },
			        {
			            validator: this.validatorSerial,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});

		const cabinetProps = getFieldProps('cabinet', {
			initialValue: this.state.cabinet,
			validate: [{
        		rules: [
			        { 
			        	 required: true, 
			        	 message: '机柜号不能为空' 
			        },
			        {
			            validator: this.validatorCabinet,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});
        
        const rackProps = getFieldProps('rack', {
        	initialValue: this.state.rack,
        	validate: [{
        		rules: [
			        { 
			        	 required: true, 
			        	 message: '机架号不能为空' 
			        },
			        {
			            validator: this.validatorRack,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
		});

		const emergencallProps = getFieldProps('emergencall', {
			initialValue: this.state.emergencall,
			validate: [{
        		rules: [
			        { 
			        	required: true, 
			        	message: '紧急联系电话不能为空'
			        }, {
			            validator: this.checkTellphoneNumber,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}] 
		});

		const adressProps =  getFieldProps('adressProps', {
			initialValue: this.state.city,
			validate: [{
        		rules: [
			        { 
			        	required: true, 
			        	message: '请选择省市地区'
			        },
			        {
			            validator: this.selectCityCallback,
			        }
			    ],
			    trigger: ['onBlur', 'onChange']
        	}]
        }); 
    
		return ( 
			<Form horizontal 
			     form={ this.props.form } 
			     className = "asset_manager_config_add_from"
			     onSubmit={ this.saveAssetManagerAdd }>
			    <FormItem
		             {...formItemLayout}
		             hasFeedback
		             validateStatus = { this.state.typeStatus }
		             help = { this.state.typeMessage }
		             label="类型：">
		             <Select 
		                 { ...typeProps } 
		                 value = { this.state.type }
		                 style={{ width: '100%' }}>
				         <Option value="">---请选择---</Option>
				         <Option value="virtual">虚拟机</Option>
				         <Option value="physical">物理机</Option>
				    </Select>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             hasFeedback
		             validateStatus = { this.state.brandStatus }
		             help = { this.state.brandHelp }
		             label="品牌：">
		             <Input { ...brandProps } 
		                  placeholder="请输入品牌" />
		        </FormItem>
		        <FormItem
		             {...formItemLayout} 
		             hasFeedback
		             validateStatus = { this.state.modelStatus }
		             help = { this.state.modelHelp }
		             label="型号：">
		             <Input { ...modelProps } 
		                  placeholder="请输入型号" />
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             hasFeedback
		             validateStatus = { this.state.cityValidateStatus }
		             help = { this.state.cityMessage }
		             label="地区：">
		             <Cascader 
		                 style = {{ width:'100%' }}
		                 { ...adressProps } 
		                 value = { this.state.city }
		                 options={ PROVINCE_DATA } 
		                 onChange={ this.selectCityCallback } 
		                 changeOnSelect />
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="网卡：">
		             <Input {...getFieldProps('interface')} 
		                    placeholder="请输入网卡" />
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             hasFeedback
		             validateStatus = { this.state.hostnameStatus }
		             help = { this.state.hostNameHelp }
		             label="主机名：">
		             <Input { ...hostNameProps } 
		                 placeholder="请输入主机名称" />
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             hasFeedback
		             validateStatus = { this.state.IpStatus }
		             help = { this.state.IpHelp }
		             label="IP公网地址：">
		             <Input { ...ipProps } 
		                 placeholder="请输入公网IP地址" />
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             hasFeedback
		             validateStatus = { this.state.ISPStatus }
		             help = { this.state.ISPMessage }
		             label="运营商：">
		             <Select 
		                 { ...ispProps } 
		                 value = { this.state.ISP }
		                 style={{ width: '100%' }}>
				         <Option value="">---请选择---</Option>
				         <Option value="CMCC">移动</Option>
				         <Option value="CNC">联通</Option>
				         <Option value="CTC">电信</Option>
				         <Option value="TIANWEI">天威</Option>
				         <Option value="Tencent">腾讯云</Option>
				         <Option value="ALi">阿里云</Option>
				         <Option value="Other">其他</Option>
				    </Select>
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             hasFeedback
		             validateStatus = { this.state.vendorStatus }
		             help = { this.state.vendorHelp }
		             label="托管商：">
		             <Input { ...vendorProps }
		                   placeholder="请输入托管商" />
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             hasFeedback
		             validateStatus = { this.state.cabinetStatus }
		             help = { this.state.cabinetHelp }
		             label="机柜号：">
		             <Input { ...cabinetProps } 
		                    placeholder="请输入机柜号" />
		        </FormItem>
		        <FormItem
		             {　...formItemLayout　}
		             hasFeedback
		             validateStatus = { this.state.rackStatus }
		             help = { this.state.rackHelp }
		             label="机架号：">
		             <Input { ... rackProps } 
		                    placeholder="请输入机架号" />
		        </FormItem>  
		        <FormItem
		             {...formItemLayout}
		             hasFeedback
		             validateStatus = { this.state.serialStatus }
		             help = { this.state.serialHelp }
		             label="序列号：">
		             <Input { ...serialProps } 
		                  placeholder="请输入序列号" />
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="CPU个数：">
		             <Input {...getFieldProps('CPU')} 
		                   placeholder="请输入CPU个数" />
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="内存大小：">
		             <Input {...getFieldProps('memroy')}
		                    placeholder="请输入内存大小" />
		        </FormItem>
		        <FormItem
		             {...formItemLayout}
		             label="硬盘大小：">
		             <Input {...getFieldProps('disk')} 
		                    placeholder="请输入硬盘大小" />
		        </FormItem>
		        <FormItem
		             {　...formItemLayout　}
		             hasFeedback
		             validateStatus = { this.state.emergencallStatus }
		             help = { this.state.emergencallHelp }
		             label="紧急联系电话：">
		             <Input { ... emergencallProps } 
		                    value = { this.state.emergencall }
		                    placeholder="请输入紧急联系电话" />
		        </FormItem>
		        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
		             <Button type="primary" htmlType="submit">保存</Button>
		        </FormItem>
	      </Form>)
	}
});

AddFrom = Form.create()(AddFrom);