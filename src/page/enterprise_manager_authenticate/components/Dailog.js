import React from 'react'
import { Modal, Button } from 'antd'

export const Dailog = React.createClass({
	getInitialState() {
        return { 
            visible: false,
        }
    },

    handleOk(){

    },

    handleCancel(){
    	this.setState({
    		visible: false
    	})
    },


    
    render(){
    	const { dailogData } = this.props;
    	return <Modal title="第一个 Modal" visible={this.state.visible}
            onOk={this.handleOk} onCancel={this.handleCancel}>
	          
        </Modal>
    }
})