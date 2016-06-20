import { STROAGE_MONITOR_VIEW_REQ, STROAGE_MONITOR_VIEW_CHAR_REQ } from './action'

export function stroageMonitorView(state={},action){
	 switch(action.type){
		case STROAGE_MONITOR_VIEW_REQ : 
		     return Object.assign({},state, action);
		     break;
		default :
		     return state;
		     break;
	}
}

export function stroageMonitorChar(state={},action){
	switch(action.type){
		case STROAGE_MONITOR_VIEW_CHAR_REQ : 
		     return Object.assign({},state, action);
		     break;
		default :
		     return state;
		     break;
	}
}