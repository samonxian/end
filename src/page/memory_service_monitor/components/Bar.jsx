import Component from 'libs/react-libs/Component'
import React from 'react'
import { Rect } from './Rect'
import { isEmptyObj, generateMixed } from 'libs/function'

export class Bar extends Component{

    render(){
        const { width, height, sevenData } = this.props;
        let arr = [];

        for(var i=0;i<sevenData.length;i++){
        	arr.push(<Rect data = { sevenData[i] } key={"memory_service_monitor_key_"+new Date().getTime()+generateMixed(6)}/>);
        }

		return <div style={{width:"100%",height:"50px"}}>
		            <svg viewBox = { "0,0,"+width+","+height } preserveAspectRatio = {"none"} style={{width:"100%",height:"50px"}}>{arr}</svg>
		       </div>
	}

}