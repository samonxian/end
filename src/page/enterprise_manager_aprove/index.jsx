import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Form, Modal } from 'antd'
import { connect } from 'react-redux'
import { Header } from '../enterprise_manager_authenticate/components/Header'
import { Query } from './components/Query'
import { Dailog } from './components/Dailog'
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
			status : 0
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
					status : 0
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
					status : 1
				}));
			}
		}
	}

	render(){
		var dataList = [],
		    aprovalCls = '',
		    aprovaledCls = '',
		    status = 0;
		const { enterpriseManagerAprovalList } = this.props;

		if(isEmptyObj(enterpriseManagerAprovalList)){
			return false;
		}

        status = enterpriseManagerAprovalList["data"]["status"];
        dataList = this.adapterDataList(enterpriseManagerAprovalList["data"]["data"]["partitions"],status);
		
		if(status === 0){
			aprovalCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin enterprise_manager_type_current'
			aprovaledCls = 'enterprise_manager_type_cls'
		}else{
			aprovalCls = 'enterprise_manager_type_cls enterprise_manager_type_btn_margin'
			aprovaledCls = 'enterprise_manager_type_cls enterprise_manager_type_current'
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
	    enterpriseManagerAprovalList : state.enterpriseManagerAprovalList,
        dailog_data : state.enterpriseManagerAprovalDailog,
	};
}
module.exports = connect(mapStateToProps)(enterpriseManagerAprove)