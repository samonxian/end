import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Component from 'libs/react-libs/Component'
import * as actionCreators from './action'
import * as Antd from 'antd'
import * as common from 'libs/temp/user_log'
import { title } from '../user_log/title'
import Form from './components/form'
import Sidebar from '../sidebar/user_log'
import NCollapse from './components/collapse'
import MoreData from './components/moredata'
import Content_Nav from './components/contentNav'
import * as base from './components/index'
import LogData from './components/data'
class user_log_query extends Component {
	constructor(){
		super(); 
		this.state = {
			title_bar_item : 'other',
		}
	}

	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.user_log_query.type == actionCreators.REQUEST_LOG_QUERY){
			return false;
		}else{
			return true;	
		}
	}

	componentDidUpdate(){
		this.setLoading({ close : true })
		this.table_co_dom = ReactDOM.findDOMNode(this.refs.table_co); 
		console.timeEnd('user_log_query运行时间')
	}

	componentDidMount(){
		this.table_co_dom = ReactDOM.findDOMNode(this.refs.table_co); 
		console.timeEnd('user_log_query运行时间')
	}

	events(){
		var _this = this;
		return {
			/**
			 *	日志导航类型切换
			 */
			switchLogType : function(type){
				var _type;
				if(type.key){
					_type = type.key;
				}else{
					_type = type;
				}
				_this.setState({
					title_bar_item : _type
				})	
			}
		}
	}

	dataAdapter(){
		var _this = this;
		return {
			/**
			 *	获取左边log类型
			 */
			getLeftLogType : function(posts_first){
				var data = [ 'other' ];
				for(var key in posts_first){
					if(title[key]){
						data.push(key);
					}
				}
				return data;
			},
			/**
			 *	获取各种log数量
			 */
			getAllLogCount : function(posts,left_data){
				var post_count = { other:0 }
				posts.forEach(function(v,k){
					left_data.forEach(function(value,key){
						if(!post_count[value]){
							post_count[value] = 0;
						}
						if(value == 'other'){
							post_count[value] += v['logs'].length; 		
						}else if(v[value] && v[value].details){
							post_count[value] += v[value].details.length; 		
							//console.debug(v[value].details.length)
						}
					})
				})
				return post_count;
			},
			/**
			 *	获取各种日志Table columns 和 data adapter
			 */
			getLogData(){
				let { location,route } = this.props;
				var obj = { }
				for(var key in title){
					key = common.getType(key);
					if(key != "other"){
						obj[key] =  require('../user_log/'+key+'/data');
					}
				}
				return obj;
			}
		}
	}

    render() {
		console.time('user_log_query运行时间')
		let { user_log_query ,location,dispatch } = this.props;
		let { posts,posts2 } = user_log_query;
		var _this = this,
			deal_table = this.getLogData(), 
			title_bar_item = this.state.title_bar_item;
		if(posts && posts[0]){
			var timestamp = posts[posts.length-1].end_time; //获取数据最后5分钟时间戳
			var left_data = this.getLeftLogType(posts[0]);	
			var post_count = this.getAllLogCount(posts,left_data);	
			return (
				<Sidebar location={location} >
					<Form />	
						<div>
							{
								posts2._id &&
								<div>
									<Antd.Table  size="small" 
										columns={base.base_columns} dataSource={base.baseData(posts2)} pagination={false} />
									<br/>
									<Antd.Table  size="small" 
										columns={base.state_columns} dataSource={base.stateData(posts2)} pagination={false} />
									<br/>
									<Antd.Table  size="small" 
										columns={base.time_columns} dataSource={base.timeData(posts2)} pagination={false} />
									<br/>
									<Antd.Table  size="small" 
										columns={base.time2_columns} dataSource={base.time2Data(posts2)} pagination={false} />
									<br/>
									<Antd.Collapse >
										<Antd.Collapse.Panel header="转发ip / 推流时间 / 接收时间差 / 码率 / 推送状态"> 
											<Antd.Table  size="small" 
												columns={base.live_stat_columns} dataSource={base.live_statData(posts2)} pagination={false} />
										</Antd.Collapse.Panel>
									</Antd.Collapse>
								</div>
							}
												
							<Content_Nav left_data={ left_data } post_count={ post_count } posts={ posts } title_bar_item={ title_bar_item }
									parent={ _this } />
								
					</div>
					<div className="user_log_query_table" ref="table_co">
						<Antd.Timeline className="uql_timeline "> 
							{
								posts.map(function(d,key){
									var time = new Date(d.end_time * 1000).Format("yyyy-MM-dd hh:mm:ss").replace(/\:\d{2}$/,'');
									return(
										<Antd.Timeline.Item key={key} >
											{
												d.end_time &&
												<div>
													<h4 className="uql_h4 tr color_blue">{ time }</h4>
													<LogData active={title_bar_item} key={key} time={time} data={d}
															deal_table={deal_table} switch_type={ _this.switchLogType } parent={ _this }
															post_count={ post_count }/>
												</div>		
											}
										</Antd.Timeline.Item>
										
									)
								})
							}
						</Antd.Timeline>
						<MoreData state={ user_log_query.isFetchingMore } timestamp={ timestamp }/>	
					</div>
				</Sidebar>
			)
		}else{
			return (
				<Sidebar location={location}>
					<Form />	
					{
						user_log_query.isFetching && <Antd.Spin size="large" />
					}
				</Sidebar>
			)
		}
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	//console.log("user_log_query组件初始props",state);
	return {
	    user_log_query : state.user_log_query,
	};
}
module.exports = connect(mapStateToProps)(user_log_query)
