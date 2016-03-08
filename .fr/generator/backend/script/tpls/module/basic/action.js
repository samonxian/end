<!--action_import_begin-->
import ${import_var} from '${imort_libs}'
<!--action_import_end-->

<!--action_const_export_begin-->
export const ${const} = ${const}
<!--action_const_export_end-->

let common = {
	isFetching : false,//正在获取数据
	fetched : false,//已经获取到数据
}

<!--action_input_export_begin-->
export function input${inputId}(value){
	return {
		type : INPUT${inputId}${MODULEID},
		${inputId} : value 
	};
}
<!--action_input_export_end-->

<!--action_fetch_export_bigin-->
function requestPosts(params={}) {
	return	Object.assign({},common,{
        type: REQUEST${MODULEID},
		isFetching : true,
	});
}

function receivePosts(params={},json) {
	return	Object.assign({},common,{
        type: RECIEVE${MODULEID},
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
<!--action_fetch_export_end-->
