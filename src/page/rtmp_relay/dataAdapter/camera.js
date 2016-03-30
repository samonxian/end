import * as actionCreator from '../action'

var cameraInfo = {};
cameraInfo.selectedServer;
cameraInfo.spliceLength = 10;
cameraInfo.servers = {};
cameraInfo.cameras = {};
cameraInfo.handleCameraClick = function(cid, ip,dispatch) {
	cameraInfo.selectedServer = ip == cameraInfo.selectedServer ? "" : ip;
	dispatch(actionCreator.select())
}
cameraInfo.handleCameraHover = function(data, clear) {
	var elm = document.getElementById("cameraHint");
	elm.innerHTML = '';
	if(!clear){
		elm.innerHTML = `&nbsp;&nbsp;摄像机ID：${data.cid}&nbsp;&nbsp;服务器IP：${ data.ip_city }-${data.ip_isp}[${data.ip}]${
			cameraInfo.cameras[data.cid].msg
		}`; 
	}
}
var colorOfFrame = d3.scale.threshold().domain([0, 6, 11, 16]).range(['rgba(255,255,255,.6)',
	'rgba(219,84,64,1)', 'rgba(250,167,1,1)', 'rgba(47,213,238,1)',
	'rgba(10,137,40,1)'
]);
var colorOfRecivetime = d3.scale.threshold().domain([0, 1000, 2000, 3000]).range(['rgba(255,255,255,.6)',
	'rgba(10,137,40,1)', 'rgba(47,213,238,1)', 'rgba(250,167,1,1)','rgba(219,84,64,1)'
]);
var colorOfsend_queue = d3.scale.threshold().domain([0,10, 64, 128]).range(['rgba(255,255,255,.6)',
	'rgba(10,137,40,1)', 'rgba(47,213,238,1)', 'rgba(250,167,1,1)','rgba(219,84,64,1)'
]);
var colorOfConns = d3.scale.threshold().domain([0, 10, 50]).range(['rgba(0,0,0,.3)',
	'rgba(0,0,255,.5)', 'rgba(0,255,0,.5)', 'rgba(255,0,0,.5)'
]);
cameraInfo.getServers = function(servers) {
    servers.forEach(function(server) {
        cameraInfo.servers[server.ip] = {
            cameraCount: server.camera_stat ? server.camera_stat.length : 0,
            cameras: server.camera_stat,
            conns: server.download_connections,
            frame: server.ave_fps,
            time_ave: server.time_ave,
            send_queue_ave: server.send_queue_ave,
            send_queue_max: server.send_queue_max,
            publish_num: server.publish_num,
            ip: server.ip,
            ip_city: server.ip_city,
            ip_isp: server.ip_isp,
            report_at: server.report_at,
            heart_beat_at: server.heart_beat_at,
            timeout: server.timeout
        }
    })
}

cameraInfo.getCameras = function(servers,cameras) {
	cameras.forEach(function(d) {
        if (!cameraInfo.cameras[d.peer_id]) {
            cameraInfo.cameras[d.peer_id] = {
                cid: d.peer_id,
                ip: d.ip,
                client_type: d.client_type,
                ip_city: d.public_ip_city,
                ip_isp: d.public_ip_isp,
                timeout: d.timeout,
                heartbeat: d.create_at,
                report_at: d.heart_beat_at,
                msg: ""
            }
        }
        if (d.msg_split) {
            cameraInfo.cameras[d.peer_id].netState = (1 - d.msg_split.Ts_Te / d.msg_split.T5_T1) * 30;
            cameraInfo.cameras[d.peer_id].msg = "" + d.msg_split.T5_T1 + "-" + d.msg_split.Ts_Te;
        }
    })
    servers.forEach(function(server) {
		if (server.camera_stat) {
            var serverip = server.ip
            server.camera_stat.forEach(function(camera) {
                var cameraid = camera.cid
                if (cameraInfo.cameras[cameraid]) {
                    if (!cameraInfo.cameras[cameraid].servers)
                        cameraInfo.cameras[cameraid].servers = []
                    if (!cameraInfo.cameras[cameraid].servers[serverip])
                        cameraInfo.cameras[cameraid].servers[serverip] = {}
                    if (!cameraInfo.cameras[cameraid].servers[serverip].histroy)
                        cameraInfo.cameras[cameraid].servers[serverip].histroy = []
                    cameraInfo.cameras[cameraid].servers[serverip].histroy.push(camera.frame)
                    if (cameraInfo.cameras[cameraid].servers[serverip].histroy.length > 10) {
                        cameraInfo.cameras[cameraid].servers[serverip].histroy.shift()
                    }
                    var histroy = cameraInfo.cameras[cameraid].servers[serverip].histroy
                    cameraInfo.cameras[cameraid].servers[serverip].frame_avg = d3.sum(histroy) / histroy.length,
                        cameraInfo.cameras[cameraid].servers[serverip].frame_now = camera.frame
                    cameraInfo.cameras[cameraid].servers[serverip].report_at = server.heart_beat_at
                }
            })
            if (server.cameras_stats) {
                server.cameras_stats.forEach(function(camera) {
                    var cameraid = camera.cid
                    if (cameraInfo.cameras[cameraid]) {
                        if (!cameraInfo.cameras[cameraid].servers) {
                            cameraInfo.cameras[cameraid].servers = []
                        }
                        if (!cameraInfo.cameras[cameraid].servers[serverip]) {
                            cameraInfo.cameras[cameraid].servers[serverip] = {}
                        }
                        cameraInfo.cameras[cameraid].servers[serverip].send_queue = camera.send_queue
                        cameraInfo.cameras[cameraid].servers[serverip].recive_time = camera.time
                    }

                })

            }
        }
    })
    
}

