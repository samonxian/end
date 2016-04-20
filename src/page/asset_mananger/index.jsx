import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon, Spin } from 'antd'
import { connect } from 'react-redux'
import { isEmptyObj, generateMixed, transformToKbMbGb } from 'libs/function'
import { Dialog } from './components/Dailog'
import { Header } from './components/Header'
import { fetchGetData, showDetailMessage, clearDailogData } from './action'
import { ASSET_MANANGER_TABLE, 
	     ASSET_MANANGER_TABLE_DISK_MESSAGE, 
	     ASSET_MANANGER_TABLE_NETWORK_MESSAGE } from './components/until'
require('css/asset_mananger.css')

class assetMananger extends Component{
	constructor(){
		super(); 
	}
    
	dataAdapter(){
		var _this = this;
		let obj = {
			adapterDataList(data){
				var tempArr = [];
				for(var i = 0;i<data.length;i++){
					var temp = data[i];
					temp.key = new Date().getTime()+generateMixed(6);
					temp.cpuWait = temp["cpu"]["cpu_iowait"] === undefined ? "" : temp["cpu"]["cpu_iowait"];
					temp.cpuIdle = temp["cpu"]["cpu_idle"] === undefined ? "" : temp["cpu"]["cpu_idle"];
					tempArr.push(temp);
					temp.showRole = _this.showRoleMessage;
				}
				return tempArr;
			}
		}
		return obj;
	}

	events(){
		var _this = this;
		return {
			expandedRowRender(record){
				var diskArr = [],
				    netArr = [];
				for(var i=0;i<record["disk"].length;i++){
					var diskTemp = record["disk"][i];
					for(var name in diskTemp){
						diskArr.push({
							diskName : name,
							key : new Date().getTime()+generateMixed(6),
							size : diskTemp[name]["size"],
							used : diskTemp[name]["used"],
							avail : diskTemp[name]["avail"],
							pused : diskTemp[name]["pused"],
							mounted : diskTemp[name]["mounted"]
						});
					}
				}

				for(var j=0;j<record["interface"].length;j++){
					var interfaceObj = record["interface"][j];
					for(var interfaceName in interfaceObj){
						netArr.push({
							netName : interfaceName,
							key : new Date().getTime()+generateMixed(6),
							netIp : interfaceObj[interfaceName]["ip"],
							download : interfaceObj[interfaceName]["donwload"],
							upload : interfaceObj[interfaceName]["upload"]
						})
					}
				}

				return <div>
				     <h3 className = "asset_mananger_h3">内存信息</h3>
				     <p className = "asset_mananger_marginTop">内存总量：<span className="asset_mananger_span">{ transformToKbMbGb(record["mem"]["MemTotal"]) }</span>
				        内存剩余量: <span className="asset_mananger_span">{ transformToKbMbGb(record["mem"]["MemFree"]) }</span>
				        内存buffer: <span className="asset_mananger_span">{ transformToKbMbGb(record["mem"]["Buffers"]) }</span>
				        内存cached: <span className="asset_mananger_span">{ transformToKbMbGb(record["mem"]["Cached"]) }</span>
				        swap分区总量: <span className="asset_mananger_span">{ transformToKbMbGb(record["mem"]["SwapTotal"]) }</span>
				        swap分区剩余量: <span className="asset_mananger_span">{ transformToKbMbGb(record["mem"]["SwapFree"]) }</span>
				     </p>
                     <h3 className = "asset_mananger_h3">磁盘信息</h3>
                     <Table columns={ ASSET_MANANGER_TABLE_DISK_MESSAGE } className = "asset_mananger_marginTop asset_mananger_more_message_table"
	                   dataSource={ diskArr } 
	                   pagination={false}/>
	                 <h3 className = "asset_mananger_h3">网卡信息</h3>
	                 <Table columns={ ASSET_MANANGER_TABLE_NETWORK_MESSAGE } className = "asset_mananger_marginTop asset_mananger_more_message_table"
	                   dataSource={ netArr } 
	                   pagination={false}/>
				    </div>
			},
			showRoleMessage(data){
				const { dispatch } = _this.props
				dispatch(showDetailMessage(data));
			//	dispatch(clearDailogData());
			}
		}
	}

    componentDidMount(){
    	const { dispatch } = this.props;
    	dispatch(fetchGetData());
  //   	setInterval(function(){
  //   		dispatch(clearDailogData());
		// 	dispatch(fetchGetData());
		// },30*1000)
    }

	render(){
       
        const { assetData } = this.props;
		if(isEmptyObj(assetData)){
			return <div><Spin /></div>
		}else{
	        var dataList = this.adapterDataList(assetData["data"]);
	        return <div className="asset_mananger_container">
	            <Header { ...this.props }/>
	            <Table columns={ ASSET_MANANGER_TABLE } 
	                   dataSource={ dataList } 
	                   bordered 
	                   expandedRowRender = { (record)=>this.expandedRowRender(record)}
	                   pagination={{ pageSize: 20 }}/>
	            <Dialog { ...this.props }/>
			</div>
		}
	}
}

function mapStateToProps(state){
	return {
	    assetData : state.asset_mananger,
	    detailData : state.asset_mananger_detial
	};
}
module.exports = connect(mapStateToProps)(assetMananger)