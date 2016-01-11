import fetch from 'isomorphic-fetch'
export const DISK_DETAIL_STATUS_REQ = 'DISK_DETAIL_STATUS_REQ'
export const CAMERA_FRAME_STATUS_REQ = 'CAMERA_FRAME_STATUS_REQ'
export const CAMERA_FRAME_STATUS_QUERY = 'CAMERA_FRAME_STATUS_QUERY'
export const INDEX_MONITOR_STATUS_REQ = 'INDEX_MONITOR_STATUS_REQ'

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

export function cameraFrameReq(){
    return {
        type : CAMERA_FRAME_STATUS_REQ,
    }
}

export function cameraFrameQuery(data){
    return {
        type : CAMERA_FRAME_STATUS_REQ,
        param : data
    }
}

export function cameraFrameQueryResponse(data){
    return {
        type : CAMERA_FRAME_STATUS_REQ,
        param : data
    }
}

export function indexMonitorReq(data){
    return {
        type : CAMERA_FRAME_STATUS_QUERY,
        param : data
    }
}

export function indexMonitorResponse(reddit,json){
    return {
        type : INDEX_MONITOR_STATUS_REQ,
        param : json
    }
}

export function indexMonitorFetch(reddit){
    return dispatch => {
        dispatch(indexMonitorReq(reddit))
        return fetch('http://120.26.74.53:8077/disc_monitor/query/monitors_json')
            .then(response => response.json())
            .then(json => dispatch(indexMonitorResponse(reddit, json)))
    }
}

export function cameraFrameFetch(reddit){
    return dispatch => {
        dispatch(cameraFrameQuery(reddit))
        return fetch('http://120.26.74.53:8077/monitor/store_timeline_json')
            .then(response => response.json())
            .then(json => dispatch(cameraFrameQueryResponse(reddit, json)))
    }
}

export function fetchDiskData(reddit) {
    return dispatch => {
        dispatch(diskDtailReq(reddit))
        return fetch('http://120.26.74.53:8077/monitor/discInfo_json')
            .then(response => response.json())
            .then(json => dispatch(diskDtailRespone(reddit, json)))
    }
}


