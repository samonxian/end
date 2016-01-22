import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tabs,Menu, Dropdown, Icon } from 'antd_c'
import { pushPath,replacePath } from 'redux-simple-router'
import { title } from '../user_log/title.js'
const TabPane = Tabs.TabPane;

class user_log_sidebar extends React.Component {

	constructor(){
		super(); 
	}

	componentDidMount(){
		
	}
	
	menuclick({key}){
		//this.props.dispatch(fetchData(this.props.params,key));
	}

	callback(key) {
		key = parseInt(key,10)
		let { dispatch } = this.props;
		switch(key){
			case 1:
				dispatch(pushPath('/user_log/start_service'));
			break;
			case 2:
				dispatch(pushPath('/user_log_query'));
			break;
		}
	}
	

    render() {
		let route = this.props.routing.path;
		let active = 1;
		if(route.indexOf('user_log') != -1 ){
			active = 1;
		}
		if(route.indexOf('user_log_query') != -1 ){
			active = 2;
		}
		var title_keys = [],title_contents = [];
		for(var key in title){
			title_keys.push(key);	
			title_contents.push(title[key]);	
		}
		const menu = <Menu onClick={this.menuclick.bind(this)}>
						{
							title_contents.map(function(data,index){
								var url = '/user_log/'+title_keys[index];
								var key =  title_keys[index];
								return (
									<Menu.Item key={key}>
										<Link to={url}>{data}</Link>
									</Menu.Item>
								)
							})
						}
						
					</Menu>;
		const operations = <Dropdown overlay={menu}>
								<span>
									日志页面 <Icon  type="caret-down" className="icon_down"/>
								</span>
						  </Dropdown>;
        return (
			<div>
				<Tabs defaultActiveKey={active.toString() } 
						onChange={this.callback.bind(this)} type="card">
					<TabPane tab="日志查询" key="2">
						{
							route.indexOf('user_log_query') != -1 &&  this.props.children
						}
					</TabPane>
					<TabPane tab={operations} key="1">
						{
							route.indexOf('user_log') != -1 &&  this.props.children
						}
					</TabPane>
				</Tabs>
			</div>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	//console.log("Get_camera_info组件初始props",state);
	return {
		routing : state.routing
	};
}
export default connect(mapStateToProps)(user_log_sidebar)