cameraInfo.makeCameraInfo = function(servers,sankey) {
    var cid, camera, roots;
	if (!(sankey && sankey.nodes())) return;
	var nodes = sankey.nodes();
	//var nodes = sankeyData.nodes;
    var getchildren = function(ip, cid) {
        var children = [];
        var nodes = servers.filter(function(d) {
            return d.ip == ip;
        });
        if (!(nodes && nodes.length)) return children;
        var node = nodes[0];
        var childrens = node.dst_relay_servers.filter(function(d) {
            return d.ip != '0.0.0.0'
        });
        if (childrens) {
            childrens.forEach(function(child) {
                //var span = Date.now();
                var item = {
                    name: child.ip,
                    ip: child.ip,
                    ip_city: child.ip_city,
                    ip_isp: child.ip_isp,
                    cid: cid,
                    frame: -1,
                    send_queue: -1,
                    recive_time: -1,
                    children: getchildren(child.ip, cid)
                }
                try {
                    item.frame = cameraInfo.cameras[cid].servers[child.ip].frame_avg;
                    item.send_queue = cameraInfo.cameras[cid].servers[child.ip].send_queue;
                    item.recive_time = cameraInfo.cameras[cid].servers[child.ip].recive_time;
                    if (cameraInfo.cameras[cid].timeout) {
                        item.frame = -1;
                        item.send_queue = -1;
                        item.recive_time = -1;
                    }
                } catch (ex) {}
                children.push(item)
            })
        }
        return children;
    }
    for (cid in cameraInfo.cameras) { //删除下线的摄像机
        var last_report = new Date(cameraInfo.cameras[cid].report_at).valueOf();
        if (Date.now() - last_report > 3 * 60 * 1000) {
            delete cameraInfo.cameras[cid];
            continue;
        }
        if ("0" == cid) continue;
        camera = cameraInfo.cameras[cid];
        roots = nodes.filter(function(d) {
            return d.targetLinks.length == 0 && camera.servers && camera.servers[d.ip]
        });
        if (!(roots && roots.length > 0)) continue;
        if (roots.length > 1) {
            roots.sort(function(a, b) {
                return d3.descending(camera.servers[a.ip].report_at, camera.servers[
                        b.ip].report_at)
                    //return camera.servers[b.ip].frame_now - camera.servers[a.ip].frame_now;
            })
            roots.splice(1, 100);
        }
        var root = roots[0];
        //inner_camera_color
        camera.tree = {
            name: cid,
            ip: cid,
            cid: cid,
            ip_city: cid,
            ip_isp: cid,
            frame: camera.netState,
            send_queue: camera.servers[root.ip].send_queue,
            recive_time: camera.servers[root.ip].recive_time,
            children: [{
                name: root.ip,
                ip: root.ip,
                cid: cid,
                ip_city: root.ip_city,
                ip_isp: root.ip_isp,
                frame: -1,
                children: getchildren(root.ip, cid)
            }]
        }
        try {
            //var timeSpan = Date.now();
            //source_color
            camera.tree.children[0].frame = camera.servers[root.ip].frame_avg;
            camera.tree.children[0].send_queue = camera.servers[root.ip].send_queue;
            camera.tree.children[0].recive_time = camera.servers[root.ip].recive_time;
            // timeSpan = timeSpan - new Date(camera.servers[root.ip].report_at).valueOf();
            //root_color
            if (camera.servers[root.ip].timeout) camera.tree.children[0].frame = -1;
        } catch (ex) {}
    }
}

