import { APP_MANAGER_STATUS, GET_APP_TYPE_STATUS } from './action'

export function app_manager(state={},action){
	if(action.type === APP_MANAGER_STATUS){
		for(let i=0,len = action["param"]["list"].length;i<len;i++){
			action["param"]["list"][i]["key"]="app_manager_key"+ new Date().getTime()+Math.random()
		}
		return Object.assign({},state, {
		     	data : action['param'],
		        type : APP_MANAGER_STATUS
		     });
	}
    return state;
}

export function get_app_type(state={},action){
	if(action.type === GET_APP_TYPE_STATUS){
		return Object.assign({},state, {
		     	data : action['param'],
		        type : GET_APP_TYPE_STATUS
		     });
	}
	return state;
}