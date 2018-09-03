import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

import Nav from './Components/Nav.js';
import Question from './Components/Question.js';
import MCAnswersList from './Components/MCAnswersList.js';
import CheckAnswerButton from './Components/CheckAnswerButton.js';
import DoneButton from './Components/DoneButton.js';
import Motivation from './Components/Motivation.js';
import SuccessPage from './Components/SuccessPage.js';

const styles = StyleSheet.create({
  //create stripe grey lines throughout the app background as long as there is content	
  appBackground:{
	  minHeight: "100%",
      '@media (min-width: 500px)': {
      marginLeft: "auto",
	  marginRight: "auto",
      float: "none !important",
	  marginTop: "150px"		
      }	
  }
	
});

//level one or the first of the series of quizs on one specific list of questions and answers for the user. The user must choose one of three answers per question. One answer is correct and the other two randam answers is incorect. A variable call currentPassFail is received from the parent (from the Redux state) to alternate beteween the CheckAnswerButton and Donebutton components. 
function MulitpleChoiceLevel1 (props){    
  return(
    <div className= {`col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4 col-xl-6 col-xl-offset-3 ${css(styles.appBackground)}`}>
	  <Nav />
	  <Question />
      <MCAnswersList />
	  {!props.currentPassFail && <CheckAnswerButton />}
	  {props.currentPassFail && <DoneButton />}
	  <Motivation />
	</div>
  );    
}

function TrueFalseLevel2(props){
  return(
    <div className= {`col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4 col-xl-6 col-xl-offset-3 ${css(styles.appBackground)}`}>
	  <Nav />
	  <Question />
      <p>New Level 2 Quiz</p>
	  {!props.currentPassFail && <CheckAnswerButton />}
	  {props.currentPassFail && <DoneButton />}
	  <Motivation />
	</div>
  );
}


class App extends Component {
  render() {	  
    return (
      <div className="container-fliud">
        {!this.props.currentSuccessPageStatus.showSuccessPage &&<TrueFalseLevel2 currentPassFail = {this.props.currentPassFail.passFail} />}        
        {this.props.currentSuccessPageStatus.showSuccessPage && <SuccessPage />}
      </div>
    );
  }
}

//map imported state of the showPassFail to show/hide the CheckAnswerButton and DoneButton components.
const mapStateToProps = state => ({
	currentPassFail: state.passFail,
    currentSuccessPageStatus: state.successPage
});

export default connect(mapStateToProps)(App);