import Layout from './Layout'
import App from './App'
import get_camera_info from './get_camera_info' 
import get_mobile_info from './get_mobile_info' 
import get_relay_info from './get_relay_info' 

let get_camera_info_route = { path : '/get_camera_info',component : get_camera_info} 
let get_mobile_info_route = { path : '/get_mobile_info',component : get_mobile_info} 
let get_relay_info_route = { path : '/get_relay_info',component : get_relay_info} 

export const rootRoute = {
	path : "/",
    component: App,
    childRoutes: [get_camera_info_route,get_mobile_info_route,get_relay_info_route] 
}
