export default function(state={}, action) {
	switch(action.type) {
		case 'GET_DASHBOARD':
			return Object.assign({}, state, {
				user: action.payload.user,
				journalEntries: action.payload.journalEntries
			})
			
		case 'GET_DASHBOARD_FULFILLED':
			return Object.assign({}, state, {
				user: action.payload.user,
				journalEntries: action.payload.journalEntries
			})
		
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
