import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import {leaveSuccessPage} from '../Actions/hideSuccesPageAction.js';//import action to change the SuccessPage state's showSuccessPage state to false therefore hiding it.

//A component shown when the user completes a quiz. A button is press to preceed to the next quiz
class SuccessPage extends Component{
  
  if(this.props.currentScore.score > 75){
    const currentMessage = "You Passed, Proceed to the next next level";
  }else{
    const currentMessage = "You Failed, let's try again";  
  }
    
  onCloseSuccessPage = () => {
    this.props.onClosePage();  
  }      
  render(){  
      return(
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{currentMessage}</h1>
          </div>
          <div className="col-xs-12 text-center">
            <Button onClick={this.onCloseSuccessPage} bsStyle="success">Done</Button>        
          </div>
        </div>  
      );	
  }
}

/*Use Redux to get the current score from state*/
const mapStateToProps = state =>({
	currentScore: state.score
});

const mapActionsToProps = {
    onClosePage: leaveSuccessPage
};

export default connect(mapStateToProps, mapActionsToProps)(SuccessPage);