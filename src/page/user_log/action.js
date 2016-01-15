import fetch from 'isomorphic-fetch'
import { params } from '../../libs/function'

export const LOG_SELECT_CLIENT_TYPE = 'LOG_SELECT_NODE'
export const LOG_INPUT_PEERID = 'LOG_INPUT_UID'
export const LOG_INPUT_SN = 'LOG_INPUT_SN'
export const LOG_INPUT_START_TIME = 'LOG_INPUT_BEGIN_TIME'
export const LOG_INPUT_END_TIME = 'LOG_INPUT_END_TIME'
export const LOG_DATA_SET_FALSE = 'LOG_DATA_SET_FALSE'
export const RECIEVE_LOG = 'RECIEVE_LOG'
export const REQUEST_LOG = 'REQUEST_LOG'


export function select_client_type(text){
	return {
		type : LOG_SELECT_CLIENT_TYPE,
		change_data : false,
		params : {
			client_type : text
		}
	}
}

export function input_peerid(text){
	return {
		type : LOG_INPUT_PEERID,
		isFetching : false,
		change_data : false,
		params : {
			peer_id : text
		}
	}
}

export function input_sn(text){
	return {
		type : LOG_INPUT_SN,
		isFetching : false,
		change_data : false,
		params : {
			sn : text
		}
	}
}

export function input_start_time(text){
	return {
		type : LOG_INPUT_START_TIME,
		change_data : false,
		isFetching : false,
		params : {
			start_time : text
		}
		
	}
}

export function input_end_time(text){
	return {
		type : LOG_INPUT_END_TIME,
		isFetching : false,
		change_data : false,
		params : {
			end_time : text
		}
		
	}
}

export function set_change_data_false(){
	return {
		type : LOG_DATA_SET_FALSE,
		change_data : false,
	}
}

function receivePosts(params={},json) {
    return {
        type: RECIEVE_LOG,
		change_data : true,
		isFetching : false,
		fetched : true,//已经获取到数据
        params: params,
        posts: json,
        receivedAt: Date.now()
    }
}

function requestPosts(params={}) {
    return {
        type: REQUEST_LOG,
		isFetching : true,//正在获取数据
		change_data : false,//是否更新数据
        params: params,
    }
}

export function fetchData(_params={},modules) {
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
		var url = params(`http://120.26.74.53:8077/logs/${modules}`,_params);
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				dispatch(receivePosts(_params,json));
				dispatch(set_change_data_false());
			}).catch(function(e){
				console.log('parsing failed', e)
			})
    }
}

