import fetch from 'isomorphic-fetch'
export const ASSET_MANAGER_CONFIG_REQ = 'ASSET_MANAGER_CONFIG_REQ'
export const ASSET_MANAGER_CONFIG_DELETER = 'ASSET_MANAGER_CONFIG_DELETER'
export const ASSET_MANAGER_CONFIG_UPDATE = 'ASSET_MANAGER_CONFIG_UPDATE'

function assetManagerCofigList(json){
	return {
		type : ASSET_MANAGER_CONFIG_REQ,
		param : json
	}
}

export function assetManagerConfigFetch(){
	return dispatch => {
		return fetch('http://120.27.115.65:9999/server_info')
            .then(response => response.json())
            .then(json => dispatch(assetManagerCofigList(json)))
    }
}

export function clearManagerConfigUpdate(){
	return {
		type : ASSET_MANAGER_CONFIG_UPDATE,
		opt :  "",
		param : {}
	}
}

export function assetManagerCofigUpdate(data){
	return {
		type : ASSET_MANAGER_CONFIG_UPDATE,
		opt :  data["opt"],
		param : data["data"]
	}
}

export function assetManagerCofigDelete(data){
	return dispatch => {
		return fetch('http://120.27.115.65:9999/server_delete',{
			method: 'POST',
			body: JSON.stringify({
			    hostanme: data["hostname"],
			})
		}).then(response => response.json())
          .then(json => dispatch(assetManagerCofigList(json)))
    }
}