import { ENTERPRISE_MANAGER_BACK_REQ, ENTERPRISE_MANAGER_BACK_DAILOG } from './action'

export function enterpriseManagerBackList(state={},action){
    switch(action.type){
		case ENTERPRISE_MANAGER_BACK_REQ : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ENTERPRISE_MANAGER_BACK_REQ
		     });
		     break;
		default :
		     return state;
		     break;
	}
}

export function enterpriseManagerDailog(state={},action){
	switch(action.type){
		case ENTERPRISE_MANAGER_BACK_DAILOG : 
		     return Object.assign({},state, action);
		     break;
		default :
		     return state;
		     break;
	}
}
