import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import { tipsMessage, videoSearchFetch } from './action'
import { loginIntoPage } from '../enterprise_manager_authenticate/action'
import { isEmptyObj, generateMixed } from 'libs/function'
import { Spin, Table, Row, Col, message } from 'antd'
import { VIDEO_SEARCH_TOOL_TABLE } from './components/Until'
import { push } from 'react-router-redux'
import Clipboard from "clipboard"
import { Tips } from 'libs/react-libs/Tips'
import { Search } from './components/Search'

require('css/video_search_tool.css');

class VideoSearchTool extends Component{
    
    componentDidMount(){
        var clipboard = new Clipboard(".video_search_tool_copy")
        clipboard.on('success', function(e) {
          message.success("复制成功！")
          e.clearSelection();
        });

        clipboard.on('error', function(e) {
          message.info("请使用⌘-C完成复制！")
        });

        const { userLoginStatus, dispatch } = this.props;

        // if(isEmptyObj(userLoginStatus)){
            
        // }
        dispatch(videoSearchFetch({
            cid : "",
            start_time : parseInt(new Date().getTime()/1000),
            end_time : parseInt(new Date().getTime()/1000)
        }));
        dispatch(loginIntoPage({
            url : "/video_search_tool"
        }));

    }

    dataAdapter(){
        var _this = this;
        let obj = {
            adapterDataList(data){
                for(var i = 0;i<data.length;i++){
                    data[i]["key"] = "video_search_tool_table_key_"+ i;
                }
                return data;
            }
        }
        return obj;
    }

  	render(){
        var tips = {},
            videoHtl = '',
            videoList = [];

        const { tipsProps, videoSearchProps, dispatch } = this.props;

        if(!isEmptyObj(tipsProps) && !isEmptyObj(tipsProps["param"])){
            tips = {
                visible : true,
                title : tipsProps["param"]["title"],
                status : tipsProps["param"]["status"],
                callback : function(){
                    dispatch(tipsMessage({}));
                }
            }
        }

        if(!isEmptyObj(videoSearchProps)){
            videoList = this.adapterDataList(videoSearchProps["param"]["data"]["record"]);

            videoHtl = <Table columns={ VIDEO_SEARCH_TOOL_TABLE } 
                dataSource = { videoList } 
                bordered
                pagination = { false }
                className = { "video_search_tool_table_classname" }/>
        }

        return (<div>
            <Row type="flex" justify="start" className = "video_search_tool_header">
                 <h1>录像查询工具</h1>
            </Row>
            <Search { ... this.props }/>
            { videoHtl }
            <Tips tips = { tips }/>
        </div>)
  	}
}

function mapStateToProps(state){
  	return {
        tipsProps : state.getTipsMessage,
        userLoginStatus : state.user_login_status,
        videoSearchProps : state.getVideoSearchToolData
  	};
}

module.exports = connect(mapStateToProps)(VideoSearchTool)