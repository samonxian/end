import fetch from 'isomorphic-fetch'

export const RECIEVE_RTMPTRACKER = 'RECIEVE_RTMPTRACKER'
export const REQUEST_RTMPTRACKER = 'REQUEST_RTMPTRACKER'

function requestPosts() {
	return	{
        type: REQUEST_RTMPTRACKER,
		isFetching : true,
	};
}

function receivePosts(json,json2) {
	return	{
        type: RECIEVE_RTMPTRACKER,
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
		var url = 'http://120.26.74.53/api/get_diagram_data/rtmp/user_data';
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				var url2 = 'http://120.26.74.53/api/get_diagram_data/rtmp/server_data';
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

