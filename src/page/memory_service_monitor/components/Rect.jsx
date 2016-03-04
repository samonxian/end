import Component from 'libs/react-libs/Component'
import React from 'react'

export class Rect extends Component{

    render(){
        const { innerRectW, innerRectX, innerRectH, textX, textY, label, width, outRectH, rectX, rectY} = this.props;
		return <g>
		    <g>
		       <rect width={ innerRectW } x={ innerRectX } height={ innerRectH } style={{fill:"yellow"}}/>
		       <text x={ textX } y={ textY }>{ label }</text>
		    </g>
		   <rect width={ width } height={ outRectH } x= { rectX } y={ rectY } style={{fill:"red"}}/>
		</g>
	}

}