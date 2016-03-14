import fetch from 'isomorphic-fetch'




export const INPUTCIDMODULEID = 'INPUTCIDMODULEID'

export const INPUTMIDMODULEID = 'INPUTMIDMODULEID'


let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}


export function inputCid(value){
	return {
		type : INPUTCIDMODULEID,
		cid : value 
	};
}

export function inputMid(value){
	return {
		type : INPUTMIDMODULEID,
		mid : value 
	};
}



function requestPosts(params={}) {
	return	Object.assign({},common,{
        type: REQUESTTEST,
		isFetching : true,
	});
}

function receivePosts(params={},json) {
	return	Object.assign({},common,{
        type: RECIEVETEST,
		fetched : true,
		isFetching : false,
        posts: json,
        receivedAt: Date.now()
	});
}

export function fetchData(_params={}) {
    return dispatch => {
        dispatch(requestPosts(_params))
		var url = "http://localhost:7001/creator";
		return fetch(url,{
				method: 'POST',
				body: JSON.stringify(_params)
			})
            .then(response => response.json())
            .then(function(json){
				dispatch(receivePosts(_params,json));
			}).catch(function(e){
				console.debug('parsing failed', e)
			})
    }
}


