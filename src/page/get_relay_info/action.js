import { JSONP } from 'JSONP'

export const INPUT3 = 'INPUT3'
export const SHOW_TABLE2_3 = 'SHOW_TABLE2_3'
export const RECIEVE_POSTS3 = 'RECIEVE_POSTS3'
export const REQUEST_POSTS3 = 'REQUEST_POSTS3'


export function inputValue(text){
	return {
		type : INPUT3,
		id : text
	}
}
export function displayTable2(show_flag){
	return {
		type: SHOW_TABLE2_3,
		show_flag: show_flag 
	}
}

function receivePosts(id, json) {
    return {
        type: RECIEVE_POSTS3,
        id: id,
        posts: json,
        receivedAt: Date.now()
    }
}

function requestPosts(id) {
    return {
        type: REQUEST_POSTS3,
        id: id,
    }
}

export function fetchData(id) {
    return dispatch => {
        dispatch(requestPosts(id))
		return JSONP.getJSON(`http://120.26.74.53:8077/tracker_monitor/get_relay_json?sid=${id}`,{
			
		},function(json){
			dispatch(receivePosts(id,json));
		})
    }
}

