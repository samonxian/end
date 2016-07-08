import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import { tipsMessage } from './action'
import { isEmptyObj, generateMixed } from 'libs/function'
import { Spin, Table, Row, Col, message } from 'antd'
import { VIDEO_SEARCH_TOOL_TABLE } from './components/Until'
import Clipboard from "clipboard"
import { Tips } from 'libs/react-libs/Tips'
import { Search } from './components/Search'

require('css/video_search_tool.css');

class VideoSearchTool extends Component{
    
    componentDidMount(){
        var clipboard = new Clipboard(".video_search_tool_copy")
        clipboard.on('success', function(e) {
          message.success("复制成功！")
          console.info('Text:', e.text);
          console.info('Trigger:', e.trigger);
          e.clearSelection();
        });

        clipboard.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
          message.info("请使用⌘-C完成复制！")
        });
    }

    componentWillUnmount(){
       
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
            
            console.log("==================== videoList",videoList.length);

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
        videoSearchProps : state.getVideoSearchToolData
  	};
}

module.exports = connect(mapStateToProps)(VideoSearchTool)