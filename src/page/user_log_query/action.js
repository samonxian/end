import fetch from 'isomorphic-fetch'
import * as fn from 'function'

export const LOG_QUERY_INPUT_SESSION = 'LOG_QUERY_INPUT_SESSION'
export const LOG_QUERY_INPUT_IP = 'LOG_QUERY_INPUT_IP'
export const LOG_QUERY_INPUT_START_TIME = 'LOG_QUERY_INPUT_BEGIN_TIME'
export const LOG_QUERY_INPUT_END_TIME = 'LOG_QUERY_INPUT_END_TIME'
export const RECIEVE_LOG_QUERY = 'RECIEVE_LOG_QUERY'
export const REQUEST_LOG_QUERY = 'REQUEST_LOG_QUERY'

let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

export function input_session(text){
	return {
		type : LOG_QUERY_INPUT_SESSION,
		session : text
	};
}

export function input_ip(text){
	return {
		type : LOG_QUERY_INPUT_IP,
		ip : text
	};
}

export function input_start_time(text){
	return {
		type : LOG_QUERY_INPUT_START_TIME,
		start_time : text
	};
}

export function input_end_time(text){
	return {
		type : LOG_QUERY_INPUT_END_TIME,
		end_time : text
	};
}

function requestPosts(params={}) {
	return	Object.assign({},common,{
        type: REQUEST_LOG_QUERY,
		isFetching : true,
	});
}

function receivePosts(params={},json) {
	return	Object.assign({},common,{
        type: RECIEVE_LOG_QUERY,
		change_data : true,
		fetched : true,
        posts: json,
        receivedAt: Date.now()
	});
}


export function fetchData(_params={}) {
	let obj = {
		session: '',
		ip: '',
		start_time:'',
		end_time:'',
		return_type: 'json',
	}
	_params = Object.assign(obj,_params);
    return dispatch => {
        dispatch(requestPosts(_params))
		var url = fn.params('http://120.26.74.53:8077/query/session',_params);
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				dispatch(receivePosts(_params,json));
			}).catch(function(e){
				console.debug('parsing failed', e)
			})
    }
}

