import React from 'react';
import {connect} from 'react-redux';

import Journal from './journal';
import {getDashboard} from './actions';

export default connect(state => state)(class extends React.Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
	}
	
	componentWillMount() {
		this.props.dispatch(getDashboard());
	}
	
	logOut() {
		console.log('logout');
	}
	
	render() {
		let user = this.props.user;
		let name = user ? user.name : '';
		let avgSentiment = user ? user.avgSentiment : null;
		
		return (
			<div>
				<br/>
				<button type="button" className="btn btn-default pull-right" onClick={this.logOut}>Log Out</button>
				<h3 className="text-muted">Sentiment Analysis</h3>
				<hr/>

				<div className="row">				
					<h2>{name}</h2>
					{avgSentiment != null && <div>Average sentiment Score of your family: {avgSentiment}</div>}
					<Journal/>
				</div>
			</div>
		);
	}
})
