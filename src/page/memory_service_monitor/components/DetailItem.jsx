import Component from 'libs/react-libs/Component'
import React from 'react'
import { Row, Col } from 'antd'
import { generateMixed } from 'libs/function'
import { HealthItems } from './HealthItems'
import { DiskItem } from './DiskItem'

export class DetailItem extends Component{

    render(){

    	 const { healthData, healthWidth, healthHeight, type, style, bg } = this.props;
         
    	 var rows = [],
             itemWith = healthData["width"],
    	     arr = healthData["obj"];

         if( type === "memory_service_monitor_health"){
     	    for(var i=0;i<arr.length;i++){
    	    	rows.push(<HealthItems itemsData = { arr[i] } key = {'memory_service_monitor_healthItem_key'+new Date().getTime()+generateMixed(6)} />);
    	    }
         }else{
             for(var j=0;j<arr.length;j++){
                rows.push(<DiskItem itemsData = { arr[j] } key = {'memory_service_monitor_healthItem_key'+new Date().getTime()+generateMixed(6)} />);
             }
         }
         
    	 return <div className = "memory_service_monitor_items" style = {{width:(itemWith/healthWidth)*100+"%",background:bg}}>
                    <svg viewBox = { "0,0,"+itemWith+","+healthHeight } preserveAspectRatio = {"none"} style={{width:"100%",height:healthHeight}}>{ rows }
                    </svg>
		        </div>
	}

}