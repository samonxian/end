import fetch from 'isomorphic-fetch'
import { params } from 'function'

export const RECIEVE_MONITOR_DS = 'RECIEVE_MONITOR_DS'
export const REQUEST_MONITOR_DS = 'REQUEST_MONITOR_DS'

let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

function requestPosts() {
	return	Object.assign({},common,{
        type: REQUEST_MONITOR_DS,
		isFetching : true,
	});
}

function receivePosts(json) {
	return	Object.assign({},common,{
        type: RECIEVE_MONITOR_DS,
		fetched : true,
        posts: json,
        receivedAt: Date.now()
	});
}

export function fetchData() {
    return dispatch => {
        dispatch(requestPosts())
		var url = 'http://120.26.74.53/api/cameras/live_info';
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				dispatch(receivePosts(json));
			}).catch(function(e){
				console.log('parsing failed', e)
			})
    }
}

