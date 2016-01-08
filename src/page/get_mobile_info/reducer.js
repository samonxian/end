import {INPUT2,SHOW_TABLE2_2, RECEIVE_POSTS2, REQUEST_POSTS2 } from './action'

export function get_mobile_info(state = {}, action) {
    switch (action.type) {
		case INPUT2:
			return Object.assign({}, state, {
				id : action.id
            });
		case SHOW_TABLE2_2:
			return Object.assign({}, state, {
				show_flag : action.show_flag
            });
        case REQUEST_POSTS2:
            return Object.assign({}, state, {
				isFetching : true,
				id : action.id
            });
		case RECEIVE_POSTS2:
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

