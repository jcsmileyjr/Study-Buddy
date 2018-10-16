import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import * as RandomAnswers from '../SharedFunctions/RandomAnswers.js';
import Instructions from './Instructions.js';

import {getUserAnswer} from '../Actions/userAnswerActions.js';//import action to update the randomly selected answer to the userAnswer state to enable the checkAnswerButton and to check if the answer is correct

import {userChooseFalse} from '../Actions/userFalseAnswerActions.js';//import action to update the user's choice to the TrueFalseAnswer state

import {userChooseTrue} from '../Actions/userTrueAnswerActions.js';//import action to update the user's choice to the TrueFalseAnswer state

import {updateQuizAnswer} from '../Actions/updateTrueFalseQuizAnswer.js';//import action to update the current true or false answer to the state

const styles = StyleSheet.create({
	
  /*change the answer in the label to show its the wrong answer*/	
  wrongAnswers:{
	color: "red",
	textDecoration: "line-through"
  },
	
  /*change the answer in the label to show its the correct answer*/	
  correctAnswer:{
	  color: "green",
	  fontSize: "1.2em"
  },
    
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
  }    
	
});

//Componet for the second quiz level that display a true and false option to the user. 
class TrueFalseOptions extends Component{
  constructor(props){
    super(props);
    this.state= {show:false};
  }    

  componentDidMount(){
    let startTrueFalseQuizAnswer = this.displayAnswers();//get random answer to be displayed    
    this.props.onUpdateTrueFalseQuizAnswer(startTrueFalseQuizAnswer);// updated the state so its value can be displayed below
    
    this.showMCInstructions();     
  } 
	
  //function to returns a random answer to be shown to the user for the user to decide if its true or false. Only ran when the app starts. 
  displayAnswers(){
	
    //list of questions and answers from the test state	
    const arrayofAnswers = this.props.answerList;	
    
    //current index of the test based off of how many questions the user has answered. This information is from the currentAnsweredCount state	
    const location = 	this.props.currentLocation;    
    
    //get the current answer of the current test based on location using a function from the imported RandomAnswers file.	
    const currentAnswer = RandomAnswers.getCurrentAnswer(location, arrayofAnswers);
	
    //create an array with a random two incorrect answers and the correct answered using a function from the imported RandomAnswers file.
    const randomAnswers = RandomAnswers.getRandomThreeAnswers(arrayofAnswers, currentAnswer);    
    
    //get a random answer from the randomAnswers array to be displayed    
    const displayedRandomAnswer = randomAnswers[Math.floor(Math.random() * randomAnswers.length)];	
	
    return displayedRandomAnswer.answer;
  }

  //method that calls a Redux action to save the user selected anwer to the Redux state and update true or false to the state.
  saveTrueAnswer = () =>{
	this.props.onUpdateTrueAnswer();
    this.props.onUpdateUserAnswer(this.props.currentQuizAnswer);
  }

  //method that calls a Redux action to save the user selected anwer to the Redux state
  saveFalseAnswer = () =>{
	this.props.onUpdateFalseAnswer();
    this.props.onUpdateUserAnswer(this.props.currentQuizAnswer);
  }

  //when the user click the notepad icon, the M.C. Instructions pop up is displayed
  showMCInstructions = () =>{
    this.setState({show: true});
  }
  
  //close the M.C. Instructions pop up
  hideMCInstructions = () =>{
    this.setState({show: false});
  } 

  render(){      
	  return(
		<div className="row ">
		  <div className="text-center col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
			<label className={css(this.props.currentPassFail.passFail && (this.props.currentAnswer === this.props.answerList[this.props.currentLocation].answer) && styles.correctAnswer, this.props.currentPassFail.passFail && (this.props.currentAnswer !== this.props.answerList[this.props.currentLocation].answer) && styles.wrongAnswers)}>{this.props.currentQuizAnswer}</label>
		  </div>
          <div className="col-xs-8 col-xs-offset-4 col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 col-lg-8 col-lg-offset-4">
            <input className={css(styles.spaceBetweenOptions)} type="radio" name="choice" value={true}  onClick={this.saveTrueAnswer} />
            <label className={css(styles.indentAnswerOptions)}> Correct </label>
          </div>
          <div className="col-xs-8 col-xs-offset-4 col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 col-lg-8 col-lg-offset-4">
            <input className={css(styles.spaceBetweenOptions)} type="radio" name="choice" value={false}  onClick={this.saveFalseAnswer} />
            <label className={css(styles.indentAnswerOptions)}> Incorrect </label>
          </div>
          <Instructions show={this.state.show} hideMCInstructions={this.hideMCInstructions} />                              
		</div>  
	  );
  }
}

//map imported state of the tests and number of questions answered in the Redux store to local variables to be use by the component. 
const mapStateToProps = state => ({
	answerList: state.test,
	currentLocation: state.answered.questionAnswered,
	currentAnswer: state.userAnswer.userAnswer,    
	currentPassFail: state.passFail,
    currentQuizAnswer: state.trueFalseAnswer.trueFalseQuizAnswer
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store
const mapActionsToProps = {
  onUpdateUserAnswer: getUserAnswer,    
  onUpdateTrueAnswer: userChooseTrue,
  onUpdateFalseAnswer: userChooseFalse,
  onUpdateTrueFalseQuizAnswer: updateQuizAnswer
};

export default connect(mapStateToProps, mapActionsToProps)(TrueFalseOptions);