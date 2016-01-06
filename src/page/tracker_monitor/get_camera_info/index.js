import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from './action'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane;

class Tracker_monitor  extends React.Component {
	componentDidMount(){
		
	}
	
	callback(key) {
	  console.log(key);
	}

    render() {
        return (
			<div>
				<Tabs onChange={this.callback} type="card">
					<TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
					<TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
					<TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
				</Tabs>
			</div>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	console.log("组件初始props",state);
	return {
		routing : state.routing
	};
}
export default connect(mapStateToProps)(Tracker_monitor)

