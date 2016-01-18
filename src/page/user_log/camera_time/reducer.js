import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_INPUT_PEERID_12,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_12,
	LOG_INPUT_END_TIME_12,
	RECIEVE_LOG_12,
	REQUEST_LOG_12
} from './action'

export function camera_time(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_12:
		case RECIEVE_LOG_12:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function camera_time_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_12:
		case LOG_INPUT_START_TIME_12:
		case LOG_INPUT_END_TIME_12:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}