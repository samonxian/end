import React from 'react'
import { Modal,Table } from 'antd'
import { isEmptyObj, generateMixed, transformToKbMbGb } from 'libs/function'
import { clearDailogData } from '../action'
import { ASSET_MANANGER_DAILOG_TABLE_lVS } from './until'

export const Dialog = React.createClass({

	getInitialState() {
        return { 
            visible: false,
        }
    },

    handleOk(){
        const { dispatch } = this.props;
        this.setState({
            visible : false,
        });
        dispatch(clearDailogData());
    },

    handleCancel(){
       const { dispatch } = this.props;
        this.setState({
            visible : false,
        });
       dispatch(clearDailogData());
    },

    componentWillReceiveProps(nextProps){
        const { detailData } = nextProps;

        if(!isEmptyObj(detailData) && !isEmptyObj(detailData["data"])){
            this.setState({
                visible : true,
            });
        }else{
            this.setState({
                visible : false,
            });
        }
     },

    adapterHtml(detailData){
        var htl = [];
        var tempObj = detailData["data"];
        switch(tempObj["role"]){
            case "central_db":
                 if(tempObj["mongo27117"] !==undefined && tempObj["mongo27117"] !== null){
                    var obj = tempObj["mongo27117"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                        <span className = "asset_mananger_dailog_title">27117进程相关信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                        </div>)
                 }
                 break;
            case "area_db":
                 if(tempObj["mongo27017"] !==undefined && tempObj["mongo27017"] !== null){
                    var obj = tempObj["mongo27017"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                        <span className = "asset_mananger_dailog_title">27017进程相关信息</span>
                        <div className = "asset_mananger_dailog_container">
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                        </div>
                      </div>)
                 }
                 if(tempObj["mongo27117"] !==undefined && tempObj["mongo27117"] !== null){
                    var obj = tempObj["mongo27117"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                        <span className = "asset_mananger_dailog_title">27117进程相关信息</span>
                        <div className = "asset_mananger_dailog_container">
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                        </div>
                      </div>)
                 }
                 if(tempObj["mongo28017"] !==undefined && tempObj["mongo28017"] !== null){
                    var obj = tempObj["mongo28017"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                        <span className = "asset_mananger_dailog_title">28017进程相关信息</span>
                        <div className = "asset_mananger_dailog_container">
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                          <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                        </div>
                      </div>)
                 }
                 break;
            case "storage":
                 //已核对
                 if(tempObj["storage"] !==undefined && tempObj["storage"] !== null){
                    var obj = tempObj["storage"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">storage相关进程信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                          </div>)
                 }
                 break;
            case "area_web":
                 //已核对
                 if(tempObj["gunicorn"] !==undefined && tempObj["gunicorn"] !== null){
                    var obj = tempObj["gunicorn"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">gunicorn进程相关信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                          </div>)
                 }
                 //已核对
                 if(tempObj["rabbitmq"] !==undefined && tempObj["rabbitmq"] !== null){
                    var obj = tempObj["rabbitmq"],
                        status = obj["clusters_status"],
                        connections = obj["connections"]["connections"],
                        len = connections.length,
                        trArr = [],
                        statusArr = [];

                    for(var k=0;k<status.length;k++){
                        var statusTemp = status[k];
                        for(var pro in statusTemp){
                            statusArr.push(<p className = "asset_manager_dailog_clusters_status" key={"asset_mananger_dailog_status_key_"+new Date().getTime()+generateMixed(6)}>
                               <span className = "asset_mananger_dailog_span_desc">{ pro}:</span>{ statusTemp[pro]+"" }</p>)
                        }
                    }

                    for(var j=0;j<(len/6);j++){
                       trArr.push(<tr key = { "asset_mananger_dailog_table_key_"+new Date().getTime()+generateMixed(6) }><td>{connections[j*4]}</td>
                                      <td>{ j*6+1 > len ? "" : connections[j*6+1]}</td>
                                      <td>{ j*6+2 > len ? "" : connections[j*6+2]}</td>
                                      <td>{ j*6+3 > len ? "" : connections[j*6+3]}</td>
                                      <td>{ j*6+4 > len ? "" : connections[j*6+4]}</td>
                                      <td>{ j*6+5 > len ? "" : connections[j*6+5]}</td>
                                      </tr>)
                    }

                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">rabbitmq的相关进程信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">连接数总计:</span>{ obj["connections"]["count"] }</p>
                            <div className = "asset_mananger_dailog_container_div asset_manager_dailog_container_table">
                               <span className = "asset_mananger_dailog_span_desc">连接主机IP:</span>
                               <div><table className = "asset_mananger_dailog_table"><tbody>{ trArr }</tbody></table></div>
                            </div>
                            <div className = "asset_mananger_dailog_container_div"><span className = "asset_mananger_dailog_span_desc">集群主机状态:</span>{ statusArr }</div>
                          </div>
                        </div>)
                 }
                 //已核对
                 if(tempObj["supervisor"] !==undefined && tempObj["supervisor"] !== null){
                    var obj = tempObj["supervisor"],
                        demoArr = [];
                    for(var proName in obj){
                        if(proName === "pcpu"){
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>);
                        }else if(proName === "rmem"){
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>);
                        }else if(proName === "vmem"){
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>);
                        }else{
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">{ proName }:</span>{ obj[proName] }</p>);
                        }
                    }
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">supervisor的相关进程信息</span>
                            <div className = "asset_mananger_dailog_container">
                              { demoArr }
                            </div>
                          </div>)
                 }
                 //已核对
                 if(tempObj["redis6800"] !==undefined && tempObj["redis6800"] !== null){
                    var obj = tempObj["redis6800"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">redis6800的相关进程信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">总共收到的连接:</span>{ obj["total_connections_received"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">配置文件路径:</span>{ obj["config_file"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">连接客户端:</span>{ obj["connected_clients"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">系统CPU占用量:</span>{ obj["used_cpu_sys_children"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">占用内存量:</span>{ obj["used_memory"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">用户占用CPU单个量:</span>{ obj["used_cpu_user_children"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">redis模式:</span>{ obj["redis_mode"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">used_cpu_user:</span>{ obj["used_cpu_user"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">角色:</span>{ obj["role"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">启动天数:</span>{ obj["uptime_in_days"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">带单位的内存占用量:</span>{ obj["used_memory_peak_human"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">连接到的从库数量:</span>{ obj["connected_slaves"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">集群状态:</span>{ obj["cluster_enabled"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">used_memory_lua:</span>{ obj["used_memory_lua"] }</p>
                          </div>
                        </div>)
                 }
                 //已核对
                 if(tempObj["redis6379"] !==undefined && tempObj["redis6379"] !== null){
                    var obj = tempObj["redis6379"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">redis6379的相关进程信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">总共收到的连接:</span>{ obj["total_connections_received"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">配置文件路径:</span>{ obj["config_file"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">连接客户端:</span>{ obj["connected_clients"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">系统CPU占用量:</span>{ obj["used_cpu_sys_children"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">占用内存量:</span>{ obj["used_memory"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">用户占用CPU单个量:</span>{ obj["used_cpu_user_children"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">redis模式:</span>{ obj["redis_mode"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">used_cpu_user:</span>{ obj["used_cpu_user"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">角色:</span>{ obj["role"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">启动天数:</span>{ obj["uptime_in_days"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">带单位的内存占用量:</span>{ obj["used_memory_peak_human"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">连接到的从库数量:</span>{ obj["connected_slaves"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">集群状态:</span>{ obj["cluster_enabled"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">used_memory_lua:</span>{ obj["used_memory_lua"] }</p>
                          </div>
                        </div>)
                 }
                 //已核对
                 if(tempObj["index"] !==undefined && tempObj["index"] !== null){
                    var obj = tempObj["index"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">index进程的相关信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                        </div>)
                 }
                 //已核对
                 if(tempObj["disktracker"] !==undefined && tempObj["disktracker"] !== null){
                    var obj = tempObj["disktracker"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">磁盘进程相关信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                        </div>)
                 }
                 break;
            case "central_web":
                 if(tempObj["gunicorn"] !==undefined && tempObj["gunicorn"] !== null){
                    var obj = tempObj["gunicorn"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">gunicorn相关进程信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                        </div>)
                 }
                 //已核对
                 if(tempObj["supervisor"] !==undefined && tempObj["supervisor"] !== null){
                    var obj = tempObj["supervisor"],
                        demoArr = [];
                    for(var proName in obj){
                        if(proName === "pcpu"){
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>);
                        }else if(proName === "rmem"){
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>);
                        }else if(proName === "vmem"){
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>);
                        }else{
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">{ proName }:</span>{ obj[proName] }</p>);
                        }
                    }
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">supervisor的相关进程信息</span>
                            <div className = "asset_mananger_dailog_container">
                              { demoArr }
                            </div>
                          </div>)
                 }
                 break;
            case "tracker":
                 //已核对
                 if(tempObj["tracker"] !==undefined && tempObj["tracker"] !== null){
                    var obj = tempObj["tracker"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">tracker的相关进程信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                          </div>)
                 }
                 break;
            case "relay":
                 //已核对
                 if(tempObj["MegaRelayer"] !==undefined && tempObj["MegaRelayer"] !== null){
                     var obj = tempObj["MegaRelayer"];

                      htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">MegaRelayer进程相关信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                          </div>)
                 }
                 if(tempObj["nginx"] !==undefined && tempObj["nginx"] !== null){
                    var obj = tempObj["nginx"];
                     htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">nginx进程相关信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">程序路径:</span>{ obj["process_path"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">最大上行连接数:</span>{ obj["MaxDownloadConnection"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">最大下行连接数:</span>{ obj["MaxUploadConnection"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">当前上行连接数:</span>{ obj["upload_connections"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">当前下行连接数:</span>{ obj["down_connections"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">转发Peerid十进制:</span>{ obj["PeerId"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">转发Peerid十六进制:</span>{ obj["PeerId_dec"] }</p>
                          </div>
                        </div>)
                 }
                 break;
            case "lvs":
                 //已核对
                 if(tempObj["keepalived"] !==undefined && tempObj["keepalived"] !== null){
                    var obj = tempObj["keepalived"],
                        lvsArr = obj["lvs"],
                        lvsList = [];

                    for(var i=0;i<lvsArr.length;i++){
                       var ripArr = lvsArr[i]["RIP"];
                       for(var h=0;h<ripArr.length;h++){
                          var row = 0;
                          if(h === 0){
                            row = ripArr.length;
                          }
                          lvsList.push({
                             rowSpan : row,
                             key : "asset_mananger_dailog_lvs_key_"+new Date().getTime()+generateMixed(6),
                             VIP : lvsArr[i]["VIP"],
                             role : lvsArr[i]["role"],
                             realIp : ripArr[h][0],
                             NUM : ripArr[h][1]
                          })
                       }
                    }
                   
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">keepalived进程相关信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>  
                          <div className = "asset_mananger_dailog_lvs_table">
                            <Table columns={ ASSET_MANANGER_DAILOG_TABLE_lVS } 
                                   dataSource={ lvsList } 
                                   bordered 
                                   pagination={ false }/>
                          </div> 
                        </div>)
                 }
                 break;
            case "appweb":
                  //已核对
                  if(tempObj["supervisor"] !==undefined && tempObj["supervisor"] !== null){
                    var obj = tempObj["supervisor"],
                        demoArr = [];
                    for(var proName in obj){
                        if(proName === "pcpu"){
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>);
                        }else if(proName === "rmem"){
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>);
                        }else if(proName === "vmem"){
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>);
                        }else{
                           demoArr.push(<p className = "asset_mananger_dailog_container_p" key={"asset_mananger_dailog_supervisor_demo_key_"+new Date().getTime()+generateMixed(6)}><span className = "asset_mananger_dailog_span_desc">{ proName }:</span>{ obj[proName] }</p>);
                        }
                    }
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">supervisor的相关进程信息</span>
                            <div className = "asset_mananger_dailog_container">
                              { demoArr }
                            </div>
                          </div>)
                 }
                 //已核对
                 if(tempObj["mongo27517"] !==undefined && tempObj["mongo27517"] !== null){
                    var obj = tempObj["mongo27517"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">27117进程相关信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p className = "asset_mananger_dailog_container_p"><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                          </div>)
                 }
                 //已核对
                 if(tempObj["gunicorn"] !==undefined && tempObj["gunicorn"] !== null){
                    var obj = tempObj["gunicorn"];
                    htl.push(<div key={"asset_mananger_dailog_key_"+new Date().getTime()+generateMixed(6)}>
                          <span className = "asset_mananger_dailog_title">gunicorn相关进程信息</span>
                          <div className = "asset_mananger_dailog_container">
                            <p><span className = "asset_mananger_dailog_span_desc">磁盘调度版本号:</span>{ obj["version"] }</p>
                            <p><span className = "asset_mananger_dailog_span_desc">CPU占用百分比:</span>{ obj["pcpu"] }</p>
                            <p><span className = "asset_mananger_dailog_span_desc">物理内存占用:</span>{ transformToKbMbGb(obj["rmem"]) }</p>
                            <p><span className = "asset_mananger_dailog_span_desc">虚拟内存占用:</span>{ transformToKbMbGb(obj["vmem"]) }</p>
                          </div>
                        </div>)
                 }
                 break;            
            default:
            htl.push("该角色没有相关信息！")
                 break;
        }
        return htl;
    },

    render(){
        const { detailData } = this.props;

        if(isEmptyObj(detailData)){
            return false;
        }

        var htl = this.adapterHtml(detailData);

        return (<div>
                <Modal title="角色信息" visible={this.state.visible} width={700} className="asset_mananger_dailog"
                    onOk={this.handleOk} onCancel={this.handleCancel}>
                    { htl }
                </Modal>
            </div>)
    }
})