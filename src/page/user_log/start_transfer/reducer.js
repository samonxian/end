import { UPDATE_PATH } from 'react-router-redux'
import {
	LOG_INPUT_PEERID_5,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_5,
	LOG_INPUT_END_TIME_5,
	RECIEVE_LOG_5,
	REQUEST_LOG_5
} from './action'

export function start_transfer(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_5:
		case RECIEVE_LOG_5:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function start_transfer_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_5:
		case LOG_INPUT_START_TIME_5:
		case LOG_INPUT_END_TIME_5:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}