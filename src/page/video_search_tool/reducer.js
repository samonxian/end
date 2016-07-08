import { REQUEST_TIPS_MESSAGE, REQUUST_VIDEO_SEARCH_TOOL } from './action'

export function getTipsMessage(state = {},action){
	switch(action.type){
		case REQUEST_TIPS_MESSAGE : 
		     return Object.assign({},state, action);
		     break;
		default :
		     return state;
		     break;
	}
}

export function getVideoSearchToolData(state = {},action){
	switch(action.type){
		case REQUUST_VIDEO_SEARCH_TOOL : 
		     return Object.assign({},state, action);
		     break;
		default :
		     return state;
		     break;
	}
}