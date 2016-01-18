import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router';
import { get_camera_info } from './get_camera_info/reducer'
import { get_mobile_info } from './get_mobile_info/reducer'
import { get_relay_info } from './get_relay_info/reducer'
import { new_index_camera } from './new_index_camera/reducer'
import { new_index_disk,getStorageResponse,cityTab } from './new_index_disk/reducer'
import { new_index_monitor } from './new_index_monitor/reducer'
import { camera_debug,camera_debug_form } from './user_log/camera_debug/reducer'
import { camera_debug_last,camera_debug_last_form } from './user_log/camera_debug_last/reducer'
import { camera_time,camera_time_form } from './user_log/camera_time/reducer'
import { camera_time_last,camera_time_last_form } from './user_log/camera_time_last/reducer'
import { conn_media_src,conn_media_src_form } from './user_log/conn_media_src/reducer'
import { disc_connect,disc_connect_form } from './user_log/disc_connect/reducer'
import { exception_event,exception_event_form } from './user_log/exception_event/reducer'
import { recv_src_conn,recv_src_conn_form } from './user_log/recv_src_conn/reducer'
import { relay_status,relay_status_form } from './user_log/relay_status/reducer'
import { rtmp_conn_time,rtmp_conn_time_form } from './user_log/rtmp_conn_time/reducer'
import { rtmp_device,rtmp_device_form } from './user_log/rtmp_device/reducer'
import { start_play,start_play_form } from './user_log/start_play/reducer'
import { start_service,start_service_form } from './user_log/start_service/reducer'
import { start_transfer,start_transfer_form } from './user_log/start_transfer/reducer'
import { stop_service,stop_service_form } from './user_log/stop_service/reducer'
import { work_status,work_status_form } from './user_log/work_status/reducer'
import { user_log_query,user_log_query_form } from './user_log_query/reducer'
 
const rootReducer = combineReducers({
	get_camera_info,
	get_mobile_info,
	get_relay_info,
	new_index_camera,
	new_index_disk,
	getStorageResponse,
	cityTab,
	new_index_monitor,
	camera_debug,
	camera_debug_form,
	camera_debug_last,
	camera_debug_last_form,
	camera_time,
	camera_time_form,
	camera_time_last,
	camera_time_last_form,
	conn_media_src,
	conn_media_src_form,
	disc_connect,
	disc_connect_form,
	exception_event,
	exception_event_form,
	recv_src_conn,
	recv_src_conn_form,
	relay_status,
	relay_status_form,
	rtmp_conn_time,
	rtmp_conn_time_form,
	rtmp_device,
	rtmp_device_form,
	start_play,
	start_play_form,
	start_service,
	start_service_form,
	start_transfer,
	start_transfer_form,
	stop_service,
	stop_service_form,
	work_status,
	work_status_form,
	user_log_query,
	user_log_query_form,
	routing: routeReducer
})

export default rootReducer

