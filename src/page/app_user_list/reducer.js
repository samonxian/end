import { USER_LIST_STATUS } from './action'

export function app_user_list(state={},action){
	if(action["type"] === USER_LIST_STATUS){
		return Object.assign({},state, {
	     	data : action['param'],
	        type : APP_CAMERA_STATUS
	    });
	}
    return state;
}