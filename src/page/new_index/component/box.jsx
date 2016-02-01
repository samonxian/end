import React from 'React'
import { Tooltip } from 'antd'

export class Box extends React.Component{

    render(){
		let text = this.props.text;
		return (<Tooltip placement="topLeft" title={this.props.showMessage}><a className={text==0?'box_empty':'box_solid'}>{text}</a></Tooltip>)
	}

}

export class BoxContainer extends React.Component{

	render(){
		let rows = [];
		let arr = this.props.text.desc;
		let filterArr = this.props.text.filterArra
		arr.forEach(function(text){
			let ip, port, showMessage
			if(text>0){
				ip = filterArr[text-1]["ip"];
				port = filterArr[text-1]["port"];
				showMessage = ip+":"+port;
			}
			
			rows.push(<Box text={text} showMessage={showMessage} key={"box_key_"+new Date().getTime()+Math.random()} />);
		})
		return (<div className="boxContainer">{rows}</div>);
	}
}