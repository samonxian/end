import { CAMERA_FRAME_STATUS_QUERY, CAMERA_FRAME_STATUS_REQ } from './action'

export function new_index_camera(state={},action){
    switch(action.type){
		case CAMERA_FRAME_STATUS_REQ : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : CAMERA_FRAME_STATUS_REQ
		     });
		     break;
		case CAMERA_FRAME_STATUS_QUERY : 
		     return Object.assign({}, state, {
		        data : action['param'],
		        type : CAMERA_FRAME_STATUS_QUERY
		     });
		default :
		     return state;
		     break;
	}
}