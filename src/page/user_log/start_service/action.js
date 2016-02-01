import fetch from 'isomorphic-fetch'
import { params } from 'function'

export const LOG_INPUT_PEERID = 'LOG_INPUT_PEERID'
export const LOG_INPUT_START_TIME = 'LOG_INPUT_START_TIME'
export const LOG_INPUT_END_TIME = 'LOG_INPUT_END_TIME'
export const RECIEVE_LOG = 'RECIEVE_LOG'
export const REQUEST_LOG = 'REQUEST_LOG'

let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

export function input_peerid(text){
	return {
		type : LOG_INPUT_PEERID,
		peer_id : text
	}
}

export function input_start_time(text){
	return {
		type : LOG_INPUT_START_TIME,
		start_time : text
	}
}

export function input_end_time(text){
	return {
		type : LOG_INPUT_END_TIME,
		end_time : text
	}
}

function requestPosts(params={}) {
	return	Object.assign({},common,{
        type: REQUEST_LOG,
		isFetching : true,
		posts : null,
	});
}

function receivePosts(params={},json) {
	return	Object.assign({},common,{
        type: RECIEVE_LOG,
		fetched : true,
        posts: json,
        receivedAt: Date.now()
	});
}

export function fetchData(_params={},modules) {
	if(modules == undefined){
		modules = 'start_service';
	}
	let obj = {
		p:1,
		//client_type:'',
		peer_id:'',
		//sn:'',
		start_time:'',
		end_time:'',
		return_type: 'json',
	}
	_params = Object.assign(obj,_params);
    return dispatch => {
        dispatch(requestPosts(_params))
		var url = params(`http://120.26.74.53/api/logs/${modules}`,_params);
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				dispatch(receivePosts(_params,json));
			}).catch(function(e){
				console.log('parsing failed', e)
			})
    }
}

