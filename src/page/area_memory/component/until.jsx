import React from 'react'
import { fieldSort } from 'libs/function'

const renderContent = function (value, row, index) {
	let obj = {
	    children: value,
	    props: {}
	};
	return obj;
}

const renderRowSpan = function(text,record){
    let obj = {
	    children: record["area"],
	    props: {}
	}
    if (record["rowSpan"]) {
    	 obj.props.rowSpan = record["rowSpan"];
    }else{
    	obj.props.rowSpan = 0;
    }
    return obj;
}

const area_service_forword = function(text,record){
	return <span>{ record["disc_num"] }/{ record["relay_server_num"] }</span>
}

const area_online_offline = function(text,record){
	return <span>{ record["online_disc_num"] }/{ record["offline_disc_num"] }</span>
}

const area_work_empty = function(text,record){
	return <span>{ record["work_disc_num"] }/{ record["empty_disc_num"] }</span>
}

const forword_accept = function(text,record){
	if(record["in_connections"]>0){
		var font_style = '';
		if(record["max_accept"] === record["in_connections"]){
			font_style = 'bold'
		}
		var forword_width = (70/record["max_accept"])*record["in_connections"];
	    return <div className="area_memory_forword"><span className="area_memory_forword_accept" style={{width:forword_width+"%"}}></span><span style={{fontWeight:font_style}}>{record["in_connections"]}</span></div>
	}else{
		return <div className="area_memory_no_data"></div>
	} 
}

const forword_send = function(text,record){
	if(record["out_connections"]>0){
		var font_style = '';
		if(record["max_send"] === record["out_connections"]){
			font_style = 'bold'
		}
		var forword_width = (70/record["max_send"])*record["out_connections"];
	    return <div className="area_memory_forword"><span className="area_memory_forword_send" style={{width:forword_width+"%"}}></span><span style={{fontWeight:font_style}}>{record["out_connections"]}</span></div>
	}else{
		return <div className="area_memory_no_data"></div>
	}
}

const forword_wait = function(text,record){
	if(record["wait_connections"]>0){
		var font_style = '';
		if(record["max_wait"] === record["wait_connections"]){
			font_style = 'bold'
		}
		var forword_width = (70/record["max_wait"])*record["wait_connections"];
	    return <div className="area_memory_forword"><span className="area_memory_forword_wait" style={{width:forword_width+"%"}}></span><span style={{fontWeight:font_style}}>{record["wait_connections"]}</span></div>
	}else{
		return <div className="area_memory_no_data"></div>
	}
}

const forword_formate_time = function(value, row, index){
	var time = new Date(value).Format("yyyy-MM-dd hh:mm:ss")
	let obj = {
	    children: time,
	}
	return obj
}

const forword_formate_disksize = function(value, row, index){
	var size = new Number(value/1020/1024/1024).toFixed(2)+"GB"
	let obj = {
	    children: size
	}
	return obj
}

