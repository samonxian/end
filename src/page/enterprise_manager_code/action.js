import fetch from 'isomorphic-fetch'
import { REQUESTURL } from 'libs/common'
import Fetch from 'libs/fetch2'
export const ENTERPRISE_MANAGER_CODE_REQ = 'ENTEERPRISE_MANAGER_AUTHENTICATE_REQ'
export const ENTERPRISE_MANAGER_CODE_DAILOG = 'ENTERPRISE_MANAGER_CODE_DAILOG'

function  getEnterpriseManagerCodeResponse(param,json){
    Object.assign(json,param);
    return {
        type : ENTERPRISE_MANAGER_CODE_REQ,
        param : json
    }
}

function getEnterpriseManagerCodeQuest(json){
	return {
        type : ENTERPRISE_MANAGER_CODE_REQ
    }
}

export function enterpriseDailog(param,json){
    Object.assign(json,param);
    return {
        type : ENTERPRISE_MANAGER_CODE_DAILOG,
        param : json
    }
}

export function getEnterpriseManagerCodeFetch(reddit){
    var url = REQUESTURL+'/dev/v1/apps?type='+ reddit["type"]+"&name="+reddit["identity"]+"&code="+reddit["code"]+
              '&page='+reddit["page"]+'&size='+reddit["size"]
    return dispatch => {
        r3fetch({
             urls:[url],
             method: 'GET'
         }).fetch(dispatch,getEnterpriseManagerCodeResponse,{
             loading : true,
             type : reddit["type"],
             indentity : reddit["indentity"],
             page : reddit["page"],
             code : reddit["code"]
        },null);
    }
}

export function getEnterpriseManagerStatusFetch(reddit){
    var url = REQUESTURL+'/dev/v1/apps/'+reddit["app_id"];
    return dispatch => {
        r3fetch({
             urls:[url],
             params: reddit,
             method: 'PATCH'
         }).fetch(dispatch,enterpriseDailog,{
             visible : false
        },null);
    }
}