import React from 'react'
require('libs/function')

export const ASSET_MANANGER_TABLE = [
    {
	    title: '主机名',
	    dataIndex: 'hostname'
	},{
		title: '公网ip地址',
	    dataIndex: 'ip'
	},{
		title: '监控端',
	    dataIndex: 'monitor'
	},{
		title: 'linux时间戳',
	    dataIndex: 'time',
	    render: function(time){
	    	var date = new Date(time*1000).Format("yyyy-MM-dd hh:mm:ss");
	    	return <span>{ date }</span>
	    }
	},{
		title: '角色',
	    dataIndex: 'role'
	},{
		title: 'CPU使用等待时间',
	    dataIndex: 'cpuWait'
	},{
		title: 'CPU占用率',
	    dataIndex: 'cpuIdle',
	    render: function(text){
	    	return <span>{(100-text).toFixed(2)+"%"}</span>
	    }
	},{
		title: '详情',
	    key: 'operation',
	    render: function(text, record){
	    	var fun = record["showRole"];
	    	if(record["role"] === "other"){
	    		return <span></span>;
	    	}else{
	    		return <a href="javascript:void(0);" onClick = { ()=>fun(record)}>查看角色信息</a>;
	    	}
	    }
	}
]

export const ASSET_MANANGER_TABLE_DISK_MESSAGE = [
    {
    	title: '磁盘名称',
	    dataIndex: 'diskName'
    },
    {
    	title: '磁盘总量',
	    dataIndex: 'size'
    },
    {
    	title: '磁盘使用量',
	    dataIndex: 'used'
    },
    {
    	title: '磁盘剩余量',
	    dataIndex: 'avail'
    },
    {
    	title: '磁盘使用百分比',
	    dataIndex: 'pused'
    },
    {
    	title: '磁盘挂载点',
	    dataIndex: 'mounted'
    }
]
export const ASSET_MANANGER_TABLE_NETWORK_MESSAGE = [
    {
    	title: '网卡名称',
	    dataIndex: 'netName'
    },
    {
    	title: '网卡IP',
	    dataIndex: 'netIp'
    },
    {
    	title: '下行流量',
	    dataIndex: 'download'
    },
    {
    	title: '上行流量',
	    dataIndex: 'upload'
    }
]
export const ASSET_MANANGER_DAILOG_TABLE_lVS = [
    {
    	title: '虚拟IP地址及端口',
	    dataIndex: 'VIP',
	    render(text,record) {
		    let obj = {
		      children: record["VIP"],
		      props: {}
		    };
		    if (record["rowSpan"]) {
		    	 obj.props.rowSpan = record["rowSpan"];
		    }else{
		    	obj.props.rowSpan = 0;
		    }
		    return obj;
		}
    },
    {
    	title: '调度策略',
	    dataIndex: 'role',
	    render(text,record) {
		    let obj = {
		      children: record["role"],
		      props: {}
		    };
		    if (record["rowSpan"]) {
		    	 obj.props.rowSpan = record["rowSpan"];
		    }else{
		    	obj.props.rowSpan = 0;
		    }
		    return obj;
		}
    },
    {
    	title: '后端调度的真实IP加端口',
	    dataIndex: 'realIp'
    },
    {
    	title: '活跃连接数',
	    dataIndex: 'NUM'
    }
]