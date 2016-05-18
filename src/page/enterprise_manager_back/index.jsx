import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Form, Select, message, Row, Pagination, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import { Header } from '../enterprise_manager_authenticate/components/Header'
import { Query } from './components/Query'
import { Dailog } from './components/Dailog'
import { ENTERPRISE_MANAGER_TABLE_ENTERPRISE } from './components/until'
import { Tips } from 'libs/react-libs/Tips'
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
    			dispatch(dailogShowData({visible:true},{}))
    		},
    		backOptFun(data){
    			const { dispatch } = _this.props;
    			var  title = '',
    			     content = '',
    			     status = data["status"];
    			if(status === 0){
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
				         	status : data["status"] ===0?2:0
				         }))
				    },
				    onCancel() {}
				 });
    		},
    		turnPage(n){
    			const { dispatch, enterpriseManagerBackList } = _this.props;
    			dispatch(getEnterpriseManagerBackFetch({
					page : n,
					size : 10,
					app_id : enterpriseManagerBackList["data"]["app_id"],
					cid : enterpriseManagerBackList["data"]["cid"],
					app_code : enterpriseManagerBackList["data"]["app_code"],
					identity : enterpriseManagerBackList["data"]["identity"]
				}));
    		}
    	}
    }

	render(){
		var dataList = [],
		    defaultCurrent = 0,
		    total = 0,
		    loading = true,
		    tips = {};
		const { enterpriseManagerBackList, dailog_data, dispatch } = this.props;
        
		if(!isEmptyObj(enterpriseManagerBackList)){
			defaultCurrent = enterpriseManagerBackList["data"]["data"]["current"];
			total = enterpriseManagerBackList["data"]["data"]["total"] ;
			dataList = this.adapterDataList(enterpriseManagerBackList["data"]["data"]["blacklist"]);
			loading = false;
		}

        if(!isEmptyObj(dailog_data) && !isEmptyObj(dailog_data["json"]) && dailog_data["json"]["status"]){
        	tips = {
				visible : true,
				title : dailog_data["json"]["message"],
		   	    content : '',
		   	    status : dailog_data["json"]["status"],
		   	    callback : function(){
		   	    	dispatch(dailogShowData({},{}));
					dispatch(getEnterpriseManagerBackFetch({
						page : enterpriseManagerBackList["data"]["page"],
						size : 10,
						app_id : enterpriseManagerBackList["data"]["app_id"],
						cid : enterpriseManagerBackList["data"]["cid"],
						app_code : enterpriseManagerBackList["data"]["app_code"],
						identity : enterpriseManagerBackList["data"]["identity"]
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
			            onClick = { this.addBack } 
			            htmlType="button" 
			            className = 'enterprise_manager_type_cls enterprise_manager_type_current'>
			            <Icon type="plus" />新增黑名单</Button>
			     </div>
			     <Table className = "enterprise_manager_table"
			            columns={ ENTERPRISE_MANAGER_TABLE_ENTERPRISE } 
			            dataSource={ dataList } 
			            bordered 
			            loading = { loading }
			            pagination={false}/>
			     <div className="footer">
					<Row type="flex" justify="end">
					     <Pagination onChange={ this.turnPage } 
					         current ={ defaultCurrent } 
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
	    enterpriseManagerBackList : state.enterpriseManagerBackList,
	    dailog_data : state.enterpriseManagerDailog
	};
}
module.exports = connect(mapStateToProps)(enterpriseManagerBack)