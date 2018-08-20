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
	
  //Method 	
  getNextQuestion = event => {
	  
	  this.props.onAddQuestionsAnswered();// add one to the count of answered questions
	  
	  this.props.onHidePassAnswers();//send an Redux action to return false to the Redux store, thus hiding the CSS (green/correct and red/incorrect) of the displayed answers (color is now black)
	  
	  this.props.onClearUserAnswer();

	  //Update the score by dividing questionAnswer/count (the current amount of questions answer by the count of correct answers given, then waiting 5 seconds before updating score. The timeout give the async Redux actions time to update. If not use, the first variable, count, updates before the second variable and return a NAN. 
	  setTimeout(() =>{
	    this.getScore(), 5000
	  });	

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
 
/*Use Redux to get the current number of questions answered and current count of correct answers*/
const mapStateToProps = state =>({
	currentCount: state.count,
	questionsAnswered: state.answered
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store such as questions answer, current score, user selected answer, and current value of showPass.
const mapActionsToProps = {
  onAddQuestionsAnswered: addQuestionsAnswered,
  onUpdateScore: updateScore,
  onHidePassAnswers: showCSSFail,
  onClearUserAnswer: clearUserAnswer
};

export default connect(mapStateToProps,mapActionsToProps)(DoneButton);