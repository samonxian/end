import {INPUT3,SHOW_TABLE2_3, RECIEVE_POSTS3, REQUEST_POSTS3 } from './action'

export function get_relay_info(state = {}, action) {
    switch (action.type) {
		case INPUT3:
			return Object.assign({}, state, {
				id : action.id
            });
		case SHOW_TABLE2_3:
			return Object.assign({}, state, {
				show_flag : action.show_flag
            });
        case REQUEST_POSTS3:
            return Object.assign({}, state, {
				isFetching : true,
				id : action.id
            });
		case RECIEVE_POSTS3:
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

