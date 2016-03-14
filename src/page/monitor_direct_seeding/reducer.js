import { UPDATE_PATH } from 'react-router-redux'
import {
	RECIEVE_MONITOR_DS,
	REQUEST_MONITOR_DS
} from './action'

export function monitor_direct_seeding(state = {}, action) {
    switch (action.type) {
        case REQUEST_MONITOR_DS:
		case RECIEVE_MONITOR_DS:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}