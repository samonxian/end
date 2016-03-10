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
		var url = `${common.REQUESTURL}get_diagram_data/servers_last`;
		var url2 = `${common.REQUESTURL}get_diagram_data/cameras_last`;
		var url3 = `${common.REQUESTURL}get_diagram_data/app_count`;
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

