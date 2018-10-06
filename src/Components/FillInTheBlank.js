import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  
  labelWhiteSpace:{
	  marginTop: "15px",
      marginBottom: "15px"
  },
    
  radioWhiteSpace:{
	  marginTop: "5px",
      marginBottom: "5px"
  },  
    
  indentAnswerOptions:{
	  textIndent: "5%"
  }    
	
});

function TrueFalseOptions (props){    
  return(
    <div className={`col-xs-6 col-xs-offset-4 ${css(styles.indentAnswerOptions)}`}>
      <label> {props.choice} </label>      
	</div>
  );    
}

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
		<div className="row ">
		  <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 text-center">
			<input type="text" />
		  </div>          
		  {this.props.currentPassFail && <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 text-center">
			<label className={css(styles.labelWhiteSpace)}>Love You</label>
		  </div>}
          
          {this.props.currentPassFail && <TrueFalseOptions choice="true" />}
          {this.props.currentPassFail && <TrueFalseOptions choice="false" />}
		</div>  
	  );
  }
}    

const mapStateToProps = state => ({
	currentPassFail: state.passFail.passFail
});

const mapActionsToProps = {

};

export default connect(mapStateToProps, mapActionsToProps)(FillInTheBlank);