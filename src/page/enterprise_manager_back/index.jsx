import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Form, Select, Modal  } from 'antd'
import { connect } from 'react-redux'
import { Header } from '../enterprise_manager_authenticate/components/Header'
import { Query } from './components/Query'
import { Dailog } from './components/Dailog'
import { ENTERPRISE_MANAGER_TABLE_ENTERPRISE } from './components/until'
import { getEnterpriseManagerBackFetch, dailogShowData, enterpriseBackOptFetch }  from './action'
import { isEmptyObj, generateMixed } from 'libs/function'
require('css/enterprise_manager.css');

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class enterpriseManagerBack extends Component{
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(getEnterpriseManagerBackFetch({
			page : 1,
			size : 10,
			app_id : '',
			cid : '',
			app_code : '',
			identity : ''
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
					temp.backOptFun = _this.backOptFun;
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
    		addBack(){
    			const { dispatch } = _this.props;
    			dispatch(dailogShowData(true))
    		},
    		backOptFun(data){
    			const { dispatch } = _this.props;
    			var  title = '',
    			     content = '',
    			     status = data["status"];
    			if(status === 1){
    				title = '你确定要解禁该APP ID么？';
    				content = '';
    			}else{
    				title = '你确定要禁用该APP ID么？';
    				content = '';
    			}
    			confirm({
				    title: title,
				    content: content,
				    onOk() {
				         dispatch(enterpriseBackOptFetch({
				         	id : data["id"],
				         	status : data["status"]
				         }))
				    },
				    onCancel() {}
				 });
    		}
    	}
    }

	render(){
		var dataList = [];
		const { enterpriseManagerBackList } = this.props;

		if(isEmptyObj(enterpriseManagerBackList)){
			return false;
		}
        dataList = this.adapterDataList(enterpriseManagerBackList["data"]["data"]["blacklist"],status);
        
		return (
			<div>
			     <Header { ... this.props }/>
			     <Query { ... this.props }/>
			     <div className = "enterprise_manager_type_btn">
			        <Button type="primary"
			            onClick = { this.addBack } 
			            htmlType="button" 
			            className = 'enterprise_manager_type_cls enterprise_manager_type_current'>
			            <Icon type="plus" />新增黑名单</Button>
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
	    enterpriseManagerBackList : state.enterpriseManagerBackList,
	    dailog_data : state.enterpriseManagerDailog
	};
}
module.exports = connect(mapStateToProps)(enterpriseManagerBack)