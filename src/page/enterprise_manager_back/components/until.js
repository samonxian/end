import React from 'react'

export const ENTERPRISE_MANAGER_TABLE_ENTERPRISE = [
     {
		title: '所属企业',
		dataIndex: 'identity'
     },
     {
		title: 'APP代号',
		dataIndex: 'code'
     },
     {
		title: 'APP ID',
		dataIndex: 'app_id'
     },
     {
		title: '设备ID',
		dataIndex: 'cid'
     },
     {
		title: '本次禁用过期时间',
		dataIndex: 'expire',
		render : function(text,record){
			return <span>{ new Date(text*1000).Format('yyyy-MM-dd hh:mm:ss') }</span>
		}
     },
     {
		title: '描述',
		dataIndex: 'description'
     },
     {
		title: '操作',
		dataIndex: 'opt',
		render : function(text ,record){
			var backOptFun = record["backOptFun"];
			if(record["status"] ===2){
				return <span className = "color_blue" onClick = { ()=>backOptFun(record) }>解禁</span>
			}else{
				return <span className = "color_red" onClick = { ()=>backOptFun(record) }>禁用</span>
			}
			
		}
     }
]

export const ENTERPRISE_MANAGER_TABLE_BACK_DAILOG = [
     {
		title: '邮箱',
		dataIndex: 'email'
     },
     {
		title: '代号',
		dataIndex: 'code'
     },
     {
		title: '分段ID',
		dataIndex: 'partition_id'
     },
     {
		title: '分段类型',
		dataIndex: 'type'
     },
     {
		title: '操作',
		dataIndex: 'opt',
		render: function(text,record){
			var backFun = record["backOpt"]
			return <span className="color_red" onClick = { ()=> backFun(record)}>禁用</span>
		}
     }
]