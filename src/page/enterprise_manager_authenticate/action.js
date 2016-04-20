import fetch from 'isomorphic-fetch'
export const ENTERPRISE_MANAGER_AUTHENTICATE_REQ = 'ENTERPRISE_MANAGER_AUTHENTICATE_REQ'
export const ENTERPRISE_MANAGER_AUTHENTICATE_DAILOG = 'ENTERPRISE_MANAGER_AUTHENTICATE_DAILOG'
export const ENTERPRISE_MANAGER_ANTHENTICATE_APROVAL = 'ENTERPRISE_MANAGER_ANTHENTICATE_APROVAL'

function getEnterpriseManagerResponse(json,reddit){
    Object.assign(json,reddit);
    return {
        type : ENTERPRISE_MANAGER_AUTHENTICATE_REQ,
        param : json
    }
}

function enterpriseManagerAuthenticateAproval(json){
    return {
        type : ENTERPRISE_MANAGER_ANTHENTICATE_APROVAL,
        param : json
    }
}

export function authenticateDailog(data){
	return {
		type : ENTERPRISE_MANAGER_AUTHENTICATE_DAILOG,
		visible : true,
		param : data
	}
}

export function clearAuthenicateData(){
	return {
		type : ENTERPRISE_MANAGER_AUTHENTICATE_DAILOG,
		visible : false,
		param : {}
	}
}

export function getEnterpriseManagerFetch(reddit){
    return dispatch => {
        var url = '/dev/v1/identities?status='+reddit["status"]+"&code="+reddit["code"]+"&page="+reddit["page"];
        return fetch('http://www.topvdn.com/test/data.js',{
             method: 'GET'
        }).then(response => response.json())
          .then(json => dispatch(getEnterpriseManagerResponse(json,{
              status : reddit["status"],
              code : reddit["code"]
          })))
    }
}

export function aprovalEnterpriseAuthenicateFetch(reddit){
    console.log("aprovalEnterpriseAuthenicateFetch reddit",reddit);
    return dispatch => {
        var url = '/dev/v1/identities/'+reddit["id"];
        return fetch('http://120.26.74.53/api/disc_monitor/area_list',{
             method: 'PATCH',
             body: JSON.stringify({
                 status : reddit["status"]
             })
        }).then(response => response.json())
          .then(json => dispatch(enterpriseManagerAuthenticateAprival()))
    }
}