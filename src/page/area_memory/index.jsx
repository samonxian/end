import React from 'react'
import Component from 'libs/react-libs/Component'
import { Table, Icon } from 'antd'
import { FORWORD_TABLE, AREA_TABLE } from './component/until'
import { Dialog } from './component/dialog'
import { fetchAreaMemoryData } from './action'
import { connect } from 'react-redux'
import { isEmptyObj } from 'libs/function'
import { fetchAreaMemoryDetailData } from './action'
require('../../../style/css/area_memory.css');

class areaMemory extends Component{
	constructor(){
		super(); 
	}
    
	dataAdapter(){
		let obj = {
			TraversalData(data){
				var arr = [],
				    max_seven = 0,
				    max_thirty = 0;

				for(let i=0,len=data.length;i<len;i++){

					if(max_seven<data[i]["info"]["user_num7"]){
						max_seven = data[i]["info"]["user_num7"]
					}

					if(max_thirty<data[i]["info"]["user_num30"]){
						max_thirty = data[i]["info"]["user_num30"]
					}

					let tempObj = {
						area : data[i]["area"],
						disc_num : data[i]["info"]["disc_num"],
						offline_disc_num : data[i]["info"]["offline_disc_num"],
						online_disc_num : data[i]["info"]["online_disc_num"],
						disc_server_num : data[i]["info"]["disc_server_num"],
						empty_disc_num : data[i]["info"]["empty_disc_num"],
						work_disc_num : data[i]["info"]["work_disc_num"],
						relay_server_num : data[i]["info"]["relay_server_num"],
						subhealth_user_num7 : data[i]["info"]["subhealth_user_num7"],
						subhealth_user_num30 : data[i]["info"]["subhealth_user_num30"],
						unhealth_user_num7 : data[i]["info"]["unhealth_user_num7"],
						user_num7 : data[i]["info"]["user_num7"],
						user_num30 : data[i]["info"]["user_num30"],
						key : "area_key_"+new Date().getTime()+Math.random()
					}
					arr.push(tempObj);
				}

				for(var i = 0,len = arr.length;i<len;i++){
					arr[i]["max_thirty"] = max_thirty;
					arr[i]["max_seven"] = max_seven;
				}
				return arr;
			},
			TraversalForwordData(data){
				var array = [],
				    max_send = 0,
				    max_accept = 0,
				    max_wait = 0;
				for(let i=0,len = data.length;i<len;i++){
					var temp = data[i]["info"]["relay_info"];
					for(var j=0,lenth = temp.length;j<lenth;j++){
						var tempObj = temp[j];
						if( j == 0){
							tempObj["rowSpan"] = lenth
						}
						if(max_send<tempObj["out_connections"]){
							max_send = tempObj["out_connections"];
						}
						if(max_accept<tempObj["in_connections"]){
							max_accept = tempObj["in_connections"];
						}
						if(max_wait<tempObj["wait_connections"]){
							max_wait = tempObj["wait_connections"];
						}

						if(Math.floor(tempObj["downspeed"]/1024)<1024){
							var num = new Number(tempObj["downspeed"]/1024)
							tempObj["formate_downspeed"] = num.toFixed(2)+"Kbps"
						}else{
							var num = new Number(tempObj["downspeed"]/1024/1024)
							tempObj["formate_downspeed"] = num.toFixed(2)+"Mbps"
						}

						if(Math.floor(tempObj["upspeed"]/1024)<1024){
							var num = new Number(tempObj["upspeed"]/1024)
							tempObj["formate_upspeed"] = num.toFixed(2)+"Kbps"
						}else{
							var num = new Number(tempObj["upspeed"]/1024/1024)
							tempObj["formate_upspeed"] = num.toFixed(2)+"Mbps"
						}
						tempObj["area"] = data[i]["area"];
						tempObj["key"] = "area_forword_key_"+new Date().getTime()+Math.random();
						array.push(tempObj);
					}
				}
				for(var i=0;i<array.length;i++){
					array[i]["max_send"] = max_send
					array[i]["max_accept"] = max_accept
					array[i]["max_wait"] = max_wait
				}
				return array;
			},

			TraversalDiskDetailData(data){
				var array = [],
				    minSize = 0;
             
				for(let i=0,len = data.length;i<len;i++){
					var temp = data[i]["info"]["groups_detail"];
					for(var j=0,lenth = temp.length;j<lenth;j++){
						var tempObj = temp[j];
						if(j == 0){
							tempObj["rowSpan"] = lenth
						}
						for(var k=0;k<tempObj["disc_storage"].length;k++){
							
							if(minSize === 0){
								minSize = tempObj["disc_storage"][k]["total"]
							}

							if(minSize > tempObj["disc_storage"][k]["total"]){
								minSize = tempObj["disc_storage"][k]["total"]
							}

							tempObj["disc_storage"][k]["key"] = "disk_detail_storage_key_"+new Date().getTime()+Math.random();
						}
						tempObj["area"] = data[i]["area"];
						tempObj["key"] = "disk_detail_key_"+new Date().getTime()+Math.random();
						array.push(tempObj);
					}
				}

				for(var i=0;i<array.length;i++){
					array[i]["minSize"] = new Number(minSize/1020/1024/1024).toFixed(2)+"GB"
				}

				return array;
			}
		}
		return obj;
	}

