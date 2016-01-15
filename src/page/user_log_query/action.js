import fetch from 'isomorphic-fetch'
import * as fn from '../../libs/function'

export const LOG_QUERY_INPUT_SESSION = 'LOG_QUERY_INPUT_SESSION'
export const LOG_QUERY_INPUT_IP = 'LOG_QUERY_INPUT_IP'
export const LOG_QUERY_INPUT_START_TIME = 'LOG_QUERY_INPUT_BEGIN_TIME'
export const LOG_QUERY_INPUT_END_TIME = 'LOG_QUERY_INPUT_END_TIME'
export const LOG_QUERY_DATA_SET_FALSE = 'LOG_QUERY_DATA_SET_FALSE'
export const RECIEVE_LOG_QUERY = 'RECIEVE_LOG_QUERY'
export const REQUEST_LOG_QUERY = 'REQUEST_LOG_QUERY'

let common = {
	change_data : false,//是否更新数据
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

export function input_session(text){
	return	Object.assign({},common,{
		type : LOG_QUERY_INPUT_SESSION,
		params : {
			session : text
		}
	});
}

export function input_ip(text){
	return	Object.assign({},common,{
		type : LOG_QUERY_INPUT_IP,
		params : {
			ip : text
		}
	});
}

export function input_start_time(text){
	return	Object.assign({},common,{
		type : LOG_QUERY_INPUT_START_TIME,
		params : {
			start_time : text
		}
	});
}

export function input_end_time(text){
	return	Object.assign({},common,{
		type : LOG_QUERY_INPUT_END_TIME,
		params : {
			end_time : text
		}
	});
}

export function set_change_data_false(){
	return	Object.assign({},common,{
		type : LOG_QUERY_DATA_SET_FALSE,
	});
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
        params: params,
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
				//dispatch(set_change_data_false());
			}).catch(function(e){
				console.debug('parsing failed', e)
			})
    }
}

