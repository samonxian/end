import {
	RECIEVERTMPRELAY,
	REQUESTRTMPRELAY
} from './action'

export function rtmp_relay(state = {}, action) {
    switch (action.type) {
        case REQUESTRTMPRELAY:
		case RECIEVERTMPRELAY:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}
