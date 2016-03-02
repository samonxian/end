import React from 'react'
import Component from 'libs/react-libs/Component'
import * as Antd from 'antd'
class ViewInfo extends Component {
	constructor(){
		super(); 
		this.state = { show : false }
	}

	events(){
		var _this = this;
		return {
			showInfo(e){
				return function(){
					_this.setState({
						show : !_this.state.show
					})		
				}
			},
			handleCancel(){
				_this.setState({
					show : !_this.state.show
				})
			}
		}
	}

	componentDidMount(){
		
	}

    render() {
		let _this = this;
	    let { data,columns } = this.props;
		console.debug(data)
		return (
			<div>
				<Antd.Button onClick={ _this.showInfo() }>查看</Antd.Button>
				<Antd.Modal footer="" title="边缘节点信息" visible={this.state.show} onCancel={this.handleCancel}>
					<Antd.Table size="small" columns={columns} dataSource={data} pagination={false} bordered/>
				</Antd.Modal>
			</div>
			
					
	    )
    }
}

module.exports = ViewInfo;
