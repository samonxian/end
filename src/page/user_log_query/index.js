import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { pushPath ,replacePath } from 'redux-simple-router'
import * as log_query_action from './action'
import { Button,Icon,Table,Spin,Timeline,Row,Col,Alert,Collapse } from 'antd_c'
import * as Antd from 'antd_c'
import NCollapse from './data/collapse'
import Monitor from '../sidebar/user_log'
import QueryForm from './form'
import MoreData from './data/moredata'
import * as base from './data/index'
import { title } from '../user_log/title.js'
import { getUrlParams } from 'function'
import LogData from './data/data'
const Item = Timeline.Item
const Panel = Collapse.Panel;
let data = [];

class user_log_query extends React.Component {
	constructor(){
		super(); 
	}

	componentDidUpdate(){
		this.table_co_dom = ReactDOM.findDOMNode(this.refs.table_co); 
	}

	componentDidMount(){
		var _this = this;
		let top = 0,scrollTop;
		document.addEventListener('scroll',function(e){
			if(_this.table_co_dom){
				top = _this.table_co_dom.offsetTop;
			}
			scrollTop = document.body.scrollTop;
			if(top < (scrollTop-10)){
				_this.setState({
					fixed : "uql_title_bar_fixed"
				})
			}
			if(top > (scrollTop-10)){
				_this.setState({
					fixed : ""
				})
			}

			console.log('top',top)
			console.log('scrollTop',scrollTop)
		});
	}
	
	getType(type){
		switch(type){
			case 'camera_debug':
				type = 'rtmp_device';
			case 'camera_time':
				type = 'rtmp_device';
			case 'mobile_debug':
				type = 'rtmp_device';
			case 'camera_time_last':
				type = 'rtmp_device';
			case 'camera_debug_last':
				type = 'rtmp_device';
		}
		return type;
	}

	getLogData(){
		
		let obj = { }
		let { location,route } = this.props;
		if(!this.obj){
			for(var key in title){
				key = this.getType(key);
				if(key != "other"){
					obj[key] =  require('../user_log/'+key+'/data.js');
				}
			}
			this.obj = obj;
		}
		let type = location.query.type;
		if(!type){
			type = 'start_service';	
		}
		type = this.getType(type);
		return this.obj;
	}

	
	switch_type(type){
		this.setState({
			title_bar_item : type.key
		})
	}
	

    render() {
		let _this = this;
			//console.log(this.props)
		let { user_log_query ,location,dispatch } = this.props;
		let { posts,posts2 } = user_log_query;
		let deal_table = this.getLogData(); 
		let timestamp;
		let left_data = [ 'other' ];
		if(posts && posts[0] && !posts[0].hasLoad){
			posts[0].hasLoad = true;
			//posts.push('test');
		}
		if(posts && posts[0]){
			timestamp = posts[posts.length-1].end_time;
			title['other'] = '日志'; 
			for(var key in posts[0]){
				if(title[key]){
					left_data.push(key);
				}
			}
		}
			
		let title_bar_item = 'other';
		let title_bar_item_all = { };
		let uql_title_bar_class  = "uql_title_bar ";
		if(this.state){
			if(this.state.title_bar_item){
				title_bar_item = this.state.title_bar_item;
			}
			if(this.state.fixed){
				uql_title_bar_class = "uql_title_bar " + this.state.fixed;
			}
		}else{
			//var other = true;
			//title_bar_item_all['other'] = true; 
		}
        return (
			<Monitor location={location} >
				<QueryForm />	
				{
					user_log_query.isFetching && <Spin size="large" />
				}
				{
					!user_log_query.isFetching && posts && posts[0] &&
					<div>
						<Row type="flex" justify="start" className="info_define">
							<Col span="6">
								<Alert key="1" message="优" type="success" />
							</Col>
							<Col span="6">
								<Alert key="2" message="良" type="info" />
							</Col>
							<Col span="6">
								<Alert key="3" message="中" type="warn" />
			`				</Col>
							<Col span="6">
								<Alert key="4" message="差" type="error" />
							</Col>
						</Row>
						{
							posts2._id &&
							<div>
								<Table  size="middle" 
									columns={base.base_columns} dataSource={base.baseData(posts2)} pagination={false} bordered/>
								<br/>
							</div>
						}
						{
							posts2._id &&
							<div>
								<Table  size="middle" 
									columns={base.state_columns} dataSource={base.stateData(posts2)} pagination={false} bordered/>
								<br/>
							</div>
						}
						{
							posts2._id &&
							<div>
								<Table  size="middle" 
									columns={base.time_columns} dataSource={base.timeData(posts2)} pagination={false} bordered/>
								<br/>
							</div>
						}
						{
							posts2._id &&
							<div>
								<Table  size="middle" 
									columns={base.time2_columns} dataSource={base.time2Data(posts2)} pagination={false} bordered/>
								<br/>
							</div>
						}
						{
							posts2._id &&
							<Collapse >
								<Panel header="转发ip / 推流时间 / 接收时间差 / 码率 / 推送状态"> 
									<Table  size="middle" 
										columns={base.live_stat_columns} dataSource={base.live_statData(posts2)} pagination={false} bordered/>
								</Panel>
							</Collapse>
						}
											
						<div className={uql_title_bar_class}  >
							<Antd.Menu onClick={_this.switch_type.bind(_this)} selectedKeys={[title_bar_item]} theme="dark" mode="horizontal">
								{
									left_data.map(function(value,key){
										return (
											<Antd.Menu.Item key={value}>
												{
													title[value]
												}
											</Antd.Menu.Item>
										)
									})
								}
								
							</Antd.Menu>
						</div>
					</div>
				}
				{
					!user_log_query.isFetching && user_log_query.posts &&
					<div className="user_log_query_table" ref="table_co">
						<Timeline className="uql_timeline "> 
							{
								posts && posts[0] && posts.map(function(d,key){
									var time = new Date(d.end_time * 1000).Format("yyyy-MM-dd hh:mm:ss").replace(/\:\d{2}$/,'');
									return(
										<Item key={key} >
											{
												d.end_time &&
												<div>
													<h4 className="uql_h4 tr color_blue">{ time }</h4>
													<LogData active={title_bar_item} key={key} time={time} data={d}
															deal_table={deal_table} switch_type={ _this.switch_type } parent={ _this }/>
												</div>		
											}
										</Item>
										
									)
								})
							}
						</Timeline>
						{
							posts && posts[0] &&
							<MoreData state={ user_log_query.isFetchingMore } timestamp={ timestamp }/>	
						}
					</div>
				}
			</Monitor>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	//console.log("user_log_query组件初始props",state);
	return {
	    user_log_query : state.user_log_query,
		//routing : state.routing
	};
}
module.exports = connect(mapStateToProps)(user_log_query)
