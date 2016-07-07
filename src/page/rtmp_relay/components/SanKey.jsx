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
				<svg width={ this.conDom.offsetWidth } height={ this.conDom.offsetHeight } className="iconfont"> 
					<linearGradient id="isp">
						<stop stopColor="rgba(45, 183, 245, 0.40)" offset="0"/>
						<stop stopColor="rgba(135, 208, 104, 0.38)" offset="1"/>
					</linearGradient>
					<g transform="translate(0,0)" >
						{
							this.sankey.links().map((d,k)=>{
								//console.debug(d)
								var path = this.sankey.link();
								var strokeWidth = Math.max(1, d.dy); 
								var content = <Antd.Table size="small" columns={this.linklist.columns} 
									dataSource={this.linklist.dataAdapter([d])} pagination={ false }/>
								return (
									<Antd.Popover key={ k } content={content} title={'连接信息'} trigger="click">	
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
								//运营商
								var node_bg = "rgba(255, 255, 255, 0.40)";
								var icon = (
									<text x={ d.x + 120 } y={ d.y + 12 } dy="0.35em" fill="#000" style={ { fontSize: 25, } }>
											-
									</text>
								)
								switch(d.isp){
									case "电信":
										//蓝色
										node_bg = "rgba(45, 183, 245, 0.40)";
										icon = (
											<text x={ d.x + 103 } y={ d.y + 15 } dy="0.35em" fill="#000" style={ { fontSize: 25, } }>
													&#xe665;
											</text>
										)
										break;
									case "联通":
										//绿色
										node_bg = "rgba(135, 208, 104, 0.38)";
										icon = (
											<text x={ d.x + 103 } y={ d.y + 12 } dy="0.35em" fill="#000" style={ { fontSize: 25, } }>
													&#xe6b8;
											</text>
										)
										break;
									case "电信联通":
										node_bg = "url(#isp)";
										icon = (
											<text x={ d.x + 108 } y={ d.y + 15 } dy="0.35em" fill="#000" style={ { fontSize: 25, } }>
													&
											</text>
										)
										break;
								}
								//超时处理
								if(d.timeout){
									node_bg ="rgba(0, 0, 0, 0.2)";
								}
								//不存服务器节点在处理
								if(d.isFalse){
									node_bg ="rgba(255, 85, 0,0.8)";
								}
								//带宽质量颜色处理
								var bw_in_color = "#fff";
								//服务器平均峰值质量颜色处理
								var rate_color = "#fff";
								if(d.queues_ave >= 64 && d.queues_ave < 128){
									rate_color = "#c57e46";
									node_bg = "rgba(107, 82, 60, 0.68)";
								}else if(d.queues_ave >= 128){
									rate_color = "#aa4660";
									node_bg = "rgba(101, 55, 68, 0.38)";
								}
								//if(d.queues_ave >= 64 && d.queues_ave < 128){
									//bw_in_color = "rgba(107, 82, 60, 0.8)";
									//node_bg = bw_in_color;
								//}else if(d.queues_ave >= 128){
									//bw_in_color = "rgba(101, 55, 68, 0.8)";
									//node_bg = bw_in_color;
								//}
								return (
									<g key={ k }>
										<Antd.Popover overlayClassName="sankey-popover"  
												content={content} title={'节点信息'} trigger="click">	
											<rect className="node" fill={node_bg} height={ d.dy } width={ width }
												x={ d.x } y={ d.y } key={ d.address }/>
										</Antd.Popover>
										{
											true &&
											<g>
												{
													icon
												}
												<text x={ d.x + 4 } y={ d.y + 7 } dy="0.35em" fill="#fff" >
													{ d.address }
												</text>
											</g>
										}
										{
											!d.isFalse &&
											<text x={ d.x + 4 } y={ d.y+7+11 } dy="0.35em" fill={bw_in_color}>
												{
													d.viwers != 0 &&
													r2fn.transformToKbMbGb(d.bw_in) + " / " + d.viwers + "人" 
												}
												{
													!d.viwers &&
													r2fn.transformToKbMbGb(d.bw_in)
												}
											</text>
										}
										{
											!d.isFalse &&
												<text x={ d.x + 4 } y={ d.y+7+11+11 } dy="0.35em" fill={ rate_color }>
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
