import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

//Redux action to update the questionsAnswered state by one
import {addQuestionsAnswered} from '../Actions/questionAnsweredActions.js';

//Redux action to update the score state by returning a new score
import {updateScore} from '../Actions/scoreActions.js';

//Redux action to update the showPassFail state to false
import {showCSSFail} from '../Actions/hidePassFailActions.js';

import {clearUserAnswer} from '../Actions/clearUserAnswerActions.js';//import action to reset the userAnswer state

import {successPageTrue} from '../Actions/showSuccessPageAction.js';//import action to change the SuccessPage state's showSuccessPage state to true therefore showing it.

import {goToNextLevel} from '../Actions/nextLevelAction.js';//import action to move the player to the next level of the test
 
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

  //Update the score by dividing the count of correct answers given by the current amount of questions answer.
  getScore(){
    let newScore = (this.props.currentCount.count/this.props.questionsAnswered.questionAnswered)*100;
	
	//local method connected to a Redux method to update the score in the Redux store
	this.props.onUpdateScore(newScore);  
  }
	
  //Method to send Redux actions to move the user to the next question, disable the CheckAnswersButton, and update the score. 
  getNextQuestion = event => {
      
      let numberOfQuestions = this.props.currentTest.length;
      
      if(this.props.questionsAnswered.questionAnswered === (numberOfQuestions -1) ){
          this.props.onShowSuccessPage();
          this.props.onNextLevel();
      }else {
	      this.props.onAddQuestionsAnswered();// add one to the count of answered questions          
            
	  


	  //Update the score by dividing questionAnswer/count (the current amount of questions answer by the count of correct answers given, then waiting 5 seconds before updating score. The timeout give the async Redux actions time to update. If not use, the first variable, count, updates before the second variable and return a NAN. 
	  setTimeout(() =>{
	    this.getScore(), 5000		  
	  
	    this.props.onHidePassAnswers();//send an Redux action to return false to the Redux store, thus hiding the CSS (green/correct and red/incorrect) of the displayed answers (color is now black)
	  
	    this.props.onClearUserAnswer(); //send an Redux action to reset the user answer Redux state. This will disable the CheckAnswerButton component. 
          

      
	  });
      
      }
  }		
        
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
    currentTest: state.test
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store such as questions answer, current score, user selected answer, whether to show the SuccessPage, move the player to the next level, and current value of showPass.
const mapActionsToProps = {
  onAddQuestionsAnswered: addQuestionsAnswered,
  onUpdateScore: updateScore,
  onHidePassAnswers: showCSSFail,
  onClearUserAnswer: clearUserAnswer,
  onShowSuccessPage :successPageTrue,
  onNextLevel: goToNextLevel
};

export default connect(mapStateToProps,mapActionsToProps)(DoneButton);