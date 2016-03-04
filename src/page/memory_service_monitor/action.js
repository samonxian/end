import fetch from 'isomorphic-fetch'
export const MEMORY_SERVICE_MONITOR = 'MEMORY_SERVICE_MONITOR_REQ'

export function memoryServiceMonitor(){
	return {
		type : MEMORY_SERVICE_MONITOR,
	}
}

export function memoryServiceMonitorRespone(json){
    return {
        type : MEMORY_SERVICE_MONITOR,
        param : json
    }
}

export function fetchMemoryServiceMonitorData() {
    return dispatch => {
        dispatch(memoryServiceMonitor())
        return fetch('http://120.26.74.53:8077/get_diagram_data/groups_stat')
            .then(response => response.json())
            .then(json => dispatch(memoryServiceMonitorRespone(json)))
    }
}