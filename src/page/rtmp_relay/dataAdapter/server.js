module.exports = {
    transJsonToServers(jsonDatas) {
		let servers = [];
		let serverLastReport = [];
		var serverList = d3.nest().key(function(d) {
			return d.ip;
		}).sortKeys(d3.ascending).sortValues(function(a, b) {
			var result = (a.report_at < b.report_at) ? 1 : (a.report_at == b.report_at ? 0 :
				-1);
			return result;
		});

		var allIpList = serverList.entries(jsonDatas);
		allIpList.forEach(function(d) {
			var srv = d.values[0];
			servers.push(d.values[0]);
			if (!serverLastReport[d.key]) {
				serverLastReport[d.key] = d.values[0].report_at;
			} else {
				if (d.values[0].report_at > serverLastReport[d.key]) {
					serverLastReport[d.key] = d.values[0].report_at;
				}
			}
		});
		return servers;
		//console.debug(serverLastReport)
	},
	makeSankeyData(servers){
		var net2ip = [
			"120.24.240.208",
			"123.56.155.168",
			"120.26.227.224",

			"60.12.69.106",
			"122.226.181.104",
			"122.226.181.124",

			"221.203.168.163",
			"221.204.171.5",
			"222.174.239.69",
			"117.34.47.32",
			"175.6.18.161",
			"58.220.22.72",
			"210.76.58.5",
			"61.240.135.204"
		];
		var data = {
			nodes: [],
			links: []
		};
		var nodes = [];
		if (!servers.length) return data;
		servers.forEach(function(s, key) {
			var d = {
				net: net2ip.indexOf(s.ip) >= 0 ? 1 : 0,
				ip: s.ip,
				ip_city: s.ip_city,
				//name: s.ip_city + s.ip,
				key: key,
				ip_isp: s.ip_isp,
				download_bandwidth: s.download_bandwidth,
				download_connections: s.download_connections,
				bandwidth: s.bandwidth,
				connections: s.connections,
				report_at: s.report_at,
				report_svr: s.report_at,
				dst_relay_servers: s.dst_relay_servers,
			}
			d.bandwidth = d3.sum(s.dst_relay_servers, function(d) {
				return d.bandwidth;
			});
			d.value = Math.max(s.download_bandwidth, d.bandwidth);
			nodes.push(d);
			//链接颜色
			let send_queue;
			s.dst_relay_servers.forEach(function(r) {
				if (r.ip == "0.0.0.0") return;
				send_queue = -1
				if (s.relay_stat) {
					for (var i = 0; i < s.relay_stat.length; i++) {
						if (s.relay_stat[i]['address'] == r.ip) {
							send_queue = s.relay_stat[i]['ave_send_queue']
						}
					}
				}
				// console.log(send_queue)
				data.links.push({
					source: d.ip,
					target: r.ip,
					value: r.bandwidth,
					conns: r.conns,
					send_queue: send_queue,
					band: r.bandwidth
				});
			})
		});
		data.links.forEach(function(link) {
			var node;
			node = nodes.filter(function(d) {
				return d.ip == link.source;
			});
			//console.debug(node)
			link.source = node && node.length ? node[0] : null;
			node = nodes.filter(function(d) {
				return d.ip == link.target;
			});
			link.target = node && node.length ? node[0] : null;
		});
		
		//  排除无任何转发的服务器
		nodes.forEach(function(node) {
			var hasNode = false;
			hasNode = !!(data.links.filter(function(link) {
				if (!link.source || !link.target) return false;
				return (link.source.ip == node.ip || link.target.ip == node.ip) ?
					true : false;
			}).length);
			if (hasNode) {
				data.nodes.push(node);
			} else {
				//console.debug('排除无任何转发的服务器:',node)
			}

		});
		data.nodes.sort(function(a, b) {
			if (a.net > b.net) return 1;
			if (a.net < b.net) return -1;
			if (a.ip == b.ip) return 0;
			return a.ip > b.ip ? 1 : -1;
		});
		return data;
	},
}