import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_INPUT_PEERID_4,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_4,
	LOG_INPUT_END_TIME_4,
	RECIEVE_LOG_4,
	REQUEST_LOG_4
} from './action'

export function disc_connect(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_4:
		case RECIEVE_LOG_4:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function disc_connect_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_4:
		case LOG_INPUT_START_TIME_4:
		case LOG_INPUT_END_TIME_4:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}