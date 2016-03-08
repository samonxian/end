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
	
	componentWilReceiveProps(){
	}

	componentDidMount(){
		var _this = this;
		this.props.dispatch(actionCreator.fetchData());	
		this.clearInterval = setInterval(function(){
			//_this.props.dispatch(actionCreator.fetchData());	
			//console.debug(1)
		},4000)
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
		return {
			transJsonToServers(jsonDatas) {
				let servers = [];
				let serverLastReport = [];
				var serverList = d3.nest().key(function(d) {
					return d.ip;
				}).sortKeys(d3.ascending).sortValues(function(a, b) {
					var result = (a.report_at < b.report_at) ? 1 : (a.report_at == b.report_at ? 0 :
						-1);
					return result;
				});

				var allIpList = serverList.entries(jsonDatas);
				allIpList.forEach(function(d) {
					var srv = d.values[0];
					servers.push(d.values[0]);
					if (!serverLastReport[d.key]) {
						serverLastReport[d.key] = d.values[0].report_at;
					} else {
						if (d.values[0].report_at > serverLastReport[d.key]) {
							serverLastReport[d.key] = d.values[0].report_at;
						}
					}
				});
				return servers;
				//console.debug(serverLastReport)
			},
			makeSankeyData(servers) {
				var net2ip=[
					"120.24.240.208",
					"123.56.155.168",
					"120.26.227.224",

					"60.12.69.106",
					"122.226.181.104",
					"122.226.181.124",

					"221.203.168.163",
					"221.204.171.5",
					"222.174.239.69",
					"117.34.47.32",
					"175.6.18.161",
					"58.220.22.72",
					"210.76.58.5",
					"61.240.135.204"
				];
				var data = {
					nodes: [],
					links: []
				};
				var nodes = [];
				if (!servers.length) return data;
				servers.forEach(function(s,key) {
					var d = {
						net: net2ip.indexOf( s.ip )>=0?1:0,
						ip: s.ip,
						ip_city: s.ip_city,
						//name: s.ip_city + s.ip,
						key: key,
						ip_isp: s.ip_isp,
						download_bandwidth: s.download_bandwidth,
						download_connections: s.download_connections,
						bandwidth: s.bandwidth,
						connections: s.connections,
						report_at: s.report_at,
						report_svr: s.report_at,
						dst_relay_servers: s.dst_relay_servers,
					}
					d.bandwidth = d3.sum(s.dst_relay_servers, function(d) {
						return d.bandwidth;
					});
					d.value = Math.max(s.download_bandwidth, d.bandwidth);
					nodes.push(d);
					//链接颜色
					let send_queue;
					s.dst_relay_servers.forEach(function(r) {
						if (r.ip == "0.0.0.0") return;
						send_queue = -1
						if (s.relay_stat){
							for(var i=0;i<s.relay_stat.length;i++){
								if(s.relay_stat[i]['address'] == r.ip){
									send_queue = s.relay_stat[i]['ave_send_queue']
								}
							}
						}
						// console.log(send_queue)
						data.links.push({
							source: d.ip,
							target: r.ip,
							value: r.bandwidth,
							conns: r.conns,
							send_queue:send_queue,
							band: r.bandwidth
						});
					})
				});
				data.links.forEach(function(link) {
					var node;
					node = nodes.filter(function(d) {
						return d.ip == link.source;
					});
					//console.debug(node)
					link.source = node && node.length ? node[0] : null;
					node = nodes.filter(function(d) {
						return d.ip == link.target;
					});
					link.target = node && node.length ? node[0] : null;
				});
				//for(var i=data.links.length-1;i>=0;i--){
					//var tmpLink = data.links[i];
					//if(!tmpLink.target || !tmpLink.source)data.links.splice(i,1);
				//}
				//data.links.sort(function(a, b) {
					//if(!a.source || !a.target) return 0;
					//if(!a.source || !a.target) return 0;
					//var sameCity = (a.source.ip == b.source.ip) ? 0 : (data.links.indexOf(a) > data.links.indexOf(b) ?
						//1 : -1);
					//if (sameCity !== 0) return sameCity;
					//sameCity = (a.target.ip == b.target.ip) ? 0 : (a.target.ip > b.target.ip ? 1 :
						//-1);
					//return sameCity;
				//});

				/**
				 * 排除无任何转发的服务器
				 */
				nodes.forEach(function(node) {
					var hasNode = false;
					hasNode = !!(data.links.filter(function(link) {
						if(!link.source || !link.target)return false;
						return (link.source.ip == node.ip || link.target.ip == node.ip) ?
							true : false;
					}).length);
					if (hasNode) {
						data.nodes.push(node);
					} else{
						//console.debug('排除无任何转发的服务器:',node)
					}

				});
				data.nodes.sort(function(a,b){
					if(a.net > b.net) return 1;
					if(a.net < b.net) return -1;
					if(a.ip==b.ip)return 0;
					return a.ip > b.ip ? 1 : -1;
				});
				return data;
			},
			getCameraInfo(servers,cameras){
				var cameraInfo = {
					servers:[],
					cameras:[]
				};
				servers.forEach(function(server) {
					cameraInfo.servers[server.ip] = {
						cameraCount : server.camera_stat?server.camera_stat.length:0,
						cameras : server.camera_stat,
						conns : server.download_connections,
						frame : server.ave_fps,
						time_ave:server.time_ave,
						send_queue_ave:server.send_queue_ave,
						send_queue_max:server.send_queue_max,
						publish_num:server.publish_num,

						ip : server.ip,
						ip_city: server.ip_city,
						ip_isp: server.ip_isp,
						report_at: server.report_at,
						heart_beat_at: server.heart_beat_at,
						timeout: server.timeout
					}

					if(server.camera_stat){
						var serverip = server.ip
						server.camera_stat.forEach(function(camera){
							var cameraid = camera.cid
							if(cameraInfo.cameras[cameraid]){

								if(!cameraInfo.cameras[cameraid].servers)
									cameraInfo.cameras[cameraid].servers = []
								if(!cameraInfo.cameras[cameraid].servers[serverip])
									cameraInfo.cameras[cameraid].servers[serverip] = {}
								if(!cameraInfo.cameras[cameraid].servers[serverip].histroy)
									cameraInfo.cameras[cameraid].servers[serverip].histroy = []
								cameraInfo.cameras[cameraid].servers[serverip].histroy.push(camera.frame)
								if(cameraInfo.cameras[cameraid].servers[serverip].histroy.length > 10){
									cameraInfo.cameras[cameraid].servers[serverip].histroy.shift()
								}
								let histroy = cameraInfo.cameras[cameraid].servers[serverip].histroy
								cameraInfo.cameras[cameraid].servers[serverip].frame_avg = d3.sum(histroy)/histroy.length,
								cameraInfo.cameras[cameraid].servers[serverip].frame_now = camera.frame
								cameraInfo.cameras[cameraid].servers[serverip].report_at = server.heart_beat_at


								
								// cameraInfo.cameras[cameraid].servers[serverip].send_queue_ave = camera.
									// frame_avg:d3.sum(histroy)/histroy.length,
							}
						})
						if (server.cameras_stats){
							server.cameras_stats.forEach(function(camera){
								var cameraid = camera.cid
								if(cameraInfo.cameras[cameraid]){
									if(!cameraInfo.cameras[cameraid].servers){
											cameraInfo.cameras[cameraid].servers = []
									}
									if(!cameraInfo.cameras[cameraid].servers[serverip]){
										cameraInfo.cameras[cameraid].servers[serverip] = {}
									}

									cameraInfo.cameras[cameraid].servers[serverip].send_queue = camera.send_queue
									cameraInfo.cameras[cameraid].servers[serverip].recive_time = camera.time
								}

							})

						}
					}
					
					cameras.forEach(function(d) {
						if (!cameraInfo.cameras[d.peer_id]) {
							cameraInfo.cameras[d.peer_id] = {
								cid: d.peer_id,
								ip: d.ip,
								client_type: d.client_type,
								ip_city: d.public_ip_city,
								ip_isp: d.public_ip_isp,
								msg:""
							}
						}
						if (d.create_at && cameraInfo.cameras[d.peer_id].heartbeat > d.create_at) return;
						cameraInfo.cameras[d.peer_id].timeout = d.timeout
						cameraInfo.cameras[d.peer_id].heartbeat = d.create_at
						cameraInfo.cameras[d.peer_id].report_at = d.heart_beat_at
						if(d.msg_split){
							cameraInfo.cameras[d.peer_id].netState =
							  (1 - d.msg_split.Ts_Te / d.msg_split.T5_T1 ) * 30;
							cameraInfo.cameras[d.peer_id].msg = "" + d.msg_split.T5_T1 + "-" + d.msg_split.Ts_Te;
						}
					 })

				})
				return cameraInfo;
			},
		}
	}

    render() {
		super.render();
		var _this = this;
		let { rtmp_relay } = this.props;
		let { posts,posts2 } = rtmp_relay;
		if(posts){
			let servers = this.transJsonToServers(posts.datas),
				cameraInfo = this.getCameraInfo(posts.datas,posts2.datas),
				camera_columns = deviceCameraDataSet.columns,
				camera_dataSource = deviceCameraDataSet.dataAdapter(posts.device_count),
				user_columns = deviceUserDataSet.columns,
				user_dataSource = deviceUserDataSet.dataAdapter(posts.device_count);
			let sankeyData = this.makeSankeyData(servers);
			console.debug(sankeyData)
			//return false;
			return (
				<Antd.Row type="flex" justify="start"  className="rt_con rtmp_relay">
					<Antd.Col className="rt_left">
						<Antd.Row className="svg_con">
							<Antd.Col className="sc_top">
								<SanKey data={ sankeyData } cameraInfo={ cameraInfo }/>
							</Antd.Col>
							<Antd.Col className="sc_bottom">
								1111	
							</Antd.Col>
						</Antd.Row>
					</Antd.Col>
					<Antd.Col className="rt_right">
						<Antd.Table className="" size="middle"
								columns={camera_columns} dataSource={camera_dataSource} pagination={false} bordered/>
						<br/>
						<Antd.Table className="" size="middle"
								columns={user_columns} dataSource={user_dataSource} pagination={false} bordered/>
					</Antd.Col>
				</Antd.Row>
			)
		}
		return (<Antd.Spin />)
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
