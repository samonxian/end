import { UPDATE_PATH } from 'react-router-redux'
import {
	LOG_INPUT_PEERID_14,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_14,
	LOG_INPUT_END_TIME_14,
	RECIEVE_LOG_14,
	REQUEST_LOG_14
} from './action'

export function camera_debug_last(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_14:
		case RECIEVE_LOG_14:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function camera_debug_last_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_14:
		case LOG_INPUT_START_TIME_14:
		case LOG_INPUT_END_TIME_14:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}