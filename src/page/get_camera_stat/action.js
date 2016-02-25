import fetch from 'isomorphic-fetch'

export const RECIEVE_CAMERASTAT = 'RECIEVE_CAMERASTAT'
export const REQUEST_CAMERASTAT = 'REQUEST_CAMERASTAT'

function requestPosts() {
	return	{
        type: REQUEST_CAMERASTAT,
		isFetching : true,
	};
}

function receivePosts(json) {
	return	{
        type: RECIEVE_CAMERASTAT,
		fetched : true,
		isFetching : false,
        posts: json,
        receivedAt: Date.now()
	};
}

export function fetchData() {
    return dispatch => {
        dispatch(requestPosts())
		var url = 'http://120.26.74.53/api/cameras/get_camera_stat_json';
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				dispatch(receivePosts(json));
			}).catch(function(e){
				console.log('parsing failed', e)
			})
    }
}

