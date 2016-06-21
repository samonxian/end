import React from 'react'
import ReactDOM from 'react-dom'
import { isEmptyObj, generateMixed } from 'libs/function'
import { authenticateDailog } from '../action'
import { Modal, Button, Spin } from 'antd'

let ViewImg = React.createClass({
    getInitialState(){
        return {
            visible : false
        }
    },

    createDailogContainer(){
        const { dailogData } = this.props;
        if (!this.dailogContainer && !isEmptyObj(dailogData) && dailogData["param"]["visible"]) {
            this.dailogContainer = document.createElement('div');
            this.dailogContainer.setAttribute("id","img_view_layout");
            this.dailogLoading = document.createElement('div');
            this.dailogLoading.setAttribute("id","img_view_loading_content");
            this.dailogContainer.appendChild(this.dailogLoading);
            document.body.appendChild(this.dailogContainer);
        }
        this.dailogContainer;
    },
    
    componentWillReceiveProps(nextProps){
        const { visible } = nextProps;
    },

    componentDidUpdate(){
        const { dailogData } = this.props;
        var _this = this;

        if(!this.dailogContainer){
            this.createDailogContainer();
        }

        if(this.dailogContainer && this.state.visible ){
            ReactDOM.render(<Spin />,document.getElementById("img_view_loading_content"));
        }
    },

    render(){
        const { dailogData } = this.props;
        return null
    }
})

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
                    this.setState({
                        isFinished : true,
                        width : img.width,
                        height : img.height,
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
                height = { _this.state.height + 32 }
                onOk = { _this.handleOk } 
                onCancel = { _this.handleCancel }>
                { htl }
            </Modal>
        }else{
            return false;
        }
        
    }
})