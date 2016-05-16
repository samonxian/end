var g_servers;
var g_nodes;
module.exports = {
	errorServer: [],
	/**
	 * 获取不同类别的server,又有的链接正常node server，无连接server，链接出错server
	 */
    getSortServers(jsonDatas) {
		var servers = {
			node: [],
			noLink: [],
		};
		//console.debug(jsonDatas)
		jsonDatas.data.forEach((v,k)=>{
			var flag1 = !v.recv_relays || v.recv_relays && !v.recv_relays[0];
			var flag2 = !v.send_relays || v.send_relays && !v.send_relays[0];
			if(flag1 && flag2){
				servers.noLink.push(v);
			}else{
				servers.node.push(v);
				//console.debug(k,v.mode,v.address)
			}
		})
		//console.debug(servers.node.length)
		//console.debug(JSON.stringify(servers.noLink,null,2))
		g_servers = servers;
		return servers
	},
	getNodeData(){
		g_nodes = [];
		g_servers.node.forEach(function(v,k){
			g_nodes.push(v)
		})
		return g_nodes;	
	},
	getLinkData(){
		var servers = g_servers.node;
		var links = [];
		var nodes = servers;
		this.errorServer = [];
		nodes.forEach((v,k)=>{
			if(v.send_relays && v.send_relays[0]){
				//存放错误的send_relays
				var send_relays_error = {};
				v.send_relays.forEach(function(v2,k2){
					//console.debug(Math.max(v.bw_in,v.bw_out))
					var target,source;
					nodes.forEach(n=>{
						if(n.address == v2.address){
							target = n;
						}
						if(n.address == v.address){
							source = n;
						}
					})
					//正常的recv_relays
					var target_value;
					target.recv_relays.forEach(rv=>{
						if(rv.address == v.address){
							target_value = rv;
						}
					})
					
					//console.debug(value,v.address)
					if(!target_value){
						send_relays_error.address = v.address;
						send_relays_error.mode = v.mode;
						send_relays_error.send_relays = v2;
					}
					if(target_value){
						links.push({
							address: v.address,
							source: source,
							target: target,
							is_lan: v2.is_lan,
							value: target_value.bw_in,
							bw_in: target_value.bw_in,
						})
					}
				})
				if(send_relays_error.send_relays){
					this.errorServer.push(send_relays_error)
				}
			}
		})
		links.forEach((m,i)=>{
			//console.debug(nodes.indexOf(m.target))
			m.target.recv_relays.forEach((v,k)=>{
				if(m.address == v.address){
					//console.debug(i+"dd",m.source.address,m.target)
					//m.value = v.bw_in;
					//m.bw_in = v.bw_in;
				}else{
					//console.debug(i,m.source.mode,m.source.address,v.address)
					//m.bw_in = v.bw_in;
					//m.value = v.bw_in;
				}
			})
		})
		links = links.filter((v,k)=>{
			return v.value; 
		})
		//console.debug(links)
		return links;
	},
}
