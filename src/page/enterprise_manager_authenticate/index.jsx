import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Spin, Modal } from 'antd'
import { connect } from 'react-redux'
import { Header } from './components/Header'
import { Query } from './components/Query'
import { Dailog } from './components/Dailog'
import { ENTERPRISE_MANAGER_TABLE_ENTERPRISE } from './components/until'
import { getEnterpriseManagerFetch, aprovalEnterpriseAuthenicateFetch }  from './action'
import { isEmptyObj, generateMixed } from 'libs/function'
require('css/enterprise_manager.css');

const confirm = Modal.confirm;

class enterpriseManagerAuthenticate extends Component{
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(getEnterpriseManagerFetch({
			status : 0,
			code : '',
			page : 1
		}));
	}

	dataAdapter(){
		var _this = this;
		let obj = {
			adapterDataList(data){
				var tempArr = [];
				for(var i = 0;i<data.length;i++){
					var temp = data[i];
					temp.aprivalFun = _this.authenticateAproval;
					temp.openImageFun = _this.openImageFun;
					temp.key = new Date().getTime()+generateMixed(6);
					tempArr.push(temp);
				}
				return tempArr;
			}
		}
		return obj;
	}

	events(){
		var _this = this;
		let obj = {
			authenticateAproval(data){
				var title = <div>您正在处理{ data["email"] }用户的企业认证申请</div>,
				    content = <div><p><span>企业名称：</span>{ data["name"] }</p>
				                   <p><span>企业执照号：</span>{ data["code"] }</p>
				                   <p><span>申请时间：</span>{ data["created"] }</p></div>;
				confirm({
				    title: title,
				    iconClassName: 'arrow',
				    content: content,
				    cancelText: '拒绝',
				    okText: '同意',
				    onOk() {
				    	var agree = <span>您确定要<span className="color_green">同意</span>该用户的企业认证申请么？</span>
				        confirm({
						    title: agree,
						    cancelText: '取消',
						    okText: '确定',
						    onOk() {
						       const { dispatch } = _this.props;
						       dispatch(aprovalEnterpriseAuthenicateFetch({
						       	   status : 1,
						       	   id : data["id"]
						       }))
						    },
						    onCancel() {}
						});
				    },
				    onCancel() {
				    	var refuse = <span>您确定要<span className="color_red">拒绝</span>该用户的企业认证申请么？</span>
				    	confirm({
						    title: refuse,
						    cancelText: '取消',
						    okText: '确定',
						    onOk() {
						       const { dispatch } =  _this.props;
						       dispatch(aprovalEnterpriseAuthenicateFetch({
						       	   status : 2,
						       	   id : data["id"]
						       }))
						    },
						    onCancel() {}
						});
				    }
				});
			},
			openImageFun(url){
				const { dispatch } = _this.props;
				dispatch({
					url : url
				});
			},
			enterpriseAproval(){
				const { dispatch } =  _this.props;
				dispatch(getEnterpriseManagerFetch({
					status : 0,
					code : '',
					page : 1
				}));
			},
			enterpriseAprovaled(){
				const { dispatch } =  _this.props;
				dispatch(getEnterpriseManagerFetch({
					status : 1,
					code : '',
					page : 1
				}));
			}
		}
		return obj;
	}

	render(){
		var dataList = [],
		    aprovalCls = '',
		    aprovaledCls = '';
		const { enterpriseManagerList, dailogData } = this.props;
        
		if(isEmptyObj(enterpriseManagerList)){
			return false;
		}
        console.log("++++++++++++++++++　enterpriseManagerList",enterpriseManagerList);      
        dataList = this.adapterDataList(enterpriseManagerList["data"]["data"]["identities"]);
        if(enterpriseManagerList["data"]["status"] === 0){
        	aprovalCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin enterprise_manager_type_current';
        	aprovaledCls = 'enterprise_manager_type_cls';
        }else{
        	aprovalCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin';
        	aprovaledCls = 'enterprise_manager_type_cls enterprise_manager_type_current';
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
			     </div>
			     <Table className = "enterprise_manager_table"
			            columns={ ENTERPRISE_MANAGER_TABLE_ENTERPRISE } 
			            dataSource={ dataList } 
			            bordered />
			     <Dailog { ...this.props }/>
			</div>)
	}
}

function mapStateToProps(state){
	return {
	    enterpriseManagerList : state.enterpriseManagerAuthenticate,
	    enterpriseManagerAproval : state.enterpriseManagerAuthenticateAproval,
	    dailogData : state.enterpriseAuthenticateDailog
	};
}
module.exports = connect(mapStateToProps)(enterpriseManagerAuthenticate)