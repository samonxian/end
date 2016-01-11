import {DISK_DETAIL_STATUS_REQ,CAMERA_FRAME_STATUS_QUERY,CAMERA_FRAME_STATUS_REQ,INDEX_MONITOR_STATUS_REQ} from './action'

export function diskDetailResponse(state = {},action){
	switch(action.type){
		case DISK_DETAIL_STATUS_REQ : 
		     return Object.assign({}, state, {
		        data : action['param'],
		        type : DISK_DETAIL_STATUS_REQ
		     });
		     break;
		case CAMERA_FRAME_STATUS_REQ : 
		     return Object.assign({},state, {
		     	data : {},
		        type : CAMERA_FRAME_STATUS_REQ
		     });;
		     break;
		case INDEX_MONITOR_STATUS_REQ : 
		     return Object.assign({}, state, {
		        data : action['param'],
		        type : INDEX_MONITOR_STATUS_REQ
		     });
		default :
		     return state;
		     break;
	}
}