import { combineReducers } from 'redux'
const { routeReducer } = require('redux-simple-router');
import { selectedReddit, postsByReddit } from './demo/reducer'

const rootReducer = combineReducers({
    selectedReddit,
	postsByReddit,
	routing: routeReducer
})

export default rootReducer
