export default function(state={}, action) {
	switch(action.type) {
		case 'LOGIN_FULFILLED':
			return {};
		
		case 'LOGIN_REJECTED':
			// handle error
			return {unauthorized: true};
		
		case 'LOGOUT_FULFILLED':
			return {unauthorized: true};
		
		case 'GET_DASHBOARD_FULFILLED':
			return Object.assign({}, state, {
				user: action.payload.user,
				journalEntries: action.payload.journalEntries
			});
		
		case 'GET_DASHBOARD_REJECTED':
			// handle error
			return {unauthorized: true};
		
		case 'SAVE_JOURNAL_ENTRY_FULFILLED':
			return Object.assign({}, state, {
				journalEntries: state.journalEntries.concat([action.payload])
			});
		
		case 'SAVE_JOURNAL_ENTRY_REJECTED':
			// handle error
			break;
		
		case 'JOURNAL_ENTRY_MODAL_ACTIVE':
			return Object.assign({}, state, {
				journalEntryModalActive: action.payload
			});
			
		case 'SET_AVERAGE_SENTIMENT':
			return Object.assign({}, state, {
				avgSentiment: action.payload
			});
	}
	
	return state;
};
