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
			// separateData(param){
			// 	var sevenArray = [],
			// 	    thrityArray = [],
			// 	    maxSeven = 0,
			// 	    maxThrity = 0,
			// 	    group = param["data"]["groups"];

			// 	for(var i=0;i<group.length;i++){
			// 		var tempObj = group[i];
			// 		if(tempObj["cycle"] === 7){
			// 			if(maxSeven<tempObj["total_user"]){
			// 				maxSeven = tempObj["total_user"];
			// 			}
			// 			sevenArray.push(tempObj);
			// 		}
			// 		if(tempObj["cycle"] === 30){
			// 			if(maxThrity<tempObj["total_user"]){
			// 				maxThrity = tempObj["total_user"]
			// 			}
			// 			thrityArray.push(tempObj);
			// 		}

			// 	}
			// 	return {
			// 		sevenObj : {
			// 			max : maxSeven,
			// 			data : sevenArray
			// 		},
			// 		thrityObj : {
			// 			max : maxThrity,
			// 			data : thrityArray
			// 		},
			// 	}
			// },
			getMaxUserTotal(data){
				var  max = 0,
				     group = data["data"]["groups"];
				for(var i=0;i<group.length;i++){
					var tempObj = group[i];
					if(max<tempObj["total_user"]){
						max = tempObj["total_user"];
					}
				}
				return max;
			},
			getAreatotal(data){
				var area = data["data"]["area_user_count"],
				    total = 0,
				    htlArr = [];
				for(var name in area){
					total = total + area[name];
					htlArr.push(<span className ="memory_service_monitor_city" 
						key={"memory_service_monitor_city_key_"+new Date().getTime()+generateMixed(6)}>{ name + ":"+ area[name] }</span>);
				}
				return {
					total : total,
					city : htlArr
				};
			},
			formatData(data,max,svgWidth,sevenHeight){
				var tempArra = data["data"]["groups"],
				    returnArr = [],
				    len = tempArra.length,
				    area = data["data"]["area_user_count"],
				    width = (svgWidth-10*(len-1))/len;

				for(var city in area){
					var cityObj = [],
					    num = 0;

					for(var i=0;i<len;i++){
						if(city == tempArra[i]["area"]){
							var rectH = (sevenHeight/max)*tempArra[i]["total_user"],
							    fill = '',
							    bgfill = 'rgba(255, 255, 255, 0.0980392)',
							    textY =  0,
							    label = tempArra[i]["group"],
							    innerRectH = 50 - rectH,
							    textY = innerRectH;

		                    if(innerRectH<17){
		                    	textY = 17;
		                    }

		                    if(tempArra[i]["total_user"]>0){
		                    	fill = "rgb(49, 181, 246)";
		                    }else{
		                    	fill = "#fff";
		                    	rectH = 0;
		                    	textY = 50-7;
		                    	innerRectH = 0;
		                    }

		                    if(tempArra[i]["cycle"] === 30){
		                    	bgfill = "rgba(255, 255, 255, 0.1980392)";
		                    	fill = "#81D1EF";
		                    }

		                    if(rectH === sevenHeight){
		                    	label = "";
		                    }

		                    var obj = {
								width : width,
								innerRectH : rectH,
								innerRectW : width,
								outRectH : sevenHeight,
								rectX : num*(width+10),
								rectY : innerRectH,
								innerRectX : num*(width+10),
								innerRectY : 0,
								textX :  num*(width+10)+width/2,
								textY : textY-5,
								label : label,
								style : bgfill,
								rectStyle : fill,
								key : 'memory_servece_monitor_seven_total_key_'+ new Date().getTime()+Math.random()
							}

							num ++ ;
							cityObj.push(obj);
						}
					}
					returnArr.push({
						area : city,
						width : (width+10)*num-10,
						obj : cityObj
					})
				}
				return returnArr;
			},
			formatHealth(data,healthWidth,healthHeight){

				var date = new Date(data["data"]["timestamp"]*1000).Format("yyyy-MM-dd hh:mm:ss"),
				    group = data["data"]["groups"],
				    area = data["data"]["area_user_count"],
				    len = group.length,
				    returnArr = [],
				    width = (healthWidth - 10*(len-1))/len;

				for(var city in area){
					var num = 0,
					    arr = [];

					for(var i=0;i<len;i++){
					    if(city == group[i]["area"]){
							var temp = group[i],
							    style = '',
							    label = '',
							    tempObj = {};
		        
							if(temp["total_user"] >0){
								style = "rgb(49, 181, 246)";
								if(temp["unhealth_user"]>0){
									style = "#BD0808";
								}
								if(temp["subhealth_user"]>0){
									style = "#068216";
								}
							}else{
								style = "rgba(255, 255, 255, 0.0980392)";
							}
		                    
		                    label = temp["group"];
							tempObj = {
								width : width,
								height : healthHeight,
								x : (width+10)*num,
								y : 0,
								label : label,
								labelX : (width+10)*num+width/2,
								RectStyle : style
							}
							num ++;
							arr.push(tempObj);
						}
					}

					returnArr.push({
						area : city,
						obj : arr,
						width : (width+10)*num-10
					})
				}
                
                console.log("========================================= health data :");
                console.log({
					date : date,
					returnArr : returnArr
				});
				return {
					date : date,
					returnArr : returnArr
				};

			},
			formatDisk(data,diskWidth,diskHeight){
				var date = new Date(data["data"]["timestamp"]*1000).Format("yyyy-MM-dd hh:mm:ss"),
				    group = data["data"]["groups"],
				    area = data["data"]["area_user_count"],
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

				 for(var city in area){
				 	 var num = 0,
				 	     obj = [];

				 	 for(var i=0;i<groupLen;i++){
				 	 	 var  tempArr = [];
				 	 	 if(city == group[i]["area"]){
				 	 	 	 var diskArr = group[i]["disc"],
						 	     innerWidth = width/diskArr.length,
						 	     innerHeight = rate*group[i]["total_user"],
						 	     temp = {},
						 	     fill = '';

						 	 tempArr.push({
		                    	width : width,
		                    	height : diskHeight,
		                    	x : (width+10)*num,
		                    	y : 0,
		                    	fill : 'rgba(255, 255, 255, 0.0980392)'
		                    });
                            
						 	for(var k=0;k<diskArr.length;k++){
						 		var itemArr = diskArr[k],
						 		    itemX = innerWidth*k,
						 		    itemY = diskHeight-innerHeight;
						 		if(itemArr.length){
						 			fill = "#BD0808";
						 		}else{
						 			fill = "rgb(47, 213, 238)";
						 		}
		                        tempArr.push({
		                        	width : innerWidth,
		                        	height : innerHeight,
		                        	x : (width+10)*num + innerWidth*k,
		                        	y : diskHeight-innerHeight,
		                        	fill : fill,
		                        });
						 	}
						 	num ++ ;
						 	obj.push(tempArr);
				 	    }
				 	    
				 	 }

				 	 returnArr.push({
				 	 	area : city,
				 	 	obj : obj,
				 	 	width : (width+10)*num-10
				 	 })
				 	 
				 }
				 return {
				 	date : date,
				 	returnArr : returnArr
				 }
			},
			formatCity(data,width){
				var area = data["data"]["area_user_count"],
				    obj = [],
				    returnArr = [],
				    group = data["data"]["groups"],
				    len = group.length,
				    everyWidth = (width-10*(len-1))/len;
                
				for(var name in area){
					var total  = 0;
					for(var i=0;i<len;i++){
						if(name === group[i]["area"]){
							total ++;
						}
					}
					obj.push({
						area : name,
						total : total
					});
				}

                for(var j=0;j<obj.length;j++){
                	var wid = obj[j]["total"] * (everyWidth+10) -10;
                	returnArr.push(<div key={'memory_service_monitor_city_item_key_'+new Date().getTime()+generateMixed(6)} style = {{width:(wid/width)*100+"%"}} className="memory_service_monitor_city_item">{ obj[j]["area"] }</div>)
                }
                return returnArr;
			}
		};
		return obj;
	}

	componentDidMount(){
		const { memoryServiceData, dispatch } = this.props;

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

		if(this.healthData === undefined){
			this.healthData = [];
		}
		if(this.diskData === undefined){
			this.diskData = [];
		}

		if(this.healthWidth === undefined){
			var contentWith = window.document.body.offsetWidth - 280;
			this.healthWidth = contentWith*0.9166666667;
		}

		let max = this.getMaxUserTotal(memoryServiceData),
		    sevenHeight = 50,
		    healthArr = [],
		    diskArr = [],
		    cityTitle = this.formatCity(memoryServiceData,this.healthWidth),
		    totalObj = this.getAreatotal(memoryServiceData),
		    diskTotal = this.formatData(memoryServiceData,max,this.healthWidth,sevenHeight),
		    //thrity = this.formatData(obj["thrityObj"],this.svgWidth,sevenHeight),
		    health = this.formatHealth(memoryServiceData,this.healthWidth,20),
		    disk = this.formatDisk(memoryServiceData,this.healthWidth,24);

        this.healthData.unshift(health);
        this.diskData.unshift(disk);

        for(var i=0;i<this.healthData.length;i++){
	        healthArr.push(<Detail key={'memory_service_monitor_health_key_'+new Date().getTime()+generateMixed(6)} 
	        	healthData = { this.healthData[i] } style = { "memory_service_monitor_health" } healthWidth = { this.healthWidth } healthHeight = { 20 } type = { 'memory_service_monitor_health' }/>);
        }

        for(var j=0;j<this.diskData.length;j++){
	        diskArr.push(<Detail key={'memory_service_monitor_disk_key_'+new Date().getTime()+generateMixed(6)}
	        	healthData = { this.diskData[j] } style = { "memory_service_monitor_disk" } healthWidth = { this.healthWidth } healthHeight = { 24 } type = { 'memory_service_monitor_disk' }/>);
        }

        if(this.healthData.length>10){
        	this.healthData.pop();
        }

        if(this.diskData.length>10){
        	this.diskData.pop();
        }

		return <div style = {{background:'url('+imgUrl+') repeat',margin:'-20px -40px',height : window.document.body.offsetHeight-50+"px"}}>
		    <div className = "memony_service_monitor_container">
				<Row>
			        <Col span="24" className = "memory_service_monitor_fontSize">存储健康状态监控</Col>
			        <Col span="24" className = "memory_service_monitor_total">总：{ totalObj["total"] }{ totalObj["city"] }</Col>
			    </Row>
			    <Row>
			        <Col span="2">12</Col>
			        <Col span="22">{ cityTitle }</Col>
			    </Row>
			    <Row>
			        <Col span="2" className = "memory_service_monitor_seven">磁盘存储</Col>
			        <Col span="22"><Bar width = { this.healthWidth } sevenData = { diskTotal } height = { sevenHeight }/></Col>
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