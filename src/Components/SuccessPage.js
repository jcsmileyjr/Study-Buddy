import React, {Component}  from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import {successPageFalse} from '../Actions/hideSuccessPageAction.js';//import action to change the SuccessPage state's showSuccessPage state to false therefore hiding it.


//Redux action to reset the questionsAnswered state to zero
import {resetQuestionsAnswered} from '../Actions/resetquestionAnsweredActions.js';

//Redux action to reset the count state to zero
import {resetCorrectAnswer} from '../Actions/resetCountActions.js';

//A component shown when the user completes a quiz. A button is press to preceed to the next quiz
class SuccessPage extends Component{
  /*
  if(this.props.currentScore.score > 75){
    const currentMessage = "You Passed, Proceed to the next next level";
  }else{
    const currentMessage = "You Failed, let's try again";  
  }
    */
 displayMessage(){
  let currentMessage = "";
  if(this.props.currentScore.score > 75){
    currentMessage = "You Passed, Proceed to the next next level";
  }else{
    currentMessage = "You Failed, let's try again";  
  }

  return currentMessage;
 }        
    
  onCloseSuccessPage = () => {
    this.props.onClosePage();
    this.props.onresetQuestionsAnswered();
    this.props.onresetCorrectAnswer();      
  }      
  render(){  
      return(
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{this.displayMessage()}</h1>
          </div>
          <div className="col-xs-12 text-center">
            <Button onClick={this.onCloseSuccessPage} bsStyle="success">Start Quiz</Button>        
          </div>
        </div>  
      );	
  }
}

/*Use Redux to get the current score from state*/
const mapStateToProps = state =>({
	currentScore: state.score
});

const mapActionsToProps = {
    onClosePage: successPageFalse,
    onresetQuestionsAnswered: resetQuestionsAnswered,
    onresetCorrectAnswer: resetCorrectAnswer    
};

export default connect(mapStateToProps, mapActionsToProps)(SuccessPage);