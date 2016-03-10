import {
	RECIEVERTMPRELAY,
	REQUESTRTMPRELAY,
	SELECTRTMPRELAY,
} from './action'

export function rtmp_relay(state = {}, action) {
    switch (action.type) {
        case REQUESTRTMPRELAY:
		case RECIEVERTMPRELAY:
		case SELECTRTMPRELAY:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}
