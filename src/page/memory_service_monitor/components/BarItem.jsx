import Component from 'libs/react-libs/Component'
import React from 'react'
import { Rect } from './Rect'
import { isEmptyObj, generateMixed } from 'libs/function'

export class BarItem extends Component{

    render(){
        const { width, height, sevenData, bg, rate } = this.props;

        let arr = [],
            itemWith = sevenData["width"],
            len = sevenData["obj"].length,
            divWidth = itemWith - 20,
            descWidth = (((divWidth-10*(len-1))/len)/divWidth)*100,
            margin = (10/divWidth)*100,
            label = [];

        for(var i=0;i<sevenData["obj"].length;i++){
            var marginRight = margin;
            if(i == sevenData["obj"].length-1){
                marginRight = 0;
            }
        	arr.push(<Rect data = { sevenData["obj"][i] } key={"memory_service_monitor_key_"+new Date().getTime()+generateMixed(6)}/>);
            label.push(<div className = "memory_service_monitor_label_desc" 
                            style = {{ width:descWidth+"%",marginRight:marginRight+"%",height:height+"px",lineHeight:height+'px' }}
                            key={"memory_service_monitor_label_key_"+new Date().getTime()+generateMixed(6)}>
                                 {sevenData["obj"][i]["label"]}
                       </div>);
        }

		return <div className="memory_service_monitor_items memory_service_monitor_area_items" style = {{width:(itemWith/width)*100+"%",background:bg,padding:"0 5px 50px 5px",marginRight:rate+"%"}} >
		            <svg viewBox = { "0,0,"+(itemWith-10)+","+height } preserveAspectRatio = {"none"} style={{width:"100%",height:"50px"}}>
                         { arr }
                    </svg>
                    <div className = "memory_service_monitor_label_desc_container">
                         { label }
                    </div>
		       </div> 
	}

}