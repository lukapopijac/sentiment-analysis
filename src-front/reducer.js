export default function(state={}, action) {
	switch(action.type) {
		case 'LOGIN_FULFILLED':
			return {
				user: action.payload
			};
		case 'LOGIN_REJECTED':
			// handle error
			console.log('LOGIN_REJECTED');
			break;
		
		case 'LOGOUT_FULFILLED':
			return {};
						
		case 'GET_DASHBOARD_FULFILLED':
			return Object.assign({}, state, {
				user: action.payload.user,
				journalEntries: action.payload.journalEntries
			});
		
		case 'GET_DASHBOARD_REJECTED':
			// handle error
			break;

		case 'GET_AVERAGE_SENTIMENT_FULFILLED':
			return {
				user: Object.assign({}, state.user, {averageSentiment: action.payload}),
				journalEntries: state.journalEntries
			};
		
		case 'GET_AVERAGE_SENTIMENT_REJECTED':
			// handle error
			break;
		
		case 'SAVE_JOURNAL_ENTRY_FULFILLED':
			return {
				user: state.user,
				journalEntries: state.journalEntries.concat([action.payload])
			};
		
		case 'SAVE_JOURNAL_ENTRY_REJECTED':
			// handle error
			break;
			
		case 'JOURNAL_ENTRY_MODAL_ACTIVE':
			return Object.assign({}, state, {
				journalEntryModalActive: action.payload
			});
	}
	
	return state;
};
