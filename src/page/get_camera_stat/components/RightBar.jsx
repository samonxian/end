import React from 'react'
import Component from 'libs/react-libs/Component'
import * as Antd from 'antd'
import d3 from 'd3'

class RightBar extends Component {
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
		let { width,height,x,y,data,gap,max_value,transform,field } = this.props;
	    if(true){
			if(!x){ x = 0; }
			if(!y){ y = 0 ; }
			if(!gap){ gap = 2; }
			x = x - width;
			return (
				<g transform={transform}>
					{
						data.map(function(value,key){
							let v = value[field];
							let t_y = y;
							//console.debug('v',v)
							//console.debug('value',value.send_rate_ave)
							x = parseInt(width) + parseInt(x) + parseInt(gap);
							let t_height = 0;
							if(field == 'send_rate_ave'){
								max_value = 1;
							}
							if(!v == 0 && !max_value == 0){
								t_height = height * v / max_value; 
							}
							t_y = height - t_height + t_y
							return (
								<rect key={ key } x={x} y={t_y} width={width} height={t_height}/>
							)
						})
					}
				</g>
			)
		}
        
    }
}

module.exports = RightBar 
