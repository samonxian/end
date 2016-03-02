import fetch from 'isomorphic-fetch'
import * as cn from 'common/common'

export const RECIEVE_MONITOR_DS2 = 'RECIEVE_MONITOR_DS2'
export const REQUEST_MONITOR_DS2 = 'REQUEST_MONITOR_DS2'

let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

function requestPosts() {
	return	Object.assign({},common,{
        type: REQUEST_MONITOR_DS2,
		isFetching : true,
	});
}

function receivePosts(json) {
	return	Object.assign({},common,{
        type: RECIEVE_MONITOR_DS2,
		fetched : true,
        posts: json,
        receivedAt: Date.now()
	});
}

export function fetchData() {
    return dispatch => {
        dispatch(requestPosts())
		var url = `${cn.REQUESTURL}server_stat/live_info`;
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				dispatch(receivePosts(json));
			}).catch(function(e){
				console.log('parsing failed', e)
			})
    }
}

