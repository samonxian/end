import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_INPUT_PEERID_18,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_18,
	LOG_INPUT_END_TIME_18,
	RECIEVE_LOG_18,
	REQUEST_LOG_18
} from './action'

export function mobile_debug(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_18:
		case RECIEVE_LOG_18:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function mobile_debug_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_18:
		case LOG_INPUT_START_TIME_18:
		case LOG_INPUT_END_TIME_18:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}