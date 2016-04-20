import { USER_LOGIN_REQ } from './action'

export function user_login_status(state = {}, action) {
    switch (action.type) {
		case USER_LOGIN_REQ:
			 return Object.assign({}, state,action);
        default:
			return state;
    }
}