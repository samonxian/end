import React from 'react'
import { Table } from 'antd'
import * as d3 from "d3"
import Component from 'libs/react-libs/Component'
import { STROAGE_MONITOR_VIEW_DISK_MESSAGE } from './Until'
import { isEmptyObj, generateMixed } from 'libs/function'

export class AreaMessage extends Component{

	dataAdapter(){
		return {
			createKeyDisk(data){
                var max = d3.max(data.map(function(obj){
                    return obj["7day_user"];
                }));

                for(var i = 0;i < data.length;i++){
                    data[i]["key"] = "stroage_monitor_view_disk_key_"+ new Date().getTime() + generateMixed(6);
                    data[i]["max"] = max;
                }
                return data;
            }
		}
	}

	render(){
		const { stroageMonitorViewProps } = this.props;

        var diskList = [];

        if(isEmptyObj(stroageMonitorViewProps)){
        	return false;
        }

        diskList = this.createKeyDisk(stroageMonitorViewProps["param"]["area_info"]);

		return <div className = "stroage_monitor_view_area_message">
		         <h3>区域信息</h3>
		         <Table columns={ STROAGE_MONITOR_VIEW_DISK_MESSAGE } 
                    dataSource={ diskList } 
                    size = { "middle" }
                    bordered 
                    pagination={ false }/>
		     </div>
	}
}
