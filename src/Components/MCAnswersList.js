import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import * as RandomAnswers from '../SharedFunctions/RandomAnswers.js';

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

//Display three answers as radio input controls. One answer is the correct answer and the other two are random incorrect answers. The component use the current array of questions/answers and current count of questions answer to determine the correct answer. All styles are applied to each answer but are turn on and off based on the passFail attribute of each answer. 
class MCAnswersList extends Component{
	
//function to create an array of options to be displayed
displayAnswers(){
	
  //list of questions and answers from the test state	
  const arrayofAnswers = this.props.answerList;
    
  //current index of the test based off of how many questions the user has answered. This information is from the currentAnsweredCount state	
  const location = 	(this.props.currentLocation).questionAnswered;     
  
  //get the current answer of the current test based on location using a function from the imported RandomAnswers file.	
  const currentAnswer = RandomAnswers.getCurrentAnswer(location, arrayofAnswers);
	
  //create an array with a random two incorrect answers and the correct answered using a function from the imported RandomAnswers file.
  const randomAnswers = RandomAnswers.getRandomThreeAnswers(arrayofAnswers, currentAnswer);	
	
  //create a array of options as <li> to be displayed as answers. When the user select answer, the value is updated to the userAnswer state	
  const listOfAnswers = randomAnswers.map((answers, index) =>
	<li key={index}>
	    <input className={css(styles.spaceBetweenOptions)} type="radio" name="choice" value={answers.answer} onClick={this.saveUserAnswer} />
		<label className={css(this.props.currentPassFail.passFail && this.isAnswerPass(answers) && styles.correctAnswer, this.props.currentPassFail.passFail && this.isAnswerFail(answers) && styles.wrongAnswers)}>{answers.answer}</label>				   
	</li>									   
  );
	
	return listOfAnswers;
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
*/

//map imported state of the tests and number of questions answered in the Redux store to local variables to be use by the component. 
const mapStateToProps = state => ({
	answerList: state.test,
	currentLocation: state.answered,
	currentPassFail: state.passFail
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store
const mapActionsToProps = {
  onUpdateUserAnswer: getUserAnswer 
};

export default connect(mapStateToProps, mapActionsToProps)(MCAnswersList);