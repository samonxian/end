import App from './App'
var childRoutes = [
	require('../../.fr/chunks/get_camera_info'),
	require('../../.fr/chunks/get_mobile_info'),
	require('../../.fr/chunks/get_relay_info'),
	require('../../.fr/chunks/new_index'),
	require('../../.fr/chunks/new_index_camera'),
	require('../../.fr/chunks/new_index_disk'),
	require('../../.fr/chunks/new_index_monitor')
];
export const rootRoute = {
	path : "/",
    component: App,
    childRoutes: childRoutes 
}
