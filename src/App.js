import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Nav from './Components/Nav.js';
import Question from './Components/Question.js';

const styles = StyleSheet.create({
  //create stripe grey lines throughout the app background as long as there is content	
  bodyBackground:{
	  color: 'black',
	  backgroundColor: 'white',
	  backgroundAttachment: 'local',
	  backgroundImage:' repeating-linear-gradient(#ccc, #ccc 1px, white 1px, white 31px, #ccc 31px)',
      lineHeight: '31px',
      padding: '0px 10px 10px 10px'	  
  }	
	
});

class App extends Component {
  constructor(props){
      super(props);
      this.state = {score:100};
  }	
  render() {
    return (
      <div className={`container ${css(styles.bodyBackground)}`}>
		<Nav score={this.state.score} />
		<Question />
      </div>
    );
  }
}

export default App;
