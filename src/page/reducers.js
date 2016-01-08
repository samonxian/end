import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router';
import { get_camera_info } from './get_camera_info/reducer'
import { get_mobile_info } from './get_mobile_info/reducer'
import { get_relay_info } from './get_relay_info/reducer'

const rootReducer = combineReducers({
	get_camera_info,
	get_mobile_info,
	get_relay_info,
	routing: routeReducer
})

export default rootReducer
