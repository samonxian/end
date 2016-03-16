import fetch from 'isomorphic-fetch'
export const GET_AREA_LIST = 'GET_AREA_LIST'
export const DISK_STORAGE_STATUS_REQ = 'DISK_STORAGE_STATUS_REQ'


export function getAreaListReq(){
	return {
		type : GET_AREA_LIST,
	}
}

export function getAreaListRespone(reddit,json){
    return {
        type : GET_AREA_LIST,
        param : json
    }
}

export function getAreaListFetch(reddit,json){
    return dispatch => {
        dispatch(getAreaListReq())
        return fetch('http://120.26.74.53/api/disc_monitor/area_list')
            .then(response => response.json())
            .then(json => dispatch(getAreaListRespone(reddit, json)))
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