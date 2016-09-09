import fetch from 'isomorphic-fetch'
import * as common from 'common/common'

export const RECIEVERTMPRELAY = 'RECIEVERTMPRELAY'
export const REQUESTRTMPRELAY = 'REQUESTRTMPRELAY'
export const SELECTRTMPRELAY = 'SELECTRTMPRELAY'

function requestPosts() {
	return	{
        type: REQUESTRTMPRELAY,
		isFetching : true,
	};
}

function receivePosts(json,json2,json3) {
	return	{
        type: RECIEVERTMPRELAY,
		fetched : true,
		isFetching : false,
        posts: json,
        posts2: json2,
        posts3: json3,
        receivedAt: Date.now()
	};
}

export function fetchData() {
    return dispatch => {
        dispatch(requestPosts())
		var url = `http://120.26.74.53/v1/diagram/rtmp_publish`;
		var url2 = `http://120.26.74.53/v1/diagram/rtmp_relay/device_count`;
		var url3 = `http://120.26.74.53/v1/diagram/rtmp_relay/app_count`;
		Promise.all([
			fetch(url).then(response => response.json()),
			fetch(url2).then(response => response.json()),
			fetch(url3).then(response => response.json()),
		]).then(function([json,json2,json3]){
			dispatch(receivePosts(json,json2,json3));
		})
    }
}

export function select(){
	return{
		type: SELECTRTMPRELAY,
	}
}

