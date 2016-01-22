import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Table } from 'antd_c'
import { title } from '../../user_log/title.js'
import * as deal from './index.js'
let t_data = [];
class NTable extends React.Component {

	componentDidMount(){
		
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

    render() {
		let _this = this;
	    let { data,deal_table,active,typeName } = this.props;
		data = deal.deal(data);
		let columns;
		var show = '';
		if(active == typeName){
			show = "show";
		}
		let className = "uql_hide_table " + show; 

		console.log(className)
		if(data && data[0] && data[0].type){
			var type = _this.getType(data[0].type);
			let user_log = { }
			user_log.posts = { }
			user_log.posts.logs = data;
			deal_table[type].logData(user_log);
			columns = deal_table[type].columns;
			columns[0].dataIndex = "t_create_at";
		}
		//console.log(this.state)
        return (
			<div className={className}>
				{
					data.length > 0 && 
					<Table  size="middle" ref="table"
						columns={columns} dataSource={data} pagination={false} bordered/>
				}
			</div>
			
					
	    )
    }
}

module.exports = NTable;
