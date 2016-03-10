import Component from 'libs/react-libs/Component'
import React from 'react'

export class Rect extends Component{

    render(){
        const { data} = this.props;
        
		return <g>
		    <rect width={ data["width"] } x={ data["rectX"] } height={ data["outRectH"] } style={{ fill:data["style"] }}/>
		    <rect width={ data["width"] } height={ data["innerRectH"] } x= { data["rectX"] } y={ data["rectY"] } fill = { data["rectStyle"] }/>
		    <text x={ data["textX"] } y={ data["textY"] } width={ data["width"] }>{ data["label"] }</text>
		</g>
	}

}