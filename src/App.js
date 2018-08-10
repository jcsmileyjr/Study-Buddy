import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Nav from './Components/Nav.js';
import Question from './Components/Question.js';
import MCAnswersList from './Components/MCAnswersList.js';

const styles = StyleSheet.create({
  //create stripe grey lines throughout the app background as long as there is content	
  appBackground:{
	  color: 'black',
	  backgroundColor: 'white',
	  backgroundAttachment: 'local',
	  backgroundImage:' repeating-linear-gradient(#ccc, #ccc 1px, white 1px, white 31px, #ccc 31px)',
      lineHeight: '31px',
      padding: '0px 10px 10px 10px'	,
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
      <div className="container">
		<div className= {`col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4 ${css(styles.appBackground)}`}>
		  <Nav score={this.state.score} />
		  <Question />
		  <MCAnswersList />
		</div>
      </div>
    );
  }
}

export default App;
