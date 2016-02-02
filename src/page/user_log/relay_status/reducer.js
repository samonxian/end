import { UPDATE_PATH } from 'react-router-redux'
import {
	LOG_INPUT_PEERID_8,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_8,
	LOG_INPUT_END_TIME_8,
	RECIEVE_LOG_8,
	REQUEST_LOG_8
} from './action'

export function relay_status(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_8:
		case RECIEVE_LOG_8:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function relay_status_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_8:
		case LOG_INPUT_START_TIME_8:
		case LOG_INPUT_END_TIME_8:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}