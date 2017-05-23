export function login(username, password) {
	return function(dispatch) {
		axios.post('/api/login', {username, password})
			.then(function(response) {
				dispatch({type: 'LOGIN_FULFILLED'});
				if(response.data.head) socketConnect(username, password, dispatch);
			})
			.catch(_ => dispatch({type: 'LOGIN_REJECTED'}))
		;
	};
}


function socketConnect(username, password, dispatch) {
	let socket = new WebSocket('ws://localhost:5000/' + username + '/' + password);
	
	socket.onmessage = function(evt) {
		let avgSentiment = JSON.parse(evt.data).avgSentiment;
		if(avgSentiment != null) dispatch({
			type: 'SET_AVERAGE_SENTIMENT',
			payload: avgSentiment
		});
	}
}


export function logout() {
	return function(dispatch) {
		axios.post('/api/logout')
			.then(_ => dispatch({type: 'LOGOUT_FULFILLED'}))
			.catch(_ => dispatch({type: 'LOGOUT_REJECTED'}))
		;
	};
}

export function getDashboard() {
	return function(dispatch) {
		axios.get('/api/dashboard')
			.then(function(response) {
				dispatch({
					type: 'GET_DASHBOARD_FULFILLED',
					payload: response.data
				});
			})
			.catch(_ => dispatch({type: 'GET_DASHBOARD_REJECTED'}))
		;
	};
}

export function saveJournalEntry(journalEntry, cb) {
	return function(dispatch) {
		axios.post('/api/journal-entries', journalEntry)
			.then(function(response) {
				dispatch({
					type: 'SAVE_JOURNAL_ENTRY_FULFILLED',
					payload: response.data
				});
				cb();
			})
			.catch(_ => dispatch({type: 'SAVE_JOURNAL_ENTRY_REJECTED'}))
		;
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

//export function getAverageSentiment() {
//	return function(dispatch) {
//		setTimeout(function() {
//			dispatch({
//				type: 'GET_AVERAGE_SENTIMENT_FULFILLED',
//				payload: 5.4				
//			});
//		}, 500);
//	};
//}
