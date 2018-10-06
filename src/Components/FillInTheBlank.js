import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

class FillInTheBlank extends Component{

//method that calls a Redux action to save the user selected anwer to the Redux state and update true or false to the state.
saveTrueAnswer = () =>{
	//this.props.onUpdateTrueAnswer();
    //this.props.onUpdateUserAnswer(this.props.currentQuizAnswer);
}

//method that calls a Redux action to save the user selected anwer to the Redux state
saveFalseAnswer = () =>{
	//this.props.onUpdateFalseAnswer();
    //this.props.onUpdateUserAnswer(this.props.currentQuizAnswer);
}    
    
  render(){      
	  return(
		<div className="row text-center">
		  <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
			<input type="text" />
		  </div>          
		  <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
			<label>Love You</label>
		  </div>
          <div className="col-xs-12">
            <input type="radio" name="choice" value={true}  onClick={this.saveTrueAnswer} /> 
            <label> True </label>
          </div>
          <div className="col-xs-12">
            <input type="radio" name="choice" value={false}  onClick={this.saveFalseAnswer} />
            <label> False </label>
          </div>
		</div>  
	  );
  }
}    

const mapStateToProps = state => ({

});

const mapActionsToProps = {

};

export default connect(mapStateToProps, mapActionsToProps)(FillInTheBlank);