import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';

import Login from './login';
import Dashboard from './dashboard';

let loggedIn = true;

class App extends React.Component {
	render() {
		return (
			<div className="container">
				{!loggedIn ? <Login/> : <Dashboard/>}
			</div>
		); 
	}
}

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));
