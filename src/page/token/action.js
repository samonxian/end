let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUEST = 'REQUESTFORGET'
export const RECIEVE = 'RECIEVEAFORGET'

export function getToken(_params={},success) {
	var url = `https://console.topvdn.com/v2/utils/devices/token`;
	return r2fetch({
		method: 'POST',
		params: _params,
		successMessage: false,
		nocredentials: true,
	}).dispatchFetchOne(url,requestPosts(REQUEST,'main'),receivePosts(RECIEVE,'main'),success)
}

