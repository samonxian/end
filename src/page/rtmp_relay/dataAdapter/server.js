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
			}
		})
		//console.debug(servers.node.length)
		//console.debug(JSON.stringify(servers.noLink,null,2))
		g_servers = servers;
		return g_servers
	},
	getNodeData(){
		//g_nodes = [];
		//g_servers.node.forEach(function(v,k){
			//g_nodes.push(v)
		//})
		return g_servers.node;	
	},
	getLinkData(){
		var servers = g_servers.node;
		var links = [];
		var nodes = servers;
		this.errorServer = [];
		//console.debug(nodes)
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
					if(!target){
						var target = {
							address: v2.address,
							isFalse: true,
						}
						nodes.push(target)
					}
					//正常的recv_relays
					var target_value;
					if(target && target.recv_relays){
						target.recv_relays.forEach(rv=>{
							if(rv.address == v.address){
								target_value = rv;
							}
						})
					}
					//console.debug(value,v.address)
					if(!target_value){
						send_relays_error.address = v.address;
						send_relays_error.mode = v.mode;
						send_relays_error.send_relays = v2;
					}
					if(target_value){
						//正常连线
						links.push({
							source: source,
							target: target,
							is_lan: v2.is_lan,
							value: target_value.bw_in,
							bw_in: target_value.bw_in,
							isError:false,
						})
					}else{
						if(target){
							//错误连线
							links.push({
								source: source,
								target: target,
								value: 10000000,
								bw_in: 0,
								isError:true,
							})
						}
					}
				})
				if(send_relays_error.send_relays){
					this.errorServer.push(send_relays_error)
				}
			}
		})
		
		//console.debug(links)
		return links;
	},
}
