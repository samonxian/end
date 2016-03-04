import Component from 'libs/react-libs/Component'
import React from 'react'
import { generateMixed } from 'libs/function'

export class DiskItem extends Component{

    render(){

        const { itemsData } = this.props;

        var rows = [];

        for(var i=0;i<itemsData.length;i++){
        	rows.push(<rect width={ itemsData[i]["width"] } x={ itemsData[i]["x"] } y = { itemsData[i]["y"] } height={ itemsData[i]["height"] } 
        		fill = { itemsData[i]["fill"] } key={ 'memory_service_monitor_disk_items_key_'+ new Date().getTime()+generateMixed(6) } />);
        }

		return <g>
		         { rows }
	        </g>
	}

}