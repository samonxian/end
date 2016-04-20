import fetch from 'isomorphic-fetch'
export const ENTERPRISE_MANAGER_CODE_REQ = 'ENTEERPRISE_MANAGER_AUTHENTICATE_REQ'

function  getEnterpriseManagerCodeResponse(json,reddit){
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
    var url = '/dev/v1/apps?type'+ reddit["type"]+"&name="+reddit["indentity"]+"&code="+reddit["code"]+
              '&page='+reddit["page"]+'&size='+reddit["size"]
    return dispatch => {
        return fetch('http://www.topvdn.com/test/code_data.js')
            .then(response => response.json())
            .then(json => dispatch(getEnterpriseManagerCodeResponse(json,{
                type : reddit["type"],
                indentity : reddit["indentity"],
                code : reddit["code"]
            })))
    }
}