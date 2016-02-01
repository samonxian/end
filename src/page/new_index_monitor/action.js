import fetch from 'isomorphic-fetch'
export const INDEX_MONITOR_STATUS_REQ = 'INDEX_MONITOR_STATUS_REQ'

export function indexMonitorReq(data){
    return {
        type : INDEX_MONITOR_STATUS_REQ,
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
        return fetch('http://120.26.74.53/api/disc_monitor/query/monitors_json?area='+reddit["area"]+'&p='+reddit["p"])
            .then(response => response.json())
            .then(json => dispatch(indexMonitorResponse(reddit, json)))
    }
}
