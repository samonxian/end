import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as actionCreater from './action'
import * as Antd from 'antd'
import * as dataSetTotal from './dataSet/total_info'
import * as dataSetServer from './dataSet/server'

class Monitor_direct_seeding2 extends Component {
	constructor(){
		super(); 
	}

	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.monitor_direct_seeding2.type == actionCreater.REQUEST_MONITOR_DS2){
			return false;
		}else{
			return true;	
		}
	}
	componentDidUpdate(){
	}

	componentDidMount(){
		var _this = this;
		this.props.dispatch(actionCreater.fetchData());	
		this.clearInterval = setInterval(function(){
			_this.props.dispatch(actionCreater.fetchData());	
			//console.debug(1)
		},2000)
	}

	componentWillUnmount(){
		clearInterval(this.clearInterval)
	}

	dataAdapter(){
		return {
			/**
			 * 把对象转成dataSetTotal需要的数据	
			 */
			formatDataTotalToArray(data){
				let t = [];
				t.push(data);
				return t;
			},
		}
	}

    render() {
		super.render();
		//console.log(this.props)
		let { monitor_direct_seeding2 ,location,dispatch } = this.props;
		let posts = monitor_direct_seeding2.posts;
		if(posts){
			let total_data = dataSetTotal.dataAdapter(this.formatDataTotalToArray(posts.total_info));
			let server_data = dataSetServer.dataAdapter(posts.servers);
			return (
				<div className="mds_con2">
					<h1>直播监控</h1>
					<br/>
					<h2>汇总数据</h2>
					<Antd.Table className="" loading={false} size="middle"
							columns={dataSetTotal.columns} dataSource={total_data} pagination={false} bordered/>
					<h2>详细数据</h2>
					<Antd.Table className="" loading={false} size="middle"
							columns={dataSetServer.columns} dataSource={server_data} pagination={false} bordered/>
				</div>
			)
		}else{
			return (
				<Antd.Spin />	
			)
		}
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state,props){
	return {
	    monitor_direct_seeding2 : state.monitor_direct_seeding2
	};
}
module.exports = connect(mapStateToProps)(Monitor_direct_seeding2)
