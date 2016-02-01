import fetch from 'isomorphic-fetch'
import { AREA_LIST } from './component/area'
export const GET_AREA_LIST = 'GET_AREA_LIST'
export const DISK_STORAGE_STATUS_REQ = 'DISK_STORAGE_STATUS_REQ'


export function getAreaListReq(){
	return {
		type : GET_AREA_LIST,
	}
}

export function getAreaListRespone(reddit){
    return {
        type : GET_AREA_LIST,
        param : AREA_LIST
    }
}

export function getAreaListFetch(reddit){
    return dispatch => {
        dispatch(getAreaListRespone(reddit))
    }
}

export function getStorageResponse(reddit,json){
    return {
        type : DISK_STORAGE_STATUS_REQ,
        param : json
    }
}

export function storageFetch(reddit){
    return dispatch => {
        dispatch(getStorageReq(reddit))
        return fetch('http://120.26.74.53/api/disc_monitor/query/discstatus?id='+reddit["id"])
            .then(response => response.json())
            .then(json => dispatch(getStorageResponse(reddit, json)))
    }
}

export function getStorageReq(data){
    return {
        type : DISK_STORAGE_STATUS_REQ,
        param : data
    }
}