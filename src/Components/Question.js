import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  listOfAnswers:{
	  backgroundColor: 'white',
	  color: 'orange'
  }	
	
});

function Question({question}){
  	
  return(
    <div className="row text-center">
	  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		<h3>
	  	  {question}
	  	  <span>
	  		<i className= {`fas fa-book ${css(styles.listOfAnswers)}`}></i>
		  </span>
		</h3>
	  </div>		
	</div>  
  );	
}

const mapStateToProps = state =>({
	question: state.test[0].question
});

export default connect(mapStateToProps)(Question);