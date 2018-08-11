import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Nav from './Components/Nav.js';
import Question from './Components/Question.js';
import MCAnswersList from './Components/MCAnswersList.js';
import CheckAnswerButton from './Components/CheckAnswerButton.js';
import DoneButton from './Components/DoneButton.js';
import Motivation from './Components/Motivation.js';

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

class App extends Component {
  constructor(props){
      super(props);
      this.state = {score:100};
  }	
  render() {
    return (
      <div className="container-fliud">
		<div className= {`col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4 col-xl-6 col-xl-offset-3 ${css(styles.appBackground)}`}>
		  <Nav score={this.state.score} />
		  <Question />
		  <MCAnswersList />
		  <CheckAnswerButton />
		  <DoneButton />
		  <Motivation />
		</div>
      </div>
    );
  }
}

export default App;
