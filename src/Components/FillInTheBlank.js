import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

import {userChooseFalse} from '../Actions/userFalseAnswerActions.js';//import action to update the user's choice to the TrueFalseAnswer state

import {userChooseTrue} from '../Actions/userTrueAnswerActions.js';//import action to update the user's choice to the TrueFalseAnswer state

import {getUserAnswer} from '../Actions/userAnswerActions.js';//import action to update the user's choice to the userAnswer state

const styles = StyleSheet.create({
  
  labelWhiteSpace:{
	  marginTop: "15px",
      marginBottom: "15px"
  },
    
  radioWhiteSpace:{
	  marginTop: "5px",
      marginBottom: "5px"
  },  
    
  indentAnswerOptions:{
	  textIndent: "5%"
  },
    
  resetButton: {
      backgroundColor: "#ff6666",
      fontSize:"bolder"
  }    
	
});

//radio options that allow the user to choose if they got it correct or not
function TrueFalseOptions (props){    
  return(
    <div className={`col-xs-6 col-xs-offset-4 ${css(styles.indentAnswerOptions)}`}>
      <input className={css(styles.radioWhiteSpace)} type="radio" name="choice" value={props.choice}  onClick={props.answerChoice}  /> 
      <label> {props.choice} </label>      
	</div>
  );    
}

//Quiz level three main component that allows the user to input an answer, then shown the correct answer, and then grade herself/himself. 
class FillInTheBlank extends Component{

  //method that calls a Redux action to save the user selected anwer to the Redux state and update true or false to the state.
  saveTrueAnswer = () =>{
	this.props.onUpdateTrueAnswer();
  }

  //method that calls a Redux action to save the user selected anwer to the Redux state
  saveFalseAnswer = () =>{
	this.props.onUpdateFalseAnswer();
  }

  //Bug Fix: Instead of a Reset button, when the user press the DoneButton the input field is cleared. This method saves the user answer to Redux state and is later remove via Redux actions
  onInputUserAnswer = event => {
    event.preventDefault(); //not sure    
    this.props.onUpdateUserAnswer(event.target.value);
  }

  //tip @ https://til.hashrocket.com/posts/ciwaoweyl7-use-a-ref-to-autofocus-an-input
  //Move focus to input button
  focusInput = (component) => {
    if(component){
      component.focus();
    }
  }

    
  render(){      
	  return(
		<div className="row ">
		  <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 text-center">
            <form>
			  <input id="inputBox" type="text" disabled={this.props.currentPassFail} onChange={this.onInputUserAnswer} value={this.props.currentAnswer} ref={this.focusInput} />
            </form>
		  </div>

		  {this.props.currentPassFail && <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 text-center">
			<label className={css(styles.labelWhiteSpace)}>{this.props.answerList[this.props.currentLocation].answer}</label>
		  </div>}
          
          {this.props.currentPassFail && <TrueFalseOptions choice="true" answerChoice={this.saveTrueAnswer}/>}
          {this.props.currentPassFail && <TrueFalseOptions choice="false" answerChoice={this.saveFalseAnswer} />}
		</div>  
	  );
  }
}    

const mapStateToProps = state => ({
	currentAnswer: state.userAnswer.userAnswer,
    currentQuizLevel: state.successPage.currentLevel,
	currentPassFail: state.passFail.passFail,
	answerList: state.test,
	currentLocation: state.answered.questionAnswered,
});

const mapActionsToProps = {
  onUpdateUserAnswer: getUserAnswer,
  onUpdateTrueAnswer: userChooseTrue,
  onUpdateFalseAnswer: userChooseFalse
};

export default connect(mapStateToProps, mapActionsToProps)(FillInTheBlank);