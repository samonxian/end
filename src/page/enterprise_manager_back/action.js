import fetch from 'isomorphic-fetch'
export const ENTERPRISE_MANAGER_BACK_REQ = 'ENTERPRISE_MANAGER_BACK_REQ'
export const ENTERPRISE_MANAGER_BACK_DAILOG = 'ENTERPRISE_MANAGER_BACK_DAILOG'

function  getEnterpriseManagerBackResponse(json,reddit){
    Object.assign(json,reddit);
    return {
        type : ENTERPRISE_MANAGER_BACK_REQ,
        param : json
    }
}

export function dailogShowData(visible){
	return {
		type : ENTERPRISE_MANAGER_BACK_DAILOG,
		visible : visible,
		json : {}
	}
}

function getEnterpriseManagerBackRquest(){
    return {
        type : ENTERPRISE_MANAGER_BACK_DAILOG
    }
}

export function getEnterpriseManagerBackFetch(reddit){
    var url = '/dev/v1/blacklist?app_id='+reddit["app_id"]+'&app_code='+reddit["app_code"]+'&identity='+
              reddit["identity"]+'&cid='+reddit["cid"]+'&page='+reddit["page"]+'&size='+reddit["size"];
    return dispatch => {
        return fetch('http://www.topvdn.com/test/back_data.js')
            .then(response => response.json())
            .then(json => dispatch(getEnterpriseManagerBackResponse(json,{
                app_id : reddit["app_id"],
                app_code : reddit["app_code"],
                cid : reddit["cid"],
                identity : reddit["identity"]
            })))
    }
}

export function enterpriseBackOptFetch(reddit){
    var url = '/dev/v1/blacklist/'+reddit["id"];
}

export function enterpriseAddBack(reddit){
    var url = '/dev/v1/blacklist'
}