import React from 'react'
import * as Antd from 'antd'
class Loading extends React.Component {
	constructor(){
		super(); 
	}

	componentDidUpdate(){
		this.props.callback && this.props.callback();
	}

    render() {
		if(this.props.close){
			var display = "none";
		}else{
			var display = 'block';
		}
		var style = {
			top: this.props.top + 'px', 
			display: display 
		}
        return (
			<div style={ style } className="ant-message">
				<div className="ant-message-notice">
					<div className="ant-message-notice-content">
						<i className="ant-message-loading anticon anticon-loading"/>
						<span>{ this.props.content }</span>
					</div>
				</div>
			</div>
	    )
    }
}

module.exports = Loading 
