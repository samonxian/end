import { LEVEL_WARNING_HALFHOUR_REQUEST, LEVEL_WARNING_DAY_REQUEST } from './action'

export function levelWarningHalfHour(state={},action){
	switch(action.type){
		case LEVEL_WARNING_HALFHOUR_REQUEST : 
		     return Object.assign({},state, action);
		     break;
		default :
		     return state;
		     break;
	}
}

export function levelWarningDay(state={},action){
	switch(action.type){
		case LEVEL_WARNING_DAY_REQUEST : 
		     return Object.assign({},state, action);
		     break;
		default :
		     return state;
		     break;
	}
}