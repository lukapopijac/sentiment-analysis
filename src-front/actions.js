export function login(username, password) {
	return function(dispatch) {
		setTimeout(function() {
			if(username=='a') {
				dispatch({
					type: 'LOGIN_FULFILLED'
				});
			} else {
				dispatch({
					type: 'LOGIN_REJECTED'
				});				
			}
		}, 500);
	}
}

export function logout() {
	return {
		type: 'LOGOUT'
	}
}

export function getDashboard() {
	return function(dispatch) {
		setTimeout(function() {
			dispatch({
				type: 'GET_DASHBOARD',
				payload: {
					user: {
						name: 'Mister Head',
						role: 'head',
						avgSentiment: 6.4
					},
					journalEntries: [
						{
							id: 324653,
							datetime: '2017-05-12T22:34:46.927Z',
							happinessLevel: 7,
							text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dolor metus, fermentum a condimentum auctor.'
						},
						{
							id: 243357,
							datetime: '2017-05-12T22:36:34.108Z',
							happinessLevel: -3,
							text: 'Phasellus condimentum lectus id dolor luctus rutrum.'
						}
					]
				}
			});
		}, 500);
	};
}

export function getAverageSentiment() {
	return function(dispatch) {
		setTimeout(function() {
			dispatch({
				type: 'GET_AVERAGE_SENTIMENT_FULFILLED',
				payload: 5.4				
			});
		}, 500);
	};
}

export function saveJournalEntry(journalEntry, cb) {
	return function(dispatch) {
		setTimeout(function() {
			dispatch({
				type: 'SAVE_JOURNAL_ENTRY_FULFILLED',
				payload: {
					id: (100000*Math.random())|0,
					datetime: '2017-05-13T11:36:34.108Z',
					happinessLevel: journalEntry.happinessLevel,
					text: journalEntry.text
				}
			});
			cb();
		}, 1000);
	};
}

export function openNewJournalEntryModal() {
	return {
		type: 'JOURNAL_ENTRY_MODAL_ACTIVE',
		payload: true
	}
}

export function closeNewJournalEntryModal() {
	return {
		type: 'JOURNAL_ENTRY_MODAL_ACTIVE',
		payload: false
	}
}
