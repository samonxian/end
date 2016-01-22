import { INDEX_MONITOR_STATUS_REQ } from './action'

export function new_index_monitor(state={data : {area:'北京',p:1}},action){
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