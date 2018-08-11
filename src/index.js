import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const arrayOfAnswers = [
	{"answer":"Red", "passFail":"asking"},
	{"answer":"Yellow", "passFail":"asking"},
	{"answer":"Purple", "passFail":"asking"}
];

//reducer that holds the arrayOfAnswers as the initial state of questions and answers.
function test(state = arrayOfAnswers, action){
	return state;
}

//reducer that holds the current count of correctly answer questions. This is use with the questionAnsweredCount to determine the score 
function correctAnsweredCount(state ={"count": 0}, action){
	switch(action.type){
		case 'addScore':
			return {
				count: state.count + 1
			};
		default:
			return state;
	}//end of switch
}

//Action for the correctAnsweredCount reducer. 
/*
function addCorrectAnswer(){ 
	return {type:"addScore"};
}
*/

const addCorrectAnswer = () => ({type:"addScore"}); 

//reducer that holds the current count of questions answers. This is use with the correctAnswerCount to determine the score
function questionAnsweredCount(state={"questionAnswered": 0}, action){
	return state;
}


const allReducers = combineReducers({
	count: correctAnsweredCount,
	answered: questionAnsweredCount,
	test: test
});

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log(store.getState());
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
