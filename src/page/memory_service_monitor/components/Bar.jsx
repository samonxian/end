import Component from 'libs/react-libs/Component'
import React from 'react'
import { BarItem } from './BarItem'
import { isEmptyObj, generateMixed } from 'libs/function'

export class Bar extends Component{

    render(){
        const { width, height, sevenData } = this.props;

        let arr = [];

        for(var i=0;i<sevenData.length;i++){
        	arr.push(<BarItem sevenData = { sevenData[i] } width = { width } height = { height } key={"memory_service_monitor_bar_key_"+new Date().getTime()+generateMixed(6)}/>);
        }
        
		return <div style={{width:"100%",height:"50px"}}>
		            { arr }
		       </div>
	}

}