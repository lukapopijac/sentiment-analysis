import {createStore, applyMiddleware} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducer';

let middleware = applyMiddleware(promise(), thunk, createLogger());

export default createStore(reducer, middleware);
