import React from 'react'
import BasicComponent from 'r2/module/BasicComponent'
import * as Antd from 'antd'
class CollapseItem extends BasicComponent {
	constructor(){
		super(); 
	}

	events(){
		var _this = this;
		var e = {
			//展开与隐藏Table
			showTable(){
				return ()=>{
					var active = '';
					if(!this.state.show_table){
						active = 'ant-collapse-content-active'
					}
					_this.setState({
						show_table : !_this.state.show_table,
						active_table : active 
					})
				}
			},
		}
		return e;
	}

    render() {
		//定义变量
		let {columns,data,title} = this.props;
        return (
			<div className="ant-collapse-item" > 
				<div onClick={this.showTable()} className="ant-collapse-header" aria-expanded={this.state.show_table}>
					<i className="arrow"/>
					{ title }
				</div>
				<div className={"ant-collapse-content " + this.state.active_table}>
					{	
						this.state.show_table &&
						<Antd.Table  size="small"
							columns={columns} dataSource={data} pagination={false} bordered/>
					}
				</div>
			</div>
	    )
    }
}

module.exports = CollapseItem 
