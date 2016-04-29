import React from 'react'
import { message } from 'antd'
import { isEmptyObj } from 'libs/function'

export const Tips = React.createClass({
	getInitialState(){
		return {
			visible : false
		}
	},

	componentWillReceiveProps(nextProps){
        const { tips } = nextProps;
        if(!isEmptyObj(tips)){
        	if(tips["visible"]){
	            this.setState({
	                visible : true
	            });
	        }
        }
    },
    
    componentDidUpdate(prevProps,prevState){

    	const { tips } = this.props;
    	var _this = this;

        if(this.state.visible){
	        if(tips["status"] == 200){
	        	message.success(tips["title"]);
			} else{
				message.warn(tips["title"]);
			}
        }

    	if(this.state.visible){
    		setTimeout(function(){
    			_this.setState({
	                visible : false
	            });
	            tips.callback();
	            message.destroy();
	    	},600);
    	}

    },

	render(){
		var icon = "";
        const { tips } = this.props;

        if(isEmptyObj(tips)){
        	return false;
        }

		return false;
	}
})