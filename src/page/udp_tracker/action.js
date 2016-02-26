import fetch from 'isomorphic-fetch'
import * as common from 'common/common'

export const RECIEVE_UDPTRACKER = 'RECIEVE_UDPTRACKER'
export const REQUEST_UDPTRACKER = 'REQUEST_UDPTRACKER'

function requestPosts() {
	return	{
        type: REQUEST_UDPTRACKER,
		isFetching : true,
	};
}

function receivePosts(json,json2) {
	return	{
        type: RECIEVE_UDPTRACKER,
		fetched : true,
		isFetching : false,
        posts: json,
		posts2: json2,
        receivedAt: Date.now()
	};
}

export function fetchData() {
    return dispatch => {
        dispatch(requestPosts())
		var url = `${common.REQUESTURL}get_diagram_data/device_data`;
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				var url2 = `${common.REQUESTURL}get_diagram_data/udp/server_data`;
				fetch(url2)
					.then(response => response.json())
					.then(function(json2){
						dispatch(receivePosts(json,json2));
					})
			}).catch(function(e){
				console.log('parsing failed', e)
			})
    }
}

