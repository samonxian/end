import App from './App'
var childRoutes = [
	require('../../.fr/chunks/get_camera_info'),
	require('../../.fr/chunks/get_mobile_info'),
	require('../../.fr/chunks/get_relay_info'),
	require('../../.fr/chunks/new_index'),
	require('../../.fr/chunks/camera_debug'),
	require('../../.fr/chunks/camera_debug_last'),
	require('../../.fr/chunks/camera_time'),
	require('../../.fr/chunks/camera_time_last'),
	require('../../.fr/chunks/conn_media_src'),
	require('../../.fr/chunks/disc_connect'),
	require('../../.fr/chunks/exception_event'),
	require('../../.fr/chunks/recv_src_conn'),
	require('../../.fr/chunks/relay_status'),
	require('../../.fr/chunks/rtmp_conn_time'),
	require('../../.fr/chunks/rtmp_device'),
	require('../../.fr/chunks/start_play'),
	require('../../.fr/chunks/start_service'),
	require('../../.fr/chunks/start_transfer'),
	require('../../.fr/chunks/stop_service'),
	require('../../.fr/chunks/work_status'),
	require('../../.fr/chunks/user_log_query')
];
export const rootRoute = {
	path : "/",
    component: App,
    childRoutes: childRoutes 
}
