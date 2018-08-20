import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';//allow multiple Redux states to be combine into a single store
import {Provider} from 'react-redux';//allow the Redux state to be exported to components

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';
import App from './App';
import correctAnsweredCount from './Reducers/correctAnsweredCount.js';
import questionAnsweredCount from './Reducers/questionAnsweredCount.js';
import updateScore from './Reducers/score.js';
import test from './Reducers/tests.js';
import currentUserAnswer from './Reducers/userAnswer.js';
import currentPassFail from './Reducers/showPassFail.js';
import registerServiceWorker from './registerServiceWorker';

//Combined all the different Redux states that was imported into a one state that can be exported to any component via the store
const allReducers = combineReducers({
	count: correctAnsweredCount,
	answered: questionAnsweredCount,
	score: updateScore,
	userAnswer: currentUserAnswer,
	test: test,
	passFail: currentPassFail
});

//The combined data of all the states from allReducers. 
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
