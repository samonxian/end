import { UPDATE_PATH } from 'react-router-redux'
import {
	LOG_INPUT_PEERID_15,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_15,
	LOG_INPUT_END_TIME_15,
	RECIEVE_LOG_15,
	REQUEST_LOG_15
} from './action'

export function camera_time_last(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_15:
		case RECIEVE_LOG_15:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function camera_time_last_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_15:
		case LOG_INPUT_START_TIME_15:
		case LOG_INPUT_END_TIME_15:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}