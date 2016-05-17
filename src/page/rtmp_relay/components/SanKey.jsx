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
		//this.svg.style.display = "none";
		//this.svg.innerHTML = "";
		//this.sankey = this.getSankey();
		//this.drawNodes();
		//this.drawLinks();
		//console.debug(this.sankey.links())
		//this.svg.style.display = "block";
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
			linklist: require('../dataSet/linklist'),
			getSankey(){
				let data = this.props.data;
				let width = _this.conDom.offsetWidth - 250; 
				let height = _this.conDom.offsetHeight - 10; 
				var sankey = d3Sankey()
						  .nodeWidth(50)
						  .nodePadding(20)
						  .size([1600, 900])
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
				<svg viewBox="0 0 2040 940" > 
					<g transform="translate(40,40)">
						{
							this.sankey.links().map((d,k)=>{
								//console.debug(d)
								var path = this.sankey.link();
								var strokeWidth = Math.max(1, d.dy); 
								var content = <Antd.Table size="small" columns={this.linklist.columns} 
									dataSource={this.linklist.dataAdapter([d])} pagination={ false }/>
								return (
									<Antd.Popover key={ k } overlay={content} title={'连接信息'} trigger="hover">	
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
					<g transform="translate(40,40)">
						{
							this.sankey.nodes().map((d,k)=>{
								//console.debug(d)
								var width = this.sankey.nodeWidth()
								var content = <Antd.Table size="small" columns={this.nodelist.columns} 
									dataSource={this.nodelist.dataAdapter([d])} pagination={ false }/>
								return (
									<Antd.Popover overlayClassName="sankey-popover" key={ k } overlay={content} title={'节点信息'} trigger="hover">	
										<g>
											{
												false &&
												<text x={ d.x+d.dx } y={ d.y+d.dy/2+2 } dy="0.35em" style={ { fontSize: "15", } }>
													{ d.address + d.mode }
												</text>
											}
											<rect className="node" fill={ "blue" } height={ d.dy} width={ width }
												x={ d.x } y={ d.y } key={ d.address }/>
										</g>
									</Antd.Popover>
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
