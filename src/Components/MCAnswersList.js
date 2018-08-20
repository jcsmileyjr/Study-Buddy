import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

import {getUserAnswer} from '../Actions/userAnswerActions.js';//import action to update the user's choice to the userAnswer state

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
	
  wrongAnswers:{
	color: "red",
	textDecoration: "line-through"
  },
	
  correctAnswer:{
	  color: "green",
	  fontSize: "1.2em"
  }		
	
});

class MCAnswersList extends Component{
	
//function to get the current answer to be use in the displayAnswers()
getCurrentAnswer(answers){
	
  //current index of the test based off of how mnay questions the user has answered. This information is from the currentAnsweredCount state	
  const location = 	(this.props.currentLocation).questionAnswered;
	
  //current correct answer
  const currentCorrectAnswer = {"answer":answers[location].answer, "passFail":answers[location].passFail};

  return currentCorrectAnswer;	
}

//function to randomize two answers plus the correct answer. You must give it a array of questions/answer and the correct answer
getRandomThreeAnswers(answers, correctAnswer){
	
  const currentTestAnswers = [];	
	
  const currentAnswerArray = answers.map(function(x){return {"answer":x.answer, "passFail":x.passFail}});
  
  //randomly pick the first answer. Keep if it doesn’t match the currentCorrectAnswer, re-pick if it matches the currentCorrectAnswer
  var firstAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  
  while(correctAnswer.answer===firstAnswer.answer){
     firstAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  }

  //randomly pick the second answer and keep if it doesn’t match the correct answer and first answer
  var secondAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  while(correctAnswer.answer===secondAnswer.answer || firstAnswer.answer === secondAnswer.answer){
     secondAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  }

  //push all answers into the currentTestAnswers as an object with a second attribute as true or false
  currentTestAnswers.push(correctAnswer, firstAnswer, secondAnswer);
            
   //Shuffle the currentTestAnswers array
   var currentIndex = currentTestAnswers.length, temporayValue, randomIndex;
            
   while(0 !== currentIndex){
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
                
     temporayValue = currentTestAnswers[currentIndex];
     currentTestAnswers[currentIndex] = currentTestAnswers[randomIndex];
     currentTestAnswers[randomIndex] = temporayValue;
   }
 	
  return currentTestAnswers;	
}	
	
//function to create an array of options to be displayed
displayAnswers(){
	
  //list of questions and answers from the test state	
  const arrayofAnswers = this.props.answerList;	
  
  //list of questions and answers from the test state	
  const currentAnswer = this.getCurrentAnswer(arrayofAnswers);	
	
  //get a random two incorrect answers and the correct answered to be displayed	
  const randomAnswers = this.getRandomThreeAnswers(arrayofAnswers, currentAnswer);	
	
  //create a array of options as <li> to be displayed as answers. When the user select answer, the value is updated to the userAnswer state	
  const listOfAnswers = randomAnswers.map((answers, index) =>
	<li key={index}>
	    <input className={css(styles.spaceBetweenOptions)} type="radio" name="choice" value={answers.answer} onClick={this.saveUserAnswer} />
		<label className={css( this.isAnswerPass(answers) && styles.correctAnswer, this.isAnswerFail(answers) && styles.wrongAnswers)}>{answers.answer}</label>				   
	</li>									   
  );
	
	return listOfAnswers;
}
/*,this.isAnswerCorrect(answers) ? styles.correctAnswer: styles.wrongAnswers*/
isAnswerPass(checkAnswer){	
  if(checkAnswer.passFail === "pass"){
	  return true;
  }  
}

isAnswerFail(checkAnswer){	
  if(checkAnswer.passFail === "fail"){
	  return true;
  }  
}

saveUserAnswer = event =>{
	this.props.onUpdateUserAnswer(event.target.value);
}

  render(){	
	  return(
		<div className={`row ${css(styles.indentAnswerOptions)}`}>
		  <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
			<ul className={css(styles.removeListBullets)}>{this.displayAnswers()}</ul>
		  </div>		
		</div>  
	  );
  }
}
/*	Issues
- Between break points 757 - 525 the radio options are skewer to the left
- Within the onCheckAnswer(), check if the userAnswer is correct. If it is correct, update the correctAnswer state and questionAnswer state. If not, then just update questionAnswer state.
*/

//map imported state of the tests and number of questions answered in the Redux store to local variables to be use by the component. 
const mapStateToProps = state => ({
	answerList: state.test,
	currentLocation: state.answered	
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store
const mapActionsToProps = {
  onUpdateUserAnswer: getUserAnswer 
};

export default connect(mapStateToProps, mapActionsToProps)(MCAnswersList);