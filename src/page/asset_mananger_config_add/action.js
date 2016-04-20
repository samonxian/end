import fetch from 'isomorphic-fetch'
export const ASSET_MANAGER_CONFIG_ADD_REQ = 'ASSET_MANAGER_CONFIG_ADD_REQ'


function assetManagerConfigSave(json){
	return {
		type : ASSET_MANAGER_CONFIG_ADD_REQ,
		param : json
	}
}

export function assetManagerConfigSaveFetch(reddit){
	return dispatch => {
		return fetch('http://120.27.115.65:9999/server_add',{
			method: 'POST',
			body : JSON.stringify(reddit)
		}).then(function(response){
			console.log(response);
			console.log(response.statusText);
			console.log(response.body);
		});
    }
}

export function assetManagerConfigUpdateFetch(reddit){
	return dispatch => {
		return fetch('http://120.27.115.65:9999/server_update',{
			method: 'POST',
			body : JSON.stringify(reddit)
		}).then(function(response){
			console.log(response);
			console.log(response.statusText);
			console.log(response.body);
		});
    }
}