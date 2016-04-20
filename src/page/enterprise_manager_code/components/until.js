import React from 'react'
export const ENTERPRISE_MANAGER_CODE_APP_TYPE = ['','第三方厂商','内部服务器','第三方服务器']
const renderCommon = function(text,record){
	return <span className="enterprise_manager_code_table_padding">{ text }</span>
}

export const ENTERPRISE_MANAGER_TABLE_ENTERPRISE = [
     {
		title: '所属企业',
		dataIndex: 'identity',
		render: renderCommon
     },
     {
		title: '代号',
		dataIndex: 'code',
		render: renderCommon
     },
     {
		title: 'APP ID',
		dataIndex: 'app_id',
		render: renderCommon
     },
     {
		title: 'APP 类型',
		dataIndex: 'type',
		render: function(text ,record){
			 return <span className="enterprise_manager_code_table_padding">{ ENTERPRISE_MANAGER_CODE_APP_TYPE[text] }</span>
		}
     },
     {
		title: '申请时间',
		dataIndex: 'created',
		render: function(text ,record){
			return <span className="enterprise_manager_code_table_padding">{ new Date(text).Format('yyyy-MM-dd hh:mm:ss') }</span>
		}
     },
     {
		title: '通用回调地址/状态回掉地址',
		dataIndex: 'common_webhook',
		render : function(text ,record){
			return <div style={{width:'100%'}}>
			            <div className = "enterprise_manager_code_table_colpse enterprise_manager_code_table_colpse_boder">{ record["common_webhook"] }</div>
			            <div className = "enterprise_manager_code_table_colpse">{ record["state_webhook"] }</div>
			       </div>
		}
     }
]