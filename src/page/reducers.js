import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router';
import { get_camera_info } from './get_camera_info/reducer'
import { get_mobile_info } from './get_mobile_info/reducer'
import { get_relay_info } from './get_relay_info/reducer'
import { diskDetailResponse } from './new_index/reducer'
import { user_log } from './user_log/reducer'
import { user_log_query } from './user_log_query/reducer'
 
const rootReducer = combineReducers({
	get_camera_info,
	get_mobile_info,
	get_relay_info,
	diskDetailResponse,
	user_log,
	user_log_query,
	routing: routeReducer
})

export default rootReducer

