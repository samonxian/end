import fetch from 'isomorphic-fetch'
export const AREA_MEMORY_REQ = 'AREA_MEMORY_REQ'
export const AREA_MEMORY_DETAIL = 'AREA_MEMORY_DETAIL'

export function areaMemoryReq(){
	return {
		type : AREA_MEMORY_REQ,
	}
}

export function areaMemoryRespone(json){
    return {
        type : AREA_MEMORY_REQ,
        param : json
    }
}

export function areaMemoryDetailRespone(json){
    return {
        type : AREA_MEMORY_DETAIL,
        param : json
    }
}

export function fetchAreaMemoryDetailData(json){
    return  dispatch =>{
        dispatch(areaMemoryDetailRespone(json))
    }
}

export function fetchAreaMemoryData() {
    return dispatch => {
        return fetch('http://120.26.74.53/api/disc_monitor/area_stat?return_type=json')
            .then(response => response.json())
            .then(json => dispatch(areaMemoryRespone(json)))
    }
}

