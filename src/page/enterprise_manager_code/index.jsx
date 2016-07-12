import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Modal, Row, Pagination } from 'antd'
import { connect } from 'react-redux'
import { Header } from '../enterprise_manager_authenticate/components/Header'
import { loginIntoPage } from '../enterprise_manager_authenticate/action'
import { Query } from './components/Query'
import { Dailog } from './components/Dailog'
import { ENTERPRISE_MANAGER_TABLE_ENTERPRISE } from './components/until'
import { getEnterpriseManagerCodeFetch, enterpriseDailog }  from './action'
import { isEmptyObj, generateMixed } from 'libs/function'
import { Tips } from 'libs/react-libs/Tips'

require('css/enterprise_manager.css');

const confirm = Modal.confirm;

class enterpriseManagerCode extends Component{
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(loginIntoPage({
			url : "/enterprise_manager_code"
		}));
		dispatch(getEnterpriseManagerCodeFetch({
			type : "",
			indentity : "",
			code : "",
			page : 1,
			size :10
		}));
	}

	dataAdapter(){
		var _this = this;
		let obj = {
			adapterDataList(data){
				var tempArr = [];
				for(var i = 0;i<data.length;i++){
					var temp = data[i];
					temp.key = new Date().getTime()+generateMixed(6);
					temp.optStatus = _this.enterpriseManagerCodeOpt;
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
			turnPage(n){
				const { dispatch, enterpriseManagerCodeList } = _this.props;
				dispatch(getEnterpriseManagerCodeFetch({
					type : enterpriseManagerCodeList["data"]["type"],
					indentity : enterpriseManagerCodeList["data"]["indentity"],
					code : enterpriseManagerCodeList["data"]["code"],
					page : n,
					size :10
				}));
			},
			enterpriseManagerCodeOpt(data){
				const { dispatch } = _this.props;
				dispatch(enterpriseDailog({
					visible: true
				},data));
			}
		}
		return obj;
	}

	render(){
		var dataList = [],
		    defaultCurrent = 0,
		    tips = {},
		    loading = true,
		    total = 0;
		const { enterpriseManagerCodeList, dailogData, dispatch } = this.props;

		if(!isEmptyObj(enterpriseManagerCodeList)){
			defaultCurrent = enterpriseManagerCodeList["data"]["data"]["current"];
			total = enterpriseManagerCodeList["data"]["data"]["total"];
			dataList = this.adapterDataList(enterpriseManagerCodeList["data"]["data"]["apps"]);
			loading = false;
		}

		if(!isEmptyObj(dailogData) && !isEmptyObj(dailogData["data"]) && !dailogData["data"]["visible"]){
			tips = {
				visible : true,
				title : dailogData["data"]["message"],
		   	    content : '',
		   	    status : dailogData["data"]["status"],
		   	    callback : function(){
		   	    	dispatch(enterpriseDailog({},{}));
					dispatch(getEnterpriseManagerCodeFetch({
						type : enterpriseManagerCodeList["data"]["type"],
						indentity : enterpriseManagerCodeList["data"]["indentity"],
						code : enterpriseManagerCodeList["data"]["code"],
						page : enterpriseManagerCodeList["data"]["page"],
						size :10
					}));
		   	    }
			}
		}

		return (
			<div>
			     <Header { ... this.props }/>
			     <Query { ... this.props }/>
			     <Table className = "enterprise_manager_code_table"
			            columns={ ENTERPRISE_MANAGER_TABLE_ENTERPRISE } 
			            dataSource={ dataList } 
			            bordered 
			            loading = { loading }
			            pagination={false}/>
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
	return {
	    enterpriseManagerCodeList : state.enterpriseManagerCodeList,
	    dailogData : state.enterpriseDailog
	};
}
module.exports = connect(mapStateToProps)(enterpriseManagerCode)