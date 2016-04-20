export const USER_LOGIN_REQ = 'USER_LOGIN_REQ'

function userLoginResponse(status,json){
	return {
		type : USER_LOGIN_REQ,
        status : status,
		param : json
	}
}

export function userLoginFetch(reddit){
    var status = '';
	return dispatch => {
        return fetch('http://192.168.2.201:8009/dev/v1/users/signin',{ 
        	method: 'POST',
            body: JSON.stringify(reddit)
        }).then(function(response){
            status = response.status;
            return response.json();
        }).then(json => dispatch(userLoginResponse(status,json)))
    }
}