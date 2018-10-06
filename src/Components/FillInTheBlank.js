import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

import {userChooseFalse} from '../Actions/userFalseAnswerActions.js';//import action to update the user's choice to the TrueFalseAnswer state

import {userChooseTrue} from '../Actions/userTrueAnswerActions.js';//import action to update the user's choice to the TrueFalseAnswer state

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
  }    
	
});

function TrueFalseOptions (props){    
  return(
    <div className={`col-xs-6 col-xs-offset-4 ${css(styles.indentAnswerOptions)}`}>
      <input className={css(styles.radioWhiteSpace)} type="radio" name="choice" value={props.choice}  onClick={props.answerChoice}  /> 
      <label> {props.choice} </label>      
	</div>
  );    
}

class FillInTheBlank extends Component{

//method that calls a Redux action to save the user selected anwer to the Redux state and update true or false to the state.
saveTrueAnswer = () =>{
	this.props.onUpdateTrueAnswer();
}

//method that calls a Redux action to save the user selected anwer to the Redux state
saveFalseAnswer = () =>{
	this.props.onUpdateFalseAnswer();
}
    
  render(){      
	  return(
		<div className="row ">
		  <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 text-center">
			<input type="text" disabled={this.props.currentPassFail} />
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
    currentQuizLevel: state.successPage.currentLevel,
	currentPassFail: state.passFail.passFail,
	answerList: state.test,
	currentLocation: state.answered.questionAnswered,
});

const mapActionsToProps = {
  onUpdateTrueAnswer: userChooseTrue,
  onUpdateFalseAnswer: userChooseFalse
};

export default connect(mapStateToProps, mapActionsToProps)(FillInTheBlank);