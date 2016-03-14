import React from 'react'
import Component from 'libs/react-libs/Component'
import * as Antd from 'antd'
import d3 from 'd3'

class LeftBar extends Component {
	constructor(){
		super(); 
	}

	dataAdapter(){
		var _this = this;
		return {
		}
	}

	events(){
		var _this = this;
		return {
			
		}
	}

	componentDidMount(){
		
	}

    render() {
		var _this = this;
		let { width,height,x,y,data,gap,max_values,fields } = this.props;
		if(!x){ x = 0; }
		if(!y){ y = 0 ; }
		if(!gap){ gap = 2; }
		y = y - height - gap;
	    if(true){
			return (
				<g>
					{
						max_values.map(function(value,key){
							let v = data[fields[key]];
							//console.debug('v',v)
							//console.debug('value',value)
							y = parseInt(height) + parseInt(y) + parseInt(gap);
							let t_width = 0;
							let t_x = x;
							if(!v == 0 && !value == 0){
								t_width = v / value * 100 + "%"; 
								t_x = v / value * 93 + "%"
							}
							return (
								<g key={ key }>
									<rect  x={x} y={y} width={t_width} height={height} fill="#A9D8F7"/>
								</g>
							)
						})
					}
				</g>
			)
		}
        
    }
}

module.exports = LeftBar 
