import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import * as RandomAnswers from '../SharedFunctions/RandomAnswers.js';

import {getUserAnswer} from '../Actions/userAnswerActions.js';//import action to update the randomly selected answer to the userAnswer state to enable the checkAnswerButton and to check if the answer is correct

import {userChooseFalse} from '../Actions/userFalseAnswerActions.js';//import action to update the user's choice to the TrueFalseAnswer state

import {userChooseTrue} from '../Actions/userTrueAnswerActions.js';//import action to update the user's choice to the TrueFalseAnswer state

import {updateQuizAnswer} from '../Actions/updateTrueFalseQuizAnswer.js';//import action to update the current true or false answer to the state

const styles = StyleSheet.create({
  //add whitespace between the radio button and the answer	
  indentAnswerOptions:{
	  textIndent: "5%"
  },
	
  //change the size of the radio button size and whitespace between them	
  spaceBetweenOptions: {
	  marginBottom: "0px",
	  height: "4.3vh",
	  width: "4.3vh",
	  verticalAlign: "middle"
  },
	
  /*remove the bullets and indention from the lists displaying the cases*/
  removeListBullets: {
	  listStyleType: "none",
  	  margin: "0px",
	  padding: "0px"
  },
	
  /*change the answer in the label to show its the wrong answer*/	
  wrongAnswers:{
	color: "red",
	textDecoration: "line-through"
  },
	
  /*change the answer in the label to show its the correct answer*/	
  correctAnswer:{
	  color: "green",
	  fontSize: "1.2em"
  }		
	
});

//?????????????????????????????? 
class TrueFalseOptions extends Component{
   
componentDidMount(){
let startTrueFalseQuizAnswer = this.displayAnswers();//get random answer to be displayed    
this.props.onUpdateTrueFalseQuizAnswer(startTrueFalseQuizAnswer);// updated the state so its value can be displayed below
} 
	
//function to returns a random answer to be shown to the user for the user to decide if its true or false. Only ran when the app starts. 
displayAnswers(){
	
  //list of questions and answers from the test state	
  const arrayofAnswers = this.props.answerList;	
    
  //current index of the test based off of how many questions the user has answered. This information is from the currentAnsweredCount state	
  const location = 	(this.props.currentLocation).questionAnswered;    
    
  //get the current answer of the current test based on location using a function from the imported RandomAnswers file.	
  const currentAnswer = RandomAnswers.getCurrentAnswer(location, arrayofAnswers);
	
  //create an array with a random two incorrect answers and the correct answered using a function from the imported RandomAnswers file.
  const randomAnswers = RandomAnswers.getRandomThreeAnswers(arrayofAnswers, currentAnswer);    
    
  const displayedRandomAnswer = randomAnswers[Math.floor(Math.random() * randomAnswers.length)];	
	
  return displayedRandomAnswer.answer;
}

//function used in the displayAnswers() to check if the current answer object passFail attribute is "pass" and return true. This will update the CSS tot the correctAnswers style.
isAnswerPass(checkAnswer){	
  if(checkAnswer.passFail === "pass"){
	  return true;
  }  
}

//function used in the displayAnswers() to check if the current answer object passFail attribute is "fail" and return true. This will update the CSS tot the wrongAnswers style.
isAnswerFail(checkAnswer){	
  if(checkAnswer.passFail === "fail"){
	  return true;
  }  
}

//method that calls a Redux action to save the user selected anwer to the Redux state
saveTrueAnswer = () =>{
	this.props.onUpdateTrueAnswer();
    this.props.onUpdateUserAnswer(this.props.currentQuizAnswer);
}

//method that calls a Redux action to save the user selected anwer to the Redux state
saveFalseAnswer = () =>{
	this.props.onUpdateFalseAnswer();
    this.props.onUpdateUserAnswer(this.props.currentQuizAnswer);
}

  render(){
	  return(
		<div className="row text-center">
		  <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
			{this.props.currentQuizAnswer}
		  </div>
          <div className="col-xs-12">
            <input type="radio" name="choice" value={true}  onClick={this.saveTrueAnswer} /> 
            <label> True </label>
          </div>
          <div className="col-xs-12">
            <input type="radio" name="choice" value={false}  onClick={this.saveFalseAnswer} />
            <label> False </label>
          </div>
		</div>  
	  );
  }
}

//map imported state of the tests and number of questions answered in the Redux store to local variables to be use by the component. 
const mapStateToProps = state => ({
	answerList: state.test,
	currentLocation: state.answered,
	currentPassFail: state.passFail,
    currentQuizAnswer: state.trueFalseAnswer.trueFalseQuizAnswer
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store
const mapActionsToProps = {
  onUpdateUserAnswer: getUserAnswer,    
  onUpdateTrueAnswer: userChooseTrue,
  onUpdateFalseAnswer: userChooseFalse,
  onUpdateTrueFalseQuizAnswer: updateQuizAnswer
};

export default connect(mapStateToProps, mapActionsToProps)(TrueFalseOptions);