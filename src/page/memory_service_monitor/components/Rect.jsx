import Component from 'libs/react-libs/Component'
import React from 'react'

export class Rect extends Component{

    render(){
        console.log(this.props);
        const { data} = this.props;

		return <g>
		    <rect width={ data["innerRectW"] } x={ data["innerRectX"] } height={ data["innerRectH"] } style={{ fill:data["RectStyle"] }}/>
		    <text x={ data["textX"] } y={ data["textY"] }>{ data["label"] }</text>
		    <rect width={ data["width"] } height={ data["outRectH"] } x= { data["rectX"] } y={ data["rectY"] } style={{fill:data["RectStyle"]}}/>
		</g>
	}

}