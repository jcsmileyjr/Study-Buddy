import React, {Component}  from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

//import action to change the SuccessPage state's showSuccessPage state to false therefore hiding it.
import {successPageFalse} from '../Actions/hideSuccessPageAction.js';


//Redux action to reset the questionsAnswered state to zero
import {resetQuestionsAnswered} from '../Actions/resetquestionAnsweredActions.js';

//Redux action to reset the count state to zero
import {resetCorrectAnswer} from '../Actions/resetCountActions.js';

//import action to reset the Score state to zero
import {clearScore} from '../Actions/clearScoreActions.js';

 
function EndOfGame (props){    
  return(
    
      <div className="col-xs-12 text-center">
        <p>Text Dad the keyword "Done" to Get a Reward for Completing the game.</p>
        <Button onClick={props.continue} bsStyle="success">Restart the Game</Button>  
      </div>
  );    
}

function NextGame(props){
  return(
    
      <div className="col-xs-12 text-center">
        <Button onClick={props.continue} bsStyle="success">Start Quiz</Button>        
      </div> 
  );
}


//A component shown when the user completes a quiz. A button is press to preceed to the next quiz
class SuccessPage extends Component{
  constructor(props){
    super(props);
    this.state = {score: 0};//Used to hold to updated current score of the past quiz. There is a bug in the code that updates the Redux state with an incorrect score from the quiz. 
  }    
    
  //Gets a current score of the last quiz to update this component.     
  componentDidMount(){
    let newScore = (this.props.currentCount.count/this.props.questionsAnswered.questionAnswered)*100;
    this.setState({score: newScore, endGame:false});
  }  
    
  displayMessage(){
    let currentMessage = "";
    if(this.state.score >= 75){
      currentMessage = "You Passed with a " +this.state.score + ", Proceed to the next next level";
    }else{
      currentMessage = "You Failed with a " +this.state.score + ", let's try again";  
    }

    return currentMessage;
  }        
    
  //When the user press the button the component is closed and the current count/questions answered Redux state are reset.    
  onCloseSuccessPage = () => {
    this.props.onClosePage();
    this.props.onresetQuestionsAnswered();
    this.props.onresetCorrectAnswer(); 
    this.props.onresetScore();  
  }      
  
  render(){  
      return(
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{this.displayMessage()}</h1>
          </div>
          {this.props.currentQuizLevel <= 3 ? <NextGame continue={this.onCloseSuccessPage} />: <EndOfGame continue={this.onCloseSuccessPage} />} 
        </div>  
      );	
  }
}

/*Use Redux to get the current score from state*/
const mapStateToProps = state =>({
	currentCount: state.count,
    currentQuizLevel: state.successPage.currentLevel,    
	questionsAnswered: state.answered
});

const mapActionsToProps = {
    onClosePage: successPageFalse,
    onresetQuestionsAnswered: resetQuestionsAnswered,
    onresetCorrectAnswer: resetCorrectAnswer,
    onresetScore: clearScore
};

export default connect(mapStateToProps, mapActionsToProps)(SuccessPage);