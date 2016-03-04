import Component from 'libs/react-libs/Component'
import React from 'react'
import { Rect } from './Rect'

export class Bar extends Component{

    render(){
        const { width, height, sevenData } = this.props;
        let arr = [];

        for(var i=0;i<sevenData.length;i++){
        	arr.push(<Rect width = { sevenData[i]["width"] } innerRectH = { sevenData[i]["innerRectH"] } innerRectW = { sevenData[i]["innerRectW"] } 
        		   outRectH = { sevenData[i]["outRectH"] } rectX = { sevenData[i]["rectX"] } rectY= { sevenData[i]["rectY"] } innerRectX= { sevenData[i]["innerRectX"] } 
        		   innerRectY = { sevenData[i]["innerRectY"] } textX = { sevenData[i]["textX"] } textY = { sevenData[i]["textY"] } label = { sevenData[i]["label"] }
        		   RectStyle = { sevenData[i]["RectStyle"] } innerRectStyle = { sevenData[i]["innerRectStyle"] } key = { sevenData[i]["key"] }/>);
        }

		return <div style={{width:"100%",height:"50px"}}>
		            <svg width = {width} height = { height }>{arr}</svg>
		       </div>
	}

}