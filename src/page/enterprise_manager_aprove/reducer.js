import { ENTERPRISE_MANAGER_APROVAL_REQ, ENTERPRISE_MANAGER_APROVAL_DAILOG } from './action'

export function enterpriseManagerAprovalDailog(state={},action){
	 switch(action.type){
		case ENTERPRISE_MANAGER_APROVAL_DAILOG : 
		     return Object.assign({},state, action);
		     break;
		default :
		     return state;
		     break;
	}
}

export function enterpriseManagerAprovalList(state={},action){
    switch(action.type){
		case ENTERPRISE_MANAGER_APROVAL_REQ : 
		     console.log("============================== ENTEERPRISE_MANAGER_APROVE_REQ")
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ENTERPRISE_MANAGER_APROVAL_REQ
		     });
		     break;
		default :
		     return state;
		     break;
	}
}


