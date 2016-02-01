import {
	RECIEVE_RTMPTRACKER,
	REQUEST_RTMPTRACKER
} from './action'

export function rtmp_tracker(state = {}, action) {
    switch (action.type) {
        case REQUEST_RTMPTRACKER:
		case RECIEVE_RTMPTRACKER:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function rtmp_tracker_form(state = {}, action){
	switch(action.type){
		default:
			return state;
	}
	
}
