import { ENTERPRISE_MANAGER_AUTHENTICATE_REQ, 
	     ENTERPRISE_MANAGER_ANTHENTICATE_APROVAL,
	     ENTERPRISE_MANAGER_AUTHENTICATE_DAILOG } from './action'

export function enterpriseManagerAuthenticate(state={},action){
    switch(action.type){
		case ENTERPRISE_MANAGER_AUTHENTICATE_REQ : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ENTERPRISE_MANAGER_AUTHENTICATE_REQ
		     });
		     break;
		default :
		     return state;
		     break;
	}
}

export function enterpriseManagerAuthenticateAproval(state={},action){
	switch(action.type){
		case ENTERPRISE_MANAGER_ANTHENTICATE_APROVAL : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ENTERPRISE_MANAGER_ANTHENTICATE_APROVAL
		     });
		     break;
		default :
		     return state;
		     break;
	}
}

export function enterpriseAuthenticateDailog(state={visible: false},action){
	switch(action.type){
		case ENTERPRISE_MANAGER_AUTHENTICATE_DAILOG : 
		     return Object.assign({},state, action);
		     break;
		default :
		     return state;
		     break;
	}
}
