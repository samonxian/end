import React from 'react'
import d3 from 'd3'
import Component from 'libs/react-libs/Component'
import Pie from 'libs/d3-components/Pie'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreators from './action'
import LeftBar from './components/LeftBar'
import RightBar from './components/RightBar'

class CameraStat extends Component {
	constructor(){
		super(); 
	}

	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.get_camera_stat.type == actionCreators.REQUEST_CAMERASTAT){
			return false;
		}else{
			return true;	
		}
	}

	componentDidMount(){
		var _this = this;
		this.props.dispatch(actionCreators.fetchData()) 
		this.clearInterval = setInterval(function(){
			_this.props.dispatch(actionCreators.fetchData());	
			//console.debug(1)
		},3000)
	}

	componentWillUnmount(){
		clearInterval(this.clearInterval)
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
			bandwidthTransform(t_value){
				let value = 0;
				if(t_value > 1024 * 1024 * 1024){
					value = Math.round(t_value / 1024 / 1024 / 1024 * 100 ) / 100  + 'GB';	
				}else if(t_value > 1024 * 1024){
					value = Math.round(t_value / 1024 / 1024 * 100) / 100  + 'MB';	
				}else if(t_value > 1024){
					value = Math.round(t_value / 1024 * 100) / 100 + 'KB';	
				}else if(t_value != 0){
					value = t_value + '字节';	
				}else{
					value = t_value;	
				}
				return value;
			},
			setSpecialText(){
				var obj = [
					"发送比",
					"人数",
					"带宽",
					"播放流量",
					"推送流量"
				]
				return obj;
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
							switch(key){
								case 'bandwith':
								case 'yesterday_publish_traffic':
								case 'yesterday_play_traffic':
									let t_value = v[key];
									v[key+"_temp"] = _this.bandwidthTransform(t_value);
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
								switch(key){
									case 'bandwidth':
									case 'yesterday_publish_traffic':
									case 'yesterday_live_traffic':
										let t_value = v.total_info[key];
										v.total_info[key+"_temp"] = _this.bandwidthTransform(t_value);
								}
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
			/**
			 *	先以观看人数为排序条件，如果view_mum有为0的数据则以推送流量为排序条件	
			 *@param [object] data 需要处理的总数据
			 */
			sortCamerasByViewMumAndPTrafficDesc(data){
				data.sort(function(a,b){
					var flag1 =  b.viewer_mum - a.viewer_mum
					return flag1;
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
				summaryFields = this.setSummaryFields(),
				specialFields = this.setSpecialFields(),
				max_special = _this.getSpecialMaxValues(posts.data), 
				max_summary = this.getSummaryMaxValues(posts.data),
				tuijian = [1,2,3,4,5],
				i = 0;
			return (
				<div className="g_c_s_con">
					<h1>公众直播情况</h1>
					{
						posts.data.map(function(v,k){
							if(!v.app_name || !v.cameras[0]){
								return (
									<div key={ k }></div>
								)
							}
							i++;
							//圆饼图数据
							let dataset = { data : [ ], fill : _this.getFillColor() };
							dataset.data.push(v.total_info.view_health)
							dataset.data.push(v.total_info.view_subhealth)
							dataset.data.push(v.total_info.view_unhealth)
							let dataset2 = { data : [ ], fill : _this.getFillColor() };
							dataset2.data.push(v.total_info.health)
							dataset2.data.push(v.total_info.subhealth)
							dataset2.data.push(v.total_info.unhealth)
							//查找厂商最好前5app
							_this.sortCamerasByViewMumAndPTrafficDesc(v.cameras);
							//console.debug(v.cameras)
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
												let t_v = 0;
												if(v.total_info[summaryFields[m_k]+'_temp']){
													t_v = v.total_info[summaryFields[m_k]+'_temp'];
												}else{
													t_v = v.total_info[summaryFields[m_k]];
												}
												return(
													<div key={m_k} className="bg_line" style={style}> {t_v}</div>
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
										{
											i == 1 && <div className="table_info">
												{
													_this.setSpecialText().map(function(s_v,s_k){
														let t_value = 0;
														switch(specialFields[s_k]){
															case 'bandwith':
															case 'yesterday_publish_traffic':
															case 'yesterday_play_traffic':
																t_value = _this.bandwidthTransform(max_special[s_k]);
															break;
															default:
																t_value = max_special[s_k]
														}
														let text = s_v.concat("：").concat(t_value); 
														return(
															<span key={ s_k }>{ text }</span>
														)
													})	
												}
											</div>
										}
										<div className="g_c_s_title"> 
											{
												tuijian.map(function(t_v,t_k){
													let lg = v.cameras.length;
													if(lg < 5 && t_k > lg-1){
														return(
															<div key={ t_k }></div>
														)
													}
													return(
														<a key={ t_k } href="#" target="_blank">{v.cameras[t_k].cid}</a>
													)
												})
											}
										</div>	
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
									<Antd.Col className="g_c_s_col g_c_s_col_5">
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
														{ _this.setSpecialText()[m_k] }</div>
												)
											})
										}
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
