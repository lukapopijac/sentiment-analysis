import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';

import store from './store';

import Login from './login';
import Dashboard from './dashboard';

let App = connect(state => state)(class extends React.Component {
	render() {
		return (
			<div className="container">
				{this.props.unauthorized ? <Login/> : <Dashboard/>}
			</div>
		); 
	}
});

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));
