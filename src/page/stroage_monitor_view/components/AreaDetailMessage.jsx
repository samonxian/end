import React from 'react'
import { Table } from 'antd'
import Component from 'libs/react-libs/Component'
import { isEmptyObj, generateMixed } from 'libs/function'
import { STROAGE_MONITOR_VIEW_DISK_DETAIL,
         STROAGE_MONITOR_VIEW_DISK_FORWORAD_DETAIL } from './Until'

export class AreaDetailMessage extends Component{

	dataAdapter(){
        return {
            createKeyDiskDetail(data){
                for(var i = 0; i < data.length; i++){
                    data[i]["key"] = "stroage_monitor_view_disk_detail_key_"+ new Date().getTime() + generateMixed(6);
                }
                return data;
            },
            expandedRowRender(record){
                var expandedData = record["relay"];
                for(var i=0;i<expandedData.length;i++){
                    expandedData[i]["key"] = "stroage_monitor_view_disk_forwoard_detail_key_"+ new Date().getTime() + generateMixed(6);
                }
                return <Table columns = { STROAGE_MONITOR_VIEW_DISK_FORWORAD_DETAIL } 
                            dataSource = { expandedData }
                            size = { "small" }
                            bordered 
                            pagination={false}/> 
            }
        }
    }

	render(){
		const { stroageMonitorViewProps } = this.props;

		var diskDetailList = [];

		if(isEmptyObj(stroageMonitorViewProps)){
        	return false;
        }

        diskDetailList = this.createKeyDiskDetail(stroageMonitorViewProps["param"]["disc_info"]);

		return <div className = "stroage_monitor_view_area_detail_message">
		         <h3>区域详细信息</h3>
		         <Table columns = { STROAGE_MONITOR_VIEW_DISK_DETAIL } 
                        dataSource = { diskDetailList }
                        expandedRowRender = { record => this.expandedRowRender(record) }
                        bordered 
                        size = { "middle" }
                        pagination = { false }/>
		     </div>
	}
}
