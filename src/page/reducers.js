import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router';
import { get_camera_info } from './get_camera_info/reducer'
import { get_mobile_info } from './get_mobile_info/reducer'
import { get_relay_info } from './get_relay_info/reducer'
import { new_index_disk, getStorageResponse, cityTab} from './new_index_disk/reducer'
import { new_index_camera } from './new_index_camera/reducer'
import { new_index_monitor } from './new_index_monitor/reducer'

const rootReducer = combineReducers({
	get_camera_info,
	get_mobile_info,
	get_relay_info,
	getStorageResponse,
	new_index_disk,
	new_index_camera,
	new_index_monitor,
	cityTab,
	routing: routeReducer
})

export default rootReducer
