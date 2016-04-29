import fetch from 'isomorphic-fetch'
import { REQUESTURL } from 'libs/common'
import Fetch from 'libs/fetch2'
export const ENTERPRISE_MANAGER_CODE_REQ = 'ENTEERPRISE_MANAGER_AUTHENTICATE_REQ'

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

export function getEnterpriseManagerCodeFetch(reddit){
    console.log("++++++++++++reddit",reddit);
    var url = REQUESTURL+'/dev/v1/apps?type='+ reddit["type"]+"&name="+reddit["identity"]+"&code="+reddit["code"]+
              '&page='+reddit["page"]+'&size='+reddit["size"]
    return dispatch => {
        r3fetch({
             urls:[url],
             method: 'GET'
         }).fetch(dispatch,getEnterpriseManagerCodeResponse,{
             type : reddit["type"],
             indentity : reddit["indentity"],
             code : reddit["code"]
        },null);
    }
}