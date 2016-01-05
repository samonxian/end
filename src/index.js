import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'  
import { syncReduxAndRouter } from 'redux-simple-router' 
import configureStore from './page/store'
import { rootRoute } from './page/Route'

const store = configureStore();
const history = createBrowserHistory();
syncReduxAndRouter(history, store);
render(
	<Provider store={store}>
		<div>
			<Router history={history} routes={rootRoute} />
		</div>
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
