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
            height : 50
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
                img.src = dailogData["param"]["url"];
                img.onload = function(){
                    this.setState({
                        isFinished : true,
                        width : img.width,
                        height : img.height
                    });
                }.bind(this);
            }
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
        var content = '';
        
        if(!isEmptyObj(dailogData) && !isEmptyObj(dailogData["param"]["visible"])){
            return false;
        }

        if(this.state.visible && !this.state.isFinished){
            return false;
           // return <ViewImg { ...this.props } visible = { this.state.isFinished }/>
        }else if(this.state.visible && this.state.isFinished){
            return <Modal title="查看执照" className = "enterprise_manager_authenticate_daliog" 
                visible={ _this.state.visible }
                width = { _this.state.width + 60 }
                height = { _this.state.height + 32 }
                onOk={ _this.handleOk } 
                onCancel={ _this.handleCancel }>
                <img src={ dailogData["param"]["url"]+"?random="+new Date().getTime()+generateMixed(6) }/>
            </Modal>
        }else{
            return false;
        }
        
    }
})