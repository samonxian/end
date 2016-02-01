import React from 'react'
import { Operate } from '../component/Operate'

export const renderContent = function(value, row, index) {
  let obj = {
    children: value,
    props: {}
  }
  return obj
}

export const APP_HEADER = [
    {
		title : "中文名称",
		dataIndex : "companyName",
		render : renderContent
	},
    {
		title : "代号",
		dataIndex : "code",
		render : renderContent
	},
	{
		title : "APP ID",
		dataIndex : "id",
		render : renderContent
	},
	{
		title : "状态",
		dataIndex : "status",
		render : renderContent
	},
	{
		title : "类型",
		dataIndex : "type",
		render : renderContent
	},
	{
		title : "事件回调地址",
		dataIndex : "backUrl",
		render : renderContent
	},
	{
		title : "状态回调地址",
		dataIndex : "backStatusUrl",
		render : renderContent
	},
	{
		title : "操作",
		dataIndex : "",
		render : function(record){
			return <Operate />
		}
	}
]
