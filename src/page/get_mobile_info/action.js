import { JSONP } from 'JSONP'

export const INPUT2 = 'INPUT'
export const SHOW_TABLE2_2 = 'SHOW_TABLE2'
export const RECEIVE_POSTS2 = 'RECEIVE_POSTS2'
export const REQUEST_POSTS2 = 'REQUEST_POSTS2'


export function inputValue(text){
	return {
		type : INPUT2,
		id : text
	}
}
export function displayTable2(show_flag){
	return {
		type: SHOW_TABLE2_2,
		show_flag: show_flag 
	}
}

function receivePosts(id, json) {
    return {
        type: RECEIVE_POSTS2,
        id: id,
        posts: json,
        receivedAt: Date.now()
    }
}

function requestPosts(id) {
    return {
        type: REQUEST_POSTS2,
        id: id,
    }
}

export function fetchData(id) {
    return dispatch => {
        dispatch(requestPosts(id))
		return JSONP.getJSON(`http://120.26.74.53:8077/tracker_monitor/get_mobile_json?uid=${id}`,{
			
		},function(json){
			dispatch(receivePosts(id,json));
		})
    }
}

