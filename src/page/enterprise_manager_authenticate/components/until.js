import React from 'react'
import { Icon } from 'antd'

export const ENTERPRISE_MANAGER_AUTHENTICATE_TABLE = [
     {
		title: '邮箱',
		dataIndex: 'manager_email'
     },
     {
		title: '企业名称',
		dataIndex: 'name'
     },
     {
		title: '企业执照号',
		dataIndex: 'code'
     },
     {
		title: '企业地址',
		dataIndex: 'address'
     },
     {
		title: '所属行业',
		dataIndex: 'business_type'
     },
     {
		title: '申请时间',
		dataIndex: 'created',
		render: function(text ,record){
			console.log("========================= text",text);
			return <span>{ new Date(text).Format('yyyy-MM-dd hh:mm:ss') }</span>
		}
     },
     {
		title: '执照',
		dataIndex: 'license_picture',
		render : function(text ,record){
			var openImageEvents = record["openImageFun"];
			return <a href="javascript:void(0);" onClick = { () => openImageEvents(record["license_picture"])}><Icon type="picture" /></a>
		}
     },
     {
		title: '操作',
		dataIndex: 'opt',
		render : function(text ,record){
			if(record["status"] === 0){
				var aprivalFun = record["aprivalFun"];
				return <span className = "color_blue" onClick = { ()=>aprivalFun(record) }>审核</span>
			}else if(record["status"] === 1){
				return <span className = "color_green">同意</span>
			}else if(record["status"] === 2){
				return <span className = "color_red">拒绝</span>
			}
		}
     }

]