import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import {addCorrectAnswer} from '../Actions/correctCountActions.js';

const styles = StyleSheet.create({
  whiteSpaceAboveElement:{
          margin: "10px"
  },
	
  buttonTextColor:{
	  color: "black"
  }	
});

class CheckAnswerButton extends Component{

  onAddCorrectAnswer = event => {
	  this.props.onAddCorrectAnswer();
  }	

  render(){
    return(
      <div className={`row ${css(styles.whiteSpaceAboveElement)}`}>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
          <Button className={css(styles.buttonTextColor)} bsStyle="success" onClick={this.onAddCorrectAnswer}>Check Answer</Button>
        </div>
      </div>
   );      //end of return
 }//end of render

/*      To Do
- add attribute to disable={} if player hasn't chosen an answer
- onclick={method to check if answer is corect}
- onClick={method to change passFail of answers that in turn change css}
- write both methods
- bind both methods to the constructor
*/  

}//end of CheckAnswerButton Class

const mapActionsToProps = {
  onAddCorrectAnswer: addCorrectAnswer
};

export default connect(null,mapActionsToProps)(CheckAnswerButton);