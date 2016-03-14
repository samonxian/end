import { UPDATE_PATH } from 'react-router-redux'
import {
	RECIEVE_MONITOR_DS2,
	REQUEST_MONITOR_DS2
} from './action'

export function monitor_direct_seeding2(state = {}, action) {
    switch (action.type) {
        case REQUEST_MONITOR_DS2:
		case RECIEVE_MONITOR_DS2:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}