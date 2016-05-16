import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Spin, Modal, Row, Pagination } from 'antd'
import { connect } from 'react-redux'
import { Header } from './components/Header'
import { Query } from './components/Query'
import { Dailog } from './components/Dailog'
import { Tips } from 'libs/react-libs/Tips'
import { ENTERPRISE_MANAGER_TABLE_ENTERPRISE } from './components/until'
import { getEnterpriseManagerFetch, 
	     authenticateDailog, 
	     aprovalEnterpriseAuthenicateFetch,
	     enterpriseManagerAuthenticateAproval }  from './action'
import { isEmptyObj, generateMixed } from 'libs/function'
require('css/enterprise_manager.css');
const confirm = Modal.confirm;

class enterpriseManagerAuthenticate extends Component{
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(getEnterpriseManagerFetch({
			authenicate_status : 0,
			name : '',
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
				                   <p><span>申请时间：</span>{ new Date(data["created"]).Format('yyyy-MM-dd hh:mm:ss') }</p></div>;
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
				// const { dispatch } = _this.props;
				// dispatch(authenticateDailog({
				// 	url : url
				// }));
			},
			turnPage(n){
				const { dispatch, enterpriseManagerList } = this.props;
				dispatch(getEnterpriseManagerFetch({
					authenicate_status : enterpriseManagerList["data"]["aproval_status"],
					name : enterpriseManagerList["data"]["name"],
					code : enterpriseManagerList["data"]["code"],
					size : 10,
					page : n
				}));
			}
		}
		return obj;
	}

	render(){
		var dataList = [],
		    aprovalCls = '',
		    tips = {},
		    aprovaledCls = '';
		const { enterpriseManagerList, dailogData, enterpriseManagerAproval, dispatch } = this.props;
        
		if(enterpriseManagerList["data"] === undefined ||isEmptyObj(enterpriseManagerList)){
			return false;
		}
		console.log("====== enterpriseManagerAproval",enterpriseManagerAproval);
        if(!isEmptyObj(enterpriseManagerAproval) && !isEmptyObj(enterpriseManagerAproval["data"])){
        	tips = {
				visible : true,
				title : enterpriseManagerAproval["data"]["message"],
		   	    content : '',
		   	    status : enterpriseManagerAproval["data"]["status"],
		   	    callback : function(){
		   	    	dispatch(getEnterpriseManagerFetch({
						page : enterpriseManagerList["data"]["page"],
						size : 10,
						code : enterpriseManagerList["data"]["code"],
						name : enterpriseManagerList["data"]["name"],
						authenicate_status : enterpriseManagerList["data"]["authenicate_status"]
					}));
		   	    	dispatch(enterpriseManagerAuthenticateAproval({},{}));
		   	    }
			}
        }

        dataList = this.adapterDataList(enterpriseManagerList["data"]["data"]["identities"]);
        console.log("++++++++++++++ enterpriseManagerList",enterpriseManagerList);
		return (
			<div>
			     <Header { ... this.props }/>
			     <Query { ... this.props }/>
			     <Table columns={ ENTERPRISE_MANAGER_TABLE_ENTERPRISE } 
			          dataSource={ dataList } 
			          bordered
			          pagination={false} />
			     <div className="footer">
					<Row type="flex" justify="end">
					     <Pagination onChange={ this.turnPage } 
					         defaultCurrent={ enterpriseManagerList["data"]["data"]["current"] } 
					         total={ enterpriseManagerList["data"]["data"]["total"] } />
					</Row>
				 </div>
			     <Dailog { ...this.props }/>
			     <Tips tips = { tips }/>
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