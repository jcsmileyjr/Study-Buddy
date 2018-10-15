import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';//allow multiple Redux states to be combine into a single store
import {Provider} from 'react-redux';//allow the Redux state to be exported to components

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';
import App from './App';

//Redux reducer to create a count of questions answered correctly
import correctAnsweredCount from './Reducers/correctAnsweredCount.js';

//Redux reducer to create a count of questons answered
import questionAnsweredCount from './Reducers/questionAnsweredCount.js';

//Redux reducer to create a count of questions answer correctly in a row
import streak from './Reducers/streak.js';

//Redux reducer to store the current score
import updateScore from './Reducers/score.js';

//Redux reducer to hold the current array of questions and answers
import test from './Reducers/tests.js';

//Redux reducer to store the current user selected answer
import currentUserAnswer from './Reducers/userAnswer.js';

//Redux reducer to create to a true or false condition used to show or hide correct or incorrect answers.
import currentPassFail from './Reducers/showPassFail.js';

//Redux reducer to create a true or false conditin used to show/hide the SucessPage and if the player moves to the next level of quizs
import successPage from './Reducers/successPageReducer.js';

//Redux reducer to hold the user answer during the level two quiz and help determine if the answer is correct
import currentTrueFalseAnswer from './Reducers/userTrueFalseAnswer.js';

import registerServiceWorker from './registerServiceWorker';

//Combined all the different Redux states that was imported into a one state that can be exported to any component via the store
const allReducers = combineReducers({
	count: correctAnsweredCount, //current count of correctly answered questions
	answered: questionAnsweredCount, //current count of questions answer
	score: updateScore, //current score
    streak: streak, //current streak of questions answered correctly
	userAnswer: currentUserAnswer, //current user selected answer
	test: test, //array of questions and answers
	passFail: currentPassFail, //true or false to show/hide CSS of answers
    successPage: successPage, //true or false to show/hide Success page and which level of quizs the player is on
    trueFalseAnswer: currentTrueFalseAnswer //true or false answer from user to determine correct answer in the level 2 quiz
});

//The combined data of all the states from allReducers. 
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
