let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUESTCOLLECT_MONITOR = 'REQUESTCOLLECT_MONITOR'
export const RECIEVECOLLECT_MONITOR = 'RECIEVECOLLECT_MONITOR'

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





