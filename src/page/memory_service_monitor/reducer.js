import { MEMORY_SERVICE_MONITOR } from './action'

export function memory_service_monitor(state={},action){
    switch(action.type){
		case MEMORY_SERVICE_MONITOR : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : MEMORY_SERVICE_MONITOR
		     });
		     break;
		default :
		     return state;
		     break;
	}
}