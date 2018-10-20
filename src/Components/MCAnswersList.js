import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import * as RandomAnswers from '../SharedFunctions/RandomAnswers.js';
import Instructions from './Instructions.js';

import {getUserAnswer} from '../Actions/userAnswerActions.js';//import action to update the user's choice to the userAnswer state

import {updateMCQuizAnswer} from '../Actions/updateMCQuizAnswers.js';//import action to update the array of answer use on the MCAnswersList to the state

const styles = StyleSheet.create({
    
  orangeBackground:{
      textAlign: "center",      
      backgroundColor: 'orange'
  },
  
  buttonTextColor:{
	color: "black", //button text is black
    marginTop: "20px"
  },
    
  centerText:{
      textAlign: "center"
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
  },
	
  /*remove the bullets and indention from the lists displaying the cases*/
  removeListBullets: {
	  listStyleType: "none",
  	  margin: "0px",
	  padding: "0px"
  },
	
  /*change the answer in the label to show its the wrong answer*/	
  wrongAnswers:{
	color: "red",
	textDecoration: "line-through"
  },
	
  /*change the answer in the label to show its the correct answer*/	
  correctAnswer:{
	  color: "green",
	  fontSize: "1.2em"
  }
});

//Display three answers as radio input controls. One answer is the correct answer and the other two are random incorrect answers. The component use the current array of questions/answers and current count of questions answer to determine the correct answer. All styles are applied to each answer but are turn on and off based on the passFail attribute of each answer. 
class MCAnswersList extends Component{
  constructor(props){
    super(props);
    this.state= {show:false};
  }    
  
  componentDidMount(){
    let startMCQuizAnswers = this.getMCAnswers();//get random answer to be displayed    
    this.props.onUpdateMCQuizAnswers(startMCQuizAnswers);// updated the state so its value can be displayed below
    this.showMCInstructions();  
  }   
    
  //function to create an array of options to be displayed
  getMCAnswers(){
	
    //list of questions and answers from the test state	
    const arrayofAnswers = this.props.answerList;
    
    //current index of the test based off of how many questions the user has answered. This information is from the currentAnsweredCount state	
    const location = (this.props.currentLocation).questionAnswered;     
  
    //get the current answer of the current test based on location using a function from the imported RandomAnswers file.	
    const currentAnswer = RandomAnswers.getCurrentAnswer(location, arrayofAnswers);
	
    //create an array with a random two incorrect answers and the correct answered using a function from the imported RandomAnswers file.
    const randomAnswers = RandomAnswers.getRandomThreeAnswers(arrayofAnswers, currentAnswer);
    
    return randomAnswers;    
  }
    
  //function to create an array of options to be displayed
  displayAnswers(){
	
    //create an array with a random two incorrect answers and the correct answered using a function from the imported RandomAnswers file.
    const randomAnswers = this.props.currentQuizAnswer;	
	
    //create a array of options as <li> to be displayed as answers. When the user select answer, the value is updated to the userAnswer state	
    const listOfAnswers = randomAnswers.map((answers, index) =>
	  <li key={index}>
	    <input className={css(styles.spaceBetweenOptions)} type="radio" name="choice" value={answers.answer} onClick={this.saveUserAnswer} id={"option" + index} />
		<label className={css(this.props.currentPassFail.passFail && (answers.answer === this.props.answerList[this.props.currentLocation.questionAnswered].answer) && styles.correctAnswer, this.props.currentPassFail.passFail && (answers.answer !== this.props.answerList[this.props.currentLocation.questionAnswered].answer) && styles.wrongAnswers)}>{answers.answer}</label>			   
	  </li>									   
    );
	
	return listOfAnswers;
  }

  //function used in the displayAnswers() to check if the current answer object passFail attribute is "pass" and return true. This will update the CSS tot the correctAnswers style.
  isAnswerPass(checkAnswer){	
    if(checkAnswer.passFail === "pass"){
	  return true;
    }  
  }

  //function used in the displayAnswers() to check if the current answer object passFail attribute is "fail" and return true. This will update the CSS tot the wrongAnswers style.
  isAnswerFail(checkAnswer){	
    if(checkAnswer.passFail === "fail"){
	  return true;
    }  
  }

  //method that calls a Redux action to save the user selected anwer to the Redux state
  saveUserAnswer = event =>{
  	this.props.onUpdateUserAnswer(event.target.value);
  }

  //when the user click the notepad icon, the M.C. Instructions pop up is displayed
  showMCInstructions = () =>{
    this.setState({show: true});
  }
  
  //close the M.C. Instructions pop up
  hideMCInstructions = () =>{
    this.setState({show: false});
  }
  
  //Bug: When the user choose an answer and click the "CheckAnswer" button, the input radio options remain selected. Even when the next question and answers are shown, the previous answer choice is selected but not offically "checked". This solves that problem by uncheckeing all options once the "CheckAnswerButton" is clicked and the passFail state is updated. This is use as a trigger to uncheck all input radio options.  
  //A second way to do this is to set each input check to a local state. If the passFail is set to true, update the local state to true. IF false, update the local state to null or something to hide it. 
  resetOptions = () =>{
      //check if the "CheckAnswerButton" has been press by checking if the Redux state "passFail" is true or false
      if(this.props.currentPassFail.passFail === true){
          let topAnswer = document.getElementById("option0");//get the element
          let middleAnswer = document.getElementById("option1");
          let bottomeAnswer = document.getElementById("option2");

          //The below code resets the radio input options to false, giving the impression no answer has been selected. 
          topAnswer.checked = false;
          middleAnswer.checked = false;
          bottomeAnswer.checked = false;

      }
  }

  render(){	
      this.resetOptions();
	  return(
		<div className={`row ${css(styles.indentAnswerOptions)}`}>
		  <div className="col-xs-8 col-xs-offset-3 col-sm-8 col-sm-offset-3 col-md-10 col-md-offset-2 col-lg-8 col-lg-offset-3">
			<ul className={css(styles.removeListBullets)}>{this.displayAnswers()}</ul>
		  </div>
          <Instructions show={this.state.show} hideMCInstructions={this.hideMCInstructions} />
		</div>  
	  );
  }
}

//map imported state of the tests and number of questions answered in the Redux store to local variables to be use by the component. 
const mapStateToProps = state => ({
	answerList: state.test,
	currentLocation: state.answered,
	currentPassFail: state.passFail,
	currentAnswer: state.userAnswer.userAnswer,  
    currentQuizAnswer: state.trueFalseAnswer.MCQuizAnswers
});

//map the imported Redux actions to a local method to be used by the component. This will allow the components to change the state of the Redux store
const mapActionsToProps = {
  onUpdateUserAnswer: getUserAnswer,
  onUpdateMCQuizAnswers: updateMCQuizAnswer
};

export default connect(mapStateToProps, mapActionsToProps)(MCAnswersList);