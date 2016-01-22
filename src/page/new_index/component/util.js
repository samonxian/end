import React from 'react'
import { Dialog } from './dialog'
import { BoxContainer } from './box'

export const renderContent = function(value, row, index) {
  let obj = {
    children: value,
    props: {}
  }
  return obj
}

export const STOREAGE_HEADER = [{
		title : "磁盘容量",
		dataIndex : "total",
		render : renderContent
	},
	{
		title : "磁盘ID",
		dataIndex : "id",
		render : renderContent
	},
	{
		title : "使用日期",
		dataIndex : "time",
		render : renderContent
	},
	{
		title : "无用数据",
		dataIndex : "nodata",
		render : renderContent
	},
	{
		title : "点偏移量",
		dataIndex : "",
		render : renderContent
	}
]

export const INDEX_CAMERA = [
    {
      title: '时间轴',
      dataIndex: 'timeline',
      render: renderContent
    },
    {
      title: '区域',
      dataIndex: 'area',
      render: renderContent
    },
    {
      title: '分组号',
      dataIndex: 'group',
      render: renderContent
    },
     {
      title: '开始时间',
      dataIndex: 'start_time',
      render: renderContent
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      render: renderContent
    },
    {
      title: '存储状况',
      dataIndex: 'detail',
      render: function(text, row, index){
          return <BoxContainer text={text}/>;
      }
    }
]

export const INDEX_MONITOR = [
    {
	  title: '时间',
	  dataIndex: 'create_at',
	  render: renderContent
	},
	{
	  title: 'MongoDB 更新操作次数',
	  dataIndex: 'insert_op',
	  render: renderContent
	},
	{
	  title: 'MongoDB 查询操作次数',
	  dataIndex: 'query_op',
	  render: renderContent
	},
	{
	  title: '播放数据平均查询时间 (ms)',
	  dataIndex: 'playdata_query_time',
	  render: renderContent
	},
	{
	  title: 'MQ 处理的消息数',
	  dataIndex: '',
	  render: renderContent
	}
]

export function isEmptyObj(obj){
	for(var name in obj){
		if(obj.hasOwnProperty(name)){
			return false;
		}
	}
	return true;
}

Date.prototype.Format = function(fmt){ 
  var o = {   
    "M+" : this.getMonth()+1,                 
    "d+" : this.getDate(),                       
    "h+" : this.getHours(),                     
    "m+" : this.getMinutes(),                
    "s+" : this.getSeconds(),                
    "q+" : Math.floor((this.getMonth()+3)/3),
    "S"  : this.getMilliseconds()            
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 

