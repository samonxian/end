import { AREA_MEMORY_REQ, AREA_MEMORY_DETAIL } from './action'

export function area_memory(state={},action){
    switch(action.type){
		case AREA_MEMORY_REQ : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : AREA_MEMORY_REQ
		     });
		     break;
		default :
		     return state;
		     break;
	}
}

export function area_memory_detail(state={},action){
    switch(action.type){
		case AREA_MEMORY_DETAIL : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : AREA_MEMORY_DETAIL
		     });
		     break;
		default :
		     return state;
		     break;
	}
}