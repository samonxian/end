import React from 'react'
import { isEmptyObj, generateMixed } from 'libs/function'
import { authenticateDailog } from '../action'
import { Modal, Button } from 'antd'

export const Dailog = React.createClass({
	getInitialState() {
        return { 
            visible: false,
        }
    },

    componentWillReceiveProps(nextProps){
        const { dailogData } = nextProps;
        if(!isEmptyObj(dailogData)){
            this.setState({
                visible: dailogData["param"]["visible"]
            })
        }
    },

    handleCancel(){
        const { dispatch } = this.props
    	this.setState({
    		visible: false
    	});
        dispatch(authenticateDailog({
            visible: false
        }));
    },


    
    render(){
        const _this = this;
    	const { dailogData } = this.props;
        
        console.log("=================== dailogData",dailogData);
        if(!isEmptyObj(dailogData) && !isEmptyObj(dailogData["param"]["visible"])){
            return false;
        }
        return <Modal title="查看执照" className = "enterprise_manager_authenticate_daliog" visible={_this.state.visible}
            onOk={_this.handleOk} onCancel={_this.handleCancel}>
             <img src = { dailogData["param"]["url"] }/> 
        </Modal>
        return <span></span>;
    }
})