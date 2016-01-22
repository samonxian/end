import fetch from 'isomorphic-fetch'
import { USER_LIST } from './data/user_list'

export const USER_LIST_STATUS = 'USER_LIST_STATUS'

function userListReq(data){
	return {
		type : USER_LIST_STATUS,
		param : data
	}
}

function userListResponse(data){
	return {
		type : USER_LIST_STATUS,
		param : USER_LIST
	}
}

export function userListFetch(reddit){
	return dispatch => {
        dispatch(userListResponse(reddit))
    }
}