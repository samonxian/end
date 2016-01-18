import React from 'react'
import { Modal,Table } from 'antd'
import { storageFetch } from '../action'
import { STOREAGE_HEADER } from './util'
import * as d3 from "d3"
let ReactD3 = require('react-d3-components')
let PieChart = ReactD3.PieChart

export const Dialog = React.createClass({

	getInitialState() {
	    return { visible: false,
                 tooltip : {
                    hidden: true
                 }
               };
	},

    showStorestatus(e){
    	this.setState({
    		visible : true
    	});
    	const { keyId , dispatch } = this.props;
    	dispatch(storageFetch({id : keyId}));
    },

    handleOk(){
    	this.setState({
    		visible : false
    	});
    },

    handleCancel(){
    	this.setState({
    		visible : false
    	});
    },
    
    tooltipPie(value){
        console.log(value);
        this.setState({
            tooltip : {
                hidden: false,
                html: value
            }
        });
    },

    render(){
        const { keyId , dispatch, dialogData} = this.props

    	return (<div>
    		    <a href="#" onClick={(keyId,dispatch)=>this.showStorestatus(keyId,dispatch)}>存储状态</a>
    		    <Modal title="磁盘存储状态" okText="确认" cancelText="取消" onOk={this.handleOk} onCancel={this.handleCancel} visible={this.state.visible}>
                    <PieChart 
                        data={dialogData}
                        width={480}
                        height={380}
                        tooltipOffset={{top: 175, left: 200}}
                        tooltipHtml={this.tooltipPie}
                        tooltipMode={'fixed'}>
                       </PieChart>
    		    </Modal>
    		</div>)
    }
})

