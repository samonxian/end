import React from 'react'
import Component from 'libs/react-libs/Component'
import * as Antd from 'antd'
import d3 from 'd3'

class Bar extends Component {
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
		let { width,height,x,y,data,gap,max_value,transform,field,fill } = this.props;
		var fill_color = "#000";
	    if(true){
			if(!x){ x = 0; }
			if(!y){ y = 0 ; }
			if(!gap){ gap = 2; }
			x = x - width;
			return (
				<g transform={transform || ""}>
					{
						data.map((value,key)=>{
							let v ;
							if(!field){
								v = value;
							}else{
								v = value[field]
							}
							let t_y = y;
							x = parseInt(width) + parseInt(x) + parseInt(gap);
							let t_height = 0;
							if(!v == 0 && !max_value == 0){
								t_height = height * v / max_value; 
							}
							t_y = height - t_height + t_y
							fill && (fill_color = fill || "#000");
							if(Object.prototype.toString.apply(fill_color) == "[object Function]"){
								fill_color = fill_color(v);
								//console.debug(fill_color)
							}
							return (
								<rect key={ key } x={x} y={t_y} width={width} height={t_height} fill={fill_color}/>
							)
						})
					}
				</g>
			)
		}
        
    }
}

module.exports = Bar 
