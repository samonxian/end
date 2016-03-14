import * as actionCreator from './action' 

export function test(state = {}, action) {
    switch (action.type) {
    	
		case actionCreator.REQUESTTEST: 
		case actionCreator.RECIEVETEST: 	
			return Object.assign({}, state,action);
		
        default:
			return state;
    }
}

export function testForm(state = {}, action){
	switch(action.type){
		
		case actionCreator.INPUTCIDMODULEID:
			return Object.assign({}, state,action);
		
		case actionCreator.INPUTMIDMODULEID:
			return Object.assign({}, state,action);
		
		default:
			return state;
	}
	
}
