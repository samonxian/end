import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'
import d3 from 'd3'
import Bar from "./components/Bar"
import Pie from 'libs/d3-components/Pie'
require("css/public_monitor.css")

class View extends Component {
	constructor(props){
		super(props); 
	}

	componentDidMount(){
		this.props.dispatch(actionCreator.fetchGetData())
		this.clearInterval = setInterval(()=>{
			this.props.dispatch(actionCreator.fetchGetData())
		},3000)
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
				return [ 'blue','yellow','red'];
			},
			fill_fn(v){
				var fill = "blue";
				if(v < 0.5){
					fill = "blue";
				}else if(v >= 0.5 && v < 0.8){
					fill = "rgba(241, 238, 48, 0.88)";
				}else if(v >= 0.8){
					fill = "red";
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
			getTableExtendContent(key,data){
				var bar_transform = "";
				var bar_height = 30;
				var pie = d3.layout.pie();  
				var v = data[key];
				//console.debug(key,data,v)
				return (
					<div>
						{
							v.send_rate_detail &&
							<span className="relative">
								<h4 className="mt10">发送比</h4>
								<svg className="p-m-bar mt10" viewBox={this.viewBox} preserveAspectRatio="none">
									<Bar height={bar_height} width={2} data={v.send_rate_detail} 
										max_value={1} gap={1} field={1} transform={bar_transform} fill={this.fill_fn}/>
								</svg>
								<svg className="p-m-pie">
									<Pie data={ this.getSendRatePieData(v.send_rate_detail) } stroke="#06600i" fill="#ccc" pie={ pie }
														outerRadius={ 29 } />
								</svg>
							</span>
						}
						{
							v.viwers_detail &&
							<span>
								<h4 className="mt10">观看人数（最大值：{ Math.max.apply(null,this.getValueArray(v.viwers_detail)) }）</h4>
								<svg className="p-m-bar mt10" viewBox={this.viewBox} preserveAspectRatio="none">
									<Bar height={bar_height} width={2} data={v.viwers_detail}
										max_value={Math.max.apply(null,this.getValueArray(v.viwers_detail))} 
										gap={1} field={1} transform={bar_transform}/>
								</svg>
							</span>
						}
						{
							v.publish_bandwidth_detail &&
							<span>
								<h4 className="mt10">
									推送带宽（最大值：
										{
											r2fn.transformToKbMbGb(Math.max.apply(null,this.getValueArray(v.publish_bandwidth_detail)))
										}
									）
								</h4>
								<svg className="p-m-bar mt10" viewBox={this.viewBox} preserveAspectRatio="none">
									<Bar height={bar_height} width={2} data={v.publish_bandwidth_detail} 
										max_value={Math.max.apply(null,this.getValueArray(v.publish_bandwidth_detail))} 
										gap={1} field={1} transform={bar_transform}/>
								</svg>
							</span>
						}
					</div>
				)	
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
		let { targetProps } = this.props;
		let targetData,listData,send_rate_detail,viwers_detail,publish_bandwidth_detail;
		if(targetProps.main && targetProps.main.result){
			targetData = targetProps.main;
			send_rate_detail = targetData.result.total.send_rate_detail;
			viwers_detail = targetData.result.total.viwers_detail;
			publish_bandwidth_detail = targetData.result.total.publish_bandwidth_detail;
			this.list.getCurrentComponent(this)
			listData = this.list.dataAdapter([targetData.result.total])//针对不同数据要改动
			var bar_transform = "translate(0,0)"
			var bar_height = 30;
			var app_data = this.list.dataAdapter(targetData.result.apps)//针对不同数据要改动
			this.viewBox = "0,0,2000,30"; 
			var pie = d3.layout.pie();  
		}
		return (
			<div className="public_monitor">
				{
					!targetData &&
					<Antd.Spin className="mt15" size="large"/>
				}
				{
					targetData &&
					<div>
						<h2>汇总信息</h2>	
						<Antd.Table className="mt10 summary" columns={this.list.columns} dataSource={listData} 
								size="middle" bordered pagination={ false }/>	
						{
							send_rate_detail &&
							<span className="relative">
								<h4 className="mt10">发送比</h4>
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
						<h2>App信息</h2>	
						<Antd.Table className="mt10" columns={this.list.columns} dataSource={app_data} 
							size="middle" pagination={ false }
							expandedRowRender={record=>this.getTableExtendContent(record.key,targetData.result.apps)}/>	
					</div>
				}
			</div>
		)	
    }
}

var ReduxView = connect((state)=>{
	return {
	    targetProps : state.public_monitor,
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
