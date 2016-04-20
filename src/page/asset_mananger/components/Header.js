import React from 'react'
import { Tabs } from 'antd'
import Component from 'libs/react-libs/Component'
import { push } from 'react-router-redux'
const TabPane = Tabs.TabPane;

export class Header extends Component{
	events(){
		var _this = this;
        return {
        	changeTab(key){
        		const { dispatch } = _this.props;
        		switch(key){
        			case "status":
        			dispatch(push('/asset_mananger'));
        			break;
        			case "config":
        			dispatch(push('/asset_mananger_config'));
        			break;
        		}
        	}
        }
	}

	render(){
		var location = this.props.location.pathname,
		    active = "";

		const { dispatch } = this.props

		switch(location){
			case "/asset_mananger":
                active = "status";
			    break;
			case "/asset_mananger_config":
                active = "config";
                break;
            case "/asset_mananger_config_add":
                active = "config";
                break;
		}

		return (<Tabs type="card"
			        activeKey = { active }
		            onChange={ this.changeTab }>
            <TabPane tab="服务器状态信息" key="status"></TabPane>
            <TabPane tab="服务器配置信息" key="config"></TabPane>
        </Tabs>)
	}
}