import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';
import App from './App';
import correctAnsweredCount from './Reducers/correctAnsweredCount.js';
import questionAnsweredCount from './Reducers/questionAnsweredCount.js';
import updateScore from './Reducers/score.js';
import test from './Reducers/tests.js';
import registerServiceWorker from './registerServiceWorker';

const allReducers = combineReducers({
	count: correctAnsweredCount,
	answered: questionAnsweredCount,
	score: updateScore,
	test: test
});

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
