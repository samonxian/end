import 'libs/function'
import React from 'react'

export const VIDEO_SEARCH_TOOL_TABLE = [
    {
	     title: '存储区域',
	     dataIndex: 'ip',
	     className: "video_search_tool_width",
	     render : function(text, recode){
	     	 if(text === "183.57.151.208"){
	     	 	 return <span>佛山</span>
	     	 }
	     	 return <span>{ text }</span>
	     }
	},
    {
	     title: '起始时间',
	     dataIndex: 'from',
	     className: "video_search_tool_width",
	     render : function(text, recode){
	     	 return <span>{ new Date(text*1000).Format("yyyy-MM-dd hh:mm")}</span>
	     }
	}, 
	{
	    title: '结束时间',
	    dataIndex: 'to',
	    className: "video_search_tool_width",
	    render : function(text, recode){
	     	 return <span>{ new Date(text*1000).Format("yyyy-MM-dd hh:mm")}</span>
	     }
	}, 
	{
	    title: '地址',
	    dataIndex: 'playdata_url',
	},
	{
		title: '操作',
	    dataIndex: 'opt',
	    className: "video_search_tool_width",
	    render : function(text, recode){
	    	return <span 
	    	     data-clipboard-text = { recode["playdata_url"] }
	    	     className = "video_search_tool_copy">复制到剪切板</span>
	    }
	}
];