import React from 'react'
import * as Antd from 'antd'
class CollapseItem extends React.Component {
	constructor(){
		super(); 
		this.state = { }
	}

	events(){
		var _this = this;
		var e = { }
		//展开与隐藏Table
		e.showTable = function(){
			var active = 'NOOON';
			if(!_this.state.show_table){
				active = 'ant-collapse-content-active'
			}
			return function(){
				_this.setState({
					show_table : !_this.state.show_table,
					active_table : active 
				})
			}
		}
		return e;
	}

    render() {
		//定义变量
		let {columns,data,title} = this.props;
		var _this = this;
		//定义事件
		var e = this.events();	

        return (
			<div className="ant-collapse-item" > 
				<div onClick={e.showTable()} className="ant-collapse-header" aria-expanded={this.state.show_table}>
					<i className="arrow"/>
					{ title }
				</div>
				<div className={"ant-collapse-content " + this.state.active_table}>
					{	
						this.state.active_table &&
						<Antd.Table  size="small"
							columns={columns} dataSource={data} pagination={false} bordered/>
					}
				</div>
			</div>
	    )
    }
}

module.exports = CollapseItem 
