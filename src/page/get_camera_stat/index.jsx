import React from 'react'
import d3 from 'd3'
import Component from 'libs/react-libs/Component'
import Pie from 'libs/d3-components/Pie'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as action from './action'
import LeftBar from './components/LeftBar'
import RightBar from './components/RightBar'

class CameraStat extends Component {
	constructor(){
		super(); 
	}

	componentDidMount(){
		var _this = this;
		this.props.dispatch(action.fetchData()) 
	}

	componentWillUnmount(){

	}
	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var _this = this;
		return {
			getFillColor(){
				return [ '#6fea3a',	'#f2af29',	'#f75a11'];
			},
			
			setSpecialFields(){
				var obj = [
					"send_rate_ave",//发送比
					"viewer_mum",//人数
					"bandwith",//带宽
					"yesterday_play_traffic",//昨日播放流量
					"yesterday_publish_traffic"//昨日推送流量
				]
				return obj;
			},
			/**
			 *	获取具体厂商其他类最大值
			 *@param [object] data 需要处理的camera数据
			 *@return [array] 返回最大值数组
			 */
			getSpecialMaxValues(data){
				var obj = { }
				this.setSpecialFields().forEach(function(v,k){
					obj[v] = [];
				}) 
				var value = [];
				data.forEach(function(value,key){
					value.cameras.forEach(function(v,k){
						for(var key in obj){
							if(v[key]){
								obj[key].push(v[key]);
							}else{
								v[key] = 0;
								obj[key].push(v[key]);
							}
						}
					})

				})
				for(var key in obj){
					if(obj[key][0] != undefined){
						var _v = Math.max.apply(null, obj[key]);
						value.push(_v);
					}else{
						value.push(0);
					}
				}
				//console.debug(value)
				return value;
			},
			setSummaryText(){
				var obj = [
					"总路数",
					"人数",
					"带宽",
					"平均时间",
					"播放流量",
					"推送流量"
				]
				return obj;
			},
			setSummaryFields(){
				var obj = [
					'all',//总路数
					"viewer_mum",//人数
					"bandwidth",//带宽
					"ave_open_time",//平均打开时间
					"yesterday_live_traffic",//昨日播放流量
					"yesterday_publish_traffic"//昨日推送流量
				]
				return obj;
			},
			/**
			 *	获取厂商展示汇总信息最大值
			 *@param [object] data 需要处理的总数据
			 *@return [array] 返回最大值数组
			 */
			getSummaryMaxValues(data){
				var obj = { }
				this.setSummaryFields().forEach(function(v,k){
					obj[v] = [];
				}) 
				var value = [];
				data.forEach(function(v,k){
					if(v.app_name){
						obj.all.push(v.cameras.length);  
						//添加总路数到data字段中
						v.total_info.all = v.cameras.length;
						for(var key in obj){
							if(key != 'all'){
								obj[key].push(v.total_info[key]);
							}
						}
					}
				})
				for(var key in obj){
					var _v = Math.max.apply(null, obj[key]);
					value.push(_v);
				}
				//console.debug(data)
				return value;
			},
			sortCamerasByDesc(data){
				data.sort(function(a,b){
					var flag_1 =  b.view_mum - a.view_mum
					var flag_2 =  b.yesterday_publish_traffic - a.yesterday_publish_traffic
					if(flag_1 && ){
						
					}
				})	
			}
		}
	}

    render() {
		var _this = this;
		let { posts } = this.props.get_camera_stat ;
		if(posts && posts.data && posts.data[0]){
			var rightBar_width = 2,
				rightBar_height = 30,
				rightBar_h_gap = rightBar_height + 2,
				radius = 37,
				pie = d3.layout.pie(),  
				max_special = _this.getSpecialMaxValues(posts.data), 
				max_summary = this.getSummaryMaxValues(posts.data);
			return (
				<div className="g_c_s_con">
					{
						posts.data.map(function(v,k){
							if(!v.app_name || !v.cameras[0]){
								return (
									<div key={ k }></div>
								)
							}
							let dataset = { data : [ ], fill : _this.getFillColor() };
							dataset.data.push(v.total_info.view_health)
							dataset.data.push(v.total_info.view_subhealth)
							dataset.data.push(v.total_info.view_unhealth)
							let dataset2 = { data : [ ], fill : _this.getFillColor() };
							dataset2.data.push(v.total_info.health)
							dataset2.data.push(v.total_info.subhealth)
							dataset2.data.push(v.total_info.unhealth)
							return (
								<Antd.Row key={ k } type="flex" justify="start">
									{
										max_summary.map(function(m_v,m_k){
											let style = {
												paddingLeft : 3,
												height : rightBar_height,
												lineHeight : rightBar_height + 'px',
												top : rightBar_h_gap * m_k  ,
											}

											return(
												<div key={m_k} className="bg_line" style={style}>{ _this.setSummaryText()[m_k] }</div>
											)
										})
									}
									<Antd.Col className="g_c_s_col g_c_s_col_0">
										<div className="g_c_s_title app_title"> 
											<h2>{ v.app_name }</h2>
										</div>	
									</Antd.Col>
									<Antd.Col className="g_c_s_col g_c_s_col_1">
										{
											max_summary.map(function(m_v,m_k){
												let style = {
													padding : '0 3 0 3',
													background : 'none',
													zIndex : 1000000,
													textAlign : 'right',
													height : rightBar_height,
													lineHeight : rightBar_height + 'px',
													top : rightBar_h_gap * m_k  ,
												}
												return(
													<div key={m_k} className="bg_line" style={style}>
														{ v.total_info[_this.setSummaryFields()[m_k]] }</div>
												)
											})
										}
										<svg >
											<LeftBar height={rightBar_height} width={100} data={v.total_info} 
												fields={ _this.setSummaryFields() } max_values={max_summary} />
										</svg>
									</Antd.Col>
									<Antd.Col className="g_c_s_col g_c_s_col_2">
										<div className="g_c_s_title"> 
											<span>收看</span>
										</div>	
										<svg >
											<g transform="translate(2,10)">
												<Pie data={ dataset } stroke="#06600i" fill="#ccc" pie={ pie }
														outerRadius={ radius } />
												<rect x={0} y={rightBar_h_gap * 3 - 4} width={20} height={20} fill={ dataset.fill[0] }/>
												<text x="23" y={rightBar_h_gap * 3 + 10} >
													{ v.total_info.view_health + '人' }
												</text>
												<rect x={0} y={rightBar_h_gap * 4 - 4} width={20} height={20} fill={ dataset.fill[1] }/>
												<text x="23" y={rightBar_h_gap * 4 + 10} >
													{ v.total_info.view_subhealth + '人' }
												</text>
												<rect x={0} y={rightBar_h_gap * 5 - 4} width={20} height={20} fill={ dataset.fill[2] }/>
												<text x="23" y={rightBar_h_gap * 5 + 10} >
													{ v.total_info.view_unhealth + '人' }
												</text>
											</g>
										</svg>
									</Antd.Col>
									<Antd.Col className="g_c_s_col g_c_s_col_3">
										<div className="g_c_s_title"> 
											<span>源推送</span>
										</div>	
										<svg >
											<g transform="translate(2,10)">
												<Pie data={ dataset2 } stroke="#06600i" fill="#ccc" pie={ pie }
														outerRadius={ radius } />
												<rect x={0} y={rightBar_h_gap * 3 - 4} width={20} height={20} fill={ dataset.fill[0] }/>
												<text x="23" y={rightBar_h_gap * 3 + 10} >
													{ v.total_info.health + '' }
												</text>
												<rect x={0} y={rightBar_h_gap * 4 - 4} width={20} height={20} fill={ dataset.fill[1] }/>
												<text x="23" y={rightBar_h_gap * 4 + 10} >
													{ v.total_info.subhealth + '' }
												</text>
												<rect x={0} y={rightBar_h_gap * 5 - 4} width={20} height={20} fill={ dataset.fill[2] }/>
												<text x="23" y={rightBar_h_gap * 5 + 10} >
													{ v.total_info.unhealth + '' }
												</text>
											</g>
										</svg>
									</Antd.Col>
									<Antd.Col className="g_c_s_col g_c_s_col_4">
										<svg>
											{
												max_special.map(function(v2,k2){

													return (
														<RightBar key={k2} transform={`translate(0,${ rightBar_h_gap * k2 })`} height={rightBar_height} 
															width={rightBar_width} data={v.cameras} max_value={v2} gap="1" 
															field={ _this.setSpecialFields()[k2] }/>
													)
												})
											}
										</svg>
									</Antd.Col>
								</Antd.Row>
							)
						})
					}
					
				</div>
			)	
		}else{
			return (
				<Antd.Spin />
			)
		}
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	return {
	    get_camera_stat : state.get_camera_stat
	};
}
module.exports = connect(mapStateToProps)(CameraStat)
