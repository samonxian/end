import fetch from 'isomorphic-fetch'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const TEST_TYPE = 'ITEST_TYPE'


function receivePosts(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit: reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    }
}

function route(current){
	return {
		current : current
	}
}

export function fetchData(reddit) {
    return dispatch => {
        dispatch(requestPosts(reddit))
        return fetch(`http://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(reddit, json)))
    }
}

