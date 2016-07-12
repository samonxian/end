import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Form, Modal, Row , Button, Pagination} from 'antd'
import { connect } from 'react-redux'
import { Header } from '../enterprise_manager_authenticate/components/Header'
import { Query } from './components/Query'
import { Dailog } from './components/Dailog'
import { Tips } from 'libs/react-libs/Tips'
import { loginIntoPage } from '../enterprise_manager_authenticate/action'
import { ENTERPRISE_MANAGER_TABLE_ENTERPRISE } from './components/until'
import { getEnterpriseManagerAprovalFetch, 
	     enterpriseManagerAprovalDailog, 
	     enterpriseManagerAprovalAvalibale,
	     getCurrentUserHaveCidFetch,
	     enterpriseManagerAprovallCancelFetch }  from './action'
import { isEmptyObj, generateMixed } from 'libs/function'

const FormItem = Form.Item;
const confirm = Modal.confirm;

require('css/enterprise_manager.css');

class enterpriseManagerAprove extends Component{
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(loginIntoPage({
			url : "/enterprise_manager_aprove"
		}));
		dispatch(getEnterpriseManagerAprovalFetch({
			page : 1,
			size : 10,
			app_id : '',
			app_code : '',
			identity : '',
			aproval_status : 0
		}));
	}

	dataAdapter(){
		var _this = this;
		let obj = {
			adapterDataList(data,status){
				var tempArr = [];
				for(var i = 0;i<data.length;i++){
					var temp = data[i];
					temp.key = new Date().getTime()+generateMixed(6);
					temp.aprovalFun = _this.aprovalFun;
					temp.status = status;
					tempArr.push(temp);
				}
				return tempArr;
			}
		}
		return obj;
	}

	events(){
		var _this = this;
		return {
			aprovalFun(data){
				const { dispatch } = _this.props;
				var title = <span>您正在处理以下用户的CID段申请</span>,
				    content = <div><p><span>企业名称：</span>{ data["identity"] }</p>
				                   <p><span>企业代号：</span>{ data["code"] }</p>
				                   <p><span>APP ID：</span>{ data["app_id"] }</p></div>;
				confirm({
				     title: title,
				     content: content,
				     okText : "同意",
				     cancelText : "拒绝",
				     onOk() {
				     	dispatch(enterpriseManagerAprovalAvalibale({
				     		type : data["num_type"]
				     	}));
				     	dispatch(getCurrentUserHaveCidFetch({
				     		app_id : data["app_id"],
				     		aproval_status : 1,
				     		size : 5,
				     		page : 1
				     	}));
				        dispatch(enterpriseManagerAprovalDailog({
							hidden : true
						},data));
				     },
				     onCancel() {
				     	var refuse = <span>您确定要<span className="color_red">拒绝</span>该用户的CID段申请么？</span>
				    	confirm({
						    title: refuse,
						    cancelText: '取消',
						    okText: '确定',
						    onOk() {
						        dispatch(enterpriseManagerAprovallCancelFetch({
						       	   id : data["id"]
						        }))
						    },
						    onCancel() {}
						});
				     },
				});
				
			},
			enterpriseAproval(){
				const { dispatch } = _this.props;
				dispatch(getEnterpriseManagerAprovalFetch({
					page : 1,
					size : 10,
					app_id : '',
					app_code : '',
					identity : '',
					aproval_status : 0
				}));
			},
			enterpriseAprovaled(){
				const { dispatch } = _this.props;
				dispatch(getEnterpriseManagerAprovalFetch({
					page : 1,
					size : 10,
					app_id : '',
					app_code : '',
					identity : '',
					aproval_status : 1
				}));
			},
			enterpriseAprovaledDis(){
				const { dispatch } = _this.props;
				dispatch(getEnterpriseManagerAprovalFetch({
					page : 1,
					size : 10,
					app_id : '',
					app_code : '',
					identity : '',
					aproval_status : 3
				}));
			},
			turnPage(n){
				const { dispatch, enterpriseManagerAprovalList } = _this.props;
				dispatch(getEnterpriseManagerAprovalFetch({
					page : n,
					size : 10,
					app_id :  enterpriseManagerAprovalList["data"]["app_id"],
					app_code : enterpriseManagerAprovalList["data"]["app_code"],
					identity : enterpriseManagerAprovalList["data"]["identity"],
					aproval_status :  enterpriseManagerAprovalList["data"]["aproval_status"]
				}));
			}
		}
	}

	render(){
		var dataList = [],
		    aprovalCls = '',
		    aprovaledCls = '',
		    aprovalDisCls = '',
		    loading = true,
		    tips = {},
		    defaultCurrent = 0,
		    total = 0,
		    status = 0;
		const { enterpriseManagerAprovalList, dailog_data, dispatch } = this.props;

		if(!isEmptyObj(enterpriseManagerAprovalList)){
			defaultCurrent = enterpriseManagerAprovalList["data"]["data"]["current"];
			total = enterpriseManagerAprovalList["data"]["data"]["total"];
			status = enterpriseManagerAprovalList["data"]["aproval_status"];
            dataList = this.adapterDataList(enterpriseManagerAprovalList["data"]["data"]["partitions"],status);
            loading = false;
		}
		
		if(status === 0){
			aprovalCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin enterprise_manager_type_current'
			aprovaledCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin'
			aprovalDisCls = 'enterprise_manager_type_cls'
		}else if(status === 3){
			aprovalCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin'
			aprovaledCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin'
			aprovalDisCls = 'enterprise_manager_type_cls enterprise_manager_type_current'
		}else{
			aprovalCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin'
			aprovaledCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin enterprise_manager_type_current'
			aprovalDisCls = 'enterprise_manager_type_cls'
		}

		if(!isEmptyObj(dailog_data) && !isEmptyObj(dailog_data["json"]) && !dailog_data["visible"]["hidden"]){
        	tips = {
				visible : true,
				title : dailog_data["json"]["message"],
		   	    content : '',
		   	    status : dailog_data["json"]["status"],
		   	    callback : function(){
		   	    	dispatch(enterpriseManagerAprovalDailog({
		   	    		hidden : false
		   	    	},{}));
					dispatch(getEnterpriseManagerAprovalFetch({
						page : enterpriseManagerAprovalList["data"]["page"],
						size : 10,
						app_id : enterpriseManagerAprovalList["data"]["app_id"],
						app_code : enterpriseManagerAprovalList["data"]["app_code"],
						aproval_status : enterpriseManagerAprovalList["data"]["aproval_status"],
						identity : enterpriseManagerAprovalList["data"]["identity"]
					}));
		   	    }
			}
        }

		return (
			<div>
			     <Header { ... this.props }/>
			     <Query { ... this.props }/>
			     <div className = "enterprise_manager_type_btn">
			        <Button type="primary"
			            onClick = { this.enterpriseAproval } 
			            htmlType="button" 
			            className = { aprovalCls }>
			            <Icon type="folder" />待审核</Button>
			        <Button type="primary" 
			            onClick = { this.enterpriseAprovaled }
			            htmlType="button" 
			            className = { aprovaledCls }>
			            <Icon type="folder-open" />已审核</Button>
			        <Button type="primary" 
			            onClick = { this.enterpriseAprovaledDis }
			            htmlType="button" 
			            className = { aprovalDisCls }>
			            <Icon type="folder-open" />未通过</Button>
			     </div>
			     <Table className = "enterprise_manager_table"
			            columns={ ENTERPRISE_MANAGER_TABLE_ENTERPRISE } 
			            dataSource={ dataList } 
			            bordered
			            loading = { loading }
			            pagination={false} />
			     <div className="footer">
					<Row type="flex" justify="end">
					     <Pagination onChange={ this.turnPage } 
					         defaultCurrent={ defaultCurrent } 
					         current = { defaultCurrent }
					         total={ total } />
					</Row>
				 </div>
			     <Dailog { ...this.props }/>
			     <Tips tips = { tips }/>
			</div>)
	}
}

function mapStateToProps(state){
	console.log("state",state);
	return {
	    enterpriseManagerAprovalList : state.enterpriseManagerAprovalList,
	    enterpriseManagerAprovalAvalible : state.enterpriseManagerAprovalAvaliable,
        dailog_data : state.enterpriseManagerAprovalDailog,
        enterpriseHistroyAprovalList : state.enterpriseManagerHaveCid
	};
}
module.exports = connect(mapStateToProps)(enterpriseManagerAprove)