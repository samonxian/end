import { ENTERPRISE_MANAGER_APROVAL_REQ, 
	     ENTERPRISE_MANAGER_APROVAL_DAILOG,
	     ENTERPRISE_MANAGER_APROVAL_AVALIABLE,
	     ENTERPRISE_MANAGER_HAVE_CID_LIST } from './action'

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

export function enterpriseManagerAprovalAvaliable(state={},action){
	switch(action.type){
		case ENTERPRISE_MANAGER_APROVAL_AVALIABLE : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ENTERPRISE_MANAGER_APROVAL_AVALIABLE
		     });
		     break;
		default :
		     return state;
		     break;
	}
}

export function enterpriseManagerHaveCid(state={},action){
	switch(action.type){
		case ENTERPRISE_MANAGER_HAVE_CID_LIST : 
		     return Object.assign({},state, {
		     	data : action['param'],
		        type : ENTERPRISE_MANAGER_HAVE_CID_LIST
		     });
		     break;
		default :
		     return state;
		     break;
	}
}


