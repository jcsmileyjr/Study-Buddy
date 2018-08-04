import React from 'react';

function Nav(props){
  return(
    <div className="row">
	  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
		{props.title}
	  </div>
	  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center">
		Score {props.score}%
	  </div>
	  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-right">
		<i class="fas fa-bars"></i>
	  </div>		
	</div>  
  );	
}

export default Nav;