import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';

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

const arrayofAnswers = [
	{"answer":"Red", "passFail":"asking"},
	{"answer":"Yellow", "passFail":"asking"},
	{"answer":"Purple", "passFail":"asking"}
];

class MCAnswersList extends Component{
	constructor(props){
	  super(props);	
	}
	
//function to create an array of options to be displayed
displayAnswers(){
	
  const listOfAnswers = arrayofAnswers.map((answers, index) =>
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

export default MCAnswersList;