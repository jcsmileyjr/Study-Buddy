import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

//add some coloring to the listOfAnswers icon that will display a list of answers
const styles = StyleSheet.create({
  listOfAnswers:{
	  backgroundColor: 'white',
	  color: 'orange'
  }	
	
});


function Question({question, currentLocation}){
	
	//get the list of questions and answers from the test reducer
	const listOfQuestions = {question}.question;
	
	//get the current count of questions answered from the questionAnswered reducer
	const location = {currentLocation}.currentLocation.questionAnswered;
	
	//determine the current question to be displayed
	const currentQuestion = listOfQuestions[location].question;

  return(
    <div className="row text-center">
	  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		<h3>
	  	  {currentQuestion}
	  	  <span>
	  		<i className= {`fas fa-book ${css(styles.listOfAnswers)}`}></i>
		  </span>
		</h3>
	  </div>		
	</div>  
  );	
}

/*Use Redux to get the current list of questions/answers and number of questions answered*/
const mapStateToProps = state =>({
	question: state.test,
	currentLocation: state.answered
});

export default connect(mapStateToProps)(Question);