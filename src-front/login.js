import React from 'react';
import {connect} from 'react-redux';

import {login} from './actions';

export default connect(state => state)(class extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit() {
		this.props.dispatch(
			login(this._inputUsername.value, this._inputPassword.value)
		);
	}
	
	render() {
		return (
			<div>
				<h1 className="text-center">Sentiment Analysis</h1>
				<hr/>
				<form className="form-horizontal">
					<div className="form-group">
						<label htmlFor="login-username" className="col-sm-3 control-label">Username</label>
						<div className="col-sm-5">
							<input className="form-control" id="login-username" ref={(el) => this._inputUsername = el}/>
						</div>
					</div>
					<div className="form-group">
					<label htmlFor="login-password" className="col-sm-3 control-label">Password</label>
						<div className="col-sm-5">
							<input className="form-control" id="login-password" ref={(el) => this._inputPassword = el} type="password"/>
						</div>
					</div>
					<div className="col-sm-8">
						<button type="button" className="pull-right btn btn-primary" onClick={this.onSubmit}>Log In</button>
					</div>
				</form>
			</div>
		);
	}
})
