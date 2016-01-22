import fetch from 'isomorphic-fetch'
import { TABLE_LIST } from './data/table_list'
import { APP_TYPE } from './data/app_type'
export const APP_MANAGER_STATUS = 'APP_MANAGER_STATUS'
export const GET_APP_TYPE_STATUS = 'GET_APP_TYPE_STATUS'

export function appManagerReq(data){
	return {
		type : APP_MANAGER_STATUS,
		param : data
	}
} 

export function appManagerResponse(reddit,json){
	return {
		type : APP_MANAGER_STATUS,
		param : TABLE_LIST
	}
}

export function getAppType(){
	return {
		type : GET_APP_TYPE_STATUS
	}
}

export function getAppTypeResponse(reddit){
	return {
		type : GET_APP_TYPE_STATUS,
		param : APP_TYPE
	}
}

export function appManagerFetch(reddit){
	return dispatch => {
        dispatch(appManagerResponse(reddit))
    }
}

export function getAppTypeFetch(reddit){
	return dispatch => {
        dispatch(getAppTypeResponse(reddit))
    }
}