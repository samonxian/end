import React from 'react'
import * as Antd from 'antd'
import { title } from '../../user_log/title'

class content_Nav extends React.Component {

	componentDidMount(){
		var _this = this;
		let top = 0,scrollTop;
		this.scrollEvent = function(e){
			if(_this.parent.table_co_dom){
				top = _this.parent.table_co_dom.offsetTop;
			}
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(top < (scrollTop-10)){
				_this.setState({
					fixed : "uql_title_bar_fixed"
				})
			}
			if(top > (scrollTop-10)){
				_this.setState({
					fixed : ""
				})
			}

			//console.log('top',top)
			//console.log('scrollTop',scrollTop)
		}
		document.addEventListener('scroll',this.scrollEvent);
		
	}

	componentWillUnmount(){
		document.removeEventListener('scroll',this.scrollEvent,false) 
	}

    render() {
		let _this = this;
	    let { posts,title_bar_item,parent,left_data,post_count } = this.props;
		this.parent = parent;
		title['other'] = '日志'; 
		
		//console.debug(post_count)
		let uql_title_bar_class  = "uql_title_bar ";
		if(this.state){
			if(this.state.fixed){
				uql_title_bar_class = "uql_title_bar " + this.state.fixed;
			}
		}
        return (
			<div className={uql_title_bar_class}  >
				<Antd.Menu onClick={parent.switchLogType} selectedKeys={[title_bar_item]} theme="dark" mode="horizontal">
					{
						left_data.map(function(value,key){
							return (
								<Antd.Menu.Item key={value}>
									{
										title[value].concat('(',post_count[value] ,')')
									}
								</Antd.Menu.Item>
							)
						})
					}
					
				</Antd.Menu>
			</div>
	    )
    }
}

export default content_Nav 
