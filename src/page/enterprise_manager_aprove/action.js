// import fetch from 'isomorphic-fetch'
export const ENTERPRISE_MANAGER_APROVAL_REQ = 'ENTERPRISE_MANAGER_APROVAL_REQ'
export const ENTERPRISE_MANAGER_APROVAL_DAILOG = 'ENTERPRISE_MANAGER_APROVAL_DAILOG'

function  getEnterpriseManagerAprovalResponse(json,reddit){
    Object.assign(json,reddit);
    return {
        type : ENTERPRISE_MANAGER_APROVAL_REQ,
        param : json
    }
}

function getEnterpriseManagerAprovalQuest(){
	return {
		type : ENTERPRISE_MANAGER_APROVAL_REQ
	}
}

export function enterpriseManagerAprovalDailog(visible,json){
    return {
        type : ENTERPRISE_MANAGER_APROVAL_DAILOG,
        visible : visible,
        json : json
    }
}

export function getEnterpriseManagerAprovalFetch(reddit){
    var url = '/dev/v1/partitions?app_id='+reddit["app_id"]+'&app_code='+reddit["app_code"]+
              '&identity='+reddit["identity"]+'&status='+reddit["status"]+'&page='+reddit["page"]+
              '&size='+reddit["size"];
    return dispatch => {
        return fetch('http://www.topvdn.com/test/aproval_data.js')
            .then(response => response.json())
            .then(json => dispatch(getEnterpriseManagerAprovalResponse(json,{
                app_id : reddit["app_id"],
                app_code : reddit["app_code"],
                identity : reddit["identity"],
                status : reddit["status"]
            })))
    }
}

export function enterpriseManagerAprovalAgreeFetch(reddit){
    var url = '/dev/v1/partitions/'
}