import React from 'react'
import { Table } from 'antd'
import Component from 'libs/react-libs/Component'
import { isEmptyObj, generateMixed } from 'libs/function'
import { STROAGE_MONITOR_VIEW_DISK_DETAIL,
         STROAGE_MONITOR_VIEW_DISK_FORWORAD_DETAIL } from './Until'

export class AreaDetailMessage extends Component{

	dataAdapter(){
        var _this = this;
        return {
            createKeyDiskDetail(data){
                for(var i = 0; i < data.length; i++){
                    data[i]["key"] = "stroage_monitor_view_disk_detail_key_"+ i;
                    data[i]["forwardNum"] = data[i]["relay"].length;
                }
                return data;
            },
            expandedRowRender(record){
                var expandedData = record["relay"];
                
                var expandedRowArr = _this.defaultExpandedRowKeys,
                    isExist = false;

                for(var i=0;i<expandedRowArr.length;i++){
                    if(expandedRowArr[i] === record["key"]){
                        isExist = true;
                        break;
                    }
                }

                if(!isExist){
                    _this.defaultExpandedRowKeys.push(record["key"]);
                }
                
                for(var i=0;i<expandedData.length;i++){
                    expandedData[i]["key"] = "stroage_monitor_view_disk_forwoard_detail_key_"+ new Date().getTime() + generateMixed(6);
                }

                return <Table columns = { STROAGE_MONITOR_VIEW_DISK_FORWORAD_DETAIL } 
                            dataSource = { expandedData }
                            size = { "small" }
                            bordered 
                            pagination={false}/> 
            },
            rowClassName(record){
                var disc_arr = record["disc_list"],
                    is_error = false;

                for(var i = 0; i<disc_arr.length; i++){
                    var tempArr = disc_arr[i];
                    if(tempArr[1]){
                        is_error = true;
                    }
                }

                if(is_error){
                    return "disc_message_deatail_error"
                }else{
                    return ""
                }
            }
        }
    }

    events(){
        var _this = this;
        return {
            handleRowClick(record){
                var defaultExpandedRowArr = _this.defaultExpandedRowKeys,
                    currentKey = record["key"],
                    tempArr = [];

                for(var i=0;i<defaultExpandedRowArr.length;i++){
                    if(defaultExpandedRowArr[i] === currentKey){
                        continue;
                    }else{
                        tempArr.push(defaultExpandedRowArr[i]);
                    }
                }
                _this.defaultExpandedRowKeys = tempArr;
                
            }
        }
    }

    componentWillMount(){
        this.defaultExpandedRowKeys = [];
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
                        onRowClick = { this.handleRowClick }
                        defaultExpandedRowKeys = { this.defaultExpandedRowKeys }
                        rowClassName = { this.rowClassName }
                        defaultExpandAllRows = { true }
                        pagination = { false }/>
		     </div>
	}
}
