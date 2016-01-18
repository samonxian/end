import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_QUERY_INPUT_SESSION,
	LOG_QUERY_INPUT_IP,
	LOG_QUERY_INPUT_START_TIME,
	LOG_QUERY_INPUT_END_TIME,
	RECIEVE_LOG_QUERY,
	REQUEST_LOG_QUERY
} from './action'

export function user_log_query(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_QUERY:
		case RECIEVE_LOG_QUERY:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function user_log_query_form(state = {}, action){
	switch(action.type){
		case LOG_QUERY_INPUT_SESSION:
		case LOG_QUERY_INPUT_IP:
		case LOG_QUERY_INPUT_START_TIME:
		case LOG_QUERY_INPUT_END_TIME:
			return Object.assign({}, state,action);
		default:
			return state;

	}
}

