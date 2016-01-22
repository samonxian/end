import { UPDATE_PATH } from 'redux-simple-router'
import {
	LOG_QUERY_INPUT_CID,
	LOG_QUERY_INPUT_START_TIME,
	LOG_QUERY_INPUT_END_TIME,
	LOG_QUERY_SHOWTABLE,
	RECIEVE_LOG_QUERY,
	REQUEST_LOG_QUERY,
	RECIEVE_MORE_LOG_QUERY,
	REQUEST_MORE_LOG_QUERY
} from './action'

export function user_log_query(state = {}, action) {
    switch (action.type) {
		case REQUEST_MORE_LOG_QUERY:
		case RECIEVE_MORE_LOG_QUERY:
			delete state.posts[0]._end_time;
			if(action.posts && action.posts[0]){
				action.posts.map(function(value,key){
					state.posts.push(value)
				})
			}
			console.log("ddd",state.posts)
			delete action.posts;
			return Object.assign({}, state,action);
		case REQUEST_LOG_QUERY:
		case RECIEVE_LOG_QUERY:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function user_log_query_form(state = {}, action){
	switch(action.type){
		case LOG_QUERY_INPUT_CID:
		case LOG_QUERY_INPUT_START_TIME:
		case LOG_QUERY_INPUT_END_TIME:
			return Object.assign({}, state,action);
		default:
			return state;

	}
}

export function user_log_query_showTable(state = {}, action){
	switch(action.type){
        case LOG_QUERY_SHOWTABLE:
			return Object.assign({}, state,action);
		default:
			return state;
	}
}
