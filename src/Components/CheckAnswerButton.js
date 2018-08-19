import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import {addCorrectAnswer} from '../Actions/correctCountActions.js';

const styles = StyleSheet.create({
  whiteSpaceAboveElement:{
    margin: "10px" //add whitespace above button
  },
	
  buttonTextColor:{
	color: "black" //button text is black
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

class CheckAnswerButton extends Component{
<<<<<<< HEAD
	
  /*
  	- Create
  */
	
  //Update the score by dividing the count of correct answers given by the current amount of questions answer.
  getScore(){
    let newScore = (this.props.currentCount.count/this.props.questionsAnswered.questionAnswered)*100;
	
	//local method connected to a Redux method to update the score in the Redux store
	this.props.onUpdateScore(newScore);  
  }		

=======
>>>>>>> refs/remotes/origin/master
  //Method use when user click the button. It adds one to the questonAnswered state and correctAnsweredCount	
  onCheckAnswer = event => {
	  //Testing if the current user selected answer is equal to the correct answer for this question in the Redux store
	  if(this.props.currentAnswer.userAnswer === this.props.currentTest[this.props.questionsAnswered.questionAnswered].answer){
		  this.props.onAddCorrectAnswer(); //If the condition above is true, add one to the current count of correctly answered questions  
	  }	

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
	questionsAnswered: state.answered,
	currentAnswer: state.userAnswer,
	currentTest: state.test
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store
const mapActionsToProps = {
  onAddCorrectAnswer: addCorrectAnswer
};

export default connect(mapStateToProps,mapActionsToProps)(CheckAnswerButton);