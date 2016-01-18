import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_INPUT_PEERID,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME,
	LOG_INPUT_END_TIME,
	RECIEVE_LOG,
	REQUEST_LOG
} from './action'

export function start_service(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG:
		case RECIEVE_LOG:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function start_service_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID:
		case LOG_INPUT_START_TIME:
		case LOG_INPUT_END_TIME:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}
