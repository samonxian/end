import { ENTERPRISE_MANAGER_CODE_REQ } from './action'

export function enterpriseManagerCodeList(state={},action){
    switch(action.type){
		case ENTERPRISE_MANAGER_CODE_REQ : 
		     console.log("============================ ENTEERPRISE_MANAGER_AUTHENTICATE_CODE_REQ");
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
