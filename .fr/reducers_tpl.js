import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router';
{import_tpl} 
const rootReducer = combineReducers({
	{reducers_tpl},
	routing: routeReducer
})

export default rootReducer