cameraInfo.renderCameraInfo = function(dispatch) {
    var partition = d3.layout.partition().sort(function(a, b) {
		if (a.parent && b.parent) {
			if (a.parent.ip != b.parent.ip) {
				return a.parent.ip > b.parent.ip;
			}
		}
		return a.ip > b.ip;
    }).value(function(d) {
		return 100;
    });
	partition.size([2 * Math.PI, 65*65]);

    
	var cameras = d3.entries(cameraInfo.cameras).map(function(d) {
		try {
			if (!d.value.tree) return null;
			d.value.nodes = partition.nodes(d.value.tree);
			return d.value;
		} catch (ex) {
			console.error("生成摄像机svg信息出错：", ex, d.value);
			return null
		}
	}).filter(function(d) {
		return d != null;
	});

	cameraInfo.camerasLength = cameras.length;
    cameras.sort(function(a, b) {
		var m = +(a.msg.split('-')[1] / a.msg.split('-')[0]);
		var n = +(b.msg.split('-')[1] / b.msg.split('-')[0]);
		return m - n > 0 ? 1 : m - n < 0 ? -1 : +a.cid - (+b.cid);
    })
	//var infoDiv = d3.select("#infoDiv")[0][0];
	infoDiv.style.display= "none";
	//infoDiv.innerHTML = "";
    var svgUpdate = d3.select("#infoDiv").selectAll(".cameraSvg").data(cameras, function(d) {
        return d.cid;
    }).sort(function(a, b) {
		var m = +(a.msg.split('-')[1] / a.msg.split('-')[0]);
		var n = +(b.msg.split('-')[1] / b.msg.split('-')[0]);
		return m - n > 0 ? 1 : m - n < 0 ? -1 : +a.cid - (+b.cid);
    });
    var svgEnter = svgUpdate.enter();
    svgEnter.append("svg").attr("class", "cameraSvg shadowed").attr("viewBox", "0 0 100 100");
    svgUpdate.exit().remove();
    var nodeRect = svgUpdate.selectAll(".camera_server").data(function(d) {
        var nodes = d.nodes;
        return nodes;
    });

    var nodeEnter = nodeRect.enter();

    //arc start

    var arc = d3.svg.arc()
        .startAngle(function(d) {
            return d.x
        })
        .endAngle(function(d) {
            return (d.dx < 6.28) ? d.x + d.dx - Math.PI * 0.02 : d.x + d.dx;
            return d.x + d.dx;
        })
        .innerRadius(function(d) {
			//console.debug(Math.sqrt(d.y))
			var r = Math.sqrt(d.y) - 16
			//if(r == 0){
				//r = 9;
			//}
			return r;
        })
        .outerRadius(function(d) {
			var r = Math.sqrt(d.y + d.dy) - 19 
			//console.debug(r)
			return r;
        });

    nodeEnter.append("path").attr("class", "camera_server")
        .attr("transform", "translate(" + 50 + "," + 50 + ")")
        .attr("d", arc)
		//.style("stroke", "rgba(255,255,255,.0)")
		//.style("stroke-width", "4px")
        .style("fill", function(d) {
            try {
                //frame =  cameraInfo.cameras[d.cid].servers[d.ip].frame_avg
                return d.color = colorOfsend_queue(d.send_queue)
                return d.color = colorOfFrame(d.frame);
            } catch (ex) {
                return d.color = colorOfsend_queue(-1)
                return d.color = colorOfFrame(-1);
            }
        })
        .on("dblclick", function(d) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
        })
        .on("click", function(d) {
			cameraInfo.handleCameraClick(d.cid, d.ip,dispatch);
        })
        .on("mouseenter", function(d) {
			cameraInfo.handleCameraHover(d);
        })
        .on("mouseout", function(d) {
			cameraInfo.handleCameraHover(d, true);
        }).attr("x", function(d) {
            return d.x + 1;
        }) // 顶点的 x 坐标

    nodeRect
        .classed('selectedServer', function(d) {
            return cameraInfo.selectedServer == d.ip;
        })
        .style("fill", function(d) {
            //最内层颜色
            if (d.depth == 0) {
                if (d.frame) {
                    // console.log(d.frame)
                    return d.color = colorOfFrame(d.frame)
                }
                // console.log( d)
                return d.color = colorOfRecivetime(d.recive_time)
            }
            try {
                //frame =  cameraInfo.cameras[d.cid].servers[d.ip].frame_avg
                return d.color = colorOfsend_queue(d.send_queue)
                return d.color = colorOfFrame(d.frame);
            } catch (ex) {
                return d.color = colorOfsend_queue(-1)
                return d.color = colorOfFrame(-1);
            }
        });
	infoDiv.style.display= "block";
	nodeRect.exit().remove();
}


module.exports = cameraInfo;
