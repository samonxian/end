import Layout from './Layout'
import App from './App'
import demo from './demo' 
import test from './test' 

let demo = { path : '/demo',components : demo} 
let test = { path : '/test',components : test} 

export const rootRoute = {
	path : "/",
    component: App,
    childRoutes: [demo,test] 
}
