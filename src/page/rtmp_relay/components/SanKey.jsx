import React from 'react'
import ReactDOM from 'react-dom'
import Component from 'libs/react-libs/Component'
import * as Antd from 'antd'
import d3 from 'd3'
import d3Sankey from 'libs/d3-plugin/sankey'

class SanKey extends Component {
	constructor(){
		super(); 
	}
	
	componentWilReceiveProps(){
	}

	componentDidMount(){
		var _this = this;
		this.conDom = ReactDOM.findDOMNode(this).parentNode;
		this.setState({
			canRender : true
		})	
	}

	componentDidUpdate(){
		this.svg = ReactDOM.findDOMNode(this.refs.svg_con);
		this.svg.style.display = "none";
		this.svg.innerHTML = "";
		this.sankey = this.getSankey();
		this.drawLinks();
		this.drawNodes();
		this.svg.style.display = "block";
		this.props.parent.cameraAdapter.makeCameraInfo(this.props.servers,this.sankey);
		this.props.parent.cameraAdapter.renderCameraInfo(this.props.dispatch);
		//console.debug(this.sankey.nodes())
	}

	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var _this = this;
		let props = this.props;
		var colorOfFrame = d3.scale.threshold().domain([0, 6, 11, 16]).range(['rgba(255,255,255,.6)',
			'rgba(219,84,64,1)', 'rgba(250,167,1,1)', 'rgba(47,213,238,1)',
			'rgba(10,137,40,1)'
		]);
		var colorOfRecivetime = d3.scale.threshold().domain([0, 1000, 2000, 3000]).range(['rgba(255,255,255,.6)',
			'rgba(10,137,40,1)', 'rgba(47,213,238,1)', 'rgba(250,167,1,1)','rgba(219,84,64,1)'
		]);
		var colorOfsend_queue = d3.scale.threshold().domain([0,10, 64, 128]).range(['rgba(255,255,255,.6)',
			'rgba(9,128,42,1)', 'rgba(47,213,238,1)', 'rgba(250,167,1,1)','rgba(219,84,64,1)'
		]);
		var colorOfConns = d3.scale.threshold().domain([0, 10, 50]).range(['rgba(0,0,0,.3)',
			'rgba(0,0,255,.5)', 'rgba(0,255,0,.5)', 'rgba(255,0,0,.5)'
		]);
		return {
			getSankey(){
				let data = _this.data;
				let width = _this.conDom.offsetWidth - 250; 
				let height = _this.conDom.offsetHeight - 10; 
				var sankey = d3Sankey()
						  .nodeWidth(50)
						  .nodePadding(20)
						  .size([1600, 900])
						  .nodes(data.nodes)
						  .links(data.links)
						  .layout(32);
				//console.debug(sankey.nodes())
				return sankey;
			},
			/**
			 *	根据连接数获取连接线颜色
			 */
			getLinksColorByconns(conns){
				let data = _this.data;
				var min = d3.min(data.links, function(d) {
						return d.conns;
					}),
					max = d3.max(data.links, function(d) {
						return d.conns;
					});
				var colorop = d3.scale.linear().domain([min, max]).range([0.25, .75]);
				var a = d3.rgb(255, 0, 0); //红色
				var b = d3.rgb(0, 255, 0); //绿色
				var compute = d3.interpolate(a, b);
				return compute(conns);
			},
			drawLinks(){
				let data = _this.data;
				var path = _this.sankey.link();

				var links = d3.select("#svg_con").selectAll(".link").data(data.links, function(d) {
					return d.source.ip + " " + d.target.ip;
				}).sort(function(a, b) {
					return b.dy - a.dy;
				});
				var linksEnter = links.data(data.links).enter().append("path").attr({
					"class": "link",
					d: path
				}).style("stroke-width", function (d) {
					return Math.max(5, d.dy);
				}).style("stroke", function(d) {
					 //console.log(d.send_queue)
					d.color = colorOfsend_queue(d.send_queue)
					//d.color = colorOfConns(d.conns);
					//d.color = _this.getLinksColorByconns(d.conns);
					//console.debug(d.color)
					return d.color;
				});
				linksEnter.append("title").text(function (d) {
					return (d.source.ip_city + " → " + d.target.ip_city + "\n带宽:" + (d.value *
											80 / 1024).toFixed(1).toString() + "Mb  连接数:" + d.conns
									.toString() +" 队列数:"+ d.send_queue.toFixed(1).toString());
				});
			},
			drawNodes(){
				var data = _this.data;
				var cameraInfo = this.cameraInfo;
				//console.debug(cameraInfo)
				var nodes = d3.select("#svg_con").selectAll(".node")
					.data(data.nodes)
					.enter()
					.append("g")
					.attr({
						"class": "node",
						transform: function(d) {
							return "translate(" + d.x + "," + d.y + ")";
						}
					});
				nodes.append("rect").classed('selectedServerNode', function(d) {
					//console.debug(0)
						return _this.props.parent.cameraAdapter.selectedServer == d.ip;
					}).on("click", function(d) {
						_this.props.parent.cameraAdapter.handleCameraClick(null, d.ip,_this.props.dispatch);
					})
					.attr({
						height: function(d) {
							return d.dy;
						},
						width: _this.sankey.nodeWidth()
					})
					.style({
						fill: function(d) {
							//server_color
							var xx, frame = -1,
								send_queue_ave = -1
							if (cameraInfo.servers[d.ip]) {
								console.log()
								// now = Date.now()
								// span = now - (new Date(cameraInfo.servers[d.ip].heart_beat_at).valueOf());
								if(!cameraInfo.servers[d.ip].timeout){
									frame = cameraInfo.servers[d.ip].frame;
									send_queue_ave = cameraInfo.servers[d.ip].send_queue_ave;
									xx = frame;
								}
								//不显示超时设置
								frame = cameraInfo.servers[d.ip].frame;
								send_queue_ave = cameraInfo.servers[d.ip].send_queue_ave;
								send_queue_ave = cameraInfo.servers[d.ip].send_queue_ave;
							} else {
								return d.color = colorOfsend_queue(send_queue_ave)
								// return d.color = colorOfFrame(frame);
							}
							return d.color = colorOfsend_queue(send_queue_ave);
							// return d.color = colorOfFrame(frame);
						},
						stroke: function(d) {
							return ;
						}
					})
					.append("title")
					.text(function(d) {
						return (d.ip_city + " " + d.ip + "\n传入带宽：" + (d.download_bandwidth *
											80 / 1024).toFixed(1).toString() + "Mb" + "\n传出带宽：" +
										(d.bandwidth * 80 / 1024).toFixed(1).toString() + "Mb");
					});
				nodes.append("text")
					.attr({
						x: _this.sankey.nodeWidth() + 5 ,
						y: function(d) {
							return d.dy / 2;
						},
						dy: ".35em",
						//"text-anchor": "middle",
						transform: null
					})
					.text(function(d) {
						var str = d.ip  + " " +  d.ip_city + " " + (d.download_bandwidth *
							80 / 1024).toFixed(1).toString() + "M ";
						if (cameraInfo.servers && cameraInfo.servers[d.ip]) {
							// str = str + cameraInfo.servers[d.ip].frame + "fps";
							// str = str + "q:" + (+cameraInfo.servers[d.ip].send_queue_ave).toString();
							str = str + " q:" + (+cameraInfo.servers[d.ip].send_queue_max).toString();
							str = str + " n:" + (+cameraInfo.servers[d.ip].publish_num).toString()
						}
						return str;
					});
			}
		}
	}

    render() {
		super.render();
		var _this = this;
		let { data,cameraInfo } = this.props;
		this.data = data;
		this.cameraInfo = cameraInfo;
		if(this.state.canRender){
			var viewBox = `0 0 ${this.conDom.offsetWidth} ${ this.conDom.offsetHeight }`;
			return (
				<svg viewBox="0 0 2240 940" > 
					<g ref="svg_con" id="svg_con" transform="translate(0,40)"></g>
				</svg>	
			)
		}else{
			return (
				<div></div>
			)
		}
    }
}
module.exports = SanKey; 
