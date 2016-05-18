import { ENTERPRISE_MANAGER_CODE_REQ, ENTERPRISE_MANAGER_CODE_DAILOG } from './action'

export function enterpriseManagerCodeList(state={},action){
    switch(action.type){
		case ENTERPRISE_MANAGER_CODE_REQ : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ENTERPRISE_MANAGER_CODE_REQ
		     });
		     break;
		default :
		     return state;
		     break;
	}
}

export function enterpriseDailog(state={},action){
	switch(action.type){
		case ENTERPRISE_MANAGER_CODE_DAILOG : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ENTERPRISE_MANAGER_CODE_DAILOG
		     });
		     break;
		default :
		     return state;
		     break;
	}
}
