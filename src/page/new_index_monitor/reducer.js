import { INDEX_MONITOR_STATUS_REQ } from './action'

export function new_index_monitor(state={},action){
    switch(action.type){
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