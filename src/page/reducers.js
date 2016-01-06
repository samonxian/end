import { combineReducers } from 'redux'
const { routeReducer } = require('redux-simple-router');
import { selectedReddit, postsByReddit } from './tracker_monitor/reducer'

const rootReducer = combineReducers({
    selectedReddit,
	postsByReddit,
	routing: routeReducer
})

export default rootReducer
