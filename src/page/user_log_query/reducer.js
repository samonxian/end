import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_QUERY_INPUT_SESSION,
	LOG_QUERY_INPUT_IP,
	LOG_QUERY_INPUT_START_TIME,
	LOG_QUERY_INPUT_END_TIME,
	LOG_QUERY_DATA_SET_FALSE,
	RECIEVE_LOG_QUERY,
	REQUEST_LOG_QUERY
} from './action'

export function user_log_query(state = {}, action) {
    switch (action.type) {
		case LOG_QUERY_INPUT_SESSION:
		case LOG_QUERY_INPUT_IP:
		case LOG_QUERY_INPUT_START_TIME:
		case LOG_QUERY_INPUT_END_TIME:
        case REQUEST_LOG_QUERY:
		case RECIEVE_LOG_QUERY:
			var temp = Object.assign({}, state.params,action.params);
			action.params = temp;
			return Object.assign({}, state,action);
        case LOG_QUERY_DATA_SET_FALSE:
			return Object.assign({}, state,action);
		case UPDATE_PATH:
			return Object.assign({}, state,{
				posts : null,
			});
        default:
			return state;
    }
}

