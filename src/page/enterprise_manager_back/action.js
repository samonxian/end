import { REQUESTURL } from 'libs/common'
import Fetch from 'libs/fetch2'
export const ENTERPRISE_MANAGER_BACK_REQ = 'ENTERPRISE_MANAGER_BACK_REQ'
export const ENTERPRISE_MANAGER_BACK_DAILOG = 'ENTERPRISE_MANAGER_BACK_DAILOG'

function  getEnterpriseManagerBackResponse(param,json){
    Object.assign(json,param);
    return {
        type : ENTERPRISE_MANAGER_BACK_REQ,
        param : json
    }
}

export function dailogShowData(param = {visible:false},json){
    Object.assign(json,param);
	return {
		type : ENTERPRISE_MANAGER_BACK_DAILOG,
		json : json
	}
}

function getEnterpriseManagerBackRquest(){
    return {
        type : ENTERPRISE_MANAGER_BACK_DAILOG
    }
}

export function getEnterpriseManagerBackFetch(reddit){
    var url = REQUESTURL+'/dev/v1/blacklist?app_id='+reddit["app_id"]+'&app_code='+reddit["app_code"]+'&identity='+
              reddit["identity"]+'&cid='+reddit["cid"]+'&page='+reddit["page"]+'&size='+reddit["size"];
    return dispatch => {
        r3fetch({
             urls:[url],
             method: 'GET'
        }).fetch(dispatch,getEnterpriseManagerBackResponse,{
            page : reddit["page"],
            app_id : reddit["app_id"],
            app_code : reddit["app_code"],
            identity : reddit["identity"],
            cid : reddit["cid"]
        },null);
    }
}

export function enterpriseBackOptFetch(reddit){
    var url = REQUESTURL+'/dev/v1/blacklist/'+reddit["id"];
    return dispatch => {
        r3fetch({
             urls:[url],
             params: {
                 status : reddit["status"]
             },
             method: 'PATCH'
        }).fetch(dispatch,dailogShowData,{visible:false},null);
    }
}

export function enterpriseAddBack(reddit){
    var url = REQUESTURL+'/dev/v1/blacklist'
    return dispatch => {
        r3fetch({
             urls:[url],
             params: reddit,
             method: 'POST'
        }).fetch(dispatch,dailogShowData,{visible:false},null);
    }
}