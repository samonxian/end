import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_INPUT_PEERID_17,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_17,
	LOG_INPUT_END_TIME_17,
	RECIEVE_LOG_17,
	REQUEST_LOG_17
} from './action'

export function rtmp_conn_time(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_17:
		case RECIEVE_LOG_17:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function rtmp_conn_time_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_17:
		case LOG_INPUT_START_TIME_17:
		case LOG_INPUT_END_TIME_17:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}