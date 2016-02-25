import {
	RECIEVE_CAMERASTAT,
	REQUEST_CAMERASTAT
} from './action'

export function get_camera_stat(state = {}, action) {
    switch (action.type) {
        case REQUEST_CAMERASTAT:
		case RECIEVE_CAMERASTAT:
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function get_camera_stat_form(state = {}, action){
	switch(action.type){
		default:
			return state;
	}
	
}
