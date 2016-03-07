import React from 'react'
import Component from 'libs/react-libs/Component'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import { isEmptyObj, generateMixed } from 'libs/function'
import { fetchMemoryServiceMonitorData } from './action' 
import { Bar } from './components/Bar'
import { Detail } from './components/Detail'
require('../../../style/css/memory_service_monitor.css')
let imgUrl = require('../../../style/img/background.jpg')

class memoryMonitor extends Component{
	constructor(){
		super(); 
	}

	dataAdapter(){
		var obj = {
			separateData(param){
				var sevenArray = [],
				    thrityArray = [],
				    maxSeven = 0,
				    maxThrity = 0,
				    group = param["data"]["groups"];

				for(var i=0;i<group.length;i++){
					var tempObj = group[i];
					if(tempObj["cycle"] === 7){
						if(maxSeven<tempObj["total_user"]){
							maxSeven = tempObj["total_user"];
						}
						sevenArray.push(tempObj);
					}
					if(tempObj["cycle"] === 30){
						if(maxThrity<tempObj["total_user"]){
							maxThrity = tempObj["total_user"]
						}
						thrityArray.push(tempObj);
					}

				}
				return {
					sevenObj : {
						max : maxSeven,
						data : sevenArray
					},
					thrityObj : {
						max : maxThrity,
						data : thrityArray
					},
				}
			},
			formatData(data,svgWidth,sevenHeight){
				var max = data["max"],
				    tempArra = data["data"],
				    returnArr = [],
				    len = tempArra.length,
				    width = svgWidth/len;
                
				for(var i=0;i<len;i++){
					var rectH = (sevenHeight/max)*tempArra[i]["total_user"],
					    fill = '',
					    innerRectH = 50 - rectH;
                    
                    if(tempArra[i]["total_user"]>0){
                    	fill = "rgb(49, 181, 246)";
                    }else{
                    	fill = "#fff";
                    }

					var obj = {
						width : width-5,
						innerRectH : innerRectH,
						innerRectW : width-5,
						outRectH : rectH,
						rectX : i*width,
						rectY : innerRectH,
						innerRectX : i*width,
						innerRectY : 0,
						textX :  i*width,
						textY : innerRectH-1,
						label : tempArra[i]["group_id"],
						RectStyle : "#fff",
						innerRectStyle : fill,
						key : 'memory_servece_monitor_seven_total_key_'+ new Date().getTime()+Math.random()
					}

					returnArr.push(obj);
				}
				return returnArr;
			},
			formatHealth(data,healthWidth,healthHeight){

				var date = new Date(data["data"]["timestamp"]*1000).Format("yyyy-MM-dd hh:mm:ss"),
				    group = data["data"]["groups"],
				    len = group.length,
				    arr = [],
				    width = (healthWidth - 10*(len-1))/len;

				for(var i=0;i<len;i++){
					var temp = group[i],
					    style = '',
					    label = '',
					    tempObj = {};
                    
                    console.log(temp);
					if(temp["total_user"] >0){
						if(temp["unhealth_user"]>0){
							style = "red";
						}
						if(temp["subhealth_user"]>0){
							style = "yellow";
						}
						style = "rgb(49, 181, 246)";
					}else{
						style = "rgb(49, 181, 246)";
					}
                    
                    label = temp["group_id"];
					tempObj = {
						width : width,
						height : healthHeight,
						x : (width+10)*i,
						y : 0,
						label : label,
						labelX : (width+10)*i+width/label.length,
						RectStyle : style
					}
					arr.push(tempObj);
				}

				return {
					date : date,
					arr : arr
				}

			},
			formatDisk(data,diskWidth,diskHeight){
				var date = new Date(data["data"]["timestamp"]*1000).Format("yyyy-MM-dd hh:mm:ss"),
				    group = data["data"]["groups"],
				    groupLen = group.length,
				    returnArr = [],
				    max = 0,
				    rate = 0,
				    width = (diskWidth - 10*(groupLen-1))/groupLen;

				 for(var j=0;j<groupLen;j++){
				 	 if(group[j]["total_user"]>max){
				 	 	max = group[j]["total_user"]
				 	 }
				 }
				 rate = diskHeight/max;

				 for(var i=0;i<groupLen;i++){

				 	var diskArr = group[i]["disc"],
				 	    innerWidth = width/diskArr.length,
				 	    innerHeight = rate*group[i]["total_user"],
				 	    temp = {},
				 	    tempArr = [],
				 	    fill = '';

                    tempArr.push({
                    	width : width,
                    	height : diskHeight,
                    	x : (width+10)*i,
                    	y : 0,
                    	fill : 'rgba(255, 255, 255, 0.0980392)'
                    });

				 	for(var k=0;k<diskArr.length;k++){
				 		var itemArr = diskArr[k],
				 		    itemX = innerWidth*k,
				 		    itemY = diskHeight-innerHeight;
				 		if(itemArr.length){
				 			fill = "red";
				 		}else{
				 			fill = "rgb(47, 213, 238)";
				 		}
                        tempArr.push({
                        	width : innerWidth,
                        	height : innerHeight,
                        	x : (width+10)*i + innerWidth*k,
                        	y : diskHeight-innerHeight,
                        	fill : fill,
                        });
				 	}

				 	returnArr.push(tempArr);
				}

				return {
					date : date,
					arr : returnArr
				}
			}
		};
		return obj;
	}

