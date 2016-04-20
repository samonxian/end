import { ASSET_MANAGER_CONFIG_REQ, ASSET_MANAGER_CONFIG_UPDATE } from './action'

export function asset_mananger_config(state={},action){
    switch(action.type){
		case ASSET_MANAGER_CONFIG_REQ : 
		     console.log("============================ ASSET_MANAGER_CONFIG ");
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ASSET_MANAGER_CONFIG_REQ
		     });
		     break;
		default :
		     return state;
		     break;
	}
}

export function asset_manager_config_update(state={},action){
	switch(action.type){
		case ASSET_MANAGER_CONFIG_UPDATE : 
		     return Object.assign({},state, {
		     	data : action['param'],
		     	opt : action["opt"],
		        type : ASSET_MANAGER_CONFIG_UPDATE
		     });
		     break;
		default :
		     return state;
		     break;
	}
}