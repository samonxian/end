import App from './App'
var childRoutes = [
	require('../../.fr/chunks/get_camera_info'),
	require('../../.fr/chunks/get_mobile_info'),
	require('../../.fr/chunks/get_relay_info'),
	require('../../.fr/chunks/new_index'),
	require('../../.fr/chunks/user_log')
];
export const rootRoute = {
	path : "/",
    component: App,
    childRoutes: childRoutes 
}
