import { REQUESTURL } from 'libs/common'
import Fetch from 'libs/fetch2'
export const REQUEST_TIPS_MESSAGE = 'REQUEST_TIPS_MESSAGE'
export const REQUUST_VIDEO_SEARCH_TOOL = 'REQUUST_VIDEO_SEARCH_TOOL'

export function tipsMessage(json){
	return {
		type : REQUEST_TIPS_MESSAGE,
		param : json
	}
}

function requestVideoSearch({},json){
	return {
		type : REQUUST_VIDEO_SEARCH_TOOL,
		param : json
	}
}

export function videoSearchFetch(reddit){

	// var url = REQUESTURL+'/dev/v1/record?cid='+reddit["cid"]+"&begin="+reddit["start_time"]+"&end="+reddit["end_time"];
	var url = 'http://192.168.2.52/dev/v1/record?cid='+reddit["cid"]+"&begin="+reddit["start_time"]+"&end="+reddit["end_time"];
    return dispatch => {
       r3fetch({
          urls:[url],
          method: 'GET'
       }).fetch(dispatch,requestVideoSearch,{},null);
    }
}