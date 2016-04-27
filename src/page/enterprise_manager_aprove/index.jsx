import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Form, Modal } from 'antd'
import { connect } from 'react-redux'
import { Header } from '../enterprise_manager_authenticate/components/Header'
import { Query } from './components/Query'
import { Dailog } from './components/Dailog'
import { Tips } from 'libs/react-libs/Tips'
import { ENTERPRISE_MANAGER_TABLE_ENTERPRISE } from './components/until'
import { getEnterpriseManagerAprovalFetch, enterpriseManagerAprovalDailog }  from './action'
import { isEmptyObj, generateMixed } from 'libs/function'

const FormItem = Form.Item;
const confirm = Modal.confirm;

require('css/enterprise_manager.css');

class enterpriseManagerAprove extends Component{
	componentDidMount(){
		const { dispatch } = this.props;
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
				dispatch(enterpriseManagerAprovalDailog(true,data));
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
		    tips = {},
		    status = 0;
		const { enterpriseManagerAprovalList, dailog_data } = this.props;

		if(isEmptyObj(enterpriseManagerAprovalList)){
			return false;
		}

		console.log("enterpriseManagerAprovalList",enterpriseManagerAprovalList);

        status = enterpriseManagerAprovalList["data"]["aproval_status"];
        dataList = this.adapterDataList(enterpriseManagerAprovalList["data"]["data"]["partitions"],status);
		
		if(status === 0){
			aprovalCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin enterprise_manager_type_current'
			aprovaledCls = 'enterprise_manager_type_cls'
		}else{
			aprovalCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin'
			aprovaledCls = 'enterprise_manager_type_cls enterprise_manager_type_current'
		}

		if(!isEmptyObj(dailog_data) && !isEmptyObj(dailog_data["json"]) && !dailog_data["visible"]){
        	tips = {
				visible : true,
				title : dailog_data["json"]["message"],
		   	    content : '',
		   	    status : dailog_data["json"]["status"],
		   	    callback : function(){
		   	    	dispatch(enterpriseManagerAprovalDailog(false,{}));
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
			     </div>
			     <Table className = "enterprise_manager_table"
			            columns={ ENTERPRISE_MANAGER_TABLE_ENTERPRISE } 
			            dataSource={ dataList } 
			            bordered
			            pagination={false} />
			     <div className="footer">
					<Row type="flex" justify="end">
					     <Pagination onChange={ this.turnPage } 
					         defaultCurrent={ enterpriseManagerAprovalList["data"]["data"]["current"] } 
					         total={ enterpriseManagerAprovalList["data"]["data"]["total"] } />
					</Row>
				 </div>
			     <Dailog { ...this.props }/>
			     <Tips tips = { tips }/>
			</div>)
	}
}

function mapStateToProps(state){
	return {
	    enterpriseManagerAprovalList : state.enterpriseManagerAprovalList,
        dailog_data : state.enterpriseManagerAprovalDailog,
	};
}
module.exports = connect(mapStateToProps)(enterpriseManagerAprove)