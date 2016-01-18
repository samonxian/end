import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_INPUT_PEERID_7,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_7,
	LOG_INPUT_END_TIME_7,
	RECIEVE_LOG_7,
	REQUEST_LOG_7
} from './action'

export function recv_src_conn(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_7:
		case RECIEVE_LOG_7:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function recv_src_conn_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_7:
		case LOG_INPUT_START_TIME_7:
		case LOG_INPUT_END_TIME_7:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}