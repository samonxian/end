import React from 'react'
import ReactDOM from 'react-dom'
import Component from 'libs/react-libs/Component'
import * as Antd from 'antd'
import d3 from 'd3'
import * as fn from 'function'

class Graph extends Component {
	constructor(){
		super(); 
		this.state = { }
		//曲线和坐标距离底部距离
		this.toBottomMargin = 25;
		this.parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
	}

	dataAdapter(){
		var _this = this;
		return {
			getXData(data){
				var	width = _this.conDom.offsetWidth;
				//console.debug(width)
				var x = d3.scale.linear()
				  .domain(d3.extent(data, function(d,k) { 
					  //var date = new Date(d[0] * 1000).Format("yyyy-MM-dd hh:mm:ss");
					  //console.debug(_this.parseDate(date))
					  //return new Date(d[0] * 1000);
					  return k; 
				  }))
				  .range([width-110,0]);
				return x;
			},
			getYData(data){
				var height = _this.conDom.offsetHeight;
				var y = d3.scale.linear()
				  .domain([0,d3.max(data,function(d,k){
					  return d[1];
				  })])
				  .range([height-this.toBottomMargin, 0]);
				return y;
			},
			getLine(x,y){
				var line = d3.svg.line()
				  .x(function(d,k) { 
					  //return x(new Date(d[0] * 1000)); 
					  //console.debug(x(k))
					  return x(k);
				  })
				  .y(function(d) { return y(d[1]); })
				  .interpolate('monotone');
				return line;
			},
			getXAxis(x){
				return d3.svg.axis()
				  .scale(x)
				  .orient('bottom')
				  .ticks(5)
				  .tickFormat(function(d){
						return d3.time.format("%H:%M")(new Date(_this.props.data[d][0] * 1000));
				  });
			},
			getYAxis(y,format){
				return d3.svg.axis()
				  .scale(y)
				  .orient('left')
				  .ticks(5)
				  .outerTickSize(0)
				  .innerTickSize(-(this.conDom.offsetWidth-110))
				  .tickFormat(function(d){
					  if(!format){
						  return d;
					  }else{
						  return format(d);
					  }
				  });
			}
		}
	}

	events(){
		var _this = this;
		return {
			
		}
	}

	componentDidMount(){
		this.conDom = ReactDOM.findDOMNode(this);	
		//console.debug(this.leftDom)
		this.setState({ canRender : true })
	}

	componentDidUpdate(){
		this.leftDom = ReactDOM.findDOMNode(this.refs.left);	
		this.bottomDom = ReactDOM.findDOMNode(this.refs.bottom);	
		this.xAxis(d3.select(this.bottomDom));
		this.yAxis(d3.select(this.leftDom));
	}

    render() {
		super.render();
		var _this = this;
		let { data,left_text,bottom_text,formatY } = this.props;
		//console.debug(this.state)
	    if(this.state.canRender){
			let x = this.getXData(data),
				y = this.getYData(data),
				transform_bottom = `translate(80,${this.conDom.offsetHeight - this.toBottomMargin})`,
				transform_left = `translate(80,0)`,
				text_transform_bottom = `translate(${this.conDom.offsetWidth-60},${this.conDom.offsetHeight - 33 })`,
				text_transform_left = `translate(90,10)`,
				line = this.getLine(x,y);
			this.yAxis = this.getYAxis(y,formatY);
			this.xAxis = this.getXAxis(x);
			return (
				<svg className="graph_con">
					<g transform="translate(0,5)">
						<path transform="translate(82,0)" stroke="#0988ef" fill="none" d={line(data)}/>	
						<g className="outside_css" transform={transform_left} ref="left"/> 
						<g className="outside_css"transform={transform_bottom} ref="bottom"/> 
						<text transform={ text_transform_left }>{ left_text }</text>
						<text transform={ text_transform_bottom }>{ bottom_text }</text>
					</g>
				</svg>	
			)
		}else{
			return (
				<svg> </svg>
			)
		}
        
    }
}

module.exports = Graph 
