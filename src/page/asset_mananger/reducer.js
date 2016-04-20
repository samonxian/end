import { ASSET_MANANGER_GET_DATA_REQUEST, ASSET_MANANGER_SET_SHOW_DETAIL } from './action'

export function asset_mananger(state={},action){
    switch(action.type){
		case ASSET_MANANGER_GET_DATA_REQUEST : 
		     console.log("==================== ASSET_MANANGER_GET_DATA_REQUEST");
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ASSET_MANANGER_GET_DATA_REQUEST
		     });
		     break;
		default :
		     return state;
		     break;
	}
}

export function asset_mananger_detial(state={},action){
	switch(action.type){
		case ASSET_MANANGER_SET_SHOW_DETAIL : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ASSET_MANANGER_SET_SHOW_DETAIL
		     });
		     break;
		default :
		     return state;
		     break;
	}
}