import fetch from 'isomorphic-fetch'
export const ASSET_MANANGER_GET_DATA_REQUEST = 'ASSET_MANANGER_GET_DATA_REQUEST'
export const ASSET_MANANGER_SET_SHOW_DETAIL = 'ASSET_MANANGER_SET_SHOW_DETAIL'


function receiveGetDataPosts(json) {
    return {
        type: ASSET_MANANGER_GET_DATA_REQUEST,
        param: json,
        receivedAt: Date.now()
    }
}

export function clearDailogData(json){
    return {
        type : ASSET_MANANGER_SET_SHOW_DETAIL,
        param : {}
    }
}

export function showDetailMessage(json){
    return {
        type : ASSET_MANANGER_SET_SHOW_DETAIL,
        param : json
    }
}


export function fetchGetData() {
    return dispatch => {
		return fetch('http://120.27.115.65:9999/server_stat')
            .then(response => response.json())
            .then(json => dispatch(receiveGetDataPosts(json)))
    }
}