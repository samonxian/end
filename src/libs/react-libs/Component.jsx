import React from 'react'
import ReactDOM from 'react-dom'
import Loading from 'libs/antd/Loading'
window.removeLoading = false;
class Component extends React.Component {
	
	constructor(){
		super(); 
		this.state = { }
		if(this.dataAdapter){
			Object.assign(this,this.dataAdapter());
			this.dataAdapter = null;
		}
		if(this.events){
			Object.assign(this,this.events());
			this.events = null;
		}
	}

	setLoading(options={ }){
		var obj = {
			content : '加载中...',
			close : false,
		}
		obj  = Object.assign(obj,options);
		if(!removeLoading){
			var div = document.createElement('div');
			div.setAttribute('id','loading_container');
			document.body.appendChild(div);
			removeLoading = true;
		}
		if(obj.callback){
			this.stateAction = obj.callback;
			this.setState({
				__load__ : true
			})
		}
		var loading = <Loading top={ 200 } content={ obj.content } close={ obj.close }/>
		ReactDOM.render(loading,document.getElementById('loading_container'));
	}

	/**
	 *	事件处理
	 */
	//events(){ }
	/**
	 *	数据处理与适配
	 */
	//dataAdapter(){ }
}

module.exports = Component