	componentDidMount(){
		const { memoryServiceData, dispatch } = this.props;
		this.healthData = [];
		this.diskData = [];

		var contentWith = window.document.body.offsetWidth - 280;
		this.svgWidth = (contentWith * 0.5)*0.875;
		this.healthWidth = contentWith*0.9166666667;

		dispatch(fetchMemoryServiceMonitorData());
		setInterval(function(){
			dispatch(fetchMemoryServiceMonitorData());
		},30*1000)
	}

	shouldComponentUpdate(nextProps,nextState){
		var memoryMonitorData = nextProps.memoryServiceData;
		if(memoryMonitorData["data"] === undefined){
			return false;
		}
		return true;
	}

	render(){
		const { memoryServiceData } = this.props;
        
		if(isEmptyObj(memoryServiceData["data"])){
			return false;
		}

		let obj = this.separateData(memoryServiceData),
		    sevenHeight = 50,
		    healthArr = [],
		    diskArr = [],
		    seven = this.formatData(obj["sevenObj"],this.svgWidth,sevenHeight),
		    thrity = this.formatData(obj["thrityObj"],this.svgWidth,sevenHeight),
		    health = this.formatHealth(memoryServiceData,this.healthWidth,20),
		    disk = this.formatDisk(memoryServiceData,this.healthWidth,24);
        
        this.healthData.unshift(health);
        this.diskData.unshift(disk);

        if(this.healthData.length>10){
        	this.healthData.pop();
        }

        if(this.diskData.length>10){
        	this.diskData.pop();
        }

        for(var i=0;i<this.healthData.length;i++){
	        healthArr.push(<Detail key={'memory_service_monitor_health_key_'+new Date().getTime()+generateMixed(6)} 
	        	healthData = { this.healthData[i] } style = { "memory_service_monitor_health" } healthWidth = { this.healthWidth } healthHeight = { 20 } type = { 'memory_service_monitor_health' }/>);
        }

        for(var j=0;j<this.diskData.length;j++){
	        diskArr.push(<Detail key={'memory_service_monitor_disk_key_'+new Date().getTime()+generateMixed(6)}
	        	healthData = { this.diskData[j] } style = { "memory_service_monitor_disk" } healthWidth = { this.healthWidth } healthHeight = { 24 } type = { 'memory_service_monitor_disk' }/>);
        }

        console.log(this.healthData);
		return <div style = {{background:'url('+imgUrl+') no-repeat',margin:'-20px -40px;',height:"1200px"}}>
		    <div className = "memony_service_monitor_container">
				<Row>
			        <Col span="24" className = "memory_service_monitor_font">健康存储监控</Col>
			    </Row>
			    <Row>
			        <Col span="12">
			            <Col span="3" className = "memory_service_monitor_font">七日存储</Col>
			            <Col span="21"><Bar width = { this.svgWidth } sevenData = { seven } height = { sevenHeight }/></Col>
			        </Col>
				    <Col span="12">
				        <Col span="3" className = "memory_service_monitor_font">三十日存储</Col>
				        <Col span="21"><Bar width = { this.svgWidth } sevenData = { thrity } height = { sevenHeight }/></Col>
				    </Col>
			    </Row>
			    <div className = "memory_service_monitor_margin">
			         { healthArr }
			    </div>
			    <div className = "memory_service_monitor_margin">
			         { diskArr }
			    </div>
			</div>
        </div>
	}
}

function mapStateToProps(state){
	console.log("=================init state:");
	return {
	    memoryServiceData : state.memory_service_monitor
	};
}
module.exports = connect(mapStateToProps)(memoryMonitor)