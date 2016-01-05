import Layout from './Layout'
import App from './App'
{import_tpl}
{child_tpl}
export const rootRoute = {
	path : "/",
    component: App,
    childRoutes: {setting_tpl} 
}
