import React, {Component}  from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

//import action to change the SuccessPage state's showSuccessPage state to false therefore hiding it.
import {successPageFalse} from '../Actions/hideSuccessPageAction.js';

//Redux action to reset the questionsAnswered state to zero
import {resetQuestionsAnswered} from '../Actions/resetquestionAnsweredActions.js';

//Redux action to reset the count state to zero
import {resetCorrectAnswer} from '../Actions/resetCountActions.js';

//Redux action to reset the streak state if the user miss a answer
import {resetStreak} from '../Actions/resetStreakActions.js';

//import action to reset the Score state to zero
import {clearScore} from '../Actions/clearScoreActions.js';

import {goToNextLevel} from '../Actions/nextLevelAction.js';//import action to move the player to the next level of the test

import {resetLevel} from '../Actions/resetLevelAction.js';//import action to move the player to the first level of the test

//UI to be displayed if all three levels of the test have been completed and passed 
function EndOfGamePass (props){    
  return(
    
      <div className="col-xs-12 text-center">
        <h1>You pass with a {props.score}</h1>
        <p>Text Dad the keyword "Done" to Get a Reward for Completing the game.</p>
        <Button onClick={props.continue} bsStyle="success">Restart the Game</Button>  
      </div>
  );    
}

//UI to be displayed if all three levels of the test have been completed and passed 
function EndOfGameFail (props){    
  return(
    
      <div className="col-xs-12 text-center">
        <h1>You fail with a {props.score}</h1>
        <p>Lets try again</p>
        <Button onClick={props.continue} bsStyle="success">Restart the Game</Button>  
      </div>
  );    
}

//UI to be displayed when the user completes a test.
function NextGame(props){
  return(
    
      <div className="col-xs-12 text-center">
        <h1>{props.message}</h1>
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
    
  //Display to the user the final score and if they pass or fail    
  displayMessage(){
    let currentMessage = "";
    if(this.state.score >= 75){
      currentMessage = "You Passed with a " +this.state.score + ", Proceed to the next next level";
    }else{
      currentMessage = "You Failed with a " +this.state.score + ", let's try again";  
    }

    return currentMessage;
  }
    
  displayCongrats(){
    
  }    
    
  //When the user press the button the component is closed and the current count/questions answered Redux state are reset. This start the user with a fresh un-anwered test    
  onCloseSuccessPage = () => {      
        
    //If the user scores 75 or above, then the next game level is enable
    if(this.state.score >= 75){
      this.props.onNextLevel(); // go to the next quiz level by updating the state by one              
    }
      
    this.resetGameState();//a series of Redux actions that reset the game state to get ready for the next game
  } 
  
  //if the quiz level is 3, then reset the game by reseting the quiz level to 1 via Redux and reset all state
  onRestartGame = () =>{
      
    this.props.onResetLevel(); // go to the next quiz level by updating the state by one
    this.resetGameState();//a series of Redux actions that reset the game state to get ready for the next game 
    this.props.onResetStreak();//if the user answers incorrectly, reset the streak Redux state   
  }
  
  //a series of Redux actions that reset the game state to get ready for the next game
  resetGameState(){
    this.props.onClosePage();//sets the successPage state to false, therefore closing the Success page
    this.props.onresetQuestionsAnswered();//reset the number of questions answer counter to 0
    this.props.onresetCorrectAnswer(); //reset the number questions answered correctly to 0
    this.props.onresetScore();//reset the score  in the state 
    this.setTopScore();  
  }

  //set the current score, if its the higher then the current save highest score, as the top score to be displayed in the TopScore component
  setTopScore(){
    
    //create a unique key for the current test and quiz level. Format name + Quiz + level
    const uniqueLocalStorageKey = "testQuiz" + this.props.currentQuizLevel;
    
    //get the current score or null from local storage  
    const currentTopScore = localStorage.getItem(uniqueLocalStorageKey);
      
    //Check if the local storage item is null or if the current score is less then the save top score. If it is less, then save new highest score to local storage  
    if(uniqueLocalStorageKey === null || currentTopScore <=this.state.score){
      //transform the cases array into a string and saves it to the brower's local storage
      localStorage.setItem(uniqueLocalStorageKey, this.state.score);          
    }//end of IF statment   
  }

  render(){  
      return(
        <div className="row">
          {(this.props.currentQuizLevel <= 2) && <NextGame continue={this.onCloseSuccessPage} message={this.displayMessage()} />}
          {(this.props.currentQuizLevel >= 3 && this.state.score >= 75) && <EndOfGamePass continue={this.onRestartGame} score={this.state.score} />}
          {(this.props.currentQuizLevel >= 3 && this.state.score < 75) && <EndOfGameFail continue={this.onRestartGame} score={this.state.score} />}
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
    onNextLevel: goToNextLevel,
    onResetStreak: resetStreak,    
    onResetLevel: resetLevel,
    onresetScore: clearScore
};

export default connect(mapStateToProps, mapActionsToProps)(SuccessPage);