import { APP_CAMERA_STATUS } from './action'

export function app_camera_list(state={},action){
	if(action["type"]===APP_CAMERA_STATUS){
		
		return Object.assign({},state, {
	     	data : action['param'],
	        type : APP_CAMERA_STATUS
	     });
	}
    return state;
}