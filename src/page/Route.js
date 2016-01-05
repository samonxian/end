import Layout from './Layout'
import App from './App'
import demo from './demo' 
import test from './test' 

let demo_route = { path : '/demo',components : demo} 
let test_route = { path : '/test',components : test} 

export const rootRoute = {
	path : "/",
    component: App,
    childRoutes: [demo_route,test_route] 
}
