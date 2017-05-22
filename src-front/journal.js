import React from 'react';
import {connect} from 'react-redux';

import JournalEntryModal from './journal-entry-modal';
import {openNewJournalEntryModal} from './actions';

export default connect(state => state)(class extends React.Component {
	constructor(props) {
		super(props);
		this.onNewEntry = this.onNewEntry.bind(this);
	}
	
	onNewEntry() {	
		this.props.dispatch(openNewJournalEntryModal());
	}
	
	render() {
		if(!this.props.journalEntries) return null;
		return (
			<div>
				<h3>Journal</h3>
				<div className="table-container">
					<button type="button" className="btn btn-default" onClick={this.onNewEntry}>New Entry</button>
					<br/><br/>
					<table className="table table-striped table-bordered">
						<thead>
							<tr className="bg-success">
								<th className="col-sx-3">Created</th>
								<th className="col-sx-3">Happiness Level</th>
								<th className="col-sx-6">Text</th>
							</tr>
						</thead>
						<tbody>	
							{this.props.journalEntries.map(rec=>(
								<tr key={rec._id}>
									<td className="col-sx-3">{new Date(rec.datetime).toLocaleString()}</td>
									<td className="col-sx-3">{rec.happinessLevel}</td>
									<td className="col-sx-6">{rec.text}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<JournalEntryModal/>
			</div>
		);
	}
});
