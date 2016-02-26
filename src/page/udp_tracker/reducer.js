import {
	RECIEVE_UDPTRACKER,
	REQUEST_UDPTRACKER
} from './action'

export function udp_tracker(state = {}, action) {
    switch (action.type) {
        case REQUEST_UDPTRACKER:
		case RECIEVE_UDPTRACKER:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function udp_tracker_form(state = {}, action){
	switch(action.type){
		default:
			return state;
	}
	
}
