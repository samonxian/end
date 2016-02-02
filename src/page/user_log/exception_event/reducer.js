import { UPDATE_PATH } from 'react-router-redux'
import {
	LOG_INPUT_PEERID_16,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_16,
	LOG_INPUT_END_TIME_16,
	RECIEVE_LOG_16,
	REQUEST_LOG_16
} from './action'

export function exception_event(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_16:
		case RECIEVE_LOG_16:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function exception_event_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_16:
		case LOG_INPUT_START_TIME_16:
		case LOG_INPUT_END_TIME_16:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}