	events(){
		return {
			showDetailTable(dispatch,detailData){
				dispatch(fetchAreaMemoryDetailData(detailData));
			},
			refreshData(dispatch){
				dispatch(fetchAreaMemoryData());
			}
		}
	}

    componentWillMount(){
    	const { areaTotalData, dispatch } = this.props
    	dispatch(fetchAreaMemoryData());
	}

	render(){
		let data = this.props.areaTotalData.data
		let self = this
		let showDetailData = []
		let dispatch = this.props.dispatch

		console.log(this.props);

		if(!isEmptyObj(this.props.detailData)){
			showDetailData = this.props.detailData["data"];
		}

        const renderContent = function (value, row, index) {
			let obj = {
			    children: value,
			    props: {}
			};
			return obj;
		}

		const renderRowSpan = function(text,record){
		    let obj = {
			    children: record["area"],
			    props: {}
			}
		    if (record["rowSpan"]) {
		    	 obj.props.rowSpan = record["rowSpan"];
		    }else{
		    	obj.props.rowSpan = 0;
		    }
		    return obj;
		}

		const showDetailContent = function(text,record){
			return <a href="#" onClick={()=>self.showDetailTable(dispatch,record["disc_storage"])}>查看</a>
		}

        const DISK_DETAIL_TABLE = [
		    {
			    title: '区域',
			    dataIndex: 'area',
			    render: renderRowSpan
			},{
				title: '组编号',
			    dataIndex: 'gid',
			    render: renderContent
			},{
				title: '循环类型',
			    dataIndex: 'cycle',
			    render: renderContent
			},{
				title: '总用户数',
			    dataIndex: 'user_num',
			    render: renderContent
			},{
				title: '亚健康用户数',
			    dataIndex: 'subhealth_user_num',
			    render: renderContent
			},{
				title: '不健康用户数',
			    dataIndex: 'unhealth_user_num',
			    render: renderContent
			},{
				title: '磁盘最小容量',
			    dataIndex: 'minSize',
			    render: renderContent
			},{
				title: '详情',
			    key: 'operation',
			    render: showDetailContent
			}
		]

		if(isEmptyObj(data)){
			return <div></div>
		}else{
         
			let area_data = this.TraversalData(data["data"],dispatch),
				forword_data = this.TraversalForwordData(data["data"]),
	            disk_detail_data = this.TraversalDiskDetailData(data["data"]);
             
	        return <div className="area_memory">
	            <div className="area_memory_refresh" onClick={()=>this.refreshData(dispatch)}><Icon type="reload"/>刷新</div>
	            <div className="area_memory_clearFloat">
	                <div className="area_memory_float_right">
	                   <span className="area_memory_disk_nodata"></span>没有数据
	                </div>
	                <div className="area_memory_float_right">
	                   <span className="area_memory_disk_health"></span>7天/30天亚健康磁盘数
	                </div>
	                <div className="area_memory_float_right">
	                   <span className="area_memory_disk_unhealth"></span>7天/30天不健康磁盘数
	                </div>
	                <div className="area_memory_float_right">
	                   <span className="area_memory_disk_total"></span>7天/30天磁盘数
	                </div>
	            </div>
	            <Table columns={ AREA_TABLE } dataSource={ area_data } bordered pagination={false} className="area_memory_frist_table"/>
			    <div className="area_memory_title">转发信息</div>
	            <Table columns={ FORWORD_TABLE } dataSource={ forword_data } bordered pagination={false} />
	            <div className="area_memory_title">磁盘信息</div>
	            <Table columns={ DISK_DETAIL_TABLE } dataSource={ disk_detail_data } bordered pagination={false} />
	            <Dialog showDetailData = { showDetailData } dispatch = { dispatch }/>
			</div>
		}
		
	}
}

function mapStateToProps(state){
	console.log("=================init state:");
	return {
	    areaTotalData : state.area_memory,
	    detailData : state.area_memory_detail
	};
}
module.exports = connect(mapStateToProps)(areaMemory)