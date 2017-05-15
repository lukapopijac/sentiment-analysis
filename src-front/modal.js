import React from 'react';

import {Modal, Button} from 'react-bootstrap';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		
		this.onSaveEntry = this.onSaveEntry.bind(this);
	}
	
	onSaveEntry() {
		this.props.onSave('32423');
	}
	
	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.onClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Text in a modal</h4>
					<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

					<hr />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onClose}>Close</Button>
					<Button onClick={this.onSaveEntry}>Save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
