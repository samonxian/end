import Layout from './Layout'
import App from './App'
import tracker_monitor from './tracker_monitor' 
import get_camera_info from './tracker_monitor/get_camera_info' 

let tracker_monitor_route = { path : '/tracker_monitor',components : tracker_monitor} 
let get_camera_info_route = { path : '/tracker_monitor/get_camera_info',components : get_camera_info} 
tracker_monitor_route.childRoutes = [get_camera_info_route]

export const rootRoute = {
	path : "/",
    component: App,
    childRoutes: [tracker_monitor_route] 
}
