let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUESTCOLLECT_MONITOR = 'REQUESTCOLLECT_MONITOR'
export const RECIEVECOLLECT_MONITOR = 'RECIEVECOLLECT_MONITOR'
export const COLLECT_MONITOR_WEB = 'COLLECT_MONITOR_WEB'

import { REQUEST_WEB } from './components/data'

function collectMonitorWeb(_params={}){
	return {
		type : COLLECT_MONITOR_WEB,
		param : _params
	}
}

function collectMointorWebRequest(){
	return {
		type : COLLECT_MONITOR_WEB,
		param : {}
	}
}

//actionCreators
export function fetchGetData(_params={},success) {
	var url = 'http://120.26.74.53/v1/diagram/publiccamera/all';
	//url参数拼接
	url = r2fn.params(url,_params);
	return r2fetch({
		method: 'GET',
		successMessage: false,
		nocredentials: true,
		headers: { }
	}).dispatchFetchOne(url,requestPosts(REQUESTCOLLECT_MONITOR,'main'),receivePosts(RECIEVECOLLECT_MONITOR,'main'),success)
}

export function fetchCollectMonitorWeb(){
	var url = 'http://120.26.74.53/v1/diagram/webstat';
	return r2fetch({
		method: 'GET',
		successMessage: false,
		nocredentials: true,
		headers: { }
	}).dispatchFetchOne(url,collectMointorWebRequest,collectMonitorWeb);
}





