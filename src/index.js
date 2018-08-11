import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//reducer that holds sample questions and answers
function test(state=[], action){
	return state;
}

//reducer that holds the current count of correctly answer questions. This is use with the questionAnsweredCount to determine the score 
function correctAnsweredCount(state ={"count": 0}, action){
	return state;
}

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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
