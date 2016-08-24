import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
import d3 from 'd3'
//import d3c from 'react-d3-components'
import Bar from "./components/Bar"
import Pie from 'libs/d3-components/Pie'
import { isEmptyObj, getTimeUnitbyValue, getTimeDataByValueAndUnit } from 'libs/function'
import { EquipmentTotal } from '../stroage_monitor_view/components/EquipmentTotal'
import { StorageHealth } from '../stroage_monitor_view/components/StorageHealth'
import { AreaDiskMessage } from '../stroage_monitor_view/components/AreaDiskMessage'
import { stroageMonitorViewFetch, stroageMonitorViewCharFetch } from '../stroage_monitor_view/action'
import { RequestChar } from './components/Request_char'
import { STROKE_COLOR } from './components/data'
require("css/public_monitor.css")
require('css/stroage_monitor_view.css');
let imgUrl = require('../../../style/img/background.jpg');

class View extends Component {
	constructor(props){
		super(props); 
	}

	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(actionCreator.fetchGetData())
		dispatch(stroageMonitorViewFetch());
		dispatch(stroageMonitorViewCharFetch());
		dispatch(actionCreator.fetchCollectMonitorWeb());
		this.clearInterval = setInterval(()=>{
			dispatch(actionCreator.fetchGetData());
			dispatch(stroageMonitorViewFetch());
			dispatch(stroageMonitorViewCharFetch());
			dispatch(actionCreator.fetchCollectMonitorWeb());
		},30000)
	}

	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.targetProps && nextProps.targetProps.main.isFetching){
			return false;
		}
		return true;	
	}

	componentWillUnmount(){
		clearInterval(this.clearInterval)
	}
	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var obj = {
			list: require('./dataSet/summary'),
			//获取格式为[[1003774,0.5],[1003776,1]]的子数组中index为1的所有值组成新数组
			getValueArray(data){
				var arr = [];
				data.forEach(v=>{
					arr.push(v[1])
				})
				return arr;
			},
			getFillColor(){
				return [ '#2fd5ee','#faa700','#db543f'];
			},
			fill_fn(v){
				var fill = "#2fd5ee";
				if(v < 0.5){
					fill = "#2fd5ee";
				}else if(v >= 0.5 && v < 0.8){
					fill = "#faa700";
				}else if(v >= 0.8){
					fill = "#db543f";
				}
				return fill;	
			},
			//获取发送比饼图数据
			getSendRatePieData(data){
				var one = 0,two = 0,three = 0;
				data.forEach(value=>{
					var v = value[1];
					if(v < 0.5){
						one++;
					}else if(v >= 0.5 && v < 0.8){
						two++;
					}else if(v >= 0.8){
						three++;
					}else{
						console.debug("源数据发送比大于1,说明数据有问题")
					}
				})
				let dataset = { data : [one,two,three], fill : this.getFillColor() };
				//console.debug(dataset)
				return dataset;
			},
			adapterRequestWeb(data,props){
				return data.map(function(stack,index){
					var valueArr = stack[props].map(function(temp,index){
						return {
							x : new Date(temp[0]*1000),
							y : temp[1]
						}
					});
					return {
						label : stack["type"],
						values : valueArr
					}
				});
			},
			createRequestLengthHtl(data){
				var arr = [];
				for(var i = 0; i < data.length; i++){
					arr.push(<div className = "collect_message_request_length_items"
						     key = { "collect_message_request_length_key_"+i }>
						<span className = "length" style = {{ backgroundColor : STROKE_COLOR[i] }}></span>
						<span>{ data[i]["type"] }</span>
						</div>)
				}
				return arr;
			},
			adapterTranformTime(unit){
				return (value) => {
					return getTimeDataByValueAndUnit(value,unit)
				}
			}
		}
		return obj; 
	}
	/**
	 *	事件处理
	 */
	events(){
		var _this = this;
		return{
		}
	}
    render() {
		super.render();
		var _this = this;
		let { targetProps, stroageMonitorViewProps, stroageCharProps, requestWebProps } = this.props;
		let targetData,
		    listData,
		    send_rate_detail,
		    viwers_detail,
		    lengthHtl = '',
		    aveUnit = '',
		    peekUnit = '',
		    publish_bandwidth_detail,
		    requestNumArr = [],
		    requestSuccessArr = [],
		    requestTimeAveArr = [],
		    requestPeekArr = [];

		var clientHeight = document.body.clientHeight;

        if(isEmptyObj(stroageMonitorViewProps) || isEmptyObj(stroageCharProps) || isEmptyObj(targetProps)){
        	return <Antd.Spin className="mt15" size="large"/>
        }

		if(targetProps.main && targetProps.main.result){
			targetData = targetProps.main;
			send_rate_detail = targetData.result.total.send_rate_detail;
			viwers_detail = targetData.result.total.viwers_detail;
			publish_bandwidth_detail = targetData.result.total.publish_bandwidth_detail;
			this.list.getCurrentComponent(this)
			listData = this.list.dataAdapter([targetData.result.total])//针对不同数据要改动
			var bar_transform = "translate(0,0)"
			var bar_height = 30;
			//var app_data = this.list.dataAdapter(targetData.result.apps)//针对不同数据要改动
			this.viewBox = "0,0,2000,30"; 
			var pie = d3.layout.pie();  
		}

		console.log("=================== requestWebProps",requestWebProps);
        
        if(!isEmptyObj(requestWebProps) && !isEmptyObj(requestWebProps["param"])){
        	var requestArr = requestWebProps["param"]["web_request_stat"];
        	lengthHtl = this.createRequestLengthHtl(requestArr);
        	requestNumArr = this.adapterRequestWeb(requestArr,"request_count");
        	requestSuccessArr = this.adapterRequestWeb(requestArr,"success_count");
        	requestTimeAveArr = this.adapterRequestWeb(requestArr,"request_time_ave");
        	requestPeekArr = this.adapterRequestWeb(requestArr,"request_time_95peek");
        	var aveMax = d3.max(d3.merge(requestTimeAveArr.map(function(stack,index){
        		return stack["values"].map(function(obj,index){
        			return obj["y"]
        		})
        	})));
        	var peekMax = d3.max(d3.merge(requestPeekArr.map(function(stack,index){
        		return stack["values"].map(function(obj,index){
        			return obj["y"]
        		})
        	})));
        	aveUnit = getTimeUnitbyValue(aveMax);
        	peekUnit = getTimeUnitbyValue(peekMax);
        }
	
		return (
			<div style = {{background:'url('+imgUrl+') repeat',margin:'-20px -40px',minHeight: clientHeight+"px"}} 
    	            className = "stroage_monitor_view_page">
				<div className="stroage_monitor_view_page_contianer public_monitor">
				    <Antd.Row className = "stroage_monitor_view_health clear">
	                      <Antd.Col span="14" className = "stroage_monitor_char_items_left">
	                           <EquipmentTotal { ...this.props }/>
	                      </Antd.Col>
	                      <Antd.Col span="5" className = "stroage_monitor_char_items_left">
	                           <StorageHealth { ...this.props } />
	                      </Antd.Col>
	                      <Antd.Col span="5" className = "stroage_monitor_char_items_left">
	                           <AreaDiskMessage { ...this.props } />
	                      </Antd.Col>
	                 </Antd.Row>
					{
						targetData &&
						<div className = "collect_message_content">
							<h2>汇总信息</h2>	
							<Antd.Table className="mt10 summary" columns={this.list.columns} dataSource={listData} 
									size="middle" bordered pagination={ false }/>	
							{
								send_rate_detail &&
								<span className="relative">
									<div className="mt10 clearfix">
										<h4 className="fl "> 发送比</h4>
										<div className="fl ml10 bg05 send_rate_for">小于0.5</div>
										<div className="fl ml10 bg08 send_rate_for">大于等于0.5小于0.8</div>
										<div className="fl ml10 bg10 send_rate_for">大于等于0.8</div>
									</div>
									<svg className="p-m-bar mt10" viewBox={this.viewBox} preserveAspectRatio="none">
										<Bar height={bar_height} width={2} data={send_rate_detail} 
											max_value={1} gap={1} field={1} transform={bar_transform} fill={this.fill_fn}/>
									</svg>
									<svg className="p-m-pie">
										<Pie data={ this.getSendRatePieData(send_rate_detail) } stroke="#06600i" fill="#ccc" pie={ pie }
															outerRadius={ 29 } />
									</svg>
								</span>
							}
							{
								viwers_detail &&
								<span>
									<h4 className="mt10">观看人数（最大值：{ Math.max.apply(null,this.getValueArray(viwers_detail)) }）</h4>
									<svg className="p-m-bar mt10" viewBox={this.viewBox} preserveAspectRatio="none">
										<Bar height={bar_height} width={2} data={viwers_detail}
											max_value={Math.max.apply(null,this.getValueArray(viwers_detail))} 
											gap={1} field={1} transform={bar_transform}/>
									</svg>
								</span>
							}
							{
								publish_bandwidth_detail && 
								<span>
									<h4 className="mt10">
										推送带宽（最大值：
											{
												r2fn.transformToKbMbGb(Math.max.apply(null,this.getValueArray(publish_bandwidth_detail)))
											}
										）
									</h4>
									<svg className="p-m-bar mt10" viewBox={this.viewBox} preserveAspectRatio="none">
										<Bar height={bar_height} width={2} data={publish_bandwidth_detail} 
											max_value={Math.max.apply(null,this.getValueArray(publish_bandwidth_detail))} 
											gap={1} field={1} transform={bar_transform}/>
									</svg>
								</span>
							}
						</div>
					}
					<Antd.Row type="flex" justify="end" className = "request-length-container">
					    { lengthHtl }
					</Antd.Row>
					{ 
				    	requestSuccessArr.length?(<div><Antd.Row gutter = { 32 } className = "request-container">

						    <Antd.Col className="gutter-row" span = "12">
						        <div className="gutter-box">
						             <h1>请求次数</h1>
						             <RequestChar 
						                  unit = { '次' }
						                  charData = { requestNumArr } 
						                  title = { "请求次数" }/>
						        </div>
						    </Antd.Col>
						    <Antd.Col className="gutter-row" span = "12">
						        <div className="gutter-box">
						             <h1>请求成功次数 </h1>
						             <RequestChar 
						                  unit = { '次' }
						                  charData = { requestSuccessArr } 
						                  title = { "请求成功次数" }/>
						        </div>
						    </Antd.Col>
						</Antd.Row>
						<Antd.Row gutter = { 32 } className = "request-container">
						    <Antd.Col className="gutter-row" span = "12">
						        <div className="gutter-box">
						             <h1>请求时间平均值</h1>
						             <RequestChar 
						                 unit = { aveUnit }
						                 tickFormat = { this.adapterTranformTime(aveUnit) }
						                 charData = { requestTimeAveArr } 
						                 title = { "请求时间平均值" }/>
						        </div>
						    </Antd.Col>
						    <Antd.Col className="gutter-row" span = "12">
						        <div className="gutter-box">
						             <h1>请求时间95峰值</h1>
						             <RequestChar 
						                 unit = { peekUnit }
						                 tickFormat = { this.adapterTranformTime(peekUnit) }
						                 charData = { requestPeekArr } 
						                 title = { "请求时间95峰值" }/>
						        </div>
						    </Antd.Col>
						</Antd.Row></div>) : ""
				    }
					
				</div>
			</div>
		)	
    }
}

var ReduxView = connect((state) => {
	return {
	    targetProps : state.collect_message_monitor,
	    stroageMonitorViewProps : state.stroageMonitorView,
	    requestWebProps : state.collect_message_web,
	    stroageCharProps : state.stroageMonitorChar
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: "R2框架-页面标题设置处",
	breadcrumb:[
		{
			label:'public_monitor',
		},
	],
});
module.exports = ReduxView; 
