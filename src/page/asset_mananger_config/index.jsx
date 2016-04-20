import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Spin, Row, Modal } from 'antd'
import { Header } from '../asset_mananger/components/Header'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { assetManagerConfigFetch, assetManagerCofigDelete, assetManagerCofigUpdate } from './action'
import { ASSET_MANAGER_CONFIG_TABLE } from './components/until'
import { isEmptyObj, generateMixed, transformToKbMbGb } from 'libs/function'
require('css/asset_mananger.css');
const confirm = Modal.confirm;

class assetManangerConfig extends Component{
	componentDidMount(){
    	const { dispatch } = this.props;
    	dispatch(assetManagerConfigFetch());
    }

    dataAdapter(){
    	var _this = this;
    	return {
    		adapterConfigList(data){
    			var tempArr = [];
    			for(var i=0;i<data.length;i++){
    				var temp = data[i];
    				temp["key"] = "asset_manager_config_key_"+new Date().getTime()+generateMixed(6);
                    temp["editFun"] = this.assetManagerConfigEdit;
                    temp["deleteFun"] = this.assetManagerConfigDelete;
                    temp["detailFun"] = this.assetManagerConfigDetail;
    				tempArr.push(temp);
    			}
    			return tempArr;
    		}
    	}
    }

    events(){
    	var _this = this;
    	return {
    		assetManagerAdd(){
    			const { dispatch } = _this.props;
    			dispatch(push("/asset_mananger_config_add"));
    		},
            assetManagerConfigEdit(data){
                const { dispatch } = _this.props;
                dispatch(assetManagerCofigUpdate({
                    data : data,
                    opt : "edit"
                }));
                dispatch(push("/asset_mananger_config_add"));
            },
            assetManagerConfigDelete(data){
                const { dispatch } = _this.props;
                confirm({
                     title: '您是否确认要删除这项内容',
                     content: '',
                     onOk() {
                        dispatch(assetManagerCofigDelete(data));
                     },
                     onCancel() {}
                });
            },
            assetManagerConfigDetail(data){
                const { dispatch } = _this.props;
                dispatch(assetManagerCofigUpdate({
                    data : data,
                    opt : 'detail'
                }));
                dispatch(push("/asset_mananger_config_add"));
            }
    	}
    }

	render(){
		const { configData } = this.props;
		var configList = [];

        if(!isEmptyObj(configData)){
        	configList = this.adapterConfigList(configData["data"]);
        }

		return <div className="asset_mananger_config_container">
		    <Header { ...this.props }/>
		    <Row type="flex" justify="end" style={{marginBottom:"15px"}}>
		         <Button type="primary" onClick = { this.assetManagerAdd }><Icon type="plus" />新增</Button>
		    </Row>
		    <Table columns ={ ASSET_MANAGER_CONFIG_TABLE } 
		           dataSource={configList} 
		           bordered />
		</div>
	}
}

function mapStateToProps(state){
	return {
	    configData : state.asset_mananger_config
	};
}
module.exports = connect(mapStateToProps)(assetManangerConfig)