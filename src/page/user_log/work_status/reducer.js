import { UPDATE_PATH } from 'react-router-redux'
import {
	LOG_INPUT_PEERID_9,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_9,
	LOG_INPUT_END_TIME_9,
	RECIEVE_LOG_9,
	REQUEST_LOG_9
} from './action'

export function work_status(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_9:
		case RECIEVE_LOG_9:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function work_status_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_9:
		case LOG_INPUT_START_TIME_9:
		case LOG_INPUT_END_TIME_9:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}