import fetch from 'isomorphic-fetch'
export const CAMERA_FRAME_STATUS_REQ = 'CAMERA_FRAME_STATUS_REQ'
export const CAMERA_FRAME_STATUS_QUERY = 'CAMERA_FRAME_STATUS_QUERY'

export function cameraFrameReq(data){
    return {
        type : CAMERA_FRAME_STATUS_REQ,
        param : data
    }
}

export function cameraFrameQuery(data){
    return {
        type : CAMERA_FRAME_STATUS_REQ,
        param : data
    }
}

export function cameraFrameQueryResponse(reddit, json){
    let data = Object.assign({}, reddit, json);
    return {
        type : CAMERA_FRAME_STATUS_QUERY,
        param : data
    }
}

export function cameraFrameFetch(reddit){
    return dispatch => {
        dispatch(cameraFrameQuery(reddit))
        return fetch('http://120.26.74.53:8077/monitor/store_timeline_json?cid='+reddit["cid"]+'&start_time='+reddit["start_time"]+'&end_time='+reddit["end_time"])
            .then(response => response.json())
            .then(json => dispatch(cameraFrameQueryResponse(reddit, json)))
    }
}
