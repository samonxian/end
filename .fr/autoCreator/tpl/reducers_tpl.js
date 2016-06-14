import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux';
import * as commonReducer from 'page/commonReducer'
{import_tpl} 
const rootReducer = combineReducers({
	{reducers_tpl},
	formInput: commonReducer.formInput,
	r2Store: commonReducer.r2Store,
	r2Store2: commonReducer.r2Store2,
	routing: routeReducer
})

export default rootReducer

