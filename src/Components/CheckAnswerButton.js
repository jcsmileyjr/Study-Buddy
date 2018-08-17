import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import {addCorrectAnswer} from '../Actions/correctCountActions.js';
import {addQuestionsAnswered} from '../Actions/questionAnsweredActions.js';
import {updateScore} from '../Actions/scoreActions.js';

const styles = StyleSheet.create({
  whiteSpaceAboveElement:{
          margin: "10px" //add whitespace above button
  },
	
  buttonTextColor:{
	  color: "black" //button text is black
  }	
});

class CheckAnswerButton extends Component{
  getScore(){
    let newScore = (this.props.currentCount.count/this.props.questionsAnswered.questionAnswered)*100;
	
	//let newScore = this.props.questionsAnswered.questionAnswered;
	this.props.onUpdateScore(newScore);  
  }		

  //Method use when user click the button. It adds one to the questonAnswered state and correctAnsweredCount	
  onCheckAnswer = event => {
	  //if statement checking if userAnswer = correctAnswer. if true, run onAddCorrectAnswer()
	  this.props.onAddCorrectAnswer();
	  this.props.onAddQuestionsAnswered();
	  //Update score by dividing questionAnswer/count, then updating score
	  this.getScore();
  }	

  render(){
    return(
      <div className={`row ${css(styles.whiteSpaceAboveElement)}`}>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
          <Button className={css(styles.buttonTextColor)} bsStyle="success" onClick={this.onCheckAnswer}>Check Answer</Button>
        </div>
      </div>
   );      //end of return
 }//end of render

/*      To Do
- add attribute to disable={} if player hasn't chosen an answer
- onclick={method to check if answer is corect}
- onClick={method to change passFail of answers that in turn change css}
- write both methods
- bind both methods to the constructor
*/  

}//end of CheckAnswerButton Class

/*Use Redux to get the current number of questions answered and current count of correct answers*/
const mapStateToProps = state =>({
	currentCount: state.count,
	questionsAnswered: state.answered
});

const mapActionsToProps = {
  onAddCorrectAnswer: addCorrectAnswer,
  onAddQuestionsAnswered: addQuestionsAnswered,
  onUpdateScore: updateScore
};

export default connect(mapStateToProps,mapActionsToProps)(CheckAnswerButton);