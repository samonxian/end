import { GET_AREA_LIST } from './action'

const initAreaState = {
	data : [],
	type : GET_AREA_LIST
}

export function get_area_list(state = initAreaState,action){
	if(action.type === GET_AREA_LIST){
    	return  Object.assign({}, state, {
	        data : action['param'],
	        type : GET_AREA_LIST
	     });
    }
    return state;
}