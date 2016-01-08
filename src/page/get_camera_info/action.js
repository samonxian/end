import { JSONP } from 'JSONP'

export const INPUT = 'INPUT'
export const SHOW_TABLE2 = 'SHOW_TABLE2'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'


export function inputValue(text){
	return {
		type : INPUT,
		id : text
	}
}
export function displayTable2(show_flag){
	return {
		type: SHOW_TABLE2,
		show_flag: show_flag 
	}
}

function receivePosts(id, json) {
    return {
        type: RECEIVE_POSTS,
        id: id,
        posts: json,
        receivedAt: Date.now()
    }
}

function requestPosts(id) {
    return {
        type: REQUEST_POSTS,
        id: id,
    }
}

export function fetchData(id) {
    return dispatch => {
        dispatch(requestPosts(id))
		return JSONP.getJSON(`http://120.26.74.53:8077/tracker_monitor/get_camera_json?cid=${id}`,{
			
		},function(json){
			dispatch(receivePosts(id,json));
		})
    }
}

