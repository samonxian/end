import React from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'
import { getUrlParams } from 'function'
 
class NPagination extends React.Component {
	constructor(){
		super(); 
	}

	getData(params={}){
		let { dispatch,form,action } = this.props
		params = Object.assign({ },form,params); 
		dispatch(action.fetchData(params,this.type));	
	}

	onPaginationChange(p){
		this.getData({
			p : p
		})	
	}

    render() {
		//console.log('dd',this.props)
        return (
			<div className="pagination">
				<Pagination onChange={this.onPaginationChange.bind(this)} 
					defaultCurrent={this.props.p} total={this.props.total_pages * 10} />
			</div>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	// console.log("user_log_query组件初始props",state);
	var target = getUrlParams(state.routing.location.pathname)[1];
	if(state[target]){
		// console.log(target)
		var p = state[target].posts && state[target].posts.p;
		var total_pages = state[target].posts && state[target].posts.total_pages;
		return {
			form : state[target+"_form"],
		    p : p,
		    total_pages : total_pages,
		};
	}else{
		return {
			
		}
	}
	
}
module.exports = connect(mapStateToProps)(NPagination)
