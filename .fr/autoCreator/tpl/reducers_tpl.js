import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux';
{import_tpl} 
const rootReducer = combineReducers({
	{reducers_tpl},
	routing: routeReducer
})

export default rootReducer

