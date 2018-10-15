import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

//Redux action to update the count state by one
import {addCorrectAnswer} from '../Actions/correctCountActions.js';

//Redux action to update the streak state by one when the user answers correctly
import {addStreak} from '../Actions/addStreakActions.js';

//Redux action to reset the streak state if the user miss a answer
import {resetStreak} from '../Actions/resetStreakActions.js';

//Redux action to update the test state with a new test
import {updatePassFail} from '../Actions/testActions.js';

//Redux action to update the showPassFail state to true
import {showCSSPass} from '../Actions/showPassFailActions.js'; 

const styles = StyleSheet.create({
  whiteSpaceAboveElement:{
    margin: "10px" //add whitespace above button
  },
	
  buttonTextColor:{
	color: "black" //button text is black
  }
});

//Primary button used by the user to check if the selected answer is correct. When pressed the answer is saved to state and the correct/incorrect answers is shown using CSS. This button then is hidden and the Done button is shown. The button is disabled if an answer is not selected. 
class CheckAnswerButton extends Component{
	
  //method to change the passFail attribute of each test's object to pass or fail. This will be use to change the CSS to green for correct and red for incorrect. 	
  showCorrectAnswer(){
	  let newTest = this.props.currentTest;
	  newTest.forEach((test) =>{
		//if the current test answer is the correct answer, change to pass. Else, change to fail.  
	    if(this.props.currentTest[this.props.questionsAnswered.questionAnswered].answer === test.answer){
			test.passFail = "pass";
		}else {
			test.passFail = "fail";
		}
	  });

	  //Redux action that sends a updated array of objects with a modified passFail attribute to the test state.
	  this.props.onUpdatePassFail(newTest);
	  
	  //Redux action that returns true to the showPassFail state. This turns on the CSS of the list of answers showing correct and incorrect answers. 
	  this.props.onShowPassAnswers();
  }	

  //Method use when user click the button. It adds one to the  correct answer count if the user selected answer is correct
  onCheckAnswer = event => {
      
    //This updates the count state when the user answers correctly during the quiz level 1  
    if(this.props.currentQuizLevel === 1){
	  //Test if the current user selected answer is equal to the correct answer for this question in the Redux store
	  if(this.props.currentAnswer.userAnswer === this.props.currentTest[this.props.questionsAnswered.questionAnswered].answer){
		  this.props.onAddCorrectAnswer(); //If the condition above is true, add one to the current count of correctly answered questions
          this.props.onAddStreak(); //if the user answers correctly, add one to the streak Redux state
	  }else{
          this.props.onResetStreak();//if the user answers incorrectly, reset the streak Redux state
      }         
    }
     
    //This updates the count state when the user answers correctly during the quiz level 2    
    if(this.props.currentQuizLevel ===2){
      const currentTrueFalseChoice = this.props.currentTrueFalseUserAnswer.truefalse; //get the user true or false choice
  
      //First, compare the random answer given to the correct answer for the current problem. If both is the same and the user choose true then add one to correct answer count. Second, compare the random answer given to the correct answer for the current problem. If the random answer incorrect and the user choose false, then one is added to the correct answer count. In both cases if the answer is corret add one to the Streak State and if incorrect reset the Streak state.      
	  if(this.props.currentAnswer.userAnswer === this.props.currentTest[this.props.questionsAnswered.questionAnswered].answer && currentTrueFalseChoice === true){
		  this.props.onAddCorrectAnswer(); //If the condition above is true, add one to the current count of correctly answered questions
          this.props.onAddStreak();//if the user answers correctly, add one to the streak Redux state
	  }else if(this.props.currentAnswer.userAnswer !== this.props.currentTest[this.props.questionsAnswered.questionAnswered].answer && currentTrueFalseChoice === false){
		  this.props.onAddCorrectAnswer(); //If the condition above is true, add one to the current count of correctly answered questions         
          this.props.onAddStreak();//if the user answers correctly, add one to the streak Redux state
	  }else{
          this.props.onResetStreak();//if the user answers incorrectly, reset the streak Redux state
      }     
        
	  this.showCorrectAnswer();//send an Redux action to return true to the Redux store, thus showing the CSS (green/correct and red/incorrect) of the displayed answers.
      }
  }	

  render(){
    return(
      <div className={`row ${css(styles.whiteSpaceAboveElement)}`}>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
          <Button className={css(styles.buttonTextColor)} bsStyle="success" onClick={this.onCheckAnswer} disabled={this.props.currentAnswer.userAnswer==="" && this.props.currentQuizLevel < 3}>Check Answer</Button>
        </div>
      </div>
   );      //end of return
 }//end of render
}//end of CheckAnswerButton Class

/*Use Redux to get the current number of questions answered, current count of correct answers, and the current array of questions and answers*/
const mapStateToProps = state =>({
	questionsAnswered: state.answered,
	currentAnswer: state.userAnswer,
	currentTest: state.test,
    currentQuizLevel: state.successPage.currentLevel,
    currentTrueFalseUserAnswer: state.trueFalseAnswer
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store such as correct answer count, updated test (array of questions and answers), and the showPassFail state (true/false).
const mapActionsToProps = {
  onAddCorrectAnswer: addCorrectAnswer,
  onAddStreak: addStreak,
  onResetStreak: resetStreak,
  onUpdatePassFail: updatePassFail,
  onShowPassAnswers: showCSSPass
};

export default connect(mapStateToProps,mapActionsToProps)(CheckAnswerButton);