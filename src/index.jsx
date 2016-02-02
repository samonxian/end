import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'  
import configureStore from './page/store'
import { rootRoute } from './page/Route'

const history = createBrowserHistory();
const store = configureStore({ },history);
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
