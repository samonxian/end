import React from 'react'
import ReactDOM from 'react-dom'
import { isEmptyObj, generateMixed } from 'libs/function'
import { authenticateDailog } from '../action'
import { Modal, Button } from 'antd'

// let ViewImg = React.createClass({
//     getInitialState(){
//         return {
//             isLoading : true,
//             imgWidth : 50,
//             imgHeight : 50
//         }
//     },

//     createDailogContainer(){
//         const { dailogData } = this.props;
//         if (!this.dailogContainer && !isEmptyObj(dailogData) && dailogData["param"]["visible"]) {
//             this.dailogContainer = document.createElement('div');
//             this.dailogLoading = document.createElement('div');
//             this.dailogContent = document.createElement('div');
//             this.dailogLoading.setAttribute("id","img_view_loading_content");
//             this.dailogContainer.setAttribute("id","img_view_layout_container");
//             this.dailogContainer.appendChild(this.dailogLoading);
//             this.dailogContainer.appendChild(this.dailogContent);
//             document.body.appendChild(this.dailogContainer);
//         }
//         this.dailogContainer;
//     },
    
//     componentWillReceiveProps(nextProps){
//         const { dailogData } = nextProps;
//         console.log("====================== nextProps",nextProps);
//     },

//     shouldComponentUpdate(){
//         console.log("====================== shouldComponentUpdate");
//         console.log(this.state);
//         return true;
//     },

//     componentDidUpdate(){
//         const { dailogData } = this.props;
//         var _this = this;

//         if(!this.dailogContainer){
//             this.createDailogContainer();
//         }

//         if(this.dailogContainer &&　this.state.isLoading){
//             ReactDOM.render(<Spin />,document.getElementById("img_view_loading_content"));
//             var img = new Image();
//             img.src = dailogData["param"]["url"];
//             console.log("======================= img url ",dailogData["param"]["url"]);
            

//             console.log("====================== _this",_this);
            
//             img.onload = function(){
//                 console.log("====================== img onload");
//                 console.log(img.width);
//                 console.log(img.height);
//                 _this.setState({
//                     isLoading : false,
//                     imgWidth : img.width,
//                     imgHeight : img.height
//                 })
//             }
//         }
        
//         console.log("============================ componentDidUpdate",this.state);
//         if(this.dialogContainer && !this.state.isLoading ){
//             console.log("==========================");
//         }
//     },

//     render(){
//         const { dailogData } = this.props;
//         return null
//     }
// })

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
                    _this.onload = true;
                    _this.setState({
                        width : img.width,
                        height : img.height,
                        isFinished : true
                    })
                }

            }
            console.log("==================== this",this);
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
       // return <ViewImg { ... this.props }/>
        // }else{
        //     ReactDOM.render(<ViewImg { ... this.props }/>,document.body);
        // }
        
        // else{
        //     var img = new Image();
        //     img.src = dailogData["param"]["url"];
        //     img.onload = function(){
        //         _this.setState({
        //             isFinished : true,
        //             width : img.width,
        //             height :　img.height
        //         })
        //     }
        //     if(!this.state.isFinished){
        //         content = <Spin />
        //     }else{
        //         content = <img src={ dailogData["param"]["url"] }/>
        //     }
        // }
        return <Modal title="查看执照" className = "enterprise_manager_authenticate_daliog" 
            visible={ _this.state.visible }
            width = { _this.state.width + 60 }
            height = { _this.state.height + 32 }
            onOk={ _this.handleOk } 
            onCancel={ _this.handleCancel }>
            <img src={ dailogData["param"]["url"] }/>
        </Modal>
        // if(this.state.visible){
        //     return <div className = "img_view_container"> 1111</div>
        //     // return React.createElement("DIV",{},)
        //    // React.render(<div className = "img_view">{content}</div>,document.body)
        // }else{
        //     return <div className = "img_view_container"></div>
        // }
        
    }
})