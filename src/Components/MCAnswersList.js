import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
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
	
  adjustLabel: {
	  
  }	
	
});

class MCAnswersList extends Component{
	
//function to get the current answer to be use in the displayAnswers()
getCurrentAnswer(answers){
	
  //current index of the test based off of how mnay questions the user has answered. This information is from the currentAnsweredCount state	
  const location = 	(this.props.currentLocation).questionAnswered;
	
  //current correct answer
  const currentCorrectAnswer = answers[location].answer;

  return currentCorrectAnswer;	
}

//function to randomize two answers plus the correct answer. You must give it a array of questions/answer and the correct answer
getRandomThreeAnswers(answers, correctAnswer){
	
  const currentTestAnswers = [];	
	
  const currentAnswerArray = answers.map(function(x){return x.answer});
  
  //randomly pick the first answer. Keep if it doesn’t match the currentCorrectAnswer, re-pick if it matches the currentCorrectAnswer
  var firstAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  
  while(correctAnswer===firstAnswer){
     firstAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  }

  //randomly pick the second answer and keep if it doesn’t match the correct answer and first answer
  var secondAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  while(correctAnswer===secondAnswer || firstAnswer === secondAnswer){
     secondAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  }

  //push all answers into the currentTestAnswers as an object with a second attribute as true or false
  currentTestAnswers.push({"answer": correctAnswer, "correct":true}, {"answer": firstAnswer, "correct":false}, {"answer": secondAnswer, "correct":false});
            
   //Shuffle the currentTestAnswers array
   var currentIndex = currentTestAnswers.length, temporayValue, randomIndex;
            
   while(0 !== currentIndex){
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
                
     temporayValue = currentTestAnswers[currentIndex];
     currentTestAnswers[currentIndex] = currentTestAnswers[randomIndex];
     currentTestAnswers[randomIndex] = temporayValue;
   }
 	
  return currentTestAnswers;	
}	
	
//function to create an array of options to be displayed
displayAnswers(){
	
  //list of questions and answers from the test state	
  const arrayofAnswers = this.props.answerList;	
  
  //list of questions and answers from the test state	
  const currentAnswer = this.getCurrentAnswer(arrayofAnswers);	
	
  //get a random two incorrect answers and the correct answered to be displayed	
  const randomAnswers = this.getRandomThreeAnswers(arrayofAnswers, currentAnswer);	
	
  //create a array of options as <li> to be displayed as answers	
  const listOfAnswers = randomAnswers.map((answers, index) =>
	<li key={index}>
	    <input className={css(styles.spaceBetweenOptions)} type="radio" value={answers.answer} />
		<label className={css(styles.adjustLabel)}>{answers.answer}</label>				   
	</li>									   
  );
	return listOfAnswers;
}


  render(){	
	  return(
		<div className={`row ${css(styles.indentAnswerOptions)}`}>
		  <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
			<ul className={css(styles.removeListBullets)}>{this.displayAnswers()}</ul>
		  </div>		
		</div>  
	  );
  }
}
/*	Issues
- Between break points 757 - 525 the radio options are skewer to the left
*/

const mapStateToProps = state => ({
	answerList: state.test,
	currentLocation: state.answered	
})

export default connect(mapStateToProps)(MCAnswersList);