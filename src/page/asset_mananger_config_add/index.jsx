import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Spin, Row, Form } from 'antd'
import { connect } from 'react-redux'
import { Header } from '../asset_mananger/components/Header'
import { AddFrom } from './components/addFrom'
import { DetialFrom } from './components/detailFrom'
import { EditFrom } from './components/editFrom'
import { clearManagerConfigUpdate } from '../asset_mananger_config/action'
import { Link } from 'react-router'
require('css/asset_mananger.css');

class assetManangerConfigAdd extends Component{
	render(){
		const { updateData } = this.props;
		var fromType = <AddFrom { ...this.props}/>

        if(updateData["opt"] === "detail"){
        	fromType = <DetialFrom { ...this.props}/>
        }

        if(updateData["opt"] === "edit"){
        	fromType = <EditFrom { ...this.props}/>
        }
		return (
			<div className="asset_mananger_config_add_container">
		         <Header { ...this.props }/>
		         <div className = "asset_manager_config_add_back">
		             <Icon type="left" />
		             <Link to="/asset_mananger_config">返回</Link>
		         </div>
		         {
		         	fromType
		         }
		    </div>)
	}

	componentWillUnmount(){
		const { dispatch } = this.props;
		dispatch(clearManagerConfigUpdate());
	}
}

function mapStateToProps(state){
	return {
	    updateData : state.asset_manager_config_update
	};
}
module.exports = connect(mapStateToProps)(assetManangerConfigAdd)
