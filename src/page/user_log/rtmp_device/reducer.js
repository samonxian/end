import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_INPUT_PEERID_10,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_10,
	LOG_INPUT_END_TIME_10,
	RECIEVE_LOG_10,
	REQUEST_LOG_10
} from './action'

export function rtmp_device(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_10:
		case RECIEVE_LOG_10:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function rtmp_device_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_10:
		case LOG_INPUT_START_TIME_10:
		case LOG_INPUT_END_TIME_10:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}