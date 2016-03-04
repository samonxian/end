import { UPDATE_PATH } from 'react-router-redux'
import {
	LOG_INPUT_PEERID_3,
	LOG_INPUT_START_TIME_3,
	LOG_INPUT_END_TIME_3,
	RECIEVE_LOG_3,
	REQUEST_LOG_3
} from './action'

export function conn_media_src(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_3:
		case RECIEVE_LOG_3:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function conn_media_src_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_3:
		case LOG_INPUT_START_TIME_3:
		case LOG_INPUT_END_TIME_3:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}