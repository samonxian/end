import fetch from 'isomorphic-fetch'
import { params } from 'function'

export const LOG_INPUT_PEERID_18 = 'LOG_INPUT_PEERID_18'
export const LOG_INPUT_START_TIME_18 = 'LOG_INPUT_START_TIME_18'
export const LOG_INPUT_END_TIME_18 = 'LOG_INPUT_END_TIME_18'
export const RECIEVE_LOG_18 = 'RECIEVE_LOG_18'
export const REQUEST_LOG_18 = 'REQUEST_LOG_18'

let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

export function input_peerid(text){
	return {
		type : LOG_INPUT_PEERID_18,
		peer_id : text
	}
}

export function input_start_time(text){
	return {
		type : LOG_INPUT_START_TIME_18,
		start_time : text
	}
}

export function input_end_time(text){
	return {
		type : LOG_INPUT_END_TIME_18,
		end_time : text
	}
}

function requestPosts(params={}) {
	return	Object.assign({},common,{
        type: REQUEST_LOG_18,
		isFetching : true,
		posts : null,
	});
}

function receivePosts(params={},json) {
	return	Object.assign({},common,{
        type: RECIEVE_LOG_18,
		fetched : true,
        posts: json,
        receivedAt: Date.now()
	});
}

export function fetchData(_params={}) {
	let modules = 'mobile_debug';
	let obj = {
		p:1,
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

