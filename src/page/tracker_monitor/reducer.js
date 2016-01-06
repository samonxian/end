import { TEST_TYPE ,RECEIVE_POSTS, REQUEST_POSTS } from './action'

export function selectedReddit(state={ }, action) {
    switch (action.type) {
        default:
            return state
    }
}

export function postsByReddit(state = {}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {
				isFetching : true
            });
		case RECEIVE_POSTS:
            return Object.assign({}, state, {
				isFetching : false,
				fetched : true,
				posts : action.posts
            });
        default:
            return state
    }
}

