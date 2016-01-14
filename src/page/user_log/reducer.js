import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_SELECT_CLIENT_TYPE,
	LOG_INPUT_PEERID,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME,
	LOG_INPUT_END_TIME,
	CHANGE_LOG_TYPE,
	LOG_DATA_SET_FALSE,
	RECIEVE_LOG,
	REQUEST_LOG
} from './action'

export function user_log(state = {}, action) {
    switch (action.type) {
		case LOG_SELECT_CLIENT_TYPE:
			var temp = Object.assign({}, state.params,action.params);
			action.params = temp;
			return Object.assign({}, state,action);
		case LOG_INPUT_PEERID:
			var temp = Object.assign({}, state.params,action.params);
			return Object.assign({}, state,action);
		case LOG_INPUT_SN:
			var temp = Object.assign({}, state.params,action.params);
			action.params = temp;
			return Object.assign({}, state,action);
		case LOG_INPUT_START_TIME:
			var temp = Object.assign({}, state.params,action.params);
			action.params = temp;
			return Object.assign({}, state,action);
		case LOG_INPUT_END_TIME:
			var temp = Object.assign({}, state.params,action.params);
			action.params = temp;
			return Object.assign({}, state,action);
        case LOG_DATA_SET_FALSE:
			return Object.assign({}, state,action);
        case REQUEST_LOG:
			var temp = Object.assign({}, state.params,action.params);
			action.params = temp;
			return Object.assign({}, state,action);
		case RECIEVE_LOG:
			var temp = Object.assign({}, state.params,action.params);
			action.params = temp;
			return Object.assign({}, state,action);
		case UPDATE_PATH:
			return Object.assign({}, state,{
				posts : null,
				//history : true
			});
        default:
			return state;
    }
}

