import React from 'react'
import { Table,Timeline } from 'antd_c'
import { title } from '../../user_log/start_service/data/title.js'
const Item = Timeline.Item
let columns_a = []
let data_a = []

class LogData extends React.Component {
	
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
		let { data,deal,index } =  this.props;
		//console.log(data)
		//console.log(index)
		var count = "共" +(data && data.length)  + "条数据"
        return (
			<div className={this.props.className}>
				<h2>
					{ count }
				</h2>
				<br/>
				<Timeline> 
					{
						data && data.map(function(d,key){
							var type = _this.getType(d.type); 
							var create_at = d.create_at;
							var user_log = { }
							user_log.posts = { }
							user_log.posts.logs = [];
							user_log.posts.logs.push(d);
							var t_data = deal[type].logData(user_log)
							var columns = deal[type].columns; 
							return(
								<Item key={key} color='green'>
									<h3 className="ulq_h2">{ create_at +" / "+ title[d.type] }</h3>
									<Table  size="middle"
										columns={columns} dataSource={t_data} pagination={false} bordered/>
								</Item>
							)
						})
					}
				</Timeline>
				
			</div>
        )
    }
}

export default LogData 
