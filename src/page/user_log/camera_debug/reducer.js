import { UPDATE_PATH } from 'react-router-redux'
import {
	LOG_INPUT_PEERID_11,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_11,
	LOG_INPUT_END_TIME_11,
	RECIEVE_LOG_11,
	REQUEST_LOG_11
} from './action'

export function camera_debug(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_11:
		case RECIEVE_LOG_11:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function camera_debug_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_11:
		case LOG_INPUT_START_TIME_11:
		case LOG_INPUT_END_TIME_11:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}