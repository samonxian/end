
import Fetch from 'libs/fetch2'
export const USER_LOGIN_REQ = 'USER_LOGIN_REQ'

function userLoginResponse(status,json){
	return {
		type : USER_LOGIN_REQ,
		param : json
	}
}

export function userLoginFetch(reddit,http){

    var url = http+'/dev/v1/users/signin';
    return dispatch => {
        r3fetch({
            urls:[url],
            params: reddit,
            method: 'POST'
        }).fetch(dispatch,userLoginResponse,{},null);
    }
}