const area_user_num_seven = function(text,record){
	var showSituation = "",
	    showSituationUnhealth = "",
	    showSituation_thirty = "",
	    showSituation_unhealth_thirty = "",
	    thirty_width = "",
	    font_style = '',
	    total = 0,
	    thirty_font_style = '',
	    thirty_background= "#2C94C3",
	    seven_background = "#2C94C3",
	    seven_width = 0;
    
    if(record["max_seven"] > record["max_thirty"]){
    	total = record["max_seven"];
    }else{
    	total = record["max_thirty"];
    }

    if(record["user_num7"]!==undefined && record["user_num7"]>0){
    	if(record["user_num7"] === total){
    		font_style = 'bold'
    	}
    	seven_width = (80/total)*record["user_num7"];
    }else{   	
    	seven_background = "#d9d9d9"
    }
	if(record["subhealth_user_num7"]>0){
		var seven_health_width = (80/total)*record["subhealth_user_num7"];
		showSituation = <div className="area_memory_unhealth_user_num" style={{width:seven_health_width+"%"}}>{record["subhealth_user_num7"]}</div>
	}
    if(record["unhealth_user_num7"]>0){
    	var seven_unhealth_width = (80/total)*record["unhealth_user_num7"];
    	showSituationUnhealth = <div className="area_memory_health_user_num" style={{width:seven_unhealth_width+"%"}}>{record["unhealth_user_num7"]}</div>
    }
    if(record["user_num30"]!==undefined && record["user_num30"]>0){
    	if(total === record["user_num30"]){
    		thirty_font_style = 'bold'
    	}
    	thirty_width = (80/total)*record["user_num30"];
    	if(record["subhealth_user_num30"]!==undefined && record["subhealth_user_num30"]>0){
            var thirty_health_width = (80/total)*record["subhealth_user_num30"];
	    	showSituation_thirty = <div className="area_memory_unhealth_user_num" style={{width:thirty_health_width+"%"}}>{record["subhealth_user_num30"]}</div>
	    }
	    
	    if(record["unhealth_user_num30"]!==undefined && record["unhealth_user_num30"]>0){
	    	var thirty_unhealth_width = (80/total)*record["subhealth_user_num30"];
	    	showSituation_unhealth_thirty = <div className="area_memory_health_user_num" style={{width:thirty_unhealth_width+"%"}}>{ record["unhealth_user_num30"] }</div>
	    }
    }else{
    	thirty_background = "#d9d9d9";
    }
  
	return <span className="area_memory_span">
                <div className="area_memory_height">
                    <div className="area_memory_total_num" style={{width:seven_width+'%',background:seven_background}}>
			            { showSituation }
			            { showSituationUnhealth }
			        </div>
			        <span style={{fontWeight:font_style}}>{record["user_num7"]}</span>
                </div>
                <div className="area_memory_height">
                    <div className="area_memory_total_num" style={{width:thirty_width+'%',background:thirty_background}}>
			           { showSituation_thirty }
			           { showSituation_unhealth_thirty }
			        </div>
			        <span style={{fontWeight:thirty_font_style}}>{record["user_num30"]}</span>
                </div>
       </span>
}

export const AREA_TABLE = [
    {
    	title: '区域',
	    dataIndex: 'area',
	    render: renderContent
    },
    {
    	title: '磁盘服务器/转发数据',
	    dataIndex: 'disc_num',
	    render: area_service_forword
    },
    {
    	title: '磁盘上/下线数据',
	    dataIndex: 'online_disc_num',
	    render: area_online_offline
    },
    {
    	title: '磁盘工作/空闲数据',
	    dataIndex: 'work_disc_num',
	    render: area_work_empty
    },
    {
    	title: '7天/30天存储路数情况',
	    dataIndex: 'relay_server_num',
	    render: area_user_num_seven
    }
]

export const FORWORD_TABLE = [
    {
	    title: '区域',
	    dataIndex: 'area',
	    render: renderRowSpan
	},
    {
	    title: 'PEER_ID',
	    dataIndex: 'peer_id',
	    render: renderContent
	},{
		title: 'IP',
	    dataIndex: 'ip',
	    render: renderContent
	},{
		title: '接收路数',
	    dataIndex: 'in_connections',
	    render: forword_accept
	},{
		title: '发送路数',
	    dataIndex: 'out_connections',
	    render: forword_send
	},{
		title: '待命路数',
	    dataIndex: 'wait_connections',
	    render: forword_wait
	},{
		title: '接收宽带',
	    dataIndex: 'formate_downspeed',
	    render: renderContent
	},
	{
		title: '发送宽带',
	    dataIndex: 'formate_upspeed',
	    render: renderContent
	}
]

export const AREA_MEMORY_DETAIL = [
    {
	    title: '磁盘ID',
	    dataIndex: 'did',
	    render: renderContent
	},{
		title: '第一次存储时间',
	    dataIndex: 'fist_time',
	    render: forword_formate_time
	},{
		title: '最后一次存储时间',
	    dataIndex: 'last_time',
	    render: forword_formate_time
	},{
		title: '偏移量',
	    dataIndex: 'pos',
	    render: forword_formate_disksize
	},{
		title: '总容量',
	    dataIndex: 'total',
	    render: forword_formate_disksize
	},
	{
		title: '已使用空间',
	    dataIndex: 'used',
	    render: forword_formate_disksize
	}
]