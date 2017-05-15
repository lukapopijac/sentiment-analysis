import React from 'react';
import {connect} from 'react-redux';

import {Modal} from 'react-bootstrap';
import {closeNewJournalEntryModal, saveJournalEntry} from './actions';

export default connect(state => state)(class extends React.Component {
	constructor(props) {
		super(props);
		this.onHide = this.onHide.bind(this);
		this.onSave = this.onSave.bind(this);
	}
	
	onHide() {
		this.props.dispatch(closeNewJournalEntryModal());
	}

	onSave() {
		let happinessLevel = Number(this._inputHappyLevel.options[this._inputHappyLevel.selectedIndex].text);
		let text = this._inputText.value;
		this.props.dispatch(saveJournalEntry(
			{happinessLevel, text}, 
			() => this.props.dispatch(closeNewJournalEntryModal())
		));
	}
	
	render() {
		return (
			<Modal show={this.props.journalEntryModalActive} onHide={this.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>New Journal Entry</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className="form-horizontal">
						<div className="form-group">
							<label htmlFor="journal-entry-happy-level" className="col-sm-3 control-label">Happiness Level</label>
							<div className="col-sm-2">
								<select className="form-control" id="journal-entry-happy-level" defaultValue="0" ref={(el) => this._inputHappyLevel = el}>
									<option>-10</option><option>-9</option><option>-8</option>
									<option>-7</option><option>-6</option><option>-5</option>
									<option>-4</option><option>-3</option><option>-2</option>
									<option>-1</option><option>0</option><option>1</option>
									<option>2</option><option>3</option><option>4</option>
									<option>5</option><option>6</option><option>7</option>
									<option>8</option><option>9</option><option>10</option>
								</select>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="journal-entry-text" className="col-sm-3 control-label">Text</label>
							<div className="col-sm-9">
								<textarea className="form-control" rows="5" id="journal-entry-text" ref={(el) => this._inputText = el}></textarea>
							</div>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
					<button type="button" className="btn btn-default" onClick={this.onHide}>Close</button>
				</Modal.Footer>
			</Modal>
		);
	}
});
