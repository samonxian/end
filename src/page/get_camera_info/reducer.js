import {INPUT,SHOW_TABLE2, RECEIVE_POSTS, REQUEST_POSTS } from './action'

export function get_camera_info(state = {}, action) {
    switch (action.type) {
		case INPUT:
			return Object.assign({}, state, {
				id : action.id
            });
		case SHOW_TABLE2:
			return Object.assign({}, state, {
				show_flag : action.show_flag
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
				isFetching : true,
				id : action.id
            });
		case RECEIVE_POSTS:
            return Object.assign({}, state, {
				isFetching : false,
				fetched : true,
				posts : action.posts,
				id : action.id
            });
        default:
			return Object.assign({}, state, {
				id : undefined,
				show_flag : false
            });
    }
}

