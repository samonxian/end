import fetch from 'isomorphic-fetch'
import * as fn from 'function'

export const LOG_QUERY_INPUT_CID = 'LOG_QUERY_INPUT_CID'
export const LOG_QUERY_INPUT_START_TIME = 'LOG_QUERY_INPUT_BEGIN_TIME'
export const LOG_QUERY_INPUT_END_TIME = 'LOG_QUERY_INPUT_END_TIME'
export const LOG_QUERY_SHOWTABLE = 'LOG_QUERY_SHOWTABLE'
export const RECIEVE_LOG_QUERY = 'RECIEVE_LOG_QUERY'
export const REQUEST_LOG_QUERY = 'REQUEST_LOG_QUERY'
export const RECIEVE_MORE_LOG_QUERY = 'RECIEVE_MORE_LOG_QUERY'
export const REQUEST_MORE_LOG_QUERY = 'REQUEST_MORE_LOG_QUERY'

let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

export function input_cid(text){
	return {
		type : LOG_QUERY_INPUT_CID,
		cid : text
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

export function showTable(flag){
	return {
		type : LOG_QUERY_SHOWTABLE,
		show : flag 
	};
}

function requestPosts(params={}) {
	return	Object.assign({},common,{
        type: REQUEST_LOG_QUERY,
		isFetching : true,
	});
}

function receivePosts(params={},json,json2) {
	return	Object.assign({},common,{
        type: RECIEVE_LOG_QUERY,
		fetched : true,
        posts: json,
        posts2: json2,
        receivedAt: Date.now()
	});
}

export function fetchData(_params={}) {
	let obj = {

	}
	_params = Object.assign(obj,_params);
    return dispatch => {
        dispatch(requestPosts(_params))
		var url = fn.params('http://120.26.74.53:8077/query/all_camera_logs',_params);
		var url2 = fn.params('http://120.26.74.53:8077/query/camera_stat',_params);
		//var url = fn.params('/js/test.json',_params);
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				fetch(url2).then(response => response.json())
					.then(function(json2){
						dispatch(receivePosts(_params,json,json2));
					});
			}).catch(function(e){
				console.debug('parsing failed', e)
			})
    }
}


function requestMorePosts(params={}) {
	return	Object.assign({},common,{
        type: REQUEST_MORE_LOG_QUERY,
		isFetchingMore : true,
	});
}



function receiveMorePosts(params={},json) {
	return	Object.assign({},common,{
        type: RECIEVE_MORE_LOG_QUERY,
		fetched : true,
		isFetchingMore : false,
        posts: json,
        receivedAt: Date.now()
	});
}



export function fetchMoreData(_params={}) {
	let obj = {

	}
	_params = Object.assign(obj,_params);
    return dispatch => {
        dispatch(requestMorePosts(_params))
		var url = fn.params('http://120.26.74.53:8077/query/all_camera_logs',_params);
		//var url = fn.params('/js/test.json',_params);
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				dispatch(receiveMorePosts(_params,json));
			}).catch(function(e){
				console.debug('parsing failed', e)
			})
    }
}
