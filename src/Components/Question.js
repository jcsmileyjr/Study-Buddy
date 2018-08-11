import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  listOfAnswers:{
	  backgroundColor: 'white',
	  color: 'orange'
  }	
	
});

function Question(props){
  return(
    <div className="row text-center">
	  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		<h3>
	  	  What is the color of the apple?   
	  	  <span>
	  		<i className= {`fas fa-book ${css(styles.listOfAnswers)}`}></i>
		  </span>
		</h3>
	  </div>		
	</div>  
  );	
}

export default Question;