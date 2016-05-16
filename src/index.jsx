import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute,browserHistory } from 'react-router'
//公共方法||类载入，用window对象访问
import global from 'r2/global'
import configureStore from './page/store'
import { rootRoute } from './page/Route'


const store = configureStore({ },browserHistory);
render(
	<Provider store={store}>
		<Router history={browserHistory} routes={rootRoute} />
	</Provider>,	
	document.getElementById('app_container')
)

/*if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function() {
            // Help React Hot Loader figure out the root component instances on the page:
            return [rootInstance];
        }
    });
}*/

