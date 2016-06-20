import Fetch from 'libs/fetch2'
export const STROAGE_MONITOR_VIEW_REQ = 'STROAGE_MONITOR_VIEW_REQ'
export const STROAGE_MONITOR_VIEW_CHAR_REQ = 'STROAGE_MONITOR_VIEW_CHAR_REQ'

function stroageMonitorViewReq(json){
    return {
        type : STROAGE_MONITOR_VIEW_REQ,
        param : json
    }
}

function stroageMonitorCharReq(json){
    return {
        type : STROAGE_MONITOR_VIEW_CHAR_REQ,
        param : json
    }
}

export function stroageMonitorViewFetch(){
	var url = "http://120.26.74.53/v1/diagram/areastorage";
	return dispatch => {
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(stroageMonitorViewReq(json)))
    }
}

export function stroageMonitorViewCharFetch(){
    var url = "http://120.26.74.53/v1/diagram/areastorage/12hour";
    return dispatch => {
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(stroageMonitorCharReq(json)))
    }
}
