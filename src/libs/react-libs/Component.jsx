import React from 'react'
import ReactDOM from 'react-dom'
import Loading from 'libs/antd/Loading'
window.removeLoading = false;
/**
 *	此类规范化数据处理，事件绑定位置。数据处理类函数需要定义在类方法dataAdapter中，绑定事件需要统一在
 *	events中,调用dataAdapter，events中的方法直接在使用this就可以访问到。需要注意,当集成此类需要,在新建react组件
 *	的render方法中调用父类render方法。因为不调用，这些定义的方法无法热替换
 *@example
 * class Test exents Component{
 *		dataAdapter(){
 *			return {
 *				deal(){
 *					
 *				}
 *			}
 *		}
 *
 *		events(){
 *			return{
 *				switch(){
 *					
 *				}
 *			}
 *		}
 *
 *		render(){
 *			super.render();
 *		}
 * }
 */
class Component extends React.Component {
	
	constructor(){
		super(); 
		this.state = { }
		this.bindFunctions();
	}

	bindFunctions(){
		if(this.dataAdapter){
			Object.assign(this,this.dataAdapter());
			if(!module.hot){
				this.dataAdapter = null;
			}
		}
		if(this.events){
			Object.assign(this,this.events());
			if(!module.hot){
				this.events = null;
			}
		}

	}

	render(){
		if(module.hot){
			this.bindFunctions();
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
