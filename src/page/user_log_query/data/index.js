import { title } from '../../user_log/start_service/data/title.js'
let type = {
	'257':'start_service',
	'258':'stop_service',
	'259':'conn_media_src',
	'260':'disc_connect',
	'261':'start_transfer',
	'262':'start_play',
	'265':'recv_src_conn',
	'263':'relay_status',
	'264':'work_status',
	'513':'rtmp_device',
	'769':'camera_debug',
	'770':'camera_time',
	'1025':'mobile_debug',
	'1026':'rtmp_conn_time',
	'272':'exception_event',
}
export let index = []
for(var i in type){
	index.push(type[i]);
}

export function deal(data){
	let re = {};
	//console.log(data)
	data.forEach(function(value,key){
		data[key].key = key;
		data[key].type = type[value.msg_cmd];
	})
	//console.log(re)
	return data;	
}
