import * as actionCreator from './action' 

export function collect_message_monitor(state = {}, action) {
    switch (action.type) {
    	
		case actionCreator.REQUESTCOLLECT_MONITOR: 
		case actionCreator.RECIEVECOLLECT_MONITOR: 	
			return Object.assign({}, state,action);
		
        default:
			return state;
    }
}

