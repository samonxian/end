var g_servers;
var g_nodes;
module.exports = {
	/**
	 * 获取不同类别的server,又有的链接正常node server，无连接server，链接出错server
	 */
    getSortServers(jsonDatas) {
		var servers = {
			node: [],
			noLink: [],
			error: [],//放置错误的send_relays
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
		servers.forEach((v,k)=>{
			if(v.send_relays && v.send_relays[0]){
				//if(v.address == "tz-relay7:1935"){
					//console.debug(v)
				//}
				v.send_relays.forEach((v2,k2)=>{
					//console.debug(Math.max(v.bw_in,v.bw_out))
					links.push({
						source: v.address,
						target: v2.address,
						is_lan: v2.is_lan,
						//value: Math.max(v.bw_in,v.bw_out),
					})
				})
			}
		})
		links.forEach(function(link) {
            var node,s_1,t_1;
            node = nodes.filter(function(d,k) {
                return d.address == link.source;
            });
            link.source = node && node.length ? node[0] : null;
            node = nodes.filter(function(d,k) {
                return d.address == link.target;
            });
			//console.debug(node)
            link.target = node && node.length ? node[0] : null;
        });
		links = links.filter((v,k)=>{
			return !!v.source && !!v.target; 
		})
		links.forEach(m=>{
			//console.debug(nodes.indexOf(m.target))
			m.target.recv_relays.forEach((v,k)=>{
				m.value = v.bw_in;
				m.bw_in = v.bw_in;
				//console.debug(v.bw_in)
			})
			m.source = nodes.indexOf(m.source)
			m.target = nodes.indexOf(m.target)
		})
		links = links.filter((v,k)=>{
			return v.value; 
		})
		//console.debug(links)
		return links;
	},
}
