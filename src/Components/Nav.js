import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  navBackground:{
	  backgroundColor: '#FFCC80',
	  color: 'black'
  }	
	
});

function Nav({currentScore}){
  return(
    <div className={`row ${css(styles.navBackground)}`}>
	  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
		Study Buddy
	  </div>
	  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center">
		Score {currentScore.score}%
	  </div>
	  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-right">
		<i className="fas fa-bars"></i>
	  </div>		
	</div>  
  );	
}

/*Use Redux to get the current score from state*/
const mapStateToProps = state =>({
	currentScore: state.score
});

export default connect(mapStateToProps)(Nav);