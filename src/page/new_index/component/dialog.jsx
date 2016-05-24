import React from 'react'
import { Modal,Table } from 'antd'
import { storageFetch } from '../action'
import { STOREAGE_HEADER } from './util'
import * as d3 from "d3"
import { Pie } from 'libs/defined-chart/Pie'

export const Dialog = React.createClass({

	getInitialState() {
	    return { 
            visible: false
        }
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
    
    tooltipPie(x,y){
        var userNum = Math.ceil(y/1024/1024/1024);
        if(x == "剩余存储"){
            return "剩余容量："+userNum + "G"
        }else{
            return x+"日使用："+userNum + "G";
        }
        
    },

    render(){
        const { keyId , dispatch, dialogData, totalCapacity} = this.props
        let showUsed = '',
            sort = null;

        if(dialogData["values"].length){
            showUsed = <div className="used_time"><span className="used_start_time">开始使用时间：{dialogData["values"][0]["x"]}</span><span>最后使用使时间：{dialogData["values"][dialogData["values"].length-2]["x"]}</span></div>
        }

    	return (<div>
    		    <a href="#" onClick={(keyId,dispatch)=>this.showStorestatus(keyId,dispatch)}>存储状态</a>
    		    <Modal title="磁盘存储状态" okText="确认" className="new_index_disk_model" cancelText="取消" width={582} onOk={this.handleOk} onCancel={this.handleCancel} visible={this.state.visible}>
                    <div className="total_capacity">磁盘总容量：{ totalCapacity }G</div>
                    {
                        showUsed
                    }
                    <Pie 
                        data={dialogData}
                        width={550}
                        height={450}
                        tooltipOffset={{top: 0, left: 500}}
                        tooltipHtml={this.tooltipPie}
                        tooltipMode = { "element" }
                        viewBox = { "0,0,550,450" }
                        sort={ sort }
                        style = {{ width:'550px',height:'450px' }} />
    		    </Modal>
    		</div>)
    }
})

