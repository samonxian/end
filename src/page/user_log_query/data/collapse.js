import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Table,Collapse } from 'antd_c'
import { title } from '../../user_log/title.js'
import * as deal from './index.js'
const Panel = Collapse.Panel;
let t_data = [];
class NCollapse extends React.Component {

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

	change(key){
		var obj = { }
		obj[key] = true;
		if(!this.state){
			this.setState(obj)
		}
		if(this.state && !this.state[key]){
			this.setState(obj)
		}
	}

    render() {
		let _this = this;
	    let { data,deal_table,active,typeName } = this.props;
		data = deal.deal(data);
		let columns = [];
		var show = '';
		if(active == typeName){
			show = "show";
		}
		let className = "uql_hide_table " + show; 
		//console.log(this.state)
        return (
			<div className={className}>
				{
					data.length > 0 && 
					<Collapse >
						{
						data.map(function(d,key){
							if(!d.t_create_at){ d.t_create_at = d.create_at; }
							var create_at = d.t_create_at.replace(/(.*?)\ /g,'');
							var type = _this.getType(d.type); 
							if(!d.key2){
								let user_log = { }
								user_log.posts = { }
								user_log.posts.logs = [];
								user_log.posts.logs.push(d);
								t_data[key] = deal_table[type].logData(user_log)
								//console.log(key)
							}
							d.key2 = key + 1;
							columns = deal_table[type].columns; 
							var t_title = create_at + " / " + title[d.type];
							return (
								<Panel header={ t_title } key={key} > 
									{
										<Table  size="middle" ref="table"
											columns={columns} dataSource={t_data[key]} pagination={false} bordered/>
									}
								</Panel>	
								
							)

						})
						}
					</Collapse>
				}
			</div>
			
					
	    )
    }
}

module.exports = NCollapse
