import React from 'react'
import { Form, Button, Modal, Select, Input, Row, Table, Spin } from 'antd'
import { ENTERPRISE_MANAGER_TABLE_BACK_DAILOG, ENTERPRISE_MANAGER_APROVAL_DAILOG_TABLE } from './until'
import { enterpriseManagerAprovalDailog, enterpriseManagerAprovalAgreeFetch, enterpriseManagerAprovalAvalibale, haveCidDataList } from '../action'
import { generateMixed, isEmptyObj } from 'libs/function'
const createForm = Form.create;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const formItemLayout = {
     labelCol: { span: 4 },
     wrapperCol: { span: 16 },
};
const formItemLayoutTable = {
     labelCol: { span: 4 },
     wrapperCol: { span: 20 },
};
let AddBackForm = React.createClass({
    getInitialState(){
        return {
            alloc_type : 1,
            num_type : 1,
            start_str : "",
            isInit : true,
            start_str_status : "validating",
            mask_str: "255.0.0.0"
        }
    },

    componentWillMount(){
        const { dailog_data, enterpriseManagerAprovalAvalible } = this.props;
        var type = "",
            type_value = "";
        if(!isEmptyObj(dailog_data)){
            type = dailog_data["json"]["num_type"];
            if(type === "A"){
                type_value = "255.0.0.0"
            }

            if(type === "B"){
                type_value = "255.255.0.0"
            }

            if(type === "C"){
                type_value = "255.255.255.0"
            }

            this.setState({
                num_type : dailog_data["json"]["usage_type"],
                mask_str: type_value
            })
        }

        if(!isEmptyObj(enterpriseManagerAprovalAvalible)){
            this.setState({
                start_str_status :　"success",
                start_str: enterpriseManagerAprovalAvalible["data"]["data"]["start_str"]
            });
        }
    },

    componentWillReceiveProps(nextProps){
        const { resetFields } = this.props.form;
        const { dailog_data, enterpriseManagerAprovalAvalible } = nextProps;
        let aprovalAvalible = this.props.enterpriseManagerAprovalAvalible;

        if(!isEmptyObj(dailog_data)){
            if(!dailog_data["visible"]["hidden"]){
                 resetFields();
                 this.setState({
                    alloc_type : 1,
                    num_type : 1, 
                    isInit : true,
                    mask_str: "255.0.0.0"
                 })
            } 
            if(this.state.isInit && this.state.num_type === 1 && this.state.mask_str === "255.0.0.0" && dailog_data["visible"]["hidden"]){
                var type = dailog_data["json"]["num_type"],
                    type_value = "";

                if(type === "A"){
                    type_value = "255.0.0.0"
                }

                if(type === "B"){
                    type_value = "255.255.0.0"
                }

                if(type === "C"){
                    type_value = "255.255.255.0"
                }

                this.setState({
                    num_type : dailog_data["json"]["usage_type"],
                    mask_str: type_value,
                    isInit : false
                })
            }
        }
　　　　
        if(!isEmptyObj(enterpriseManagerAprovalAvalible)){
            if(isEmptyObj(aprovalAvalible)){
                this.setState({
                    start_str_status :　"success",
                    start_str: enterpriseManagerAprovalAvalible["data"]["data"]["start_str"]
                });
            }else if(aprovalAvalible["data"]["data"]["start_str"] != enterpriseManagerAprovalAvalible["data"]["data"]["start_str"]){
                this.setState({
                    start_str_status :　"success",
                    start_str: enterpriseManagerAprovalAvalible["data"]["data"]["start_str"]
                });
            }
        }
    },

    handleChanageId(e){
        this.setState({
            alloc_type : e
        })
    },

    handleChangeMaskStr(e){
        const { dispatch } = this.props;
        this.setState({
            mask_str : e,
            start_str_status :　"validating" 
        });
        var type = "";
        if(e === "255.0.0.0"){
            type = "A";
        }
        if(e === "255.255.0.0"){
            type = "B";
        }
        if(e === "255.255.255.0"){
            type = "C";
        }
        dispatch(enterpriseManagerAprovalAvalibale({
            type : type
        }));
    },

    handleChangeType(e){
        this.setState({
            num_type : e
        })
    },

    cancelBtn(){
        const { dispatch } = this.props;
        dispatch(enterpriseManagerAprovalDailog({
            hidden : false 
        },{}));
        dispatch(haveCidDataList({},{}));
        this.setState({
            alloc_type : 1
        });
    },
    
    validatorStartStr(rule, value, callback){
        if(value){
            var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
            console.log("value",value);
            if(exp.test(value)){
                callback();
                this.setState({
                    start_str : value,
                    start_str_status : "success"
                });
            }else{
                this.setState({
                    start_str : value,
                    start_str_status : "error"
                });
                callback('请输入正确的IP地址！');
            }
        }else{
            this.setState({
                start_str : value,
                start_str_status : "error"
            });
            callback("");
        }
    },

    validatorStart(rule, value, callback){
        if(value){
            if(/^\d+$/.test(value)){
                callback();
            }else{
                callback("起始段字符必须为整数！");
            }
        }else{
            callback("");
        }
    },

    validatorEnd(rule, value, callback){
        const { getFieldValue } = this.props.form;
        if(value){
            if (/^\d+$/.test(value)) {
                if(parseInt(getFieldValue("start"))>parseInt(value)){
                    callback("结束值必须大于开始值");
                }else{
                    callback();
                }
            }else{
                callback("ID段结束值必须为整数！");
            }
        }else{
            callback("");
        }
    },

    handleSubmit(e){
         e.preventDefault();
        const { dispatch, dailog_data } = this.props;
        this.props.form.validateFields((errors, values) => {
             if (!!errors) {
                 console.log('Errors in form!!!');
                 return;
             }

             var id = dailog_data["json"]["id"],
                 data = {};
             if(this.state.alloc_type === 1){
                 data["start_str"] = values["start_str"];
                 data["mask_str"] = this.state.mask_str;
             }else{
                 data["start"] = parseInt(values["start"]);
                 data["end"] = parseInt(values["end"]);
             }
             
             dispatch(enterpriseManagerAprovalAgreeFetch({
                 id : id,
                 usage_type : this.state.num_type,
                 alloc_type : this.state.alloc_type,
                 data : data
             }));
             dispatch(haveCidDataList({},{}));
             this.setState({
                alloc_type : 1
             });
        });
    },

    adapterHistroyHtl(data){
        var histroyList = data["partitions"],
            histroySummary = data["summary"] === undefined ? {total : 0, used : 0} : data["summary"],
            histroyListHtl = '',
            histroyTableHtl = '';
        
        for(var i = 0; i<histroyList.length; i++){
            histroyList[i]["key"] = "enterprise_manager_aproval_dailog_key_"+i;
        }

        if(histroyList.length){
            histroyTableHtl = <Table columns={ ENTERPRISE_MANAGER_APROVAL_DAILOG_TABLE } 
                   dataSource={ histroyList }
                   bordered
                   size = { "small" }
                   pagination={false} />
        } 

        histroyListHtl = <FormItem 
            { ...formItemLayoutTable }
            label="用户使用情况：">
            <p><span className = "enterprise_manager_aproval_dailog_desc">分段 ID 可用总数 : <span>{ histroySummary["total"] }</span></span><span>已经使用的 ID 数量 : <span>{ histroySummary["used"] }</span></span></p>
             { histroyTableHtl }
        </FormItem>

        return histroyListHtl;
    },

    render(){
        const { getFieldProps } = this.props.form;
        const { enterpriseManagerAprovalAvalible, enterpriseHistroyAprovalList } = this.props;

        var htlArr = [],
            histroyHtl = '';

        if(isEmptyObj(enterpriseHistroyAprovalList) || isEmptyObj(enterpriseHistroyAprovalList["data"])){
            return false;
        }else{
            histroyHtl = this.adapterHistroyHtl(enterpriseHistroyAprovalList["data"]["data"]);
        }

        if(this.state.alloc_type === 1){
            htlArr = <div>
                <FormItem
                     {...formItemLayout}
                     hasFeedback
                     validateStatus = { this.state.start_str_status }
                     label="ID段起始字符：">
                     <Input { ...getFieldProps('start_str',{
                        initialValue : this.state.start_str,
                        rules: [
                            { 
                                 required: true, 
                                 whitespace: true, 
                                 message: '起始字符不能为空' 
                            },{ 
                                 validator: this.validatorStartStr
                            }
                        ]}) } 
                        value = { this.state.start_str }
                        placeholder="请输入起始段字符" />
                </FormItem>
                <FormItem
                     {...formItemLayout}
                     label="ID段的分配掩码：">
                     <Select 
                         { ...getFieldProps('mask_str',{}) }
                         value = { this.state.mask_str }
                         onChange = { this.handleChangeMaskStr }
                         style={{ width: "512px" }}>
                         <Option value= "255.0.0.0">A类</Option>
                         <Option value= "255.255.0.0">B类</Option>
                         <Option value= "255.255.255.0">C类</Option>
                     </Select>
                </FormItem>
            </div>
        }else{
            htlArr = <div>
                <FormItem
                     { ...formItemLayout }
                     hasFeedback
                     label="ID 段开始值：">
                     <Input { ...getFieldProps('start',{
                         rules: [
                            {   
                                required: true, 
                                whitespace: true, 
                                message: 'ID段开始值不为空' 
                            },
                            { validator: this.validatorStart }
                        ]
                     }) } placeholder="请输入起始段字符" />
                </FormItem>
                <FormItem
                     { ...formItemLayout }
                     hasFeedback
                     label="ID 段结束值：">
                     <Input { ...getFieldProps('end',{
                         rules: [
                            { 
                                 required: true,
                                 whitespace: true,  
                                 message: 'ID段结束值不为空'
                            },
                            { validator: this.validatorEnd }
                         ]
                     }) } placeholder="请输入起始段字符" />
                </FormItem>
            </div>
        }
        
        return (
            <Form horizontal form={this.props.form}>
                <FormItem
                     {...formItemLayout}
                     label="ID段类型：">
                     <Select 
                         value = { this.state.num_type }
                         onChange = { this.handleChangeType }
                         style={{ width: "512px" }}>
                         <Option value={ 1 }>推流设备</Option>
                         <Option value={ 2 }>观看用户</Option>
                     </Select>
                </FormItem>
                <FormItem
                     {...formItemLayout}
                     label="分配ID段的类型：">
                     <Select 
                         { ...getFieldProps('alloc_type',{
                                initialValue : this.state.alloc_type
                            }) 
                         }
                         style={{ width: "512px" }} onChange = { this.handleChanageId }>
                         <Option value= { 1 }>IP掩码方式</Option>
                         <Option value={ 2 }>起始点方式</Option>
                     </Select>
                </FormItem>
                { htlArr }
                { histroyHtl }
                <Row type="flex" justify="end">
                    <Button type="primary" className="enterprise_manager_back_dailog_btn cancel" onClick={this.cancelBtn}>取消</Button>
                    <Button type="primary" className="enterprise_manager_back_dailog_btn" onClick={this.handleSubmit}>确定</Button>
                </Row>
            </Form>
        )
    }
});
AddBackForm = createForm()(AddBackForm);

