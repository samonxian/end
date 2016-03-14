import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import * as actionCreater from './action'
import * as Antd from 'antd'
import * as dataSet from './data'
import imagesloaded from 'imagesloaded'

class Monitor_direct_seeding extends Component {
	constructor(){
		super(); 
	}

	imagesloaded(){
		var imgLoad = imagesloaded('#app_container');
		imgLoad.on('always', function() {
			console.debug(imgLoad.images.length + ' images loaded');
			// detect which image is broken
			for (var i = 0, len = imgLoad.images.length; i < len; i++) {
				var image = imgLoad.images[i];
				var result = image.isLoaded ? 'loaded' : 'broken';
				image.img.nextSibling.style.display = 'none';
				if(image.isLoaded){
					image.img.style.display = 'block' ;
					image.img.nextSibling.nextSibling.style.display = 'none';
				}else{
					image.img.style.display = 'none' ;
					image.img.nextSibling.nextSibling.style.display = 'block';
				}
				//console.debug('image is ' + result + ' for ' + image.img.src);
			}
		});
	}

	componentDidUpdate(){
		this.imagesloaded();
	}

	componentDidMount(){
		var _this = this;
		this.props.dispatch(actionCreater.fetchData());	
		this.clearInterval = setInterval(function(){
			_this.props.dispatch(actionCreater.fetchData());	
			//console.debug(1)
		},2000)
	}

	componentWillUnmount(){
		clearInterval(this.clearInterval)
	}

	dataAdapter(){
		return {
			sortByCameraState(data){
				let t_data = [],t_data2 = [];
				data.forEach(function(v,k){
					if(v.state == 4){
						t_data.push(v);
					}else{
						t_data2.push(v);
					}
				})
				t_data.sort(function(a,b){
					var c = a.all_online,d = b.all_online;
					if(!c){ c = 0; }
					if(!d){ d = 0; }
					return d - c;
				})
				return data = t_data.concat(t_data2);  
			},
			sortByCid(data){
				data.sort(function(a,b){
					return b.cid - a.cid;
				})
			},
		}
	}

    render() {
		//console.log(this.props)
		let { monitor_direct_seeding ,location,dispatch } = this.props;
		let posts = monitor_direct_seeding.posts;
		if(posts){
			this.sortByCid(posts);
			posts = this.sortByCameraState(posts);
			//console.debug(posts)
			let data = dataSet.dataAdapter(posts);
			return (
				<div className="mds_con">
					<h1>直播监控</h1>
					<br/>
					<Antd.Table className="" loading={false} size="middle"
							columns={dataSet.columns} dataSource={data} pagination={false} bordered/>
				</div>
			)
		}else{
			return (
				<Antd.Table className="" loading={true} size="middle"
						columns={dataSet.columns} dataSource={[]} pagination={false} bordered/>
			
			)
		}
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state,props){
	return {
	    monitor_direct_seeding : state.monitor_direct_seeding
	};
}
module.exports = connect(mapStateToProps)(Monitor_direct_seeding)
