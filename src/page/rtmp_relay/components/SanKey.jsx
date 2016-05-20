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
			'rgb(7, 88, 22)', 'rgb(47,213,238)', 'rgb(250,167,1)','rgb(219,84,64)'
		]);
		var colorOfConns = d3.scale.threshold().domain([0, 10, 50]).range(['rgba(0,0,0,.3)',
			'rgba(0,0,255,.5)', 'rgba(0,255,0,.5)', 'rgba(255,0,0,.5)'
		]);
		return {
			nodelist: require('../dataSet/nodelist'),
			nodelist2: require('../dataSet/nodelist2'),
			nodelist3: require('../dataSet/nodelist3'),
			nodelist4: require('../dataSet/nodelist4'),
			linklist: require('../dataSet/linklist'),
			getSankey(){
				let data = this.props.data;
				let width = _this.conDom.offsetWidth - 0; 
				let height = _this.conDom.offsetHeight - 50; 
				var sankey = d3Sankey()
						  .nodeWidth(130)
						  .nodePadding(10)
						  .size([width, height])
						  .nodes(data.nodes)
						  .links(data.links)
						  .layout(32);
				return sankey;
			},
			/**
			 *	根据连接数获取连接线颜色
			 */
			getLinksColorByconns(conns){
				let data = this.props.data;
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
				let data = this.props.data;
				var path = this.sankey.link();
				var links = d3.select("#svg_con").selectAll('.link')
					.data(data.links)
					.enter().append('path')
					.attr('class', 'link')
					.attr('d', path)
					.style("stroke-width", function (d) { return Math.max(1, d.dy); })
			},
			drawNodes(){
				var data = this.props.data;
				var nodes = d3.select("#svg_con").selectAll('.node')
					.data(data.nodes)
					.enter().append('rect')
					.attr({
						'class': 'node',
						x: function (d) { return d.x },
						y: function (d) { return d.y },
						height: function (d) { return d.dy; },
						width: this.sankey.nodeWidth()
					}).style({
						fill: function(d) {
							return d.color = colorOfsend_queue(1)
						},
						stroke: function(d) {
							return ;
						}
					})
			}
		}
	}

    render() {
		super.render();
		var _this = this;
		let { data } = this.props;
		if(this.state.canRender){
			this.sankey = this.getSankey();
			var viewBox = `0 0 ${this.conDom.offsetWidth} ${ this.conDom.offsetHeight }`;
			return (
				<svg width={ this.conDom.offsetWidth } height={ this.conDom.offsetHeight } > 
					<radialGradient id="isp">
						<stop stopColor="rgba(45, 183, 245, 0.40)" offset="0"/>
						<stop stopColor="rgba(135, 208, 104, 0.38)" offset="1"/>
						<animate attributeName="fy" dur="700ms" from="90%" to="0%" repeatCount="indefinite" />
					</radialGradient>
					<g transform="translate(0,0)" >
						{
							this.sankey.links().map((d,k)=>{
								//console.debug(d)
								var path = this.sankey.link();
								var strokeWidth = Math.max(1, d.dy); 
								var content = <Antd.Table size="small" columns={this.linklist.columns} 
									dataSource={this.linklist.dataAdapter([d])} pagination={ false }/>
								return (
									<Antd.Popover key={ k } overlay={content} title={'连接信息'} trigger="click">	
										<g>
											{
												!d.is_lan &&
												<path  className="inner-link link" d={ path(d) } strokeWidth={ strokeWidth }/>
											}
											{
												d.is_lan &&
												<path  className="outer-link link" d={ path(d) } strokeWidth={ strokeWidth }/>
											}
											{
												d.isError &&
												<path  className="error-link link" d={ path(d) } strokeWidth={ strokeWidth }/>
											}
										</g>
									</Antd.Popover>
								)
							})
						}
					</g>
					<g transform="translate(0,0)">
						{
							this.sankey.nodes().map((d,k)=>{
								//console.debug(d)
								var width = this.sankey.nodeWidth()
								var style = {
									margin: "10px 0",
								}
								var content = (
									<div>
										<Antd.Table size="small" columns={this.nodelist.columns} 
											dataSource={this.nodelist.dataAdapter([d])} pagination={ false }/>
										<h3 style={ style }> </h3>
										<Antd.Table size="small" columns={this.nodelist2.columns} 
											dataSource={this.nodelist2.dataAdapter([d])} pagination={ false }/>
										{
											d.other_recv && d.other_recv.bytes_in &&
											<div>
												<h3 style={ style }>从外部服务接收数据的信息</h3>
												<Antd.Table size="small" columns={this.nodelist3.columns} 
													dataSource={this.nodelist3.dataAdapter([d.other_recv])} pagination={ false }/>
											</div>
										}
										{
											d.other_send && d.other_send.down_conn &&
											<div>
												<h3 style={ style }>发送到外部服务的信息</h3>
												<Antd.Table size="small" columns={this.nodelist4.columns} 
													dataSource={this.nodelist4.dataAdapter([d.other_send])} pagination={ false }/>
											</div>
										}
									</div>
								) 
								var node_bg = "rgba(45, 183, 245, 0.40)";
								switch(d.isp){
									case "电信":
										//蓝色
										node_bg = "rgba(45, 183, 245, 0.40)";
										break;
									case "联通":
										//绿色
										node_bg = "rgba(135, 208, 104, 0.38)";
										break;
									case "电信联通":
										node_bg = "url(#isp)";
										break;
								}
								return (
									<g key={ k }>
										<Antd.Popover overlayClassName="sankey-popover"  
												overlay={content} title={'节点信息'} trigger="click">	
											<rect className="node" fill={node_bg} height={ d.dy } width={ width }
												x={ d.x } y={ d.y } key={ d.address }/>
										</Antd.Popover>
										{
											true &&
											<text x={ d.x + 4 } y={ d.y + 7 } dy="0.35em" style={ { fontSize: "15", } }>
												{ d.address }
											</text>
										}
										{
											true &&
											<text x={ d.x + 4 } y={ d.y+7+13 } dy="0.35em" style={ { fontSize: "15", } }>
												{ r2fn.transformToKbMbGb(d.bw_in) }
											</text>
										}
										{
											true &&
											<text x={ d.x + 4 } y={ d.y+7+13+13 } dy="0.35em" style={ { fontSize: "15", } }>
												{ d.queues_ave + " / "+ d.queues_95peak +" / " + d.queues_peak}
											</text>
										}
									</g>
								)
							})
						}
					</g>
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
