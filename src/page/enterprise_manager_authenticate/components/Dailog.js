import React from 'react'
import ReactDOM from 'react-dom'
import { isEmptyObj, generateMixed } from 'libs/function'
import { authenticateDailog } from '../action'
import { Modal, Button, Spin } from 'antd'

export const Dailog = React.createClass({
	getInitialState() {
        return { 
            isFinished : false,
            visible : false,
            width : 80,
            height : 50,
            random : 0,
            isSuccess : "success"
        }
    },

    componentWillReceiveProps(nextProps){
        var _this = this;
        const { dailogData } = nextProps;
        if(!isEmptyObj(dailogData)){
            this.setState({
                visible: dailogData["param"]["visible"]
            });
            if(dailogData["param"]["url"] != undefined && !this.state.isFinished){
                var img = new Image();
                var random = new Date().getTime()+generateMixed(6);
                img.src = dailogData["param"]["url"]+"?random="+random;
                img.onerror = function(){
                    this.setState({
                        isSuccess : "error",
                        visible : true,
                        isFinished : true,
                        random : random
                    });
                }.bind(this);
                img.onload = function(){
                    var imgWidth = img.width;

                    if(imgWidth>800){
                        imgWidth = 800;
                    }
                    this.setState({
                        isFinished : true,
                        width : imgWidth,
                        isSuccess : "success",
                        random : random
                    });
                }.bind(this);
            }
        }
    },

    handleCancel(){
        const { dispatch } = this.props
    	this.setState({
    		visible: false,
            isFinished: false,
            width : 80,
            height : 50,
            random : 0,
    	});
        dispatch(authenticateDailog({
            visible: false
        }));
    },
    
    render(){
        const _this = this;
    	const { dailogData } = this.props;
        var content = '',
            htl = '';
        
        if(!isEmptyObj(dailogData) && !isEmptyObj(dailogData["param"]["visible"])){
            return false;
        }

        if(this.state.visible && !this.state.isFinished){
            return false;
        }else if(this.state.visible && this.state.isFinished){

            if(this.state.isSuccess === "success"){
                htl = <img src = { dailogData["param"]["url"]+"?random="+this.state.random }/>
            }else{
                htl = <div>图片加载错误</div>
            }

            return <Modal title="查看执照" className = "enterprise_manager_authenticate_daliog" 
                visible={ _this.state.visible }
                width = { _this.state.width + 60 }
                onOk = { _this.handleOk } 
                onCancel = { _this.handleCancel }>
                { htl }
            </Modal>
        }else{
            return false;
        }
        
    }
})