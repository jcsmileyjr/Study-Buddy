import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import * as RandomAnswers from '../SharedFunctions/RandomAnswers.js';

//Redux action to update the questionsAnswered state by one
import {addQuestionsAnswered} from '../Actions/questionAnsweredActions.js';

//Redux action to update the score state by returning a new score
import {updateScore} from '../Actions/scoreActions.js';

//Redux action to update the showPassFail state to false
import {showCSSFail} from '../Actions/hidePassFailActions.js';

import {clearUserAnswer} from '../Actions/clearUserAnswerActions.js';//import action to reset the userAnswer state

import {successPageTrue} from '../Actions/showSuccessPageAction.js';//import action to change the SuccessPage state's showSuccessPage state to true therefore showing it.

import {goToNextLevel} from '../Actions/nextLevelAction.js';//import action to move the player to the next level of the test

import {updateQuizAnswer} from '../Actions/updateTrueFalseQuizAnswer.js';//import action to update the current true or false answer to the state
 
const styles = StyleSheet.create({
  whiteSpaceAboveElement:{
          margin: "10px"
  },
	
  buttonTextColor:{
	  color: "black"
  }	     
});
 
//Secondary button that is shown when the checkAnswerButton component is pressed. The DoneButton updates the score, get the next question, and turn off the passFail CSS of the answer list. 
class DoneButton extends Component{
 
  //function to returns a random answer to be shown to the user for the user to decide if its true or false
  displayAnswers(){
	
    //list of questions and answers from the test state	
    const arrayofAnswers = this.props.currentTest;	
    
    //current index of the test based off of how many questions the user has answered. This information is from the currentAnsweredCount state	
    const location = 	(this.props.questionsAnswered).questionAnswered;    
    
    //get the current answer of the current test based on location using a function from the imported RandomAnswers file.	
    const currentAnswer = RandomAnswers.getCurrentAnswer(location, arrayofAnswers);
	
    //create an array with a random two incorrect answers and the correct answered using a function from the imported RandomAnswers file.
    const randomAnswers = RandomAnswers.getRandomThreeAnswers(arrayofAnswers, currentAnswer);    
    
    const displayedRandomAnswer = randomAnswers[Math.floor(Math.random() * randomAnswers.length)];	
	
    return displayedRandomAnswer.answer;
}    

  //Update the score by dividing the count of correct answers given by the current amount of questions answer.
  getScore(){
    let newScore = (this.props.currentCount.count/this.props.questionsAnswered.questionAnswered)*100;
	
	//local method connected to a Redux method to update the score in the Redux store
	this.props.onUpdateScore(newScore);  
  }
	
  //Method to send Redux actions to move the user to the next question, update the score, and reset the answering process (CheckAnswerButton and Red/Green CSS). If its the last question then the SuccessPage is shown, the quiz level is updated by one, and the current test CSS is return to false. 
  getNextQuestion = event => {
      
      // Get the current length or number of questions of the current test
      let numberOfQuestions = this.props.currentTest.length;
      
      if(this.props.questionsAnswered.questionAnswered === (numberOfQuestions -1) ){
          this.props.onAddQuestionsAnswered();// add one to the count of answered questions 
          this.props.onShowSuccessPage();// show the SuccessPage component by updating state to true
          this.props.onNextLevel(); // go to the next quiz level by updating the state by one
	      this.props.onHidePassAnswers();//send an Redux action to return false to the Redux store, thus hiding the CSS (green/correct and red/incorrect) of the displayed answers (color is now black) and show the CheckAnswerButton (hide the DoneButton) component.          
      }else {
	      this.props.onAddQuestionsAnswered();// add one to the count of answered questions
          
          //If the current quiz level is 2 then a new true/false quiz answer is randomly selected and the state updated so it can be displayed on the TrueFalseOptions component.
          if(this.props.currentQuizLevel === 2){
            let startTrueFalseQuizAnswer = this.displayAnswers();//get random answer to be displayed    
            this.props.onUpdateTrueFalseQuizAnswer(startTrueFalseQuizAnswer);// updated the state so its value can be displayed below              
          }
      }//end of else statement          
          //Update the score by dividing questionAnswer/count (the current amount of questions answer by the count of correct answers given, then waiting 5 seconds before updating score. The timeout give the async Redux actions time to update. If not use, the first variable, count, updates before the second variable and return a NAN. 
	      setTimeout(() =>{
	        this.getScore(), 5000		  
	  
	        this.props.onHidePassAnswers();//send an Redux action to return false to the Redux store, thus hiding the CSS (green/correct and red/incorrect) of the displayed answers (color is now black) and show the CheckAnswerButton (hide the DoneButton) component.
	              
            this.props.onClearUserAnswer(); //send an Redux action to reset the user answer Redux state. This will disable the CheckAnswerButton component.
              
	       });
      

      
  }//end of getNextQuestion()		
        
  render(){
     return(
       <div className={`row ${css(styles.whiteSpaceAboveElement)}`}>
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
            <Button className={css(styles.buttonTextColor)} onClick={this.getNextQuestion} bsStyle="success">Done</Button>
         </div>
       </div> 
      );      //end of return
   }//end of render
        
}//end of DoneButton Class
 
/*Use Redux to get the current number of questions answered, current count of correct answers, and length of the test*/
const mapStateToProps = state =>({
	currentCount: state.count,
	questionsAnswered: state.answered,
    currentQuizLevel: state.successPage.currentLevel,
    currentTest: state.test
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store such as questions answer, current score, user selected answer, whether to show the SuccessPage, move the player to the next level, and current value of showPass.
const mapActionsToProps = {
  onAddQuestionsAnswered: addQuestionsAnswered,
  onUpdateScore: updateScore,
  onHidePassAnswers: showCSSFail,
  onClearUserAnswer: clearUserAnswer,
  onShowSuccessPage :successPageTrue,
  onNextLevel: goToNextLevel,
  onUpdateTrueFalseQuizAnswer: updateQuizAnswer
};

export default connect(mapStateToProps,mapActionsToProps)(DoneButton);