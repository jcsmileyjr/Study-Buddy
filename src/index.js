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
import test from './Reducers/tests.js';
import registerServiceWorker from './registerServiceWorker';

//Action for the correctAnsweredCount reducer. 
/*
function addCorrectAnswer(){ 
	return {type:"addScore"};
}
*/

const addCorrectAnswer = {type:"addScore"};
const countQuestionAnswered = {type:"addQuestionsAnswered"};

const allReducers = combineReducers({
	count: correctAnsweredCount,
	answered: questionAnsweredCount,
	test: test
});

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(addCorrectAnswer);
store.dispatch(countQuestionAnswered);

console.log(store.getState());
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
