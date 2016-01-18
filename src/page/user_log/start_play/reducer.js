import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_INPUT_PEERID_6,
	LOG_INPUT_SN,
	LOG_INPUT_START_TIME_6,
	LOG_INPUT_END_TIME_6,
	RECIEVE_LOG_6,
	REQUEST_LOG_6
} from './action'

export function start_play(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOG_6:
		case RECIEVE_LOG_6:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function start_play_form(state = {}, action){
	switch(action.type){
		case LOG_INPUT_PEERID_6:
		case LOG_INPUT_START_TIME_6:
		case LOG_INPUT_END_TIME_6:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}