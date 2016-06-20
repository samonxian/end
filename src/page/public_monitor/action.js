let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUEST = 'REQUESTPUBLIC_MONITOR'
export const RECIEVE = 'RECIEVEAPUBLIC_MONITOR'

//actionCreators
export function fetchGetData(_params={},success) {
	var url = 'http://120.26.74.53/v1/diagram/publiccamera';
	//url参数拼接
	url = r2fn.params(url,_params);
	return r2fetch({
		method: 'GET',
		successMessage: false,
		nocredentials: true,
		headers: { }
	}).dispatchFetchOne(url,requestPosts(REQUEST,'main'),receivePosts(RECIEVE,'main'),success)
}





