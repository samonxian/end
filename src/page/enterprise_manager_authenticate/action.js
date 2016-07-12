import { REQUESTURL } from 'libs/common'
import Fetch from 'libs/fetch2'
export const ENTERPRISE_MANAGER_AUTHENTICATE_REQ = 'ENTERPRISE_MANAGER_AUTHENTICATE_REQ'
export const ENTERPRISE_MANAGER_AUTHENTICATE_DAILOG = 'ENTERPRISE_MANAGER_AUTHENTICATE_DAILOG'
export const ENTERPRISE_MANAGER_ANTHENTICATE_APROVAL = 'ENTERPRISE_MANAGER_ANTHENTICATE_APROVAL'
export const LOGIN_INTO_PAGE_REQUEST = 'LOGIN_INTO_PAGE_REQUEST'

function getEnterpriseManagerResponse(param={},json){
    Object.assign(json,param);
    return {
        type : ENTERPRISE_MANAGER_AUTHENTICATE_REQ,
        param : json
    }
}

export function enterpriseManagerAuthenticateAproval(param={},json){
    Object.assign(json,param);
    return {
        type : ENTERPRISE_MANAGER_ANTHENTICATE_APROVAL,
        param : json
    }
}

export function loginIntoPage(url){
    return {
        type : LOGIN_INTO_PAGE_REQUEST,
        param : url
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
    var url = REQUESTURL+'/dev/v1/identities?status='+reddit["authenicate_status"]+
             "&code="+reddit["code"]+"&name="+reddit["name"]+"&page="+reddit["page"];
    return dispatch => {
      r3fetch({
          urls:[url],
          method: 'GET'
      }).fetch(dispatch,getEnterpriseManagerResponse,{
            authenicate_status : reddit["authenicate_status"],
            name : reddit["name"],
            page : reddit["page"],
            code : reddit["code"]
      },null);
    }
}

export function aprovalEnterpriseAuthenicateFetch(reddit){
    var url = REQUESTURL+'/dev/v1/identities/'+reddit["id"];
    return dispatch => {
       r3fetch({
          urls:[url],
          method: 'PATCH',
          params: {
              status : reddit["status"]
          }
       }).fetch(dispatch,enterpriseManagerAuthenticateAproval,{
          visible : false
       },null);
    }
}