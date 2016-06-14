import Component from 'libs/react-libs/Component'
import React from 'react'
import { Row, Col } from 'antd'

export class HealthItems extends Component{

    render(){

         const { itemsData } = this.props
    	 return <g>
    	            <rect width={ itemsData["width"] } x={ itemsData["x"] } y = { itemsData["y"] } height={ itemsData["height"] } fill = { itemsData["RectStyle"] }/>
                    <text x = { itemsData["labelX"] } y = { 15 }>{ itemsData["label"] }</text>
		        </g>
	}

}