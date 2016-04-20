import React from 'react'

export const ASSET_MANAGER_CONFIG_TABLE = [
    {
		title: '主机名',
		dataIndex: 'hostname'
    },
    {
		title: 'IP公网地址',
		dataIndex: 'IP'
    },
    {
		title: '类型',
		dataIndex: 'type',
		render : function(text){
			if(text === "virtual"){
				return <span>虚拟机</span>
			}
			if(text === "physical"){
				return <span>物理机</span>
			}
		}
    },
    {
		title: '运营商',
		dataIndex: 'ISP',
		render : function(text){
			var isp = "";
			switch(text){
				case "CMCC" :
					isp = "移动";
					break;
				case "CNC" :
					isp = "联通";
					break;
				case "CTC" :
					isp = "电信";
					break;
				case "TIANWEI" :
					isp = "天威";
					break;
				case "Tencent" :
					isp = "腾讯云";
					break;
				case "ALi" :
					isp = "阿里云";
					break;
				case "Other" :
					isp = "其他";
					break;
			}
			return <span>{ isp }</span>
		}
    },
    {
		title: '托管商',
		dataIndex: 'vendor'
    },
    {
		title: '所在省',
		dataIndex: 'province'
    },
    {
		title: '所在城市',
		dataIndex: 'city'
    },
    {
		title: '品牌',
		dataIndex: 'brand'
    },
    {
		title: '型号',
		dataIndex: 'model'
    },
    {
		title: '操作',
		dataIndex: 'opt',
		render : function(text, record){
		   var deteleFun = record["deleteFun"],
		       editFun = record["editFun"],
		       detailFun = record["detailFun"];
		   return <div className = "asset_manager_config_table_opt">
		              <a href="javascript:void(0);" onClick = { ()=> detailFun(record) } >详情</a>
		              <a herf="javascript:void(0);" onClick = { ()=> editFun(record) } className = "color_green">修改</a>
		              <a href="javascript:void(0);" onClick = { ()=> deteleFun(record) }className="color_red">删除</a>
		         </div>
		}
    }
]