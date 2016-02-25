import React from 'react'
import d3 from 'd3'
import Component from 'libs/react-libs/Component'
class Pie extends Component {
	constructor(){
		super();
	}

	render(){
		let { data,stroke,pie,fill,outerRadius,innerRadius }  = this.props;
		if(!innerRadius){ innerRadius = 0; }
        var arc = d3.svg.arc()  
					.innerRadius(innerRadius)  
					.outerRadius(outerRadius);  
		let props = { }
		return(
			<g transform={"translate("+ outerRadius +","+outerRadius+")"}>
				{
					data.data.map(function(value,key){
						return (
							<path stroke={stroke} key={ key } d={arc(pie(data.data)[key])} fill={data.fill[key]} />
						)
					})
				}
			</g>
		)
	}
	
}
Pie.propTypes = {
	pie: React.PropTypes.func.isRequired,
	outerRadius: React.PropTypes.number.isRequired,
	stroke: React.PropTypes.string,
	fill: React.PropTypes.string,
}
module.exports = Pie 
