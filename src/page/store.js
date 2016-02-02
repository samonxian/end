import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { syncHistory } from 'react-router-redux' 
import createLogger from 'redux-logger'
import rootReducer from './reducers'
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    createLogger()
)(createStore)
export default function configureStore(initialState, history) {
    let middleware = [thunkMiddleware];
    // Installs hooks that always keep react-router and redux
    // store in sync
    const router = syncHistory(history);
    if (process.env.NODE_ENV == 'development') {
        middleware.push(router, createLogger());
    } else {
        middleware.push(router);
    }

    const finalCreateStore = applyMiddleware(...middleware)(createStore);

    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
