import React from 'react'
import Component from 'libs/react-libs/Component'
import { Tabs} from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
const TabPane = Tabs.TabPane;

export class Header extends Component{
	events(){
		var _this = this;
		var obj = {
			tabSwitch(key){
				const { dispatch } = _this.props;
				switch(key){
					case "authenticate":
		                dispatch(push('/enterprise_manager_authenticate'));
					    break;
					case "code":
		                dispatch(push('/enterprise_manager_code'));
		                break;
		            case "aprove":
		                dispatch(push('/enterprise_manager_aprove'));
					    break;
					case "back":
		                dispatch(push('/enterprise_manager_back'));
					    break;
					default:
					    break;
				}
			}
		}
		return obj;
	}

	render(){
		var location = this.props.location.pathname,
		    active = "";

		const { dispatch } = this.props

		switch(location){
			case "/enterprise_manager_authenticate":
                active = "authenticate";
			    break;
			case "/enterprise_manager_aprove":
                active = "aprove";
                break;
            case "/enterprise_manager_code":
                active = "code";
			    break;
			case "/enterprise_manager_back":
                active = "back";
			    break;
			default:
			    break;
		}

		return (
			<Tabs type="card" 
			    activeKey = { active }
			    onChange = { this.tabSwitch }>
			    <TabPane tab="认证审核" key="authenticate"></TabPane>
			    <TabPane tab="APP管理审核" key="code"></TabPane>
			    <TabPane tab="CID段审核" key="aprove"></TabPane>
			    <TabPane tab="黑名单管理" key="back"></TabPane>
			 </Tabs>
			)
	}
}