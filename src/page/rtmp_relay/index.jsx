import React from 'react'
import ReactDOM from 'react-dom'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
import SanKey from './components/SanKey'
import * as deviceCameraDataSet from './dataSet/device_camera'
import * as deviceUserDataSet from './dataSet/device_user'

class RtmpRelay extends Component {
	constructor(){
		super(); 
	}

	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.rtmp_relay.type == actionCreator.REQUESTRTMPRELAY){
			return false;
		}else{
			return true;	
		}
	}
	
	componentWilReceiveProps(){
	}

	componentDidMount(){
		var _this = this;
		this.props.dispatch(actionCreator.fetchData());	
		this.clearInterval = setInterval(function(){
			_this.props.dispatch(actionCreator.fetchData());	
			//console.debug(1)
		},3000)
	}

	componentDidUpdate(){
	}

	componentWillUnmount(){
		clearInterval(this.clearInterval)
	}
	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var _this = this;
		var serverAdapter = require('./dataAdapter/server')
		var cameraAdapter = require('./dataAdapter/camera')
		return {
			serverAdapter,
			cameraAdapter,
		}; 
	}

    render() {
		super.render();
		var _this = this;
		let { rtmp_relay } = this.props;
		let { posts,posts2,posts3 } = rtmp_relay;
		if(posts){
			let serverAdapter = this.serverAdapter,
				cameraAdapter = this.cameraAdapter,
				servers = serverAdapter.transJsonToServers(posts.datas),
				sankeyData = serverAdapter.makeSankeyData(servers),
				camera_columns = deviceCameraDataSet.columns,
				camera_dataSource = deviceCameraDataSet.dataAdapter(posts.device_count),
				user_columns = deviceUserDataSet.columns,
				user_dataSource = deviceUserDataSet.dataAdapter(posts.device_count,posts3);
			cameraAdapter.getServers(posts.datas);
			cameraAdapter.getCameras(posts.datas,posts2.datas);
			//cameraAdapter.makeCameraInfo(servers,sankeyData);
			//console.debug(cameraAdapter.cameras)
			return (
				<Antd.Row className="rt_con  rtmp_relay">
					<h2>公众摄像机转发服务器运行监控</h2>
					<Antd.Col className="sc_top relative">
						<Antd.Row type="flex" justify="start"  className="absolute sc_top_flex">
							<Antd.Col className="rt_right">
								<Antd.Table className="" size="small"
										columns={camera_columns} dataSource={camera_dataSource} pagination={false} />
								<br/>
								<Antd.Table className="" size="small"
										columns={user_columns} dataSource={user_dataSource} pagination={false} />
							</Antd.Col>
						</Antd.Row>
					</Antd.Col>
				</Antd.Row>
			)
		}
		return (
			<div className="rt_con">
				<Antd.Spin />
			</div>
		)
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	return {
	    rtmp_relay : state.rtmp_relay
	};
}
module.exports = connect(mapStateToProps)(RtmpRelay)
