import fetch from 'isomorphic-fetch'
import * as common from 'common/common'

export const RECIEVERTMPRELAY = 'RECIEVERTMPRELAY'
export const REQUESTRTMPRELAY = 'REQUESTRTMPRELAY'

function requestPosts() {
	return	{
        type: REQUESTRTMPRELAY,
		isFetching : true,
	};
}

function receivePosts(json,json2) {
	return	{
        type: RECIEVERTMPRELAY,
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
		var url = `${common.REQUESTURL}get_diagram_data/servers_last`;
		return fetch(url)
            .then(response => response.json())
            .then(function(json){
				var url2 = `${common.REQUESTURL}get_diagram_data/cameras_last`;
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

