import React from 'react'
import { connect } from 'react-redux'
import { Button,Spin } from 'antd'
import * as log_query_action from '../action'
class MoreData extends React.Component {

	getMoreData(time,cid){
		var new_time = time - 5*60;
		//console.log(new Date(time * 1000).Format("yyyy-MM-dd hh:mm:ss"));
		//console.log(new Date(new_time * 1000).Format("yyyy-MM-dd hh:mm:ss"));
		//
		var n_time = new Date(new_time * 1000).Format("yyyy-MM-dd hh:mm:ss");
		this.props.dispatch(log_query_action.fetchMoreData({
			end_time : n_time,	
			cid : this.props.form.cid,	
		}));
	}

    render() {
		//console.log(this.state)
		let { state,timestamp } = this.props;

        return (
			<Button className="get-more-data" onClick={this.getMoreData.bind(this,timestamp)}>
				<div>
					{
						!state &&
						"加载更多数据..."
					}
					{
						state &&
						<Spin size="small"/>
					}
				</div>
			</Button>
	    )
    }
}

/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	// console.log("user_log_query组件初始props",state);
	return {
	    form : state.user_log_query_form,
	};
}
module.exports = connect(mapStateToProps)(MoreData)
