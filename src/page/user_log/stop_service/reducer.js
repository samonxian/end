import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_INPUT_PEERID_2,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_2,
	LOG_INPUT_END_TIME_2,
	RECIEVE_LOG_2,
	REQUEST_LOG_2
} from './action'

export function stop_service(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_2:
		case RECIEVE_LOG_2:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function stop_service_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_2:
		case LOG_INPUT_START_TIME_2:
		case LOG_INPUT_END_TIME_2:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}