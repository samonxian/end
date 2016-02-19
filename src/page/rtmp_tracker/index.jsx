import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as action from './action'
import * as data_setting from './data/province_city_single'
import ChinaMap from './components/chinaMap'
import d3 from 'd3'
let color = d3.scale.category20();

class RtmpTracker extends Component {
	constructor(){
		super(); 
		//console.debug(this)
	}

	componentDidMount(){
		var _this = this;
		this.props.dispatch(action.fetchData());	
		this.clearInterval = setInterval(function(){
			_this.props.dispatch(action.fetchData());	
			//console.debug(1)
		},2000)
	}

	componentWillUnmount(){
		clearInterval(this.clearInterval)
	}
	/**
	 *	数据处理与适配
	 */
	dataAdapter(){
		var obj = {
			sortByUserDesc(data){
				data.sort(function(a,b){
					if(a.ActiveUsers > b.ActiveUsers){
						return -1;
					}else{
						return 1;
					}
				})
			},
			sortByProvinceAsc(data){
				data.sort(function(a,b){
					if(a.Province > b.Province){
						return 1;
					}else{
						return -1;
					}
				})
			}
		}
		return obj;
	}

    render() {
		var _this = this;
		let { rtmp_tracker } = this.props;
		let { posts,posts2 } = rtmp_tracker;
		if(posts && posts.data && posts.data.data){
			var p_data = posts.data.data;
			this.sortByUserDesc(p_data);
			var max_users = p_data[0].ActiveUsers;
			var min_users = p_data[p_data.length-1].ActiveUsers;
			this.sortByProvinceAsc(p_data);	
			return (
				<div>
					<div className="rt_color_line">
						<span className="fl">{ min_users }</span>
						<span className="fr">{ max_users }</span>
					</div>
					<Antd.Row type="flex" justify="center" align="bottom" className="rt_con">
						<Antd.Col className="rt_left">
							<ChinaMap min_users={ min_users } max_users={ max_users } posts={ p_data } posts2={ posts2.data.data } parent={ _this }/>	
						</Antd.Col>
						<Antd.Col className="rt_right">
							{
								this.state && this.state.show_table &&
										<Antd.Table size="middle" columns={data_setting.columns} 
											dataSource={data_setting.getData(posts2.data.data[_this.state.show_table].RelayServer)}
											pagination={false} bordered/>
							}
						</Antd.Col>
					</Antd.Row>
				</div>
			)
		}else{
			return (
				<div></div>
			)
		}
		
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	return {
	    rtmp_tracker : state.rtmp_tracker
	};
}
module.exports = connect(mapStateToProps)(RtmpTracker)
