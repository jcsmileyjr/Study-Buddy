import React from 'react';
import { StyleSheet, css } from 'aphrodite';
/*FF9400, E88D0C orange color
- use `` to combine bootstrap and aphrodite
*/

const styles = StyleSheet.create({
  navBackground:{
	  backgroundColor: '#FFCC80',
	  color: 'black'
  }	
	
});

function Nav(props){
  return(
    <div className={`row ${css(styles.navBackground)}`}>
	  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
		Study Buddy
	  </div>
	  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center">
		Score {props.score}%
	  </div>
	  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-right">
		<i className="fas fa-bars"></i>
	  </div>		
	</div>  
  );	
}

export default Nav;