export const Dailog = React.createClass({
    getInitialState() {
        return { 
            visible: false
        }
    },

    componentWillReceiveProps(nextProps){
    	const { dailog_data } = nextProps;
        if(!isEmptyObj(dailog_data)){
            this.setState({
                 visible: dailog_data["visible"]["hidden"]
            });
        }
    },

    handleOk(){
    	this.setState({
		     visible: false
		});
    },

    handleCancel(){
        const { dispatch } = this.props;
    	this.setState({
		     visible: false
		});
        dispatch(enterpriseManagerAprovalDailog({
            hidden : false 
        },{}));
    }, 

    render(){

        const { enterpriseHistroyAprovalList } = this.props;
        var htl = '',
            cls = "enterprise_manager_back_dailog",
            width = 800;

        if(isEmptyObj(enterpriseHistroyAprovalList) || isEmptyObj(enterpriseHistroyAprovalList["data"])){
            htl = <Spin/>;
            width = 80;
            cls = "enterprise_manager_prove_dailog_loading_cls";
        }else{
            htl = <AddBackForm { ...this.props }/>;
        }

    	return (
            <Modal title="CID段审核" 
                 width = { width }
                 className = { cls }
                 visible = { this.state.visible }
	             onOk = { this.handleOk } 
	             onCancel = { this.handleCancel } >
	             { htl }
	        </Modal>
    	)
    }
})