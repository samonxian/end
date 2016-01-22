import fetch from 'isomorphic-fetch'
export const DISK_DETAIL_STATUS_REQ = 'DISK_DETAIL_STATUS_REQ'
export const DISK_STORAGE_STATUS_REQ = 'DISK_STORAGE_STATUS_REQ'
export const NEW_INDEX_CITY_TAB = 'NEW_INDEX_CITY_TAB'

export function diskDtailReq(data){
	return {
		type : DISK_DETAIL_STATUS_REQ,
		param : data
	}
}

export function diskDtailRespone(reddit,json){
    return {
        type : DISK_DETAIL_STATUS_REQ,
        param : json
    }
}

export function newIndexTab(data){
    return {
        type : NEW_INDEX_CITY_TAB,
        param : data
    }
}

export function fetchDiskData(reddit) {
    return dispatch => {
        dispatch(diskDtailReq(reddit))
        return fetch('http://120.26.74.53:8077/monitor/discInfo_json?area='+reddit["area"]+'&p='+reddit["p"])
            .then(response => response.json())
            .then(json => dispatch(diskDtailRespone(reddit, json)))
    }
}
