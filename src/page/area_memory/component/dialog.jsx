import React from 'react'
import { Modal,Table } from 'antd'
import { AREA_MEMORY_DETAIL } from './until'
import { fetchAreaMemoryDetailData } from '../action'

export const Dialog = React.createClass({

	getInitialState() {
        return { 
            visible: false,
        }
    },

    showDialog(){
        const { dispatch, detailData } = this.props;
        this.setState({
            visible : true
        });
    },

    handleOk(){

        this.setState({
            visible : false,
        });
    },

    handleCancel(){
        const { dispatch } = this.props
        dispatch(fetchAreaMemoryDetailData([]));
    },

     componentWillReceiveProps(nextProps){

        if(nextProps["showDetailData"].length>0){
            this.setState({
                visible : true
            });
        }else{
            this.setState({
                visible : false,
            });
        }
     },

    render(){
        const { showDetailData } = this.props;

        return (<div>
                <Modal title="磁盘信息详情" visible={this.state.visible} width={835} className="area_memory_detail"
                      onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Table columns={ AREA_MEMORY_DETAIL } dataSource={ showDetailData } bordered pagination={false} />
                </Modal>
            </div>)
    